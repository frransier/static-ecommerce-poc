module.exports = {
    name: 'search-result',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        articles: [
            {
                image: 'https://imgplaceholder.com/100x100/aaaaaa/ffffff/fa-image',
                productNameContext: {
                    modifier: 'break',
                    name: 'Kortlek med kändismotiv - Nicolas Cage',
                    articleId: '123456789',
                    brand: 'Famous Card Company'
                },
                stockStatusContext: {
                    modifier: 'few-in-stock',
                    stockStatusText: 'Få i lager'
                },
                productPriceContext: {
                    regularPrice: 500,
                    discountedPrice: 249
                }
            },
            {
                image: 'https://imgplaceholder.com/100x100/aaaaaa/ffffff/fa-image',
                productNameContext: {
                    modifier: 'break',
                    name: 'Kortlek med kändismotiv - Robinsonrobban',
                    articleId: '123456789',
                    brand: 'Famous Card Company'
                },
                stockStatusContext: {
                    modifier: 'in-stock',
                    stockStatusText: 'I lager'
                },
                productPriceContext: {
                    regularPrice: 2,
                    discountedPrice: 1
                }
            },
            {
                image: 'https://imgplaceholder.com/100x100/aaaaaa/ffffff/fa-image',
                productNameContext: {
                    modifier: 'break',
                    name: 'Kortlek med kändismotiv - Madeleine Olson',
                    articleId: '123456789',
                    brand: 'Famous Card Company'
                },
                stockStatusContext: {
                    modifier: 'out-of-stock',
                    stockStatusText: 'Slutsåld'
                },
                productPriceContext: {
                    regularPrice: 99,
                    discountedPrice: null
                }
            }
        ],
        contentItems: [
            {},
            {}
        ]
    },
    variants: [
        {
            name: 'content'
        }
    ]
}
