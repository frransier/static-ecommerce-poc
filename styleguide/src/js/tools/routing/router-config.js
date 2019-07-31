export default {
    mode: 'history',
    linkActiveClass: '',
    linkExactActiveClass: '',
    scrollBehavior (to, from, savedPosition) {
        // Note: Due to Jaktias design, the scroll is in the body element and not on window which in general is standard
        // First, check if the browser supports the use of scrollTo on the body element
        try {
            document.body.scrollTo()
        } catch (error) {
            return
        }

        // It seems like the user has a modern browser, hooray! Go ahead and calculate the scroll position.
        let scrollToPosition = null

        if (to.name === 'productListingPage' || to.name === 'searchResultPage') {
            // Only apply scroll behaviour when using the pagination
            if (typeof to.query.page !== 'undefined' && to.query.page !== from.query.page) {
                const targetElement = document.querySelector('.master__content')
                scrollToPosition = targetElement !== null ? targetElement.offsetTop : null
            }
        } else if (to.name === 'productDetailPage') {
            // Only apply scroll behaviour if the user navigates to a new product
            if (to.params.productId !== from.params.productId) {
                scrollToPosition = 0
            }
        }

        if (scrollToPosition !== null) {
            return document.body.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            })
        }

        // Needs to be placed after other if's, because saved pos might exist on product detail route.
        if (savedPosition) {
            return savedPosition // Navigating back/forward, use the saved position
        }
    }
}
