module.exports = {
    name: 'image-slider',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        slides: [
            {
                modifier: 'is-current',
                heroContext: {
                    preHeading: 'Reportage',
                    title: 'När jakt är en del av något större',
                    backgroundImage: 'https://source.unsplash.com/2053x750/?hunting',
                    buttonIconContext: {
                        text: 'Läs artikeln'
                    }
                },
                isProductContent: false,
                excerpt: 'Reportage från Svalbard'
            },
            {
                heroContext: {
                    preHeading: 'Reportage',
                    title: 'Fasanjakt i England',
                    backgroundImage: 'https://source.unsplash.com/2050x750/?hunting',
                    buttonIconContext: {
                        text: 'Läs artikeln'
                    }
                },
                isProductContent: false,
                excerpt: 'Färsk fasan på middagsbordet'
            },
            {
                modifier: 'is-current',
                heroContext: {
                    preHeading: 'Reportage',
                    title: 'När jakt inte är en del av något större',
                    backgroundImage: 'https://source.unsplash.com/2055x750/?hunting',
                    buttonIconContext: {
                        text: 'Läs artikeln'
                    }
                },
                isProductContent: false,
                excerpt: 'Reportage från Manhattan'
            },
            {
                heroContext: {
                    preHeading: 'Reportage',
                    title: 'Älgjakt i Algeriet',
                    backgroundImage: 'https://source.unsplash.com/2058x750/?hunting',
                    buttonIconContext: {
                        text: 'Läs artikeln'
                    }
                },
                isProductContent: false,
                excerpt: 'Älgjakt på oväntade ställen'
            }
        ],
        listContext: {
            modifier: 'unstyled',
            additionalModifiers: ['horizontal'],
            customClasses: ['image-slider__nav']
        },
        listItemContext: {
            customClasses: ['image-slider__excerpt']
        },
        bulletsContext: {
            customClasses: ['image-slider__bullets']
        }
    },
    variants: [
        {
            name: 'vue-implementation',
            context: {
                displayVueImplementation: true
            }
        }
    ]
}
