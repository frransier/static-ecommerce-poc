<template>
    <ul class="pagination">
        <li v-if="showPrevLink" class="pagination__item">
            <router-link
                :to="{
                    name: $route.name,
                    params: {
                        ...$route.params
                    },
                    query: {
                        ...$route.query,
                        page: prevPageNumber
                    }
                }"
                class="pagination__item-link pagination__item-link--navigation"
            >
                {{ $getDictionaryValue('Site.Pagination.Last', 'Föregående') }}
            </router-link>
        </li>
        <li class="pagination__item">
            <router-link
                :to="{
                    name: $route.name,
                    params: {
                        ...$route.params
                    },
                    query: {
                        ...$route.query,
                        page: 1
                    }
                }"
                :class="{ 'pagination__item-link--active': currentPage === 1 }"
                class="pagination__item-link"
            >
                1
            </router-link>
        </li>
        <li v-if="currentPage > 4" class="pagination__item pagination__item--indicator">
            ...
        </li>
        <li v-for="pageNumber in visibleNumbers" :key="pageNumber">
            <router-link
                :to="{
                    name: $route.name,
                    params: {
                        ...$route.params
                    },
                    query: {
                        ...$route.query,
                        page: pageNumber
                    }
                }"
                :class="{ 'pagination__item-link--active': pageNumber === currentPage }"
                class="pagination__item-link"
            >
                {{ pageNumber }}
            </router-link>
        </li>
        <li v-if="currentPage < totalPages && totalPages > 4" class="pagination__item pagination__item--indicator">
            ...
        </li>
        <li v-if="totalPages > 4" class="pagination__item pagination__item--spacer"></li>
        <li class="pagination__item">
            <router-link
                :to="{
                    name: $route.name,
                    params: {
                        ...$route.params
                    },
                    query: {
                        ...$route.query,
                        page: totalPages
                    }
                }"
                :class="{ 'pagination__item-link--active': currentPage === totalPages }"
                class="pagination__item-link"
            >
                {{ totalPages }}
            </router-link>
        </li>
        <li v-if="showNextLink" class="pagination__item">
            <router-link
                :to="{
                    name: $route.name,
                    params: {
                        ...$route.params
                    },
                    query: {
                        ...$route.query,
                        page: nextPageNumber
                    }
                }"
                class="pagination__item-link pagination__item-link--navigation"
            >
                {{ $getDictionaryValue('Site.Pagination.Next', 'Nästa') }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: {
            type: Number,
            required: false,
            default: 1
        },
        totalPages: {
            type: Number,
            required: false,
            default: 1
        }
    },
    computed: {
        visibleNumbers () {
            if (this.totalPages < 6 || this.currentPage < 4) {
                const pages = [ ...Array(this.totalPages > 5 ? 4 : this.totalPages - 2).keys() ].map((_, i) => i + 2)
                return pages
            }

            if (this.currentPage > 3) {
                const firstPage = this.currentPage - 2
                const difference = this.totalPages - this.currentPage
                const pages = [ ...Array(difference > 2 ? 5 : difference + 2) ].map((_, i) => i + firstPage)

                return pages
            }
        },
        showPrevLink () {
            return this.totalPages > 1 && this.currentPage > 1
        },
        showNextLink () {
            return this.totalPages > 1 && this.currentPage < this.totalPages
        },
        prevPageNumber () {
            return this.currentPage - 1
        },
        nextPageNumber () {
            return this.currentPage + 1
        }
    }
}
</script>
