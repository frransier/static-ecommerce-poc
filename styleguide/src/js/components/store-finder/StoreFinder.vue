<template>
    <div>
        <section v-if="!options.showMapOnly" class="section">
            <header class="section__header">
                <div class="section__header-block">
                    <h1 class="section__heading">
                        {{ $getDictionaryValue('Page.Stores.Heading', 'Jaktias butiker') }}
                    </h1>
                </div>
                <div class="section__header-block">
                    <!-- FIND MY POSITION -->
                    <Btn
                        v-if="showGeolocationButton"
                        :isTransparent="true"
                        :isUnderline="true"
                        :icon="{
                            icon: 'locator',
                            srOnlyText: $getDictionaryValue('Page.Stores.FindNearestStore', 'Hitta närmaste butik')
                        }"
                        :class="['h-font-size-xs', 'h-text-transform-none']"
                        :text="$getDictionaryValue('Page.Stores.FindNearestStore', 'Hitta närmaste butik')"
                        @click.native="findNearestStore"
                    />
                </div>
            </header>
            <div class="grid grid--col-xs-1 grid--col-sm-1">
                <MapSearch @setPlace="setPlace" />
                <div class="grid__item grid__item--4">
                    <!-- STORE SELECT -->
                    <Sel
                        :options="storesInSelectList"
                        :isGrey="true"
                        :placeholderText="$getDictionaryValue('Page.Stores.Placeholder', 'Välj butik')"
                        value=""
                        @input="selectStore"
                    />
                </div>
            </div>
        </section>

        <section :class="{ 'section--no-top-padding': options.showMapOnly }" class="section section--no-x-padding-xs">
            <!-- MAP -->
            <gmap-map
                :key="gmapKey"
                :center="mapPosition"
                :zoom="zoom"
                :options="{
                    gestureHandling: 'cooperative',
                    mapTypeControl: false,
                    streetViewControl: false
                }"
                style="width:100%; height: 500px;"
                @idle="setChangedMap(false)"
            >
                <gmap-info-window
                    :position="infoWindow.store.position"
                    :opened="infoWindow.isOpen"
                    :options="{
                        pixelOffset: {
                            height: -35
                        }
                    }"
                    @closeclick="closeInfoWindow"
                >
                    <div class="map-info-window">
                        <ul class="list list--unstyled map-info-window__list">
                            <li>
                                <h3 class="h-uppercase">{{ infoWindow.store.name }}</h3>
                            </li>
                            <li>
                                {{ infoWindow.store.address }}
                            </li>
                            <li>
                                {{ infoWindow.store.phone }}
                            </li>
                            <li>
                                <a :href="`mailto:${infoWindow.store.email}`" class="h-color-red">{{ infoWindow.store.email }}</a>
                            </li>
                            <li v-if="!isSingleStore" class="h-padding-top-xxs">
                                <a :href="infoWindow.store.url" class="h-color-red">{{ $getDictionaryValue('Page.Stores.ToStorePage', 'Till butikens sida') }}</a>
                            </li>
                            <li class="h-padding-top-sm">
                                <Btn
                                    :isLink="true"
                                    :url="directionUrl"
                                    :isRed="true"
                                    :text="$getDictionaryValue('Page.Stores.Directions', 'Vägbeskrivning')"
                                />
                            </li>
                        </ul>
                    </div>
                </gmap-info-window>
                <gmap-marker
                    v-for="(store, index) in stores"
                    :key="'marker' + index"
                    :position="store.position"
                    @click="openInfoWindow(store)"
                />
            </gmap-map>
        </section>
    </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import geolib from 'geolib'

import Button from '@/components/Button'
import Select from '@/components/form-elements/Select'
import MapSearch from './MapSearch'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBoH9BI3cAbJ4ZstAvDdIIRlx8oAFlV2-8',
        libraries: 'places',
        region: 'SE',
        language: 'sv'
    }
})

export default {
    name: 'StoreFinder',
    components: {
        Btn: Button,
        Sel: Select,
        MapSearch
    },
    data () {
        return {
            mapPosition: { lat: 61.533078, lng: 15.991166 }, // default map position
            userPosition: null,
            stores: [],
            infoWindow: {
                isOpen: false,
                store: {}
            },
            userChangedMapPosition: false, // force Vue to update
            zoom: 4, // default zoom level
            options: {
                showMapOnly: true
            },
            showGeolocationButton: true
        }
    },
    computed: {
        directionUrl () {
            return this.infoWindow.store.position ? `https://www.google.com/maps/dir/Current+Location/${this.infoWindow.store.position.lat},${this.infoWindow.store.position.lng}` : null
        },
        isSingleStore () {
            return this.stores.length === 1
        },
        storesInSelectList () {
            return this.stores.map((store, index) => ({
                value: index,
                text: store.name
            }))
        },
        gmapKey () {
            // Note:
            // For some reason, if using useChangedMapPosition when in "single store mode" the GMAP component throws an undefined error.
            // Several crusades has been sent out in the unknown to find the quest of "WHY?!", but no one has returned. However, using just a string in "single store mode" solves it..!
            return this.isSingleStore ? 'sebbe' : this.userChangedMapPosition
        }
    },
    created () {
        if (typeof window.stores !== 'undefined') {
            this.stores = window.stores
        }
    },
    mounted () {
        if (!this.isSingleStore) {
            this.options.showMapOnly = false
            this.setUserPosition().then(() => this.findNearestStore())
        } else {
            this.selectStore('0')
        }
    },
    methods: {
        findNearestStore () {
            if (this.userPosition) {
                const storePositions = this.stores.map(store => store.position)
                const nearestStore = geolib.findNearest(this.userPosition, storePositions)
                this.selectStore(nearestStore.key)
            }
        },
        setUserPosition () {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(position => {
                    this.userPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    resolve()
                }, error => {
                    if (error.code === error.PERMISSION_DENIED) {
                        this.showGeolocationButton = false
                    }
                    reject(error)
                })
            })
        },
        openInfoWindow (store) {
            this.infoWindow.store = store
            this.infoWindow.isOpen = true
        },
        closeInfoWindow () {
            this.infoWindow.isOpen = false
        },
        setChangedMap (state) {
            this.userChangedMapPosition = state
        },
        zoomIn (zoomValue = 5) {
            this.zoom = zoomValue
            this.setChangedMap(true)
        },
        selectStore (storeIndex) {
            if (storeIndex.length > 0) {
                storeIndex = parseInt(storeIndex, 10)
                const selectedStore = this.stores[storeIndex]

                if (typeof selectedStore.position !== 'undefined') {
                    this.setMapPosition(selectedStore.position.lat, selectedStore.position.lng)
                    this.openInfoWindow(selectedStore)
                    this.zoomIn(15)
                }
            }
        },
        setPlace (place) {
            if (typeof place.geometry !== 'undefined') {
                this.closeInfoWindow()
                this.setMapPosition(place.geometry.location.lat(), place.geometry.location.lng())
                this.zoomIn(10)
            }
        },
        setMapPosition (lat, lng) {
            this.mapPosition.lat = lat
            this.mapPosition.lng = lng
        }
    }
}
</script>
