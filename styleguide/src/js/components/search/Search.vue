<template>
    <div class="search__inner">
        <div class="search__field-container">
            <InputText
                ref="searchInput"
                v-model.trim="query"
                :placeholderText="$getDictionaryValue('Search.Quick.InputPlaceholder', 'Sökord')"
                type="search"
                class="search__field-input"
                tabindex="-1"
                @input="doApiSearch"
                @keyup.native.enter="doFullSearch"
            />
            <Btn
                :isRed="true"
                :text="$getDictionaryValue('Search.Quick.Submit', 'Sök')"
                tabindex="-1"
                @click.native="doFullSearch"
            />
        </div>
        <div :class="showResultContainer" class="search__result-container">
            <div class="search__result-scroll">
                <SearchResult
                    :items="results.products"
                    :totalHits="totalHits.products"
                    :isLoading="isSearching.products"
                />
                <SearchResult
                    :isProducts="false"
                    :items="results.content"
                    :totalHits="totalHits.content"
                    :isLoading="isSearching.content"
                />
            </div>
            <Btn
                v-if="fullSearchUrl"
                :isLink="true"
                :url="fullSearchUrl"
                :isRed="true"
                :isTextCenter="true"
                :icon="{
                    icon: 'double-chevron',
                    size: 'xs'
                }"
                :text="$getDictionaryValue('Search.Quick.GoToResultPage', 'Visa sökresultat')"
                tabindex="-1"
            />
        </div>
    </div>
</template>

<script>
import searchApi from '@/api/search-api'
import { debounceHelper } from '@/helpers/helpers'

import Button from '@/components/Button'
import InputText from '@/components/form-elements/InputText'
import SearchResult from './SearchResult'

const searchConfig = {
    minQueryLetters: 3,
    debounceTime: 500 // milliseconds
}

export default {
    name: 'Search',
    components: {
        Btn: Button,
        InputText,
        SearchResult
    },
    data () {
        return {
            pageId: 0,
            isSearching: {
                products: false,
                content: false
            },
            query: '',
            totalHits: {
                products: 0,
                content: 0
            },
            results: {
                products: [],
                content: []
            }
        }
    },
    computed: {
        showResultContainer () {
            return this.query.length >= searchConfig.minQueryLetters ? 'search__result-container--is-expanded' : null
        },
        fullSearchUrl () {
            const searchResultPageUrl = this.$getPageUrl('searchResultPage')
            return searchResultPageUrl ? `${searchResultPageUrl}?query=${this.query.trim()}${this.totalHits.products === 0 && this.totalHits.content > 0 ? '&type=content' : ''}` : null
        }
    },
    created () {
        const pageId = window.site.pageId
        if (typeof pageId !== 'undefined' && pageId > 0) {
            this.pageId = pageId
        }
    },
    mounted () {
        // Use MutationObserver to check if the search container/parent element is opened, if so - focus the input field
        const parentElement = document.querySelector('.search.search--site-header')

        if (parentElement) {
            const observer = new MutationObserver(observation => {
                if (observation[0].target.classList.contains('search--is-open')) {
                    this.$refs.searchInput.$el.focus()
                }
            })
            observer.observe(parentElement, { attributes: true })
        }
    },
    methods: {
        doApiSearch: debounceHelper(function () {
            if (this.query.length >= searchConfig.minQueryLetters && this.pageId > 0) {
                this.isSearching.products = true
                this.isSearching.content = true

                searchApi.doQuickSearch(this.query, this.pageId).then(response => {
                    this.results.products = response.data.hits
                    this.totalHits.products = response.data.totalHits
                }).catch(error => {
                    console.log('Error when trying to search for products:', error)
                }).finally(() => {
                    this.isSearching.products = false
                })

                searchApi.doQuickSearch(this.query, this.pageId, false).then(response => {
                    this.results.content = response.data.hits
                    this.totalHits.content = response.data.totalHits
                }).catch(error => {
                    console.log('Error when trying to search for content:', error)
                }).finally(() => {
                    this.isSearching.content = false
                })
            }
        }, searchConfig.debounceTime),
        doFullSearch () {
            if (this.fullSearchUrl !== null) {
                window.location.href = this.fullSearchUrl
            }
        }
    }
}
</script>
