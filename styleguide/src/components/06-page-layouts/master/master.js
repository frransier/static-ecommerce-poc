export default {
    config: {
        header: {
            element: document.querySelector('.site-header')
        },
        aside: {
            stickyElements: [ ...document.querySelectorAll('.master__aside-sticky') ] // Convert Nodelist to Array for better IE support
        },
        menu: {
            toggleElements: [ ...document.querySelectorAll('[data-js="master-menu-toggle"]') ],
            classToToggle: 'master__inner--menu-is-open',
            targetElement: document.querySelector('.master__inner')
        },
        cart: {
            toggleElements: [ ...document.querySelectorAll('[data-js="master-cart-toggle"]') ],
            classToToggle: 'master__inner--cart-is-open',
            targetElement: document.querySelector('.master__inner')
        },
        overlay: {
            element: document.querySelector('.master__overlay'),
            classToToggle: 'overlay--is-visible'
        }
    },
    init () {
        if (this.config.targetElement !== null) {
            this.addClickEvents(this.config.menu.toggleElements, this.config.menu.classToToggle, this.config.menu.targetElement, true)
            this.addClickEvents(this.config.cart.toggleElements, this.config.cart.classToToggle, this.config.cart.targetElement, true)

            if (this.config.overlay.element) {
                this.config.overlay.element.addEventListener('click', () => {
                    this.config.menu.targetElement.classList.remove(this.config.menu.classToToggle)
                    this.config.cart.targetElement.classList.remove(this.config.cart.classToToggle)
                    this.config.overlay.element.classList.remove(this.config.overlay.classToToggle)
                })
            }

            window.addEventListener('keyup', (event) => {
                let menuIsOpen = this.config.menu.targetElement && this.config.menu.targetElement.classList.contains(this.config.menu.classToToggle)
                let cartIsOpen = this.config.cart.targetElement && this.config.cart.targetElement.classList.contains(this.config.cart.classToToggle)

                if (event.key === 'Escape' && (menuIsOpen || cartIsOpen)) {
                    if (menuIsOpen) {
                        this.toggleElement(this.config.menu.classToToggle, this.config.menu.targetElement, true)
                    } else {
                        this.toggleElement(this.config.cart.classToToggle, this.config.cart.targetElement, true)
                    }
                }
            })
        }

        if (this.config.aside.stickyElements.length) {
            this.initSetFullHeight()
        }
    },
    initSetFullHeight () {
        this.config.aside.stickyElements.forEach(element => {
            this.setFullHeight(element)
            window.addEventListener('resize', () => { this.setFullHeight(element) })
        })
    },
    addClickEvents (elements, classToToggle, targetElement, showOverlay) {
        if (elements.length) {
            elements.forEach(element => {
                element.addEventListener('click', () => {
                    this.toggleElement(classToToggle, targetElement, showOverlay)
                })
            })
        }
    },
    toggleElement (classToToggle, targetElement, showOverlay) {
        if (this.config.overlay.element && showOverlay) {
            this.config.overlay.element.classList.toggle(this.config.overlay.classToToggle)
        }

        targetElement.classList.toggle(classToToggle)
    },
    setFullHeight (element) {
        const siteHeaderHeight = this.config.header.element ? this.config.header.element.clientHeight : 67
        element.style.height = `${window.innerHeight - siteHeaderHeight}px`
    }
}
