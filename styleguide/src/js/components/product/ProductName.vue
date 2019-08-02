<script>
export default {
    name: 'ProductName',
    props: {
        headingLevel: {
            type: Number,
            required: false,
            default: 1
        },
        isBreak: {
            type: Boolean,
            required: false,
            default: false
        },
        isHeadingInheritSize: {
            type: Boolean,
            required: false,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: false,
            default: null
        },
        brand: {
            type: String,
            required: false,
            default: null
        },
        brandUrl: {
            type: String,
            required: false,
            default: null
        }
    },
    render (h) {
        const HeaderElement = `h${this.headingLevel}`

        return (
            <div class={['product-name', `${this.isBreak ? 'product-name--break' : ''}`]}>
                {this.brand &&
                    <span class="product-name__brand">
                        {this.brandUrl ? (
                            <a href={this.brandUrl} class="product-name__brand-link">{this.brand}</a>
                        ) : (
                            this.brand
                        )}
                    </span>
                }
                <HeaderElement class={['product-name__name', `${this.isHeadingInheritSize ? 'product-name__name--inherit-size' : ''}`]}>
                    {this.url ? (
                        <a href={this.url} class="product-name__link">{this.name}</a>
                    ) : (
                        this.name
                    )}
                </HeaderElement>
            </div>
        )
    }
}
</script>
