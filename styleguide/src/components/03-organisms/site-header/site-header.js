export default {
    config: {
        bodyElement: document.body,
        siteHeaderElement: document.querySelector('.site-header'),
        masterHeaderElement: document.querySelector('.master__header'),
        masterInner: {
            element: document.querySelector('.master__inner'),
            classToToggle: 'master__inner--search-is-open'
        },
        stickyClass: 'master__header--sticky',
        slideInClass: 'site-header--slide-in',
        transparentClass: 'site-header--transparent',
        isTransparent: false,
        search: {
            element: document.querySelector('.search'),
            toggleElement: document.querySelector('[data-js="master-search-toggle"]'),
            openClass: 'search--is-open'
        },
        cartStickyElement: document.querySelector('.master__cart-wrapper > .master__aside-sticky')
    },
    init () {
        if (!this.config.siteHeaderElement) return

        this.config.isTransparent = this.config.siteHeaderElement.classList.contains(this.config.transparentClass)
        this.config.bodyElement.addEventListener('scroll', () => { this.handleScroll() })

        if (this.config.masterInner.element) {
            this.config.masterInner.element.addEventListener('click', () => { this.closeMasterInnerOverlay(event) })
        }

        this.config.search.toggleElement.addEventListener('click', () => {
            if (this.config.search.element) {
                this.config.search.element.classList.toggle(this.config.search.openClass)

                if (this.config.masterInner.element) {
                    this.config.masterInner.element.classList.toggle(this.config.masterInner.classToToggle)
                }
            }

            if (this.searchIsOpen()) {
                this.config.siteHeaderElement.classList.remove(this.config.transparentClass)
            } else if (this.config.bodyElement.scrollTop < 100 && this.config.isTransparent) {
                this.config.siteHeaderElement.classList.add(this.config.transparentClass)
            }
        })
    },
    handleScroll () {
        const bodyElement = this.config.bodyElement
        const cartStickyElementOffset = this.config.cartStickyElement ? this.config.cartStickyElement.offsetTop : 0 // Some retarded browsers (Edge) always return 0 on body scrollTop, therefore this is needed as a fallback.
        const scrollPosition = bodyElement.scrollTop >= cartStickyElementOffset ? bodyElement.scrollTop : cartStickyElementOffset
        const siteHeaderElement = this.config.siteHeaderElement
        const masterHeaderElement = this.config.masterHeaderElement
        const slideInClass = this.config.slideInClass
        const stickyClass = this.config.stickyClass
        const transparentClass = this.config.transparentClass
        const isTransparent = this.config.isTransparent

        if (scrollPosition > 100 && scrollPosition < 250) {
            siteHeaderElement.classList.add(slideInClass)

            if (isTransparent) {
                siteHeaderElement.classList.remove(transparentClass)
            }
        } else if (scrollPosition >= 250) {
            masterHeaderElement.classList.add(stickyClass)
            siteHeaderElement.classList.remove(slideInClass)
        } else {
            masterHeaderElement.classList.remove(stickyClass)
            siteHeaderElement.classList.remove(slideInClass)

            if (isTransparent && !this.searchIsOpen()) {
                siteHeaderElement.classList.add(transparentClass)
            }
        }
    },
    searchIsOpen () {
        return this.config.search.element.classList.contains(this.config.search.openClass)
    },
    closeMasterInnerOverlay (event) {
        if (event.target.classList.contains(this.config.masterInner.classToToggle)) {
            if (this.config.search.element) {
                event.target.classList.remove(this.config.masterInner.classToToggle)
                this.config.search.element.classList.remove(this.config.search.openClass)
            }
        }
    }
}
