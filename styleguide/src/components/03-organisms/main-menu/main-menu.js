export default {
    config: {
        toggle: {
            elements: document.querySelectorAll('.main-menu__link--has-submenu'),
            toggleClass: 'main-menu__link--submenu-is-visible',
            isCurrentClass: 'main-menu__link--is-current',
            isActiveClass: 'main-menu__link--is-active'
        },
        submenu: {
            selector: 'main-menu--submenu',
            toggleClass: 'main-menu--submenu-is-visible'
        }
    },
    init () {
        const toggleElements = [ ...this.config.toggle.elements ] // Create array from NodeList for poor IE11
        if (toggleElements.length) {
            toggleElements.forEach(element => {
                this.addClickEvent(element)
            })

            // Add the isActiveClass to the Active is current link that has an open sub menu (if there are any)
            const isCurrentElements = [ ...document.querySelectorAll(`.${this.config.toggle.isCurrentClass}.${this.config.toggle.toggleClass}`) ]
            if (isCurrentElements.length) {
                const activeCurrentElement = isCurrentElements[isCurrentElements.length - 1]
                activeCurrentElement.classList.add(this.config.toggle.isActiveClass)
            }
        }
    },
    addClickEvent (element) {
        element.addEventListener('click', event => {
            event.preventDefault() // The elements are links, so prevent nagivation
            const submenu = element.nextElementSibling
            if (submenu && submenu.classList.contains(this.config.submenu.selector)) {
                this.toggleMenu(element, submenu)
            }
        })
    },
    toggleMenu (toggleElement, menu) {
        toggleElement.classList.toggle(this.config.toggle.toggleClass)
        menu.classList.toggle(this.config.submenu.toggleClass)

        const menuIsExpanded = menu.getAttribute('aria-expanded') === 'true'
        menu.setAttribute('aria-expanded', !menuIsExpanded)

        // Handle the isActiveClass
        // Note: Only one element should have the isActiveClass but this works as a good fall back if something has gone wrong
        const currentActiveToggleElements = [ ...document.querySelectorAll(`.${this.config.toggle.isActiveClass}`) ]
        if (currentActiveToggleElements.length) {
            currentActiveToggleElements.forEach(element => {
                element.classList.remove(this.config.toggle.isActiveClass)
            })
        }

        if (!menuIsExpanded) {
            // The sub menu is opened
            toggleElement.classList.add(this.config.toggle.isActiveClass)
        } else {
            // If the toggle element is part of a sub menu, set the active class to the parent menu link
            const newIsActiveElement = toggleElement.parentNode.parentNode.previousElementSibling
            if (newIsActiveElement && newIsActiveElement.classList.contains(this.config.toggle.toggleClass)) {
                newIsActiveElement.classList.add(this.config.toggle.isActiveClass)
            }
        }
    }
}
