<template>
    <div ref="autocompleteWrapper" class="grid__item grid__item--8 h-flex h-position-relative">
        <gmap-autocomplete
            ref="mapSearch"
            :componentRestrictions="autoCompleteRestrictions"
            :placeholder="$getDictionaryValue('Page.Stores.SearchPlace', 'Sök plats')"
            selectFirstOnEnter
            type="search"
            class="input input--grey h-flex-grow"
            @place_changed="setPlace"
        />
        <Btn :isRed="true" :text="$getDictionaryValue('Page.Stores.SearchButton', 'Sök')" @click.native="setPlaceBySubmit" />
    </div>
</template>

<script>
import Button from '@/components/Button'

export default {
    name: 'MapSearch',
    components: {
        Btn: Button
    },
    data () {
        return {
            place: null,
            autoCompleteRestrictions: {
                country: ['se'] // restrict autocomplete search
            }
        }
    },
    mounted () {
        // Note:
        // Since Google is Google (...), the auto complete element must be moved in the DOM tree because it's no way of configuring from ending up last in <body>.
        // The interval is needed because the element is not available until a moment after Vue has been mounted. It's cleared when the element appears.
        const googleAutoCompleteInterval = setInterval(() => { this.checkIfGoogleAutoCompleteElementExists(googleAutoCompleteInterval) }, 500)
    },
    methods: {
        setPlace (place) {
            this.$emit('setPlace', place)
        },
        setPlaceBySubmit () {
            const el = this.$refs.mapSearch.$refs.input
            const ev = new Event('keydown')

            ev.which = 13
            ev.keyCode = 13

            return el.dispatchEvent(ev)
        },
        checkIfGoogleAutoCompleteElementExists (intervalId) {
            if (document.querySelector('body > .pac-container')) {
                this.moveGoogleAutoCompleteElement()
                clearInterval(intervalId)
            }
        },
        moveGoogleAutoCompleteElement () {
            this.$refs.autocompleteWrapper.appendChild(document.querySelector('body > .pac-container'))
        }
    }
}
</script>
