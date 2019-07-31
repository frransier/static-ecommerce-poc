module.exports = {
    name: 'product-price',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        regularPrice: 1799.00,
        discountedPrice: null,
        isClubPrice: false,
        hasMultiplePrices: false,
        currency: 'SEK'
    },
    variants: [
        {
            name: 'discounted',
            context: {
                discountedPrice: 1123.00
            }
        },
        {
            name: 'club price',
            context: {
                isClubPrice: true,
                discountedPrice: 1100.00
            }
        },
        {
            name: 'has multiple prices',
            context: {
                hasMultiplePrices: true,
                discountedPrice: 1123.00
            }
        }
    ]
}
