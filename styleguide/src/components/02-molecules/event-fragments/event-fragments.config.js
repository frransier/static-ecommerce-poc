module.exports = {
    name: 'event-fragments',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        image: 'https://source.unsplash.com/60x60/?hunting',
        title: 'Vildsvinsjakt - Tillbehör och redskap',
        date: '2019 / 05 / 15',
        location: 'Jaktia Jönköping',
        showTags: true
    },
    variants: [
        {
            name: 'responsive',
            context: {
                modifier: 'responsive'
            }
        },
        {
            name: 'no-tags',
            context: {
                modifier: 'no-tags',
                showTags: false
            }
        }
    ]
}
