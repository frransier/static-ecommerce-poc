module.exports = {
    name: 'list-item',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        content: 'Some content'
    },
    variants: [
        {
            name: 'no-padding',
            context: {
                modifier: 'no-padding'
            }
        },
        {
            name: 'delimited',
            context: {
                modifier: 'delimited'
            }
        }
    ]
}
