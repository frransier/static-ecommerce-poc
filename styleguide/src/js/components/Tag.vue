<template>
    <span :class="[modifierClasses, definedTagClasses]" :title="hoverText" class="tag">
        <slot>{{ definedTag }}</slot>
    </span>
</template>

<script>
export default {
    name: 'Tag',
    props: {
        definedTag: {
            type: String,
            required: false,
            default: null
        },
        hasNoPadding: {
            type: Boolean,
            required: false,
            default: false
        },
        isBordered: {
            type: Boolean,
            required: false,
            default: false
        },
        isFilled: {
            type: Boolean,
            required: false,
            default: false
        },
        isRed: {
            type: Boolean,
            required: false,
            default: false
        },
        isGreen: {
            type: Boolean,
            required: false,
            default: false
        },
        isBlue: {
            type: Boolean,
            required: false,
            default: false
        },
        isCyan: {
            type: Boolean,
            required: false,
            default: false
        },
        isWhite: {
            type: Boolean,
            required: false,
            default: false
        },
        isBrown: {
            type: Boolean,
            required: false,
            default: false
        },
        hoverText: {
            type: String,
            required: false,
            default: ''
        }
    },
    computed: {
        modifierClasses () {
            return {
                'tag--no-padding': this.hasNoPadding,
                'tag--bordered': this.isBordered,
                'tag--filled': this.isFilled,
                'tag--red': this.isRed,
                'tag--green': this.isGreen,
                'tag--blue': this.isBlue,
                'tag--cyan': this.isCyan,
                'tag--white': this.isWhite,
                'tag--brown': this.isBrown
            }
        },
        definedTagClasses () {
            const definedTag = this.definedTag !== null ? this.definedTag.toLowerCase() : null
            return definedTag !== null ? {
                'tag--bordered': !this.isFilled && (definedTag === 'jakt' || definedTag === 'fiske'),
                'tag--red': definedTag === 'jakt',
                'tag--blue': definedTag === 'fiske',
                'tag--brown': definedTag === 'friluft'
            } : null
        }
    }
}
</script>
