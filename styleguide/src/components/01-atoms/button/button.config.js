module.exports = {
    name: 'button',
    status: 'ready',
    context: {
        additionalModifiers: [],
        customClasses: [],
        customAttributes: [],
        text: 'Default button',
        type: 'button',
        tagName: 'button'
    },
    variants: [
        {
            name: 'is-link',
            context: {
                modifier: 'is-link',
                text: 'Link button',
                url: '#',
                target: '_blank'
            }
        },
        {
            name: 'red',
            context: {
                modifier: 'red',
                text: 'Red'
            }
        },
        {
            name: 'cyan',
            context: {
                modifier: 'cyan',
                text: 'Cyan'
            }
        },
        {
            name: 'success',
            context: {
                modifier: 'success',
                text: 'Success'
            }
        },
        {
            name: 'warning',
            context: {
                modifier: 'warning',
                text: 'Warning'
            }
        },
        {
            name: 'danger',
            context: {
                modifier: 'danger',
                text: 'Danger'
            }
        },
        {
            name: 'transparent',
            context: {
                modifier: 'transparent',
                text: 'Transparent'
            }
        },
        {
            name: 'rounded',
            context: {
                modifier: 'rounded',
                text: 'Rounded'
            }
        },
        {
            name: 'underline',
            context: {
                modifier: 'underline'
            }
        },
        {
            name: 'text-center',
            context: {
                modifier: 'text-center'
            }
        },
        {
            name: 'text-red',
            context: {
                modifier: 'text-red'
            }
        },
        {
            name: 'disabled',
            context: {
                modifier: 'disabled',
                text: 'Disabled',
                isDisabled: true
            }
        },
        {
            name: 'full-width',
            context: {
                modifier: 'full-width',
                text: 'Full width'
            }
        },
        {
            name: 'responsive',
            context: {
                modifier: 'responsive',
                text: 'Responsive button'
            }
        },
        {
            name: 'unstyled',
            context: {
                modifier: 'unstyled',
                text: 'Unstyled button'
            }
        }
    ]
}
