<template>
    <div class="section section--full section--no-padding">
        <section class="section">
            <div class="search search--is-open">
                <div class="search__inner">
                    <div class="search__field-container">
                        <InputText
                            v-model.trim="newSearchQuery"
                            type="search"
                            class="search__field-input"
                            tabindex="-1"
                            @keyup.native.enter="doNewSearch"
                        />
                        <Btn
                            :isRed="true"
                            :text="$getDictionaryValue('Search.Quick.Submit', 'Sök')"
                            tabindex="-1"
                            @click.native="doNewSearch"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section v-if="searchQuery" class="section section--no-bottom-padding">
            <h1 class="search-result-heading">
                <div class="search-result-heading__meta">{{ $getDictionaryValue('Search.ResultPage.PreHeading', 'Sökresultat för:') }}</div>
                <div class="search-result-heading__search-term">{{ searchQuery }}</div>
            </h1>
        </section>

        <section :class="{ 'section--padding-bottom-xs': !isProductSearch }" class="section section--no-top-padding">
            <div class="scrollable-row scrollable-row--with-gutter">
                <Btn
                    :isOrange="isProductSearch"
                    :isDisabled="!isProductSearch && totalHits.products === 0"
                    :isSpinner="true"
                    :isSpinnerVisible="isSearching.products"
                    @click.native="switchListingType('products')"
                >
                    {{ $getDictionaryValue('Search.ResultPage.SearchTypeButtons.Products', 'Produkter') }} ({{ totalHits.products }})
                </Btn>
                <Btn
                    :isOrange="!isProductSearch"
                    :isDisabled="isProductSearch && totalHits.content === 0"
                    :isSpinner="true"
                    :isSpinnerVisible="isSearching.content"
                    @click.native="switchListingType('content')"
                >
                    {{ $getDictionaryValue('Search.ResultPage.SearchTypeButtons.Content', 'Övrigt') }} ({{ totalHits.content }})
                </Btn>
            </div>
        </section>

        <section v-if="isProductSearch && currentTotalHits > 0" class="section section--no-bottom-padding">
            <ProductFilter
                :filters="filters"
                :sortOptions="sortOptions"
                :totalHits="currentTotalHits"
            />
        </section>

        <section
            :class="{
                'spinner--is-visible': isLoading,
                'section--no-padding-xs': isProductSearch
            }"
            class="section spinner"
        >
            <ProductList
                v-if="isProductSearch"
                :products="hits.products"
            />

            <div v-else class="search-result search-result--content">
                <ul class="search-result__list">
                    <li
                        v-for="(item, index) in hits.content"
                        :key="index"
                        class="search-result__item"
                    >
                        <SearchContent
                            :url="item.url"
                            :heading="item.heading"
                            :breadcrumbs="item.breadcrumbs"
                            :excerpt="item.excerpt"
                        />
                    </li>
                </ul>
            </div>

        </section>

        <section class="section section--padding-bottom-lg">
            <Pagination v-if="currentTotalPages > 1" :currentPage="currentPageNumber" :totalPages="currentTotalPages" />
        </section>
    </div>
</template>

<script>
import searchApi from '@/api/search-api.js'

import ProductList from '@/components/product/ProductList'
import SearchContent from './SearchContent'
import ProductFilter from '@/components/product/product-filter/ProductFilter'
import Pagination from '@/components/Pagination'
import Button from '@/components/Button'
import InputText from '@/components/form-elements/InputText'

export default {
    name: 'SearchResultPage',
    components: {
        ProductList,
        SearchContent,
        ProductFilter,
        Pagination,
        Btn: Button,
        InputText
    },
    props: {
        queryStrings: {
            type: Object,
            required: false,
            default () { return {} }
        }
    },
    data () {
        return {
            newSearchQuery: '',
            doingNewSearch: false,
            isSearching: {
                products: true,
                content: true
            },
            pageId: 0,
            isProductSearch: true,
            filters: [],
            sortOptions: [],
            hits: {
                products: [],
                content: []
            },
            totalHits: {
                products: 0,
                content: 0
            },
            totalPages: {
                products: 0,
                content: 0
            }
        }
    },
    computed: {
        isLoading () {
            return this.isProductSearch ? this.isSearching.products : this.isSearching.content
        },
        searchQuery () {
            return typeof this.queryStrings.query !== 'undefined' ? this.queryStrings.query : null
        },
        currentPageNumber () {
            return typeof this.queryStrings.page !== 'undefined' ? Number(this.queryStrings.page) : 1
        },
        currentTotalPages () {
            return this.isProductSearch ? this.totalPages.products : this.totalPages.content
        },
        currentTotalHits () {
            return this.isProductSearch ? this.totalHits.products : this.totalHits.content
        }
    },
    beforeRouteUpdate (to, from, next) {
        // This function/hook is triggered when going to a new route. The actual navigation is done when calling next().

        // Sort out the querystrings
        const pageNumber = this.getQueryParameterValue('page', to.query)
        const filterQueries = this.getFilterQueries(to.query)
        const sortKey = this.getQueryParameterValue('sortkey', to.query)
        const isAsc = this.getQueryParameterValue('isasc', to.query) !== 'false' // Convert string to bool, check if false to get true as default

        // If a new search is done, search both types and navigate when the current search type is done
        if (this.doingNewSearch) {
            this.searchProducts(this.newSearchQuery, pageNumber, filterQueries, sortKey, isAsc).finally(() => {
                if (this.isProductSearch) {
                    this.doingNewSearch = false
                    next()
                }
            })
            this.searchContent(this.newSearchQuery, pageNumber).finally(() => {
                if (!this.isProductSearch) {
                    this.doingNewSearch = false
                    next()
                }
            })
        } else {
            // Only get a new result of the correct type.
            if (this.isProductSearch) {
                this.searchProducts(this.searchQuery, pageNumber, filterQueries, sortKey, isAsc).finally(() => {
                    next()
                })
            } else {
                this.searchContent(this.searchQuery, pageNumber).finally(() => {
                    next()
                })
            }
        }
    },
    created () {
        const pageId = window.site.pageId
        if (typeof pageId !== 'undefined' && pageId > 0) {
            this.pageId = pageId
        }

        if (this.searchQuery !== null && this.searchQuery.length > 0 && this.pageId > 0) {
            this.newSearchQuery = this.searchQuery

            // Check what search type it is and update the data property
            this.isProductSearch = typeof this.queryStrings.type === 'undefined' || this.queryStrings.type === 'products'

            // Sort out the querystrings
            const pageNumber = this.currentPageNumber
            const filterQueries = this.getFilterQueries(this.queryStrings)
            const sortKey = this.getQueryParameterValue('sortkey', this.queryStrings)
            const isAsc = this.getQueryParameterValue('isasc', this.queryStrings) !== 'false' // Convert string to bool, check if false to get true as default

            this.searchProducts(this.searchQuery, pageNumber, filterQueries, sortKey, isAsc)
            this.searchContent(this.searchQuery, pageNumber)
        } else {
            this.isSearching.products = false
            this.isSearching.content = false
        }
    },
    methods: {
        searchProducts (searchQuery, pageNumber, filterQueries, sortKey, isAsc) {
            this.isSearching.products = true

            return new Promise((resolve, reject) => {
                searchApi.doFullProductSearch(
                    this.pageId,
                    searchQuery,
                    pageNumber,
                    filterQueries,
                    sortKey,
                    isAsc
                ).then(response => {
                    const data = response.data

                    this.filters = data.filters
                    this.sortOptions = data.sortOptions
                    this.hits.products = data.hits
                    this.totalHits.products = data.totalHits
                    this.totalPages.products = data.totalPages

                    resolve()
                }).catch(error => {
                    console.log('Error when searching for products:', error)
                    reject(error)
                }).finally(() => {
                    this.isSearching.products = false
                })
            })
        },
        searchContent (searchQuery, pageNumber) {
            this.isSearching.content = true

            return new Promise((resolve, reject) => {
                searchApi.doFullContentSearch(
                    this.pageId,
                    searchQuery,
                    pageNumber
                ).then(response => {
                    const data = response.data

                    this.hits.content = data.hits
                    this.totalHits.content = data.totalHits
                    this.totalPages.content = data.totalPages

                    resolve()
                }).catch(error => {
                    console.log('Error when searching for content:', error)
                    reject(error)
                }).finally(() => {
                    this.isSearching.content = false
                })
            })
        },
        getFilterQueries (query) {
            // Asume that all querystring parameters except for a few specific ones are filter parameters
            const queriesToIgnore = ['query', 'sortkey', 'isasc', 'page', 'type']

            return Object.keys(query)
                .filter(key => !queriesToIgnore.includes(key.toLowerCase()))
                .map(key => (
                    {
                        name: key,
                        key: key,
                        options: decodeURI(query[key]).toLowerCase().split('|').map(option => ({
                            name: option,
                            key: option,
                            isActive: true
                        }))
                    }
                ))
        },
        getQueryParameterValue (parameter, query) {
            // Find a specific parameter in a querystring (object)
            const parameterInQuery = Object.keys(query).find(key => key.toLowerCase() === parameter.toLowerCase())
            return typeof parameterInQuery !== 'undefined' ? decodeURI(query[parameterInQuery]).toLowerCase() : null
        },
        switchListingType (newListing) {
            const switchToProducts = newListing === 'products'

            // Do nothing if the user presses the button for the current listing type
            if ((switchToProducts && this.isProductSearch) || (!switchToProducts && !this.isProductSearch)) return

            this.isProductSearch = switchToProducts

            this.$router.push({
                to: this.$route.name,
                params: this.$route.params,
                query: {
                    query: this.searchQuery,
                    type: switchToProducts ? 'products' : 'content'
                }
            })
        },
        doNewSearch () {
            if (this.newSearchQuery.length > 0 && this.newSearchQuery !== this.searchQuery) {
                this.doingNewSearch = true

                this.$router.push({
                    to: this.$route.name,
                    params: this.$route.params,
                    query: {
                        query: this.newSearchQuery,
                        type: this.isProductSearch ? 'products' : 'content'
                    }
                })
            }
        }
    }
}
</script>
