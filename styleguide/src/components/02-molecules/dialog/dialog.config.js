module.exports = {
    name: 'dialog',
    status: 'ready',
    context: {
        customClasses: [],
        customAttributes: [],
        buttonContext: {
            confirm: {
                text: 'Remove',
                modifier: 'transparent',
                additionalModifiers: ['underline'],
                customClasses: ['dialog-buttons__button', 'h-padding-xs']
            },
            cancel: {
                text: 'Cancel',
                modifier: 'transparent',
                additionalModifiers: ['underline'],
                customClasses: ['dialog-buttons__button', 'h-padding-xs']
            }
        }
    }
}
