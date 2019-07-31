<template>
    <div :class="{ 'product-images--wide' : useAlternativeLayout }" class="product-images">
        <Lightbox :media="media" :displayMedia="lightboxDisplayMedia" @close="resetLightboxDisplayMedia" />
        <div class="product-images__inner">
            <ul class="product-images__thumbnails">
                <li
                    v-for="(file, index) in media"
                    :key="index"
                    :class="{ 'product-images__thumbnail-wrapper--is-video': file.isVideo }"
                    class="product-images__thumbnail-wrapper"
                    @click="navigateToMedia(index)"
                >
                    <img :src="file.isVideo ? getYouTubeThumbnailUrl(file.url) : `${file.url}?preset=product-image-thumbnail`" class="product-images__thumbnail">
                </li>
            </ul>
            <div
                v-touch:swipe.left="nextMedia"
                v-touch:swipe.right="prevMedia"
                :class="{ 'product-images__image-wrapper--no-images': totalMedia === 0 }"
                class="product-images__image-wrapper"
            >
                <template v-if="totalMedia > 0">
                    <Spinner :isVisible="isLoading" />

                    <img
                        v-if="!currentMedia.isVideo"
                        :src="useAlternativeLayout ? `${currentMedia.url}?preset=product-image-large` : `${currentMedia.url}?preset=product-image-small`"
                        class="product-images__current-image"
                        @load="toggleLoadingState"
                        @error="loadingError"
                        @click="openLightbox(currentMediaIndex)"
                    >
                    <iframe
                        v-else
                        :src="getYoutubeURL(currentMedia.url)"
                        class="product-images__current-video"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>

                    <div class="product-images__counter">
                        {{ currentMediaIndex + 1 }} <span class="h-color-grey">/ {{ totalMedia }}</span>
                    </div>

                    <Btn
                        v-if="navigationIsPossible"
                        :isTransparent="true"
                        :icon="{
                            icon: 'arrow-left-grey',
                            srOnlyText: $getDictionaryValue('Page.ProductDetail.ImageSlider.PreviousButton', 'Föregående')
                        }"
                        class="button-icon product-images__nav-button product-images__nav-button--prev"
                        @click.native="prevMedia"
                    />
                    <Btn
                        v-if="navigationIsPossible"
                        :isTransparent="true"
                        :icon="{
                            icon: 'arrow-right',
                            srOnlyText: $getDictionaryValue('Page.ProductDetail.ImageSlider.NextButton', 'Nästa')
                        }"
                        class="button-icon product-images__nav-button product-images__nav-button--next"
                        @click.native="nextMedia"
                    />
                </template>

                <div v-if="displayClubTag || displayDiscountTag" class="product-images__tag product-images__tag--left">
                    <Tag
                        v-if="displayClubTag"
                        :hasNoPadding="true"
                        :hoverText="$getDictionaryValue('Site.Tags.Club', 'Club Jaktia')"
                    >
                        <img src="/assets/icons/club-jaktia-small.svg">
                    </Tag>
                    <Tag
                        v-if="displayDiscountTag"
                        :hasNoPadding="true"
                        :hoverText="$getDictionaryValue('Site.Tags.Sale', 'Rea')"
                    >
                        <img src="/assets/icons/sale-big.svg">
                    </Tag>
                </div>
                <div v-if="displayIsNewTag" class="product-images__tag product-images__tag--right">
                    <Tag :hasNoPadding="true" :hoverText="$getDictionaryValue('Site.Tags.New', 'Nyhet')">
                        <span class="h-color-grey">{{ $getDictionaryValue('Site.Tags.New', 'Nyhet') }}</span>
                    </Tag>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import getYouTubeID from 'get-youtube-id'

import Lightbox from '@/components/lightbox/Lightbox'
import lightboxMixin from '@/components/lightbox/lightbox-mixin'
import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import Tag from '@/components/Tag'

Vue.use(Vue2TouchEvents)

export default {
    name: 'ProductImages',
    components: {
        Lightbox,
        Btn: Button,
        Spinner,
        Tag
    },
    mixins: [lightboxMixin],
    props: {
        media: {
            type: Array,
            required: false,
            default () { return [] }
        },
        displayClubTag: {
            type: Boolean,
            required: false,
            default: false
        },
        displayDiscountTag: {
            type: Boolean,
            required: false,
            default: true
        },
        displayIsNewTag: {
            type: Boolean,
            required: false,
            default: true
        },
        useAlternativeLayout: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            isLoading: true,
            currentMediaIndex: 0
        }
    },
    computed: {
        currentMedia () {
            return this.media[this.currentMediaIndex]
        },
        totalMedia () {
            return this.media.length
        },
        navigationIsPossible () {
            return this.totalMedia > 1
        }
    },
    watch: {
        // Reset the component when new media is provided
        media (newMedia, oldMedia) {
            // When switching variants, the displayed image and the new image to be displayed might be the same (yes, a corner case, but anyway). If they are, we should not toggle the loading state.
            let mediafilesAreTheSame = false
            if (oldMedia[this.currentMediaIndex].url === newMedia[0].url) {
                mediafilesAreTheSame = true
            }

            this.currentMediaIndex = 0
            if (!mediafilesAreTheSame) {
                this.toggleLoadingState()
            }

            this.resetLightboxDisplayMedia()
        }
    },
    methods: {
        navigateToMedia (mediaIndex) {
            if (mediaIndex !== this.currentMediaIndex) {
                this.currentMediaIndex = mediaIndex
                this.toggleLoadingState()
            }
        },
        prevMedia () {
            if (this.navigationIsPossible) {
                const nextIndex = this.currentMediaIndex - 1
                this.currentMediaIndex = nextIndex < 0 ? this.totalMedia - 1 : nextIndex
                this.toggleLoadingState()
            }
        },
        nextMedia () {
            if (this.navigationIsPossible) {
                const nextIndex = this.currentMediaIndex + 1
                this.currentMediaIndex = nextIndex > this.totalMedia - 1 ? 0 : nextIndex
                this.toggleLoadingState()
            }
        },
        toggleLoadingState () {
            // Trying to detect the loading state of an iframe is a mess, therefore only toggle the components loading state if the next media is an image
            if (!this.currentMedia.isVideo) {
                this.isLoading = !this.isLoading
            }
        },
        loadingError () {
            this.isLoading = false
        },
        getVideoId (videoUrl) {
            let videoId = getYouTubeID(videoUrl)

            // If we fail to get videoId and the parameter is 11 characters, it's almost certainly the actual ID that is being passed
            if (!videoId && videoUrl.length === 11) {
                videoId = videoUrl
            }

            return videoId
        },
        getYouTubeThumbnailUrl (videoUrl) {
            return `http://img.youtube.com/vi/${this.getVideoId(videoUrl)}/default.jpg`
        },
        getYoutubeURL (videoUrl) {
            return `https://www.youtube.com/embed/${this.getVideoId(videoUrl)}`
        }
    }
}
</script>
