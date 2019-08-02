const pages = typeof window.site !== 'undefined' ? window.site.pages : window.site

export default {
    install (Vue, options) {
        Vue.mixin({
            methods: {
                $getPageUrl (pageKey = null) {
                    if (pageKey !== null && typeof pages !== 'undefined') {
                        const pageItem = pages.find(page => page.key.toLowerCase() === pageKey.toLowerCase() && page.url.length > 0)
                        return typeof pageItem !== 'undefined' ? pageItem.url : null
                    } else {
                        return null
                    }
                }
            }
        })
    }
}
