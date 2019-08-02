<template>
    <div>
        <section class="section section--no-bottom-padding">
            <ProductFilter
                :filters="filters"
                :sortOptions="sortOptions"
                :totalHits="totalHits"
            />
        </section>
        <section :class="{ 'spinner--is-visible': isLoading }" class="section section--no-padding-xs spinner">
            <ProductList :products="products" />
        </section>
        <section class="section section--padding-bottom-lg">
            <Pagination v-if="totalPages > 1" :currentPage="currentPageNumber" :totalPages="totalPages" />
        </section>
    </div>
</template>

<script>
import searchApi from '@/api/search-api'

import ProductFilter from './product-filter/ProductFilter'
import ProductList from './ProductList'
import Pagination from '@/components/Pagination'

export default {
    name: 'ProductListingPage',
    components: {
        ProductFilter,
        ProductList,
        Pagination
    },
    props: {
        urlStructure: {
            type: String,
            required: false,
            default: null
        },
        category: {
            type: String,
            required: true
        },
        queryStrings: {
            type: Object,
            required: false,
            default () { return {} }
        }
    },
    data () {
        return {
            isLoading: true,
            pageId: 0,
            filters: [],
            sortOptions: [],
            products: [],
            totalHits: 0,
            totalPages: 1
        }
    },
    computed: {
        currentPageNumber () {
            return typeof this.queryStrings.page !== 'undefined' ? Number(this.queryStrings.page) : 1
        }
    },
    beforeRouteUpdate (to, from, next) {
        // Note: This function/hook is triggered when going to a new route. The actual navigation is done when calling next().

        this.isLoading = true

        // Sort out the querystrings
        const filterQueries = this.getFilterQueries(to.query)
        const sortKey = this.getQueryParameterValue('sortkey', to.query)
        const isAsc = this.getQueryParameterValue('isasc', to.query) !== 'false' // Convert string to bool, check if false to get true as default

        this.getProductPageData(
            typeof to.query.page !== 'undefined' ? to.query.page : 1,
            filterQueries,
            sortKey,
            isAsc
        ).finally(() => {
            this.isLoading = false
            next()
        })

        next()
    },
    created () {
        const pageId = window.site.pageId
        if (typeof pageId !== 'undefined' && pageId > 0) {
            this.pageId = window.site.pageId
        } else {
            // Redirect to 404?
        }
    },
    mounted () {
        // Sort out the querystrings
        const filterQueries = this.getFilterQueries(this.queryStrings)
        const sortKey = this.getQueryParameterValue('sortkey', this.queryStrings)
        const isAsc = this.getQueryParameterValue('isasc', this.queryStrings) !== 'false' // Convert string to bool, check if false to get true as default

        this.getProductPageData(
            typeof this.queryStrings.page !== 'undefined' ? this.queryStrings.page : 1,
            filterQueries,
            sortKey,
            isAsc
        ).then(response => {
            // Check so that any requested page (pagination) actually exists and redirect the user to page one if not.
            if (typeof this.queryStrings.page !== 'undefined' && this.queryStrings.page > response.totalPages) {
                this.$router.push({
                    name: this.$route.name,
                    params: {
                        ...this.$route.params
                    },
                    query: { ...this.$route.query, page: 1 }
                })
            }
        }).finally(() => {
            this.isLoading = false
        })
    },
    methods: {
        getProductPageData (pageNumber, filterQueries, sortKey, isAsc) {
            return new Promise((resolve, reject) => {
                searchApi.getProductsInPage(
                    this.pageId,
                    this.$route.path,
                    pageNumber,
                    filterQueries,
                    sortKey,
                    isAsc
                ).then(response => {
                    const data = response.data

                    this.products = data.hits
                    this.filters = data.filters
                    this.sortOptions = data.sortOptions
                    this.totalHits = data.totalHits
                    this.totalPages = data.totalPages

                    resolve(data)
                }).catch(error => {
                    console.log('Could not load products.', error)
                    reject(error)
                })
            })
        },
        getFilterQueries (query) {
            // Asume that all querystring parameters except for a few specific ones are filter parameters
            const queriesToIgnore = ['sortkey', 'isasc', 'page']

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
        }
    }
}
</script>
