module.exports = {
    name: 'information-page-listing-template',
    status: 'ready',
    preview: '@master--offset',
    context: {
        sections: {
            hero: {
                heroContext: {
                    modifier: 'slim',
                    additionalModifiers: ['headline2'],
                    title: 'Notiser',
                    intro: null,
                    backgroundImage: 'https://source.unsplash.com/1920x800/?hunting',
                    showButton: false
                }
            },
            sort: {
                totalsText: null,
                filters: [
                    {
                        customClasses: ['content-filter__select'],
                        name: 'date',
                        headline: 'Publiserade',
                        options: [
                            {
                                value: 'desc',
                                text: 'Senast publiserade',
                                isSelected: true
                            },
                            {
                                value: 'asc',
                                text: 'Äldst publicerade',
                                isSelected: false
                            }
                        ]
                    }
                ]
            },
            list: {
                additionalModifiers: ['padding-bottom-xl'],
                events: [
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false,
                        image: null
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false,
                        image: null
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false,
                        image: null
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false,
                        image: null
                    },
                    {
                        modifier: 'responsive',
                        location: null,
                        showTags: false
                    }
                ]
            },
            filter: {
                sectionContext: {
                    additionalModifiers: ['no-padding-xs']
                }
            }
        }
    }
}
