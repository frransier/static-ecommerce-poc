<template>
    <dl v-if="items.length" class="desc-list">
        <template v-for="(item, index) in items">
            <dt :key="`dt-${index}`" :class="item.customClasses" class="desc-list__dt">{{ item.term }}</dt>
            <dd
                :key="`dd-${index}`"
                :class="item.customClasses"
                class="desc-list__dd"
                v-html="item.value"></dd>
        </template>
    </dl>
</template>

<script>
export default {
    name: 'DescList',
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>
