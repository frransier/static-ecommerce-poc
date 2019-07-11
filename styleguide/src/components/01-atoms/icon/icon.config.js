module.exports = {
    name: 'icon',
    status: 'ready',
    context: {
        additionalModifiers: [],
        customClasses: [],
        customAttributes: [],
        icon: 'double-chevron',
        srOnlyText: 'SR only text'
    },
    variants: [
        {
            name: 'animated',
            context: {
                icon: 'check-small-white',
                modifier: 'animated',
                additionalModifiers: ['xl']
            }
        },
        {
            name: 'xs',
            context: {
                modifier: 'xs'
            }
        },
        {
            name: 'sm',
            context: {
                modifier: 'sm'
            }
        },
        {
            name: 'md',
            context: {
                modifier: 'md'
            }
        },
        {
            name: 'lg',
            context: {
                modifier: 'lg'
            }
        },
        {
            name: 'xl',
            context: {
                modifier: 'xl'
            }
        }
    ]
}
