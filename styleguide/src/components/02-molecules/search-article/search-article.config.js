module.exports = {
    name: 'search-article',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        image: 'https://imgplaceholder.com/100x100/aaaaaa/ffffff/fa-image',
        productNameContext: {
            name: 'Kortlek med kändismotiv - Nicolas Cage',
            articleId: '123456789',
            brand: 'Famous Card Company',
            headingLevel: 'h2',
            headingInheritSize: true,
            showMeta: true
        },
        stockStatusContext: {
            modifier: 'few-in-stock',
            additionalModifiers: ['discrete'],
            stockStatusText: 'Få i lager'
        },
        productPriceContext: {
            regularPrice: 500,
            discountedPrice: 249,
            customClasses: ['h-flex-align-end']
        }
    }
}
