<template>
    <div
        :class="{ 'modal--is-visible': isVisible }"
        class="modal"
        @click="clickOutside"
    >
        <div class="modal__content">
            <Btn
                :isTransparent="true"
                :icon="{
                    icon: 'remove'
                }"
                class="modal__close-button"
                @click.native="emitCloseEvent"
            />
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button'

export default {
    name: 'Modal',
    components: {
        Btn: Button
    },
    props: {
        isVisible: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        clickOutside (event) {
            // The click event on the wrapping div is fired also when clicking in the content area, therefore check so it was really the wrapper that was clicked.
            if (event.target.classList.contains('modal--is-visible')) {
                this.emitCloseEvent()
            }
        },
        emitCloseEvent () {
            this.$emit('close')
        }
    }
}
</script>
