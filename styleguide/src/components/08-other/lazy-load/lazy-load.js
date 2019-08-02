import lozad from 'lozad'

// Add the selectors in config.elements for the images that should be lazy loaded
export default {
    config: {
        loadedClass: 'lazy-load--loaded',
        elements: [
            '[data-src]',
            '[data-background-image]'
        ]
    },
    init () {
        lozad(document.querySelectorAll(this.config.elements), {
            loaded: (el) => {
                el.onload = () => { el.classList.add(this.config.loadedClass) }
            }
        }).observe()
    }
}
