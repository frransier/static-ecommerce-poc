<template>
    <select
        :id="id"
        :name="name"
        :required="isRequired"
        :readonly="isReadOnly"
        :autocomplete="autoComplete"
        :class="modifierClasses"
        v-model="localValue"
        class="input input--select"
    >
        <option
            v-if="placeholderText"
            value=""
            class="input__option"
            disabled
        >
            {{ placeholderText }}
        </option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            class="input__option"
        >
            {{ option.text }}
        </option>
    </select>
</template>

<script>
import formElementsMixin from '@/mixins/form-elements-mixin'

export default {
    name: 'Select',
    mixins: [formElementsMixin],
    props: {
        // Note: Return an array of objects containing value and text as properties.
        options: {
            type: Array,
            required: false,
            default () { return [] }
        }
    }
}
</script>
