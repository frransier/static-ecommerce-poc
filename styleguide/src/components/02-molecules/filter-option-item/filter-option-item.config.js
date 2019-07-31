module.exports = {
    name: 'filter-option-item',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        name: 'Ett filterval',
        buttonContext: {
            modifier: 'unstyled',
            customClasses: ['filter-option-item']
        }
    },
    variants: [
        {
            name: 'is-active',
            context: {
                buttonContext: {
                    customClasses: ['filter-option-item', 'filter-option-item--is-active']
                }
            }
        }
    ]
}
