//
// Common stuff used by the different form elemenents components
//

export default {
    props: {
        id: {
            type: String,
            required: false,
            default: null
        },
        name: {
            type: String,
            required: false,
            default: null
        },
        value: {
            type: [String, Number, Boolean],
            required: true
        },
        placeholderText: {
            type: String,
            required: false,
            default: null
        },
        isRequired: {
            type: Boolean,
            required: false,
            default: false
        },
        isReadOnly: {
            type: Boolean,
            required: false,
            default: false
        },
        autoComplete: {
            type: String,
            required: false,
            default: null
        },
        isInline: {
            type: Boolean,
            required: false,
            default: false
        },
        isGrey: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        modifierClasses () {
            return {
                'input--inline': this.isInline,
                'input--grey': this.isGrey
            }
        },
        localValue: {
            get () {
                // Note: Radio buttons work a bit differently hence the use of selectedButtonValue
                return typeof this.selectedButtonValue !== 'undefined' ? this.selectedButtonValue : this.value
            },
            set () {
                // Note: For some elements, for example <select>, "change" would maybe sound better as an event name but "input" is needed to be able to use v-model on the component
                this.$emit('input', event.target.value)
            }
        }
    }
}
