<template>
    <div :class="{ 'search-result--content': !isProducts }" class="search-result">
        <h4 class="search-result__heading">{{ heading }}</h4>
        <ul :class="{ 'spinner--is-visible': isLoading }" class="search-result__list spinner">
            <li
                v-for="(item, index) in items"
                :key="index"
                class="search-result__item"
            >
                <a v-if="isProducts" :href="item.url" class="search-article">
                    <div class="search-article__image-container">
                        <img :src="item.imageUrl" class="search-article__image">
                    </div>
                    <div class="search-article__name-container">
                        <ProductName
                            :headingLevel="2"
                            :isHeadingInheritSize="true"
                            :name="item.name"
                            :brand="item.brand !== null ? item.brand.name : ''"
                        />
                    </div>
                    <div class="search-article__details-container">
                        <div class="search-article__details-placement">
                            <ProductPrice
                                :regularPrice="item.prices.regularPrice"
                                :discountedPrice="item.prices.discountedPrice"
                                :clubPrice="item.prices.clubPrice"
                                :class="['h-flex-align-end']"
                            />
                        </div>
                    </div>
                </a>

                <SearchContent
                    v-else
                    :url="item.url"
                    :heading="item.heading"
                    :breadcrumbs="item.breadcrumbs"
                    :excerpt="item.excerpt"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import ProductName from '@/components/product/ProductName'
import ProductPrice from '@/components/product/ProductPrice'
import SearchContent from './SearchContent'

export default {
    name: 'SearchResult',
    components: {
        ProductName,
        ProductPrice,
        SearchContent
    },
    props: {
        isProducts: {
            type: Boolean,
            required: false,
            default: true
        },
        items: {
            type: Array,
            required: false,
            default () { return [] }
        },
        totalHits: {
            type: Number,
            required: false,
            default: 0
        },
        isLoading: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        heading () {
            return this.isProducts ? `${this.$getDictionaryValue('Search.Quick.ResultHeading.Products', 'Sortiment')} (${this.totalHits})` : `${this.$getDictionaryValue('Search.Quick.ResultHeading.Content', 'Övrigt')} (${this.totalHits})`
        }
    }
}
</script>
