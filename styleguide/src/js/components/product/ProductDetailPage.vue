<template>
    <div>
        <section v-if="displayFullpageSpinner" style="height: 100vh;" class="section spinner spinner--is-visible">
        </section>
        <template v-else>
            <component
                :is="currentProductDetailComponent"
                :id="articleId"
                :name="name"
                :sku="currentArticle.sku"
                :ean="currentArticle.ean"
                :shortDescription="shortDescription"
                :longDescription="longDescription"
                :media="media"
                :brand="product.brand"
                :prices="currentArticle.prices"
                :tags="product.tags"
                :isNew="product.isNew"
                :categoryStructure="product.categoryStructure"
                :bundleProducts="bundleProducts"
                :allArticles="product.articles"
                :allAttributes="allAttributes"
                :articleAttributes="currentArticleAttributes"
                :partPaymentMarkup="partPaymentMarkup"
            />
            <template v-if="hasAccessories">
                <section class="section">
                    <header class="section__header">
                        <div class="section__header-block">
                            <h2 class="section__heading">
                                {{ $getDictionaryValue('Page.ProductDetail.Headings.Accessories', 'Tillbehör') }}
                            </h2>
                        </div>
                    </header>
                </section>
                <section class="section section--no-x-padding-xs">
                    <div class="grid grid--no-gutter-xs grid--col-xs-2 grid--col-sm-3 grid--col-md-4 grid--col-lg-4 grid--col-xl-4">
                        <div v-for="(accessory, index) in accessories" :key="index" class="grid__item">
                            <ProductCard :product="accessory" />
                        </div>
                    </div>
                </section>
            </template>

            <template v-if="hasRelatedProducts">
                <section class="section">
                    <header class="section__header">
                        <div class="section__header-block">
                            <h2 class="section__heading">
                                {{ $getDictionaryValue('Page.ProductDetail.Headings.RelatedProducts', 'Relaterade produkter') }}
                            </h2>
                        </div>
                    </header>
                </section>
                <section class="section section--no-x-padding-xs section--padding-bottom-xl">
                    <div class="grid grid--no-gutter-xs grid--col-xs-2 grid--col-sm-3 grid--col-md-4 grid--col-lg-4 grid--col-xl-4">
                        <div v-for="(relatedProduct, index) in relatedProducts" :key="index" class="grid__item">
                            <ProductCard :product="relatedProduct" />
                        </div>
                    </div>
                </section>
            </template>
        </template>
    </div>
</template>

<script>
import productApi from '@/api/product-api'

import ProductDetail from './ProductDetail'
import ProductDetailWide from './ProductDetailWide'
import ProductCard from './ProductCard'

export default {
    name: 'ProductDetailPage',
    components: {
        ProductDetail,
        ProductDetailWide,
        ProductCard
    },
    props: {
        articleName: {
            type: String,
            required: true
        },
        productId: {
            type: Number,
            required: true
        },
        articleId: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            isLoading: true,
            product: null,
            originalPartPaymentMarkup: null
        }
    },
    computed: {
        displayFullpageSpinner () {
            return this.isLoading || this.product === null || this.currentArticle === null || typeof this.currentArticle === 'undefined'
        },
        currentArticle () {
            return this.product !== null ? this.product.articles.find(article => article.id === this.articleId) : null
        },
        currentProductDetailComponent () {
            return this.product && this.product.useAlternativeLayout ? 'ProductDetailWide' : 'ProductDetail'
        },
        name () {
            return this.currentArticle.name ? this.currentArticle.name : this.product.name
        },
        shortDescription () {
            return this.currentArticle.shortDescription ? this.currentArticle.shortDescription : this.product.shortDescription
        },
        longDescription () {
            return this.currentArticle.longDescription ? this.currentArticle.longDescription : this.product.longDescription
        },
        media () {
            return this.currentArticle.media.length > 0 ? this.currentArticle.media : this.product.media
        },
        accessories () {
            return this.currentArticle.accessories.length > 0 ? this.currentArticle.accessories : this.product.accessories
        },
        relatedProducts () {
            return this.currentArticle.similar.length > 0 ? this.currentArticle.similar : this.product.similar
        },
        hasAccessories () {
            return this.accessories.length > 0
        },
        hasRelatedProducts () {
            return this.relatedProducts.length > 0
        },
        bundleProducts () {
            if (this.currentArticle.packageMembers.length === 0) return []

            // Note: The products will be presented by the DescList component hence the need to restructure the data
            return this.currentArticle.packageMembers.map(product => ({
                term: `${product.count}${this.$getDictionaryValue('Page.ProductDetail.BundleCountSuffix', 'st')} ${product.identifier}`,
                value: `<a href="${product.url}">${product.name}</a>` // We can't pass a router-link here sadly
            }))
        },
        allAttributes () {
            /*
                Return all distinct attributes with their distinct options if there are more then one option
                This is the structure of an object that is return (in an array):
                {
                    key: 'attributeKey',
                    name: 'Name to display',
                    options: [
                        {
                            value: 'optionValue',
                            text: 'optionValue'
                        }
                    ],
                    selectedOption: 'valueOfTheSelectedOption',
                    useAlternativeLayout: true/false
                }
            */

            // Because of the nesting, merge all attributes into a flat array
            let allAttributes = []
            this.product.articles.forEach(article => {
                allAttributes = [ ...allAttributes, ...article.attributes ]
            })

            // Use new Set() to create an array of distinct attributes (the key/identifier)
            const distinctAttributes =
            [ ...new Set(allAttributes.map(attribute => attribute.typeIdentifier)) ] // Map so that set() can sort out distinct values
                .map(attributeKey => {
                    const wholeAttributeObject = allAttributes.find(attribute => attribute.typeIdentifier === attributeKey)
                    return { // Create the desired object to return
                        key: attributeKey,
                        name: wholeAttributeObject.typeName,
                        options: [ ...new Set(allAttributes // Use new Set to find distinct options/attribute values and then use map to return the desired data structure
                            .filter(attribute => attribute.typeIdentifier === attributeKey)
                            .map(attribute => attribute.value)
                        ) ].map(attributeValue => ({ // The values will be used by the Select component later hence the need of this structure
                            value: attributeValue,
                            text: attributeValue
                        })),
                        selectedOption: this.currentArticleAttributes[attributeKey],
                        useAlternativeLayout: wholeAttributeObject.useAlternativeLayout
                    }
                }).filter(attribute => attribute.options.length > 1) // Only return the attributes with several options

            return distinctAttributes
        },
        currentArticleAttributes () {
            // To make it easier later (reduce the need of find(), findIndex() etc), return the filters in object form with the key as property name
            return Object.assign({}, ...this.currentArticle.attributes.map(attribute => {
                return {
                    [attribute.typeIdentifier]: attribute.value
                }
            }))
        },
        partPaymentMarkup () {
            const jaktiaCardPageUrl = this.$getPageUrl('jaktiaCard')
            return this.originalPartPaymentMarkup !== null ? `
                <h3 class="part-payment-info__heading">${this.$getDictionaryValue('Page.ProductDetail.Headings.PartPayment', 'Delbetalning')}</h3>
                ${this.originalPartPaymentMarkup}
                ${jaktiaCardPageUrl !== null ? `<a href="${jaktiaCardPageUrl}" class="button button--is-link button--responsive button--red button--text-center h-margin-y-sm">${this.$getDictionaryValue('Page.ProductDetail.JaktiaCardLink', 'Läs mer om Jaktia-kortet')}</a>` : ''}
            ` : null
        }
    },
    watch: {
        'productId' () {
            this.getProduct()
        },
        'articleId' () {
            this.setPageTitle()
        },
        'currentArticle' (newArticle, oldArticle) {
            // Get part payment data on page load or if changing to a variant with a different price
            // When changing product (navigate via related products for example), newArticle and/or oldArticle will be undefined for a short while since there is no currentArticle
            if (typeof newArticle !== 'undefined' && typeof oldArticle !== 'undefined') {
                if (oldArticle === null || newArticle.prices.lowestDecimalPrice !== oldArticle.prices.lowestDecimalPrice) {
                    this.getPartPaymentData()
                }
            }
        }
    },
    created () {
        this.getProduct()
    },
    methods: {
        getProduct () {
            const pageId = typeof window.site !== 'undefined' ? window.site.pageId : window.site

            if (!this.productId || typeof pageId === 'undefined') return

            this.isLoading = true
            productApi.getProduct(this.productId, pageId).then(response => {
                this.product = response.data
                this.getPartPaymentData()
            }).catch(error => {
                console.log('Could not fetch product data:', error)
            }).finally(() => {
                this.isLoading = false
                this.setPageTitle()
            })
        },
        getPartPaymentData () {
            const pageId = typeof window.site !== 'undefined' ? window.site.pageId : window.site

            productApi.getPartPaymentData(this.currentArticle.prices.lowestDecimalPrice, pageId).then(response => {
                this.originalPartPaymentMarkup = response.data // Note: null is returned if the price is too low
            }).catch(error => {
                console.log('Could not fetch part payment data:', error)
            })
        },
        setPageTitle () {
            // Note: At page load, currentArticle might not be populated yet and the title is already set anyway in the Razor view
            if (this.currentArticle) {
                const siteName = typeof window.site !== 'undefined' ? window.site.siteName : window.site
                if (typeof siteName !== 'undefined') {
                    const breadcrumb = typeof window.site.breadcrumbs !== 'undefined' && window.site.breadcrumbs.length ? `- ${window.site.breadcrumbs[window.site.breadcrumbs.length - 1].name}` : ''

                    document.title = `${this.currentArticle.name} ${breadcrumb} | ${siteName}`
                }
            }
        }
    }
}
</script>
