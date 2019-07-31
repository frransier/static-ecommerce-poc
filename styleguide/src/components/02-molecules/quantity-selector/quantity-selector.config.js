module.exports = {
    name: 'quantity-selector',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        buttons: {
            dec: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['h-padding-xxs', 'quantity-selector__button']
                    },
                    iconContext: {
                        icon: 'minus-circle',
                        customClasses: ['quantity-selector__icon']
                    }
                }
            },
            inc: {
                buttonIconContext: {
                    buttonContext: {
                        modifier: 'transparent',
                        customClasses: ['h-padding-xxs', 'quantity-selector__button']
                    },
                    iconContext: {
                        icon: 'plus-circle',
                        customClasses: ['quantity-selector__icon']
                    }
                }
            }
        },
        inputNumberContext: {
            customClasses: ['quantity-selector__quantity-input'],
            customAttributes: [],
            id: 'quantity',
            name: 'quantity',
            value: '159',
            min: '1',
            max: '99'
        }
    }
}
