<template>
    <div v-click-outside="closeOnClickOutSide" class="filter-option">
        <Btn
            :text="name"
            :isTransparent="false"
            :isFullWidth="true"
            :icon="{ icon: 'arrow-down', size: 'xs' }"
            :class="{ 'filter-option__button--is-active': isOpen }"
            class="button-icon--space-between button-icon--text-left filter-option__button"
            @click.native="toggleOpenState"
        />
        <ul :class="{ 'filter-option__list--is-open': isOpen }" class="list list--unstyled filter-option__list">
            <li class="list-item list-item--no-padding">
                <FilterOptionItem
                    v-for="(option, index) in options"
                    :key="option.key"
                    :optionName="option.name"
                    :isActive="option.isActive"
                    @click.native="toggleOption(index)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import Button from '@/components/Button'
import FilterOptionItem from './FilterOptionItem'

export default {
    name: 'FilterOption',
    components: {
        Btn: Button,
        FilterOptionItem
    },
    props: {
        name: {
            type: String,
            required: true
        },
        filterKey: {
            type: String,
            required: true
        },
        isMultiSelect: {
            type: Boolean,
            required: false,
            default: true
        },
        options: {
            type: Array,
            required: false,
            default () { return [] }
        }
    },
    data () {
        return {
            isOpen: false
        }
    },
    computed: {
        activeOptionsKeys () {
            return this.options.filter(option => option.isActive).map(option => option.key)
        }
    },
    methods: {
        toggleOpenState () {
            this.isOpen = !this.isOpen
        },
        closeOnClickOutSide (event, element) {
            // Only close on desktop (.product-filter__options-list is used on mobile) and if the user didn't click any of the other filter buttons
            // All the classes are sadly needed..
            const eventClasses = event.target.classList

            if (
                !eventClasses.contains('product-filter__options-list') &&
                !eventClasses.contains('filter-option__button') &&
                !event.target.parentElement.classList.contains('filter-option-item') &&
                !event.target.parentElement.classList.contains('filter-option__button')
            ) {
                this.isOpen = false
            }
        },
        toggleOption (optionIndex) {
            const option = this.options[optionIndex]
            if (typeof option.key === 'undefined' || option.key.length === 0) return

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

            // Remove the option if it's active
            if (option.isActive) {
                // The selected option is the only active option or the filter only supports one active option, therefore remove the whole parameter (filter name) from the querystring.
                if (this.activeOptionsKeys.length === 1 || !this.isMultiSelect) {
                    delete routerObject.query[this.filterKey]
                } else {
                    queryValue = this.activeOptionsKeys.filter(value => value !== option.key).join('|')
                }
            } else {
                // Add the option if it was not active
                queryValue = this.isMultiSelect && this.activeOptionsKeys.length ? `${this.activeOptionsKeys.join('|')}|${option.key}` : option.key
            }

            if (queryValue.length) {
                routerObject.query[this.filterKey] = encodeURI(queryValue)
            }

            this.$router.push(routerObject)
        }
    }
}
</script>
