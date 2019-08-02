import ProductImages from '@/components/product/ProductImages'
import ProductName from '@/components/product/ProductName'
import ProductDetailPrices from '@/components/product/ProductDetailPrices'
import ProductBrand from '@/components/product/ProductBrand'
import ProductAttributes from '@/components/product/ProductAttributes'
import DescList from '@/components/DescList'
import Share from '@/components/Share'
import Select from '@/components/form-elements/Select'
import Tag from '@/components/Tag'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

export default {
    components: {
        ProductImages,
        ProductName,
        ProductDetailPrices,
        ProductBrand,
        ProductAttributes,
        DescList,
        Share,
        Sel: Select,
        Tag,
        Btn: Button,
        Modal
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        sku: {
            type: String,
            required: true
        },
        ean: {
            type: String,
            required: false,
            default: ''
        },
        shortDescription: {
            type: String,
            required: false,
            default: null
        },
        longDescription: {
            type: String,
            required: false,
            default: null
        },
        media: {
            type: Array,
            required: false,
            default () { return [] }
        },
        brand: {
            type: Object,
            required: false,
            default () {
                return {
                    name: null,
                    url: '',
                    image: null,
                    description: null
                }
            }
        },
        prices: {
            type: Object,
            required: true
        },
        tags: {
            type: Array,
            required: false,
            default () { return [] }
        },
        isNew: {
            type: Boolean,
            required: false,
            default: false
        },
        categoryStructure: {
            type: Array,
            required: false,
            default () { return [] }
        },
        bundleProducts: {
            type: Array,
            required: false,
            default () { return [] }
        },
        allArticles: {
            type: Array,
            required: true
        },
        allAttributes: {
            type: Array,
            required: false,
            default () { return [] }
        },
        articleAttributes: {
            type: Object,
            required: true
        },
        partPaymentMarkup: {
            type: String,
            required: false,
            default: null
        }
    },
    data () {
        return {
            attributes: [],
            partPaymentModalIsVisible: false,
            partPaymentCosts: []
        }
    },
    watch: {
        '$route.params.articleId' () {
            // Update selected attribute options when the user navigates back or forward
            this.attributes.forEach(attribute => {
                attribute.selectedOption = this.articleAttributes[attribute.key]
            })
        },
        'partPaymentMarkup' (newValue, oldValue) {
            if (newValue !== null) {
                this.$nextTick(function () {
                    const table = document.querySelector('.priceTable')

                    if (table) {
                        this.getPartPaymentDataFromTableMarkup(table)
                    }
                })
            }
        }
    },
    computed: {
        isProductBundle () {
            return this.bundleProducts.length > 0
        },
        specifications () {
            const specs = [
                {
                    term: this.$getDictionaryValue('Page.ProductDetail.Headings.ArticleNumber', 'Artikelnummer'),
                    value: this.sku
                }
            ]

            if (this.ean.length > 0) {
                specs.push({
                    term: this.$getDictionaryValue('Page.ProductDetail.Headings.Ean', 'EAN'),
                    value: this.ean
                })
            }

            if (this.brand.name && this.brand.url && this.brand.url.length > 0) {
                specs.push({
                    term: this.$getDictionaryValue('Page.ProductDetail.Headings.Brand', 'Varumärke'),
                    value: this.brand.url && this.brand.url.length > 0 ? `<a href="${this.brand.url}">${this.brand.name}</a>` : this.brand.name
                })
            }

            if (this.categoryStructure !== null && this.categoryStructure.length) {
                specs.push({
                    term: this.$getDictionaryValue('Page.ProductDetail.Headings.Category', 'Kategori'),
                    value: this.categoryStructure.map(category => `<a href="${category.url}">${category.name}</a>`).join(' - ')
                })
            }

            return specs
        },
        storeLocatorUrl () {
            return this.$getPageUrl('storeListPage')
        },
        jaktiaCardUrl () {
            return this.$getPageUrl('jaktiaCard')
        },
        displayPartPaymentInfo () {
            return this.partPaymentMarkup !== null && this.partPaymentCosts.length > 0
        }
    },
    created () {
        if (this.allAttributes.length > 0) {
            this.attributes = [ ...this.allAttributes ]
        }
    },
    methods: {
        attributeChanged (changedAttribute) {
            const attributesLength = this.attributes.length

            this.attributes[changedAttribute.level].selectedOption = changedAttribute.selectedOption

            let article = null
            // Find the article that matches the most attributes
            for (let level = attributesLength - 1; level >= 0; level--) {
                article = this.allArticles.find(article => {
                    let matchingAttributes = 0
                    for (let i = 0; i <= level; i++) {
                        const attribute = this.attributes[i]
                        const articleAttribute = article.attributes.find(articleAttribute => articleAttribute.typeIdentifier === attribute.key)

                        if (typeof articleAttribute !== 'undefined' && articleAttribute.value === attribute.selectedOption) {
                            matchingAttributes++
                        } else {
                            break
                        }
                    }

                    return matchingAttributes === level + 1
                })

                if (typeof article !== 'undefined') {
                    // If we changed for example level 1 but found an article matching also level 2, update all levels above level 1 to the articles attribute values
                    if (changedAttribute.level < level) {
                        const articleAttributes = article.attributes.map(attribute => ({
                            key: attribute.key,
                            value: attribute.value
                        }))

                        for (let i = changedAttribute.level + 1; i < attributesLength; i++) {
                            const attributeIndex = this.attributes.findIndex(attribute => attribute.key === articleAttributes[i].key)

                            if (attributeIndex >= 0) {
                                this.attributes[attributeIndex].selectedOption = articleAttributes[articleAttributes[i].key].value
                            }
                        }
                    }

                    break
                }
            }

            if (typeof article !== 'undefined' && article !== null) {
                // Navigate
                this.$router.push({
                    path: `${this.$route.params['0']}${article.url.substring(0, 1) === '/' ? article.url : `/${article.url}`}`
                })
            }
        },
        getAttributeDependencies (level) {
            const dependencies = []

            for (let i = 0; i < level; i++) {
                dependencies.push({
                    key: this.attributes[i].key,
                    selectedOption: this.attributes[i].selectedOption
                })
            }

            return dependencies
        },
        togglePartPaymentModal () {
            this.partPaymentModalIsVisible = !this.partPaymentModalIsVisible
        },
        getPartPaymentDataFromTableMarkup (table) {
            // Note: First of, I would like to say I'm sorry for have created this piece of uglyness.

            const allTrElements = [ ...table.querySelectorAll('tr') ] // Convert to Array for better IE support

            // As of current, the info we need is in node number 7, so we must have at least as many nodes.
            if (allTrElements.length > 7) {
                const titles = [ ...allTrElements[1].children ]
                const costs = [ ...allTrElements[7].children ]

                this.partPaymentCosts = titles.map((title, index) => ({
                    cost: `${costs[index].innerHTML.replace(',00', '')}:-`,
                    timeframe: title.innerHTML
                })).slice(1) // Remove the first td
            }
        }
    }
}
