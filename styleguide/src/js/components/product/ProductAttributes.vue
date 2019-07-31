<template>
    <div v-if="visibleOptions.length > 0" class="product-detail__variant-select">
        <label :for="!useAlternativeLayout ? `${attributeKey}-select` : null" class="label">
            {{ attributeKey }}
        </label>
        <template v-if="useAlternativeLayout">
            <div class="size-selector">
                <template v-for="(option, index) in visibleOptions">
                    <InputRadio
                        :key="`input-radio-${attributeKey}-${index}`"
                        :id="`radio-${attributeKey}-${index}`"
                        :name="`radio-attribute-${attributeKey}`"
                        :value="option.value"
                        :selectedButtonValue="selectedOption"
                        class="size-selector__input"
                        @input="updateSelectedOption"
                    />
                    <label
                        :key="`label-${attributeKey}-${index}`"
                        :for="`radio-${attributeKey}-${index}`"
                        class="size-selector__label"
                    >
                        {{ option.value }}
                    </label>
                </template>
            </div>
        </template>
        <template v-else>
            <Sel
                :id="`${attributeKey}-select`"
                :isGrey="true"
                :options="visibleOptions"
                :value="selectedOption"
                @input="updateSelectedOption"
            />
        </template>
    </div>
</template>

<script>
import Select from '@/components/form-elements/Select'
import InputRadio from '@/components/form-elements/InputRadio'

export default {
    name: 'ProductAttributes',
    components: {
        Sel: Select,
        InputRadio
    },
    props: {
        level: {
            type: Number,
            required: true
        },
        attributeKey: {
            type: String,
            required: true
        },
        selectedOption: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        dependantOnAttributes: {
            type: Array,
            required: false,
            default () { return [] }
        },
        useAlternativeLayout: {
            type: Boolean,
            required: false,
            default: false
        },
        allArticles: {
            type: Array,
            required: true
        }
    },
    computed: {
        visibleOptions () {
            if (this.dependantOnAttributes.length === 0) return this.options

            const dependantAttributeArticles = this.allArticles.filter(article => {
                let matchingAttributes = 0
                for (let i = 0; i < this.dependantOnAttributes.length; i++) {
                    const dependantAttribute = this.dependantOnAttributes[i]
                    const articleAttribute = article.attributes.find(attribute => attribute.typeIdentifier === dependantAttribute.key)
                    if (typeof articleAttribute !== 'undefined' && articleAttribute.value === dependantAttribute.selectedOption) {
                        matchingAttributes++
                    } else {
                        break
                    }
                }
                return matchingAttributes === this.dependantOnAttributes.length // = the article matches all attributes
            })

            let allDependantAttributes = []
            dependantAttributeArticles.forEach(article => {
                allDependantAttributes = [ ...allDependantAttributes, ...article.attributes ]
            })

            const distinctOptions = [ ...new Set(allDependantAttributes
                .filter(attribute => attribute.typeIdentifier === this.attributeKey)
                .map(attribute => attribute.value)
            ) ].map(attributeValue => ({
                value: attributeValue,
                text: attributeValue
            }))

            return distinctOptions
        }
    },
    methods: {
        updateSelectedOption (selectedOption) {
            this.$emit('select', {
                level: this.level,
                selectedOption: selectedOption
            })
        }
    }
}
</script>
