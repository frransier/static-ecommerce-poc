<script>
import Icon from '@/components/Icon'

export default {
    name: 'Btn', // Note: Can't be named Button as it's an existing html element
    components: {
        Icon
    },
    props: {
        id: {
            type: String,
            required: false,
            default: null
        },
        type: {
            type: String,
            required: false,
            default: 'button'
        },
        text: {
            type: String,
            required: false,
            default: null
        },
        icon: {
            type: Object,
            required: false,
            default: null
        },
        isLink: {
            type: Boolean,
            required: false,
            default: false
        },
        url: {
            type: String,
            required: false,
            default: null
        },
        isRed: {
            type: Boolean,
            required: false,
            default: false
        },
        isCyan: {
            type: Boolean,
            required: false,
            default: false
        },
        isOrange: {
            type: Boolean,
            required: false,
            default: false
        },
        isSuccess: {
            type: Boolean,
            required: false,
            default: false
        },
        isWarning: {
            type: Boolean,
            required: false,
            default: false
        },
        isDanger: {
            type: Boolean,
            required: false,
            default: false
        },
        isTransparent: {
            type: Boolean,
            required: false,
            default: false
        },
        isRounded: {
            type: Boolean,
            required: false,
            default: false
        },
        isUnderline: {
            type: Boolean,
            required: false,
            default: false
        },
        isTextCenter: {
            type: Boolean,
            required: false,
            default: false
        },
        isDisabled: {
            type: Boolean,
            required: false,
            default: false
        },
        isFullWidth: {
            type: Boolean,
            required: false,
            default: false
        },
        isResponsive: {
            type: Boolean,
            required: false,
            default: false
        },
        isUnstyled: {
            type: Boolean,
            required: false,
            default: false
        },
        isSpinner: {
            type: Boolean,
            required: false,
            default: false
        },
        isSpinnerInverted: {
            type: Boolean,
            required: false,
            default: false
        },
        isSpinnerInheritedBackground: {
            type: Boolean,
            required: false,
            default: false
        },
        isSpinnerVisible: {
            type: Boolean,
            required: false,
            default: false
        },
        isSpinnerCompleted: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        modifierClasses () {
            return {
                'button--is-link': this.isLink,
                'button-icon': this.icon,
                'button--red': this.isRed,
                'button--cyan': this.isCyan,
                'button--orange': this.isOrange,
                'button--success': this.isSuccess,
                'button--warning': this.isWarning,
                'button--danger': this.isDanger,
                'button--transparent': this.isTransparent,
                'button--rounded': this.isRounded,
                'button--underline': this.isUnderline,
                'button--text-center': this.isTextCenter,
                'button--disabled': this.isDisabled,
                'button--full-width': this.isFullWidth,
                'button--responsive': this.isResponsive,
                'button--unstyled': this.isUnstyled
            }
        },
        spinnerClasses () {
            return this.isSpinner ? ['spinner', {
                'spinner--inverted': this.isSpinnerInverted,
                'spinner--inherited-background': this.isSpinnerInheritedBackground,
                'spinner--is-visible': this.isSpinnerVisible,
                'spinner--completed': this.isSpinnerCompleted
            }] : []
        }
    },
    render (h) {
        const isLink = this.isLink && this.url
        const ButtonElement = isLink ? `a` : `button`
        const buttonAttributes = {
            id: this.id
        }

        if (isLink) {
            buttonAttributes.href = this.url
        } else {
            buttonAttributes.type = this.type
            buttonAttributes.disabled = this.isDisabled
        }

        return (
            <ButtonElement
                class={['button', this.modifierClasses, this.spinnerClasses]}
                { ...{ attrs: buttonAttributes }}
            >
                {this.icon &&
                    <icon
                        icon={this.icon.icon}
                        srOnlyText={this.icon.srOnlyText}
                        size={this.icon.size}
                        color={this.icon.color}
                        fill={this.icon.fill}
                        class={['button-icon__icon', this.icon.customClasses]}
                    />
                }
                {this.icon && this.text &&
                    <span class="button-icon__text">
                        {this.text}
                    </span>
                }
                {
                    this.$slots.default || (!this.icon && this.text)
                }
            </ButtonElement>
        )
    }
}
</script>
