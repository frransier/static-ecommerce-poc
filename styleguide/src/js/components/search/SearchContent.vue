<template>
    <a
        :href="url"
        :title="heading"
        class="search-content"
    >
        <h2 clas="search-content__heading">{{ heading }}</h2>
        <div
            v-if="breadcrumbs.length"
            class="search-content__breadcrumbs"
            v-html="breadcrumbString"
        >
        </div>
        <div v-if="excerpt" class="search-content__excerpt" v-html="excerpt"></div>
    </a>
</template>

<script>
export default {
    name: 'SearchContent',
    props: {
        url: {
            type: String,
            required: true
        },
        heading: {
            type: String,
            required: true
        },
        breadcrumbs: {
            type: Array,
            required: false,
            default () { return [] }
        },
        excerpt: {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        breadcrumbString () {
            return `${this.breadcrumbs.join(' &rsaquo; ')} &rsaquo; ${this.heading}`
        }
    }
}
</script>
