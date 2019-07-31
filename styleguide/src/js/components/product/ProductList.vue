<template>
    <div class="grid grid--no-gutter-xs grid--col-xs-2 grid--col-sm-3 grid--col-md-4 grid--col-lg-4 grid--col-xl-4">
        <div v-for="product in products" :key="product.articleNumber" class="grid__item">
            <ProductCard :product="product"/>
        </div>
    </div>
</template>

<script>
import ProductCard from './ProductCard'

export default {
    name: 'ProductList',
    components: {
        ProductCard
    },
    props: {
        products: {
            type: Array,
            required: false,
            default () { return [] }
        }
    }
}
</script>
