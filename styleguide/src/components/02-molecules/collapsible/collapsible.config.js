module.exports = {
    name: 'collapsible',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        title: 'Collapsible title',
        content: 'Some content',
        iconContext: {
            modifier: 'fill',
            additionalModifiers: [],
            customClasses: ['collapsible__icon'],
            customAttributes: [],
            icon: 'plus'
        },
        customComponent: {
            componentName: '',
            componentContext: {}
        }
    },
    variants: [
        {
            name: 'compact',
            context: {
                modifier: 'compact'
            }
        },
        {
            name: 'bordered',
            context: {
                modifier: 'bordered'
            }
        }
    ]
}
