module.exports = {
    extends: 'stylelint-config-standard',
    plugins: [
        'stylelint-scss'
    ],
    rules: {
        indentation: 4,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'max-empty-lines': 3,
        'declaration-empty-line-before': [
            'always',
            {
                except: ['first-nested', 'after-declaration'],
                ignore: ['after-comment', 'inside-single-line-block']
            }
        ]
    }
}
