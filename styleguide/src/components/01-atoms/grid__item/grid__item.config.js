module.exports = {
    name: 'grid__item',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: []
    },
    variants: [
        {
            name: 'highlighted-left',
            context: {
                modifier: 'highlighted-left'
            }
        },
        {
            name: 'highlighted-right',
            context: {
                modifier: 'highlighted-right'
            }
        }
    ]
}
