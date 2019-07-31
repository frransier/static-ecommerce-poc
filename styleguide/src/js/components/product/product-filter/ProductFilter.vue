<template>
    <div
        :key="isVisible ? `reflow-fix1` : `reflow-fix2`"
        :class="{ 'product-filter--is-visible': isVisible }"
        class="product-filter"
    >
        <div :style="{ height: viewportHeight }" class="product-filter__inner">
            <div class="product-filter__options-wrapper">
                <ul class="list list--unstyled list--horizontal product-filter__options-list">
                    <li
                        v-for="(filter, index) in filters"
                        :key="index"
                        class="list-item list-item--no-padding"
                    >
                        <FilterOption
                            :name="filter.name"
                            :filterKey="filter.key"
                            :isMultiSelect="filter.isMultiSelect"
                            :options="filter.options"
                        />
                    </li>
                </ul>
            </div>
            <Btn
                v-if="filters.length > 0"
                :text="toggleButtonText"
                :isFullWidth="true"
                :isTextCenter="true"
                :class="['product-filter__toggle-button', 'h-padding-y-sm']"
                @click.native="toggleVisibility"
            />
            <div v-if="activeFilterOptions.length" class="product-filter__active-options">
                <Btn
                    v-for="(option, index) in activeFilterOptions"
                    :key="`${option.filterKey}-${option.optionKey}`"
                    :text="option.optionName"
                    :isTransparent="true"
                    :icon="{ icon: 'remove-red', size: 'xs' }"
                    class="selected-filter-button"
                    @click.native="removeFilterOption(index)"
                />
            </div>
            <div class="product-filter__sort-wrapper">
                <Sel
                    v-model="activeSortOption"
                    :options="adaptedSortOptions"
                    :isInline="true"
                    @input="changeSortOrder"
                />
                <span class="product-filter__hits">{{ $getDictionaryValue('Product.Filter.TotalHits', '{0} produkter').replace('{0}', totalHits) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
// Important:
// The :key prop used on the parent element is used to force a re render of the component when it's opened/closed.
// This is because of a bug in Chrome where a reflow is not done when we toggle the CSS position property.

import Button from '@/components/Button'
import Select from '@/components/form-elements/Select'
import FilterOption from './FilterOption'

export default {
    name: 'ProductFilter',
    components: {
        Btn: Button,
        Sel: Select,
        FilterOption
    },
    props: {
        filters: {
            type: Array,
            required: false,
            default () { return [] }
        },
        sortOptions: {
            type: Array,
            required: false,
            default () { return [] }
        },
        totalHits: {
            type: Number,
            required: false,
            default: 0
        }
    },
    data () {
        return {
            isVisible: false,
            activeSortOption: 0 // Note: The sortOptions array index
        }
    },
    computed: {
        viewportHeight () {
            return this.isVisible && typeof window.innerHeight !== 'undefined' ? `${window.innerHeight}px` : null // Only return the value if isVisible is true, then we know that we're in mobile view
        },
        toggleButtonText () {
            return this.isVisible ? `Visa resultat (${this.totalHits})` : `Filtrera`
        },
        activeFilterOptions () {
            let options = []
            this.filters.forEach(_filter => {
                _filter.options.forEach(o => {
                    if (o.isActive) {
                        options.push({
                            filterKey: _filter.key,
                            optionKey: o.key,
                            optionName: o.name
                        })
                    }
                })
            })
            return options
        },
        adaptedSortOptions () {
            // Note: The sort options needs a different structure to work with the Select component
            return this.sortOptions.map((option, index) => ({ value: `${index}`, text: option.name }))
        }
    },
    watch: {
        'sortOptions' (newValue, oldValue) {
            if (newValue.length > oldValue.length) {
                this.setActiveSortOption()
            }
        }
    },
    methods: {
        toggleVisibility () {
            this.isVisible = !this.isVisible
        },
        removeFilterOption (optionIndex) {
            const option = this.activeFilterOptions[optionIndex]
            if (typeof option.filterKey === 'undefined' || typeof option.optionKey === 'undefined' || option.optionKey.length === 0) return
            const _filter = this.filters.find(f => f.key === option.filterKey) // Note: Don't use filter as a variable name
            if (typeof _filter === 'undefined') return

            const routerObject = {
                name: this.$route.name,
                params: {
                    ...this.$route.params
                },
                query: { ...this.$route.query }
            }

            // Remove page parameter if it exists. As the filter is changed the visitor will start at page one again.
            const pageParameter = Object.keys(this.$route.query).find(key => key.toLowerCase() === 'page')
            if (typeof pageParameter !== 'undefined') {
                delete routerObject.query[pageParameter]
            }

            let queryValue = ''

            // Remove the option only if there are any other options active
            const activeOptionsKeys = this.activeFilterOptions.filter(o => o.filterKey === option.filterKey && o.optionKey !== option.optionKey)
            if (activeOptionsKeys.length > 0) {
                // Return the keys only and convert them to a string
                queryValue = activeOptionsKeys.map(o => o.optionKey).join('|')
            }

            if (queryValue.length > 0) {
                routerObject.query[option.filterKey] = encodeURI(queryValue)
            } else {
                delete routerObject.query[_filter.key]
            }

            this.$router.push(routerObject)
        },
        changeSortOrder () {
            if (this.activeSortOption.length === 0) return

            const option = this.sortOptions[parseInt(this.activeSortOption, 10)]

            const routerObject = {
                name: this.$route.name,
                params: {
                    ...this.$route.params
                },
                query: { ...this.$route.query }
            }

            // Remove page parameter if it exists. As the sort order is changed the visitor will start at page one again.
            const pageParameter = Object.keys(this.$route.query).find(key => key.toLowerCase() === 'page')
            if (typeof pageParameter !== 'undefined') {
                delete routerObject.query[pageParameter]
            }

            // Remove sortkey and isasc parameters if they exist. Use find to avoid problems with case sensitivity.
            const sortKeyParameter = Object.keys(this.$route.query).find(key => key.toLowerCase() === 'sortkey')
            const isAscParameter = Object.keys(this.$route.query).find(key => key.toLowerCase() === 'isasc')
            if (typeof sortKeyParameter !== 'undefined') {
                delete routerObject.query[sortKeyParameter]
            }
            if (typeof isAscParameter !== 'undefined') {
                delete routerObject.query[isAscParameter]
            }

            // Add the parameters
            routerObject.query.sortkey = encodeURI(option.key)

            // isAsc is true as default, so only add the parameter if false
            if (!option.isAscending) {
                routerObject.query.isasc = 'false'
            }

            this.$router.push(routerObject)
        },
        setActiveSortOption () {
            const option = this.sortOptions.findIndex(option => option.isActive === true)
            this.activeSortOption = option === -1 ? 0 : option
        }
    }
}
</script>
