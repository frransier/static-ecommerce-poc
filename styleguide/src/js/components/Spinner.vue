<template>
    <div
        :class="spinnerClasses"
        class="spinner spinner--is-own-element"
    >
    </div>
</template>

<script>
// Note: The spinner could be used only by using its classes, read more in the style guide.

export default {
    name: 'Spinner',
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        isInverted: {
            type: Boolean,
            required: false,
            default: false
        },
        isInheritedBackground: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        spinnerClasses () {
            return {
                'spinner--is-visible': this.isVisible,
                'spinner--inverted': this.isInverted,
                'spinner--inherited-background': this.isInheritedBackground
            }
        }
    }
}
</script>
