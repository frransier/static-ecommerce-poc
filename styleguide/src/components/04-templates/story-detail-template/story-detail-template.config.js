module.exports = {
    name: 'story-detail-template',
    status: 'ready',
    preview: '@master',
    context: {
        heroContext: {
            showButton: false
        },
        sections: {
            content: {
                sectionContext: {
                    header: {}
                }
            },
            relatedProducts: {
                sectionContext: {
                    header: {
                        h2: 'Produkter i reportage'
                    }
                }
            },
            similarStories: {
                sectionContext: {
                    modifier: 'padding-bottom-xl',
                    header: {
                        h2: 'Liknande reportage'
                    }
                }
            }
        },
        imageGridItem: {
            customAttributes: [
                {
                    attribute: 'style',
                    value: 'background: url(https://source.unsplash.com/1600x1600/?hunting) no-repeat center;    background-size: cover;'
                }
            ]
        }
    }
}
