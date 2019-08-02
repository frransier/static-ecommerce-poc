<template>
    <svg
        v-if="icon"
        :class="modifierClasses"
        class="icon"
        aria-hidden="true"
    >
        <use :xlink:href="iconUrl" xmlns:xlink="http://www.w3.org/1999/xlink" />
        <span v-if="srOnlyText" class="hide-visually">{{ srOnlyText }}</span>
    </svg>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        icon: {
            type: String,
            required: true
        },
        srOnlyText: {
            type: String,
            required: false,
            default: null
        },
        size: {
            type: String,
            required: false,
            default: null
        },
        color: {
            type: String,
            required: false,
            default: null
        },
        fill: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        modifierClasses () {
            return {
                [`icon--${this.size}`]: this.size,
                [`icon--${this.color}`]: this.color,
                'icon--fill': this.fill
            }
        },
        iconUrl () {
            return `/assets/icons/icon-sprite.svg#${this.icon}`
        }
    }
}
</script>
