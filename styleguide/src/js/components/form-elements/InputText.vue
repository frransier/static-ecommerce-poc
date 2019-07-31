<template>
    <input
        :type="type"
        :id="id"
        :placeholder="placeholderText"
        :name="name"
        :required="isRequired"
        :readonly="isReadOnly"
        :pattern="regExPattern"
        :autocomplete="autoComplete"
        v-model="localValue"
        class="input"
    >
</template>

<script>
import formElementsMixin from '@/mixins/form-elements-mixin'

export default {
    name: 'InputText',
    mixins: [formElementsMixin],
    props: {
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        pattern: {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        regExPattern () {
            switch (this.pattern) {
            case 'orgNumber':
                // Reference: https://www.regextester.com/100124
                return new RegExp(/([5]\d{5}[-]\d{4})|([5]\d{9}\s)/g).source // eslint-disable-line no-useless-escape

            case 'zipCode':
                return new RegExp(/^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/g).source // Reference: https://www.etl-tools.com/regular-expressions/is-swedish-post-code.html

            default: return this.pattern && typeof this.pattern.source !== 'undefined' ? this.pattern.source : this.pattern
            }
        }
    }
}
</script>
