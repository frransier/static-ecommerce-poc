module.exports = {
    name: 'cart-article',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        overlayContext: {},
        dialogContext: {},
        image: 'https://imgplaceholder.com/150x150/aaaaaa/ffffff/fa-image',
        productNameContext: {
            name: 'Althorn Yamaha YAH-203',
            articleId: 'YAM15',
            brand: 'Yamaha',
            headingLevel: 'h3',
            showMeta: true
        },
        productPriceContext: {
            customClasses: ['cart-article__price']
        },
        quantitySelectorContext: {
            inputNumberContext: {
                value: 1
            }
        }
    },
    variants: [
        {
            name: 'Remove article',
            context: {
                overlayContext: {
                    modifier: 'is-visible'
                }
            }
        }
    ]
}
