module.exports = {
    name: 'spinner',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        additionalModifiers: []
    },
    variants: [
        {
            name: 'is-visible',
            context: {
                modifier: 'is-visible'
            }
        },
        {
            name: 'is-own-element',
            context: {
                modifier: 'is-own-element',
                additionalModifiers: ['is-visible']
            }
        },
        {
            name: 'inverted',
            context: {
                modifier: 'inverted',
                additionalModifiers: ['is-visible']
            }
        },
        {
            name: 'inherited-background',
            context: {
                modifier: 'inherited-background',
                additionalModifiers: ['is-visible']
            }
        },
        {
            name: 'completed',
            context: {
                modifier: 'completed',
                additionalModifiers: ['is-visible', 'inverted']
            }
        }
    ]
}
