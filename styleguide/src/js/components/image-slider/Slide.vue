<template>
    <div
        v-if="backgroundImage"
        :class="{ 'slide--is-current': isCurrent }"
        class="slide"
    >
        <Spinner :isVisible="!isLoaded" :isInverted="true" class="slide__spinner" />
        <img
            v-if="renderBackgroundImage"
            :src="backgroundImage"
            class="slide__loading-image"
            @load="imageHasLoaded"
        >
        <header :style="{ 'background-image': isLoaded ? `url('${backgroundImage}')` : '' }" :class="{ 'hero--headline2': isProductContent }" class="hero slide__hero">
            <div class="hero__body">
                <div v-if="preHeading" class="hero__pre-heading" v-html="preHeading"></div>
                <h1 v-if="heading" class="hero__heading" v-html="heading"></h1>
                <Btn
                    v-if="link"
                    :isLink="true"
                    :url="link.url"
                    :isRed="true"
                    :isTextCenter="true"
                    :icon="{
                        icon: 'double-chevron',
                        size: 'xs'
                    }"
                    :text="link.text"
                />
            </div>
        </header>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import Icon from '@/components/Icon'
import Button from '@/components/Button'

export default {
    name: 'Slide',
    components: {
        Spinner,
        Icon,
        Btn: Button
    },
    props: {
        slideContent: {
            type: Object,
            required: true
        },
        isCurrent: {
            type: Boolean,
            required: false,
            default: false
        },
        preload: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            isLoaded: false
        }
    },
    computed: {
        renderBackgroundImage () {
            return this.backgroundImage && (this.isCurrent || this.preload || this.isLoaded)
        },
        backgroundImage () {
            return typeof this.slideContent.backgroundImage !== 'undefined' ? this.slideContent.backgroundImage : null
        },
        preHeading () {
            return typeof this.slideContent.preHeading !== 'undefined' ? this.slideContent.preHeading : null
        },
        heading () {
            return typeof this.slideContent.heading !== 'undefined' ? this.slideContent.heading : null
        },
        link () {
            if (typeof this.slideContent.linkText !== 'undefined') {
                return {
                    text: this.slideContent.linkText,
                    url: this.slideContent.linkUrl
                }
            }
            return null
        },
        isProductContent () {
            return typeof this.slideContent.isProductContent !== 'undefined' && (this.slideContent.isProductContent === 'true' || this.slideContent.isProductContent)
        }
    },
    methods: {
        imageHasLoaded () {
            this.isLoaded = true
        }
    }
}
</script>
