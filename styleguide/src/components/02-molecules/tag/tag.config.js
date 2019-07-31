module.exports = {
    name: 'tag',
    status: 'wip',
    default: 'red-filled',
    context: {
        customClasses: [],
        customAttributes: [],
        text: 'Tag text',
        hoverText: 'Tag text',
        isFilled: false,
        isBordered: false
    },
    variants: [
        {
            name: 'red-filled',
            context: {
                modifier: 'red',
                isFilled: true,
                text: 'Jakt',
                hoverText: 'Jakt'
            }
        },
        {
            name: 'green-filled',
            context: {
                modifier: 'green',
                isFilled: true,
                text: 'Börja jaga',
                hoverText: 'Börja jaga'
            }
        },
        {
            name: 'blue-filled',
            context: {
                modifier: 'blue',
                isFilled: true,
                text: 'Fiske',
                hoverText: 'Fiske'
            }
        },
        {
            name: 'cyan-filled',
            context: {
                modifier: 'cyan',
                isFilled: true,
                text: 'Club Jaktia',
                hoverText: 'Club Jaktia'
            }
        },
        {
            name: 'white-filled',
            context: {
                modifier: 'white',
                isFilled: true,
                text: 'Stövlar och kängor',
                hoverText: 'Stövlar och kängor'
            }
        },
        {
            name: 'brown-filled',
            context: {
                modifier: 'brown',
                isFilled: true,
                text: 'Friluft',
                hoverText: 'Friluft'
            }
        },
        {
            name: 'red-bordered',
            context: {
                modifier: 'red',
                isBordered: true,
                text: 'Jakt',
                hoverText: 'Jakt'
            }
        },
        {
            name: 'green-bordered',
            context: {
                modifier: 'green',
                isBordered: true,
                text: 'Börja jaga',
                hoverText: 'Börja jaga'
            }
        },
        {
            name: 'blue-bordered',
            context: {
                modifier: 'blue',
                isBordered: true,
                text: 'Fiske',
                hoverText: 'Fiske'
            }
        },
        {
            name: 'cyan-bordered',
            context: {
                modifier: 'cyan',
                isBordered: true,
                text: 'Club Jaktia',
                hoverText: 'Club Jaktia'
            }
        },
        {
            name: 'white-bordered',
            context: {
                modifier: 'white',
                isBordered: true,
                text: 'Stövlar och kängor',
                hoverText: 'Stövlar och kängor'
            }
        },
        {
            name: 'brown-bordered',
            context: {
                modifier: 'brown',
                isBordered: true,
                text: 'Friluft',
                hoverText: 'Friluft'
            }
        },
        {
            name: 'icon',
            context: {
                modifier: 'transparent',
                text: `
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.5" y="0.5" width="7" height="7" fill="white" stroke="#BDBCBB"/>
                    <rect x="0.5" y="2.5" width="7" height="7" fill="white" stroke="#BDBCBB"/>
                </svg>
                `
            }
        }
    ]
}
