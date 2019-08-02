module.exports = {
    name: 'stock-status',
    status: 'ready',
    default: 'in-stock',
    context: {
        customClasses: [],
        customAttributes: [],
        stockStatusText: 'Some stock status text'
    },
    variants: [
        {
            name: 'discrete',
            context: {
                modifier: 'discrete',
                stockStatusText: 'Finns för omgående leverans'
            }
        },
        {
            name: 'in-stock',
            context: {
                modifier: 'in-stock',
                stockStatusText: 'Finns för omgående leverans'
            }
        },
        {
            name: 'few-in-stock',
            context: {
                modifier: 'few-in-stock',
                stockStatusText: 'Få i lager'
            }
        },
        {
            name: 'out-of-stock',
            context: {
                modifier: 'out-of-stock',
                stockStatusText: 'Ej i lager'
            }
        },
        {
            name: 'neutral',
            context: {
                modifier: 'neutral',
                stockStatusText: 'Lagerstatus i butik'
            }
        },
        {
            name: 'compact',
            context: {
                modifier: 'compact',
                additionalModifiers: ['in-stock'],
                stockStatusText: 'Compact stock status'
            }
        }
    ]
}
