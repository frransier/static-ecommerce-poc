<template>
    <input
        :id="id"
        :name="name"
        :required="isRequired"
        :value="value"
        v-model="localValue"
        type="radio"
        class="input input--radio"
    >
</template>

<script>
import formElementsMixin from '@/mixins/form-elements-mixin'

export default {
    name: 'InputRadio',
    mixins: [formElementsMixin],
    model: {
        prop: 'selectedButtonValue',
        event: 'change'
    },
    props: {
        // Note: value and selectedButtonValue are used by v-model to calculate if this radio button is active (checked) or not. selectedButtonValue is the value of the selected radio button in the group of radio buttons.
        selectedButtonValue: {
            type: [String, Number, Boolean],
            required: true
        }
    }
}
</script>
