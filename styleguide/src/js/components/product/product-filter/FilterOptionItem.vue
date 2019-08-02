<template>
    <Btn :isUnstyled="true" :class="{ 'filter-option-item--is-active': isActive }" class="filter-option-item">
        <div class="filter-option-item__indicator"></div>
        <div class="filter-option-item__text">
            {{ optionName }}
        </div>
    </Btn>
</template>

<script>
import Button from '@/components/Button'

export default {
    name: 'FilterOptionItem',
    components: {
        Btn: Button
    },
    props: {
        optionName: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>
