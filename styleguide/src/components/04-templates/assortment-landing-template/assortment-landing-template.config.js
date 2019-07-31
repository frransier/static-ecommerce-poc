module.exports = {
    name: 'assortment-landing-template',
    status: 'ready',
    preview: '@master--menu-is-visible',
    context: {
        customClasses: [],
        customAttributes: [],
        masterContext: {
            hasHero: false,
            hasImageSlider: true,
            imageSliderContext: {}
        },
        sections: {
            hunting: {
                header: {
                    h2: 'Jakt'
                }
            },
            fishing: {
                header: {
                    h2: 'Fiske'
                }
            },
            outdoors: {
                header: {
                    h2: 'Friluftsliv'
                },
                grid: {
                    modifier: 'no-x-padding-xs',
                    additionalModifiers: ['padding-bottom-lg']
                }
            }
        },
        links: {
            hunting: {
                text: 'Se allt i Jakt'
            },
            fishing: {
                text: 'Se allt i Fiske'
            },
            outdoors: {
                text: 'Se allt i Friluftsliv'
            }
        }
    }
}
