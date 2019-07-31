<template>
    <div v-if="brand.description || brand.image">
        <h2 class="product-detail__heading">{{ $getDictionaryValue('Page.ProductDetail.Headings.AboutBrand', 'Om varumärket') }}</h2>
        <div v-if="brand.description" class="wysiwyg-content" v-html="brand.description"></div>
        <a
            v-if="brand.url && brand.image"
            :href="brand.url"
            class="brand-item brand-item--background-white brand-item--inline"
        >
            <img :src="brand.image" :alt="brand.name" class="brand-item__image">
        </a>
        <img
            v-if="!brand.url && brand.image"
            :src="brand.image"
            :alt="brand.name"
            class="brand-item__image"
        >
    </div>
</template>

<script>
export default {
    name: 'ProductBrand',
    props: {
        brand: {
            type: Object,
            required: true
        }
    }
}
</script>
