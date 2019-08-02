<template>
    <div
        v-touch:swipe.left="nextMedia"
        v-touch:swipe.right="prevMedia"
        v-touch:swipe.up="close"
        :class="{ 'lightbox--is-open': isOpen }"
        class="lightbox"
    >
        <div class="lightbox__inner">
            <Spinner :isVisible="isLoading" />
            <Btn
                :isUnstyled="true"
                :isTransparent="true"
                :icon="{
                    icon: 'remove',
                    size: 'lg',
                    srOnlyText: $getDictionaryValue('Site.Lightbox.Buttons.Close', 'Stäng')
                }"
                class="lightbox__close"
                @click.native="close"
            />

            <img
                v-if="currentMedia && !currentMedia.isVideo"
                :src="currentMedia.url"
                :class="{ 'lightbox__media--is-loading': isLoading }"
                class="lightbox__media"
                @load="toggleLoadingState"
                @error="loadingError"
            >
            <iframe
                v-if="currentMedia && currentMedia.isVideo"
                :src="getYoutubeURL(currentMedia.url)"
                class="lightbox__media--is-video"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>

            <template v-if="navigationIsPossible">
                <Btn
                    :icon="{
                        icon: 'arrow-left',
                        size: 'lg',
                        srOnlyText: $getDictionaryValue('Site.Lightbox.Buttons.Previous', 'Föregående')
                    }"
                    :isUnstyled="true"
                    :isTransparent="true"
                    class="lightbox__prev"
                    @click.native="prevMedia"
                />
                <Btn
                    :icon="{
                        icon: 'arrow-right',
                        size: 'lg',
                        srOnlyText: $getDictionaryValue('Site.Lightbox.Buttons.Next', 'Nästa')
                    }"
                    :isUnstyled="true"
                    :isTransparent="true"
                    class="lightbox__next"
                    @click.native="nextMedia"
                />
            </template>
        </div>
    </div>
</template>

<script>
// Info:
// Open the Lightbox by providing an index for the displayMedia prop (otherwise provide null).
// The event "close" is sent when the lightbox is closed so that displayMedia can be set to null in the parent.
// Use lightbox-mixin in a parent component to easily handle the displayMedia prop.

import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import getYouTubeID from 'get-youtube-id'

import Button from '@/components/Button'
import Spinner from '@/components/Spinner'

Vue.use(Vue2TouchEvents)

export default {
    name: 'Lightbox',
    components: {
        Btn: Button,
        Spinner
    },
    props: {
        media: {
            type: Array,
            required: false,
            default () { return [] }
        },
        displayMedia: {
            type: Number,
            required: false,
            default: null // Note: An index in the media prop. Is null as default and when the prop is updated to a number the lightbox is opened
        }
    },
    data () {
        return {
            isOpen: false,
            currentMediaIndex: null,
            isLoading: true,
            yOffsetWhenOpened: 0
        }
    },
    computed: {
        currentMedia () {
            return this.currentMediaIndex !== null && this.totalMedia > 0 ? this.media[this.currentMediaIndex] : null
        },
        totalMedia () {
            return this.media.length
        },
        navigationIsPossible () {
            return this.totalMedia > 1
        }
    },
    watch: {
        displayMedia (newValue) {
            if (newValue !== null && this.totalMedia > 0) {
                this.open()
            }
        }
    },
    methods: {
        open () {
            this.isOpen = true
            this.isLoading = true
            this.currentMediaIndex = this.displayMedia < this.totalMedia ? this.displayMedia : 0

            this.yOffsetWhenOpened = document.body.scrollTop

            window.addEventListener('keyup', this.keyboardNavigation)
            document.body.addEventListener('scroll', this.checkScroll)
        },
        close () {
            this.isOpen = false
            this.currentMediaIndex = null
            this.yOffsetWhenOpened = 0
            this.$emit('close')

            window.removeEventListener('keyup', this.keyboardNavigation)
            document.body.removeEventListener('scroll', this.checkScroll)
        },
        checkScroll () {
            if (document.body.scrollTop >= (this.yOffsetWhenOpened + 100)) {
                this.close()
            }
        },
        keyboardNavigation (event) {
            if (event) {
                switch (event.keyCode) {
                case 37:
                    this.prevMedia() // Left arrow
                    break
                case 39:
                    this.nextMedia() // Right arrow
                    break
                case 27:
                    this.close() // Esc
                    break
                }
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
