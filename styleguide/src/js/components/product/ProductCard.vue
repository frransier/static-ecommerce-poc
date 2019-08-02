<template>
    <article class="product-card">
        <a :href="product.url" class="product-card__link" @click.prevent="navigateToProduct">
            <div class="product-card__image-container">
                <img
                    v-lozad="productImage"
                    :alt="product.name"
                    class="product-card__image"
                >
            </div>
            <div class="product-card__name">
                <ProductName
                    :headingLevel="3"
                    :isBreak="true"
                    :name="product.name"
                />
            </div>
        </a>
        <div class="product-card__footer">
            <ProductPrice
                :regularPrice="product.prices.regular"
                :discountedPrice="product.prices.discounted"
                :clubPrice="product.prices.club"
            />
        </div>
        <div v-if="hasDiscountedPrice || hasClubPrice" class="product-card__tags product-card__tags--top-left">
            <Tag
                v-if="hasClubPrice"
                :hasNoPadding="true"
                :hoverText="$getDictionaryValue('Site.Tags.Club', 'Club Jaktia')"
            >
                <img src="/assets/icons/club-jaktia-small.svg">
            </Tag>
            <Tag
                v-if="hasDiscountedPrice && !hasClubPrice"
                :hasNoPadding="true"
                :hoverText="$getDictionaryValue('Site.Tags.Sale', 'Rea')"
            >
                <img src="/assets/icons/sale.svg">
            </Tag>
        </div>
        <div v-if="product.hasMultipleArticles || product.isPackage" class="product-card__tags product-card__tags--top-right">
            <Tag
                v-if="product.hasMultipleArticles"
                :hasNoPadding="true"
                :hoverText="$getDictionaryValue('Site.Tags.Variants', 'Finns i flera varianter')"
            >
                <img src="/assets/icons/variants.svg">
            </Tag>
            <Tag
                v-if="product.isPackage && !product.hasMultipleArticles"
                :hasNoPadding="true"
                :hoverText="$getDictionaryValue('Site.Tags.Package', 'Paketprodukt')"
            >
                <span class="h-color-grey">{{ $getDictionaryValue('Site.Tags.Package', 'Paketprodukt') }}</span>
            </Tag>
        </div>
    </article>
</template>

<script>
import ProductName from './ProductName'
import ProductPrice from './ProductPrice'
import Tag from '@/components/Tag'

export default {
    name: 'ProductCard',
    components: {
        ProductName,
        ProductPrice,
        Tag
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        hasDiscountedPrice () {
            return this.product.prices.discounted && this.product.prices.discounted.length > 0
        },
        hasClubPrice () {
            return this.product.prices.club && this.product.prices.club.length > 0
        },
        productImage () {
            const noImageUrl = '/Media/Resources/no-image.svg'
            // Note: The data structure differs between the product listing and the detail page (related products), hence the need of some extra logic..
            if (typeof this.product.imageUrl !== 'undefined') {
                // Listing
                return this.product.imageUrl !== null ? `${this.product.imageUrl}?preset=product-card` : noImageUrl
            } else if (typeof this.product.media !== 'undefined') {
                // Find the first available image
                const image = this.product.media.find(media => !media.isVideo)
                return typeof image !== 'undefined' ? `${image.url}?preset=product-card` : noImageUrl
            }
            return noImageUrl
        }
    },
    methods: {
        navigateToProduct () {
            // If we are on the product detail page it's not disered to have a full page reload, therefore use router navigation
            if (typeof this.$router !== 'undefined' && this.$route.name === 'productDetailPage') {
                this.$router.push({ path: this.product.url })
            } else {
                window.location.href = this.product.url
            }
        }
    }
}
</script>
