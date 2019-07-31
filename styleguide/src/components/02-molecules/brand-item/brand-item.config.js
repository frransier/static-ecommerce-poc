var randomLogo = `//acmelogos.com/images/logo-${Math.floor((Math.random() * 8) + 1)}.svg`

module.exports = {
    name: 'brand-item',
    status: 'wip',
    context: {
        additionalModifiers: [],
        customClasses: [],
        customAttributes: [],
        imageUrl: randomLogo,
        brandName: 'Acme Inc.',
    },
    variants: [
        {
            name: 'inline',
            context: {
                modifier: 'inline'
            }
        },
        {
            name: 'background-white',
            context: {
                modifier: 'background-white'
            }
        }
    ]
}
