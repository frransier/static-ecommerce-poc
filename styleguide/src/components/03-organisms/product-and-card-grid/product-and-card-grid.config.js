module.exports = {
    name: 'product-and-card-grid',
    status: 'wip',
    context: {
        customClasses: [],
        customAttributes: [],
        products: {
            regularPrice: {
                productPriceContext: {
                    regularPrice: 500,
                    discountedPrice: null,
                    currency: 'SEK'
                }
            },
            discountedPrice: {
                productPriceContext: {
                    regularPrice: 500,
                    discountedPrice: 450,
                    currency: 'SEK'
                }
            },
            clubPrice: {
                productPriceContext: {
                    isClubPrice: true,
                    regularPrice: 500,
                    discountedPrice: 400,
                    currency: 'SEK'
                }
            },
            multiplePrices: {
                productPriceContext: {
                    regularPrice: 800,
                    discountedPrice: 700,
                    currency: 'SEK',
                    hasMultiplePrices: true
                }
            }
        }
    }
}
