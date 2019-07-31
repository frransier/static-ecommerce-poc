export default {
    config: {
        presentkortHTML: `
            <div>POOP</div>
        `
    },
    init () {
        const elements = this.getElementsThatContainsTag('.wysiwyg-content', '!presentkort!')
        this.appendTheCode(elements)
    },
    getElementsThatContainsTag (selector, text) {
        const elements = document.querySelectorAll(selector)
        const elementsToReturn = []
        Array.prototype.filter.call(elements, (element) => {
            if (RegExp(text).test(element.textContent) === true) elementsToReturn.push(element)
        })

        return elementsToReturn
    },
    appendTheCode (elements) {
        console.log(elements)
        elements.forEach(element => {
            element.textContent.replace('presentkort', 'SNÖPPELI')
        })
    }
}
