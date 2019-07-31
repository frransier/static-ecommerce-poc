<template>
    <div
        v-touch:swipe.left="swipe"
        v-touch:swipe.right="swipe"
        class="image-slider"
    >
        <Slide
            v-for="(slide, index) in slides"
            :key="index"
            :slideContent="slide"
            :isCurrent="index === currentSlideIndex"
            :preload="index === prevSlideIndex || index === nextSlideIndex"
        />
        <ImageSliderExcerpts
            :excerpts="excerpts"
            :activeIndex="currentSlideIndex"
            @displaySlide="displaySlide"
        />
    </div>
</template>

<script>
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

import Slide from './Slide'
import ImageSliderExcerpts from './ImageSliderExcerpts'

Vue.use(Vue2TouchEvents)

const defaultConfig = {
    autoPlay: {
        use: true,
        interval: 7000,
        stopWhenManuallySwitching: true,
        stopWhenSwiping: true
    }
}

export default {
    name: 'ImageSlider',
    components: {
        Slide,
        ImageSliderExcerpts
    },
    props: {
        config: {
            type: Object,
            required: false,
            default () { return { ...defaultConfig } }
        },
        slides: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            intervalId: null,
            currentSlideIndex: 0
        }
    },
    computed: {
        numberOfSlides () {
            return this.slides.length
        },
        prevSlideIndex () {
            return this.currentSlideIndex === 0 ? this.numberOfSlides - 1 : this.currentSlideIndex - 1
        },
        nextSlideIndex () {
            return this.currentSlideIndex === this.numberOfSlides - 1 ? 0 : this.currentSlideIndex + 1
        },
        excerpts () {
            return this.slides.map(x => x.excerpt.length > 35 ? `${x.excerpt.substring(0, 35).trim()}...` : x.excerpt)
        }
    },
    mounted () {
        if (this.config.autoPlay.use && this.numberOfSlides > 1) {
            this.startInterval()
        }
    },
    methods: {
        startInterval () {
            this.intervalId = setInterval(() => { this.switchSlide() }, this.config.autoPlay.interval)
        },
        stopInterval () {
            if (this.intervalId !== null) {
                clearInterval(this.intervalId)
            }
        },
        switchSlide () {
            this.currentSlideIndex = this.nextSlideIndex
        },
        displaySlide (slideIndex) {
            if (this.config.autoPlay.stopWhenManuallySwitching || this.config.autoPlay.stopWhenSwiping) {
                this.stopInterval()
            }

            this.currentSlideIndex = slideIndex
        },
        swipe (direction) {
            const slideIndex = direction === 'left' ? this.nextSlideIndex : this.prevSlideIndex
            this.displaySlide(slideIndex)
        }
    }
}
</script>
