export default {
    config: {
        bodyElement: document.body,
        cartStickyElement: document.querySelector('.master__cart-wrapper > .master__aside-sticky'),
        changeElements: document.querySelectorAll('[data-js="trigger-submit"]'),
        key: 'rememberPostScroll'
    },
    init () {
        var key = this.config.key
        document.addEventListener('DOMContentLoaded', function () {
            let scrollPos = localStorage.getItem(key)
            if (scrollPos != null) {
                document.body.scrollTop = scrollPos
                localStorage.removeItem(key)
            }
        })
        if (this.config.changeElements) {
            // Add event listner to elements
            Array.prototype.forEach.call(this.config.changeElements, element => {
                element.addEventListener('change', () => {
                    const bodyElement = this.config.bodyElement
                    const cartStickyElementOffset = this.config.cartStickyElement ? this.config.cartStickyElement.offsetTop : 0 // Some retarded browsers (Edge) always return 0 on body scrollTop, therefore this is needed as a fallback.
                    const scrollPosition = bodyElement.scrollTop >= cartStickyElementOffset ? bodyElement.scrollTop : cartStickyElementOffset
                    localStorage.setItem(this.config.key, scrollPosition)
                    element.form.submit()
                })
            })
        }
    }
}
