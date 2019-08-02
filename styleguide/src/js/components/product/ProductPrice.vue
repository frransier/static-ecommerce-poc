<template>
    <div :class="modifierClasses" class="product-price">
        <!-- <span class="product-price__prefix">Från:</span> -->
        <template v-if="discountedPrice || clubPrice">
            <strong :class="{ 'product-price__discounted--club': clubPrice }" class="product-price__discounted">
                {{ clubPrice ? clubPrice : discountedPrice }}
            </strong>
            <span v-if="regularPrice" class="product-price__regular product-price__regular--is-not-current">
                {{ $getDictionaryValue('Product.Price.RegularPricePrefix', 'Ord.') }} {{ regularPrice }}
            </span>
        </template>
        <span v-else class="product-price__regular">{{ regularPrice }}</span>
    </div>
</template>

<script>
export default {
    name: 'ProductPrice',
    props: {
        regularPrice: {
            type: String,
            required: false,
            default: null
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
        },
        isBig: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        modifierClasses () {
            return {
                'product-price--big': this.isBig || this.discountedPriceIsHighlighted
            }
        }
    }
}
</script>
