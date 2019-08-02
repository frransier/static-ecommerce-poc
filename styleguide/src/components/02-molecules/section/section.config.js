module.exports = {
    name: 'section',
    status: 'ready',
    context: {
        additionalModifiers: [],
        customClasses: [],
        customAttributes: [],
        header: {
            preHeadingText: null,
            h1: 'Heading',
            h2: null
        },
        meta: 'Optional meta content',
        sectionContent: 'This is a standard section. It will vary in width and padding depending on screen resolution. It´s always kept centered.',
        columns: [
            {
                sectionGridColumnContext: {
                    customClasses: [],
                    customAttributes: [],
                    size: null,
                    sectionContent: '<img src="https://imgplaceholder.com/400x300/aaaaaa/ffffff/fa-image">'
                }
            },
            {
                sectionGridColumnContext: {
                    customClasses: [],
                    customAttributes: [],
                    size: null,
                    sectionContent: '<img src="https://imgplaceholder.com/300x200/aaaaaa/ffffff/fa-image">'
                }
            },
            {
                sectionGridColumnContext: {
                    customClasses: [],
                    customAttributes: [],
                    size: null,
                    sectionContent: '<img src="https://imgplaceholder.com/500x360/aaaaaa/ffffff/fa-image">'
                }
            }
        ]
    },
    variants: [
        {
            name: 'center content',
            context: {
                modifier: 'center-content',
                sectionContent: 'Centers the content both horizontally and vertically.'
            }
        },
        {
            name: 'full',
            context: {
                modifier: 'full',
                sectionContent: 'This is a full width section. You can use a default section in a full section if you want.'
            }
        },
        {
            name: 'grey',
            context: {
                modifier: 'grey',
                sectionContent: 'This section has a grey background'
            }
        },
        {
            name: 'grow',
            context: {
                modifier: 'grow',
                sectionContent: 'Grows the section if it is placed in a flex container.'
            }
        },
        {
            name: 'no padding',
            context: {
                modifier: 'no-padding',
                sectionContent: 'Section without any padding.'
            }
        },
        {
            name: 'no y padding',
            context: {
                modifier: 'no-y-padding',
                sectionContent: 'Section without any Y axis padding.'
            }
        },
        {
            name: 'no x padding',
            context: {
                modifier: 'no-x-padding',
                sectionContent: 'Section without any X axis padding.'
            }
        },
        {
            name: 'no top padding',
            context: {
                modifier: 'no-top-padding',
                sectionContent: 'Section without any top padding.'
            }
        },
        {
            name: 'no bottom padding',
            context: {
                modifier: 'no-bottom-padding',
                sectionContent: 'Section without any bottom padding.'
            }
        },
        {
            name: 'no x padding xs',
            context: {
                modifier: 'no-x-padding-xs',
                sectionContent: 'Section without any X axis padding on XS devices.'
            }
        },
        {
            name: 'padding top sm',
            context: {
                modifier: 'padding-top-sm',
                sectionContent: 'Section with small top padding.'
            }
        },
        {
            name: 'padding top lg',
            context: {
                modifier: 'padding-top-lg',
                sectionContent: 'Section with large top padding.'
            }
        },
        {
            name: 'padding top xl',
            context: {
                modifier: 'padding-top-xl',
                sectionContent: 'Section with extra large top padding.'
            }
        },
        {
            name: 'padding bottom sm',
            context: {
                modifier: 'padding-bottom-sm',
                sectionContent: 'Section with small bottom padding.'
            }
        },
        {
            name: 'padding bottom lg',
            context: {
                modifier: 'padding-bottom-lg',
                sectionContent: 'Section with large bottom padding.'
            }
        },
        {
            name: 'padding bottom xl',
            context: {
                modifier: 'padding-bottom-xl',
                sectionContent: 'Section with extra large bottom padding.'
            }
        },
        {
            name: 'padding y sm',
            context: {
                modifier: 'padding-y-sm',
                sectionContent: 'Section with small Y axis padding.'
            }
        },
        {
            name: 'padding y lg',
            context: {
                modifier: 'padding-y-lg',
                sectionContent: 'Section with large Y axis padding.'
            }
        },
        {
            name: 'padding y xl',
            context: {
                modifier: 'padding-y-xl',
                sectionContent: 'Section with extra large Y axis padding.'
            }
        },
        {
            name: 'padding y xxl',
            context: {
                modifier: 'padding-y-xxl',
                sectionContent: 'Section with extra extra large Y axis padding.'
            }
        }
    ]
}
