<template>
    <div class="product-detail__price">
        <div class="product-detail__price-left">
            <ProductPrice
                :isBig="true"
                :discountedPrice="discountedPrice"
                :regularPrice="regularPrice"
            />
        </div>
        <div v-if="clubPrice" class="product-detail__price-right">
            <ProductPrice
                :isBig="true"
                :clubPrice="clubPrice"
            />
            <a v-if="clubJaktiaUrl" :href="clubJaktiaUrl" class="h-text-underline h-color-grey-dark">
                {{ $getDictionaryValue('Page.ProductDetail.ClubJaktiaLink', 'Club Jaktia-pris') }}
            </a>
        </div>
    </div>
</template>

<script>
import ProductPrice from './ProductPrice'

export default {
    name: 'ProductDetailPrices',
    components: {
        ProductPrice
    },
    props: {
        regularPrice: {
            type: String,
            required: true
        },
        discountedPrice: {
            type: String,
            required: false,
            default: null
        },
        clubPrice: {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        clubJaktiaUrl () {
            return this.$getPageUrl('ClubJaktia')
        }
    }
}
</script>
