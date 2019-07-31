module.exports = {
    name: 'product-filter',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        buttonContext: {
            additionalModifiers: ['full-width', 'text-center'],
            customClasses: ['product-filter__toggle-button', 'h-padding-y-sm'],
            text: 'Filtrera'
        },
        selectContext: {
            additionalModifiers: ['inline'],
            options: [
                {
                    value: 'price-asc',
                    text: 'Pris stigande',
                    isSelected: true
                },
                {
                    value: 'price-desc',
                    text: 'Pris fallande',
                    isSelected: false
                }
            ]
        },
        filterOptions: [
            {}, {}, {}, {}
        ]
    },
    variants: [
        {
            name: 'is-visible',
            context: {
                modifier: 'is-visible'
            }
        },
        {
            name: 'vue-implementation',
            context: {
                isVueImplementation: true
            }
        }
    ]
}
