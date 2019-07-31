module.exports = {
    name: 'modal',
    status: 'ready',
    context: {
        additionalModifiers: [],
        customClasses: [],
        customAttributes: [],
        content: 'Some content in the modal',
        buttonIconContext: {
            buttonContext: {
                modifier: 'transparent',
                customClasses: ['modal__close-button']
            },
            iconContext: {
                icon: 'remove'
            }
        }
    },
    variants: [
        {
            name: 'is-visible',
            context: {
                modifier: 'is-visible'
            }
        }
    ]
}
