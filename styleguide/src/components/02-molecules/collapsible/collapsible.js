export default {
    config: {
        clickElements: document.querySelectorAll('[data-js="collapsible"] .collapsible__title'),
        toggleClass: 'collapsible--open'
    },
    init () {
        if (this.config.clickElements) {
            // Add event listner to elements
            Array.prototype.forEach.call(this.config.clickElements, element => {
                element.addEventListener('click', () => {
                    this.toggleState(element)
                })
            })
        }
    },
    toggleState (clickTarget) {
        const target = clickTarget.parentNode

        target.classList.toggle(this.config.toggleClass)
    }
}
