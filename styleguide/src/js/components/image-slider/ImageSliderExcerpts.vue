<template>
    <ul class="list list--unstyled list--horizontal image-slider__nav">
        <li
            v-for="(excerpt, index) in excerpts"
            :key="index"
            :class="{ 'image-slider__excerpt--is-current': index === activeIndex }"
            class="list-item image-slider__excerpt"
            @click="displaySlide(index)"
        >
            <span class="image-slider__excerpt-text">{{ excerpt }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ImageSliderExcerpts',
    props: {
        excerpts: {
            type: Array,
            required: false,
            default () { return [] }
        },
        activeIndex: {
            type: Number,
            required: false,
            default: -1
        }
    },
    methods: {
        displaySlide (slideIndex) {
            this.$emit('displaySlide', slideIndex)
        }
    }
}
</script>
