<template>
    <div class="product-detail">
        <Modal
            v-if="partPaymentMarkup"
            :isVisible="partPaymentModalIsVisible"
            @close="togglePartPaymentModal"
        >
            <div class="resurs-bank" v-html="partPaymentMarkup"></div>
        </Modal>

        <section class="section">
            <div class="grid grid--col-xs-1 grid--col-sm-1">
                <div class="grid__item grid__item--7">
                    <ProductImages
                        :media="media"
                        :displayDiscountTag="prices.discounted.length > 0 && prices.club.length === 0"
                        :displayClubTag="prices.club.length > 0"
                        :displayIsNewTag="isNew"
                    />
                </div>
                <div class="grid__item grid__item--5">
                    <header class="product-detail__header">
                        <div class="product-detail__name">
                            <ProductName
                                :name="name"
                                :brand="brand.name"
                                :brandUrl="brand.url"
                            />
                        </div>
                        <div class="product-detail__tags">
                            <Tag
                                v-for="tag in tags"
                                :key="tag"
                                :definedTag="tag"
                                :hoverText="tag"
                            >
                                {{ tag }}
                            </Tag>
                        </div>
                    </header>
                    <main v-if="shortDescription" class="product-detail__short-description">
                        {{ shortDescription }}
                        <a href="#long-description" class="product-detail__read-more">{{ $getDictionaryValue('Page.ProductDetail.ReadMore', 'LÄS MER') }}</a>
                    </main>

                    <div v-if="isProductBundle" class="product-detail__bundle">
                        <h2>{{ $getDictionaryValue('Page.ProductDetail.Headings.Bundle', 'Inkluderade produkter') }}</h2>
                        <DescList :items="bundleProducts" class="product-detail__bundle-list" />
                    </div>
                    <ProductDetailPrices
                        v-else
                        :regularPrice="prices.regular"
                        :discountedPrice="prices.discounted"
                        :clubPrice="prices.club"
                    />

                    <ProductAttributes
                        v-for="(attribute, index) in attributes"
                        :key="attribute.key"
                        :level="index"
                        :attributeKey="attribute.key"
                        :selectedOption="attribute.selectedOption"
                        :options="attribute.options"
                        :dependantOnAttributes="index > 0 ? getAttributeDependencies(index) : []"
                        :allArticles="allArticles"
                        :useAlternativeLayout="attribute.useAlternativeLayout"
                        @select="attributeChanged"
                    />

                    <ProductDetailPrices
                        v-if="isProductBundle"
                        :regularPrice="prices.regular"
                        :discountedPrice="prices.discounted"
                        :clubPrice="prices.club"
                    />

                    <div class="product-detail__locator">
                        <Btn
                            v-if="storeLocatorUrl"
                            :isLink="true"
                            :url="storeLocatorUrl"
                            :isTransparent="true"
                            :isUnderline="true"
                            :icon="{
                                icon: 'locator',
                                size: 'sm'
                            }"
                            :text="$getDictionaryValue('Page.Stores.FindNearestStore', 'Hitta närmsta butik')"
                            class="h-font-size-xs h-text-transform-none h-padding-left-0 h-padding-top-xxs h-font-weight-400"
                        />
                    </div>

                    <div v-if="displayPartPaymentInfo" class="content-box">
                        <div class="part-payment-info">
                            <h3 class="part-payment-info__heading">{{ $getDictionaryValue('Page.ProductDetail.Headings.PartPayment', 'Delbetalning') }}</h3>
                            <div v-for="(cost, index) in partPaymentCosts" :key="index" class="part-payment-info__row">
                                <span class="part-payment-info__price" v-html="cost.cost"></span>/ MÅN i {{ cost.timeframe }}
                            </div>
                            <div class="part-payment-info__footer">
                                <Btn
                                    :isTransparent="true"
                                    :isUnstyled="true"
                                    :text="$getDictionaryValue('Page.ProductDetail.PartPaymentReadMore', 'Mer info')"
                                    class="part-payment-info__link"
                                    @click.native="togglePartPaymentModal"
                                />
                                <a
                                    v-if="jaktiaCardUrl"
                                    :href="jaktiaCardUrl"
                                    class="part-payment-info__link"
                                >
                                    {{ $getDictionaryValue('Page.ProductDetail.ApplyForJaktiaCard', 'Ansök om Jaktiakortet') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section--full section--no-padding section--grey">
            <section class="section">
                <div class="grid grid--col-xs-1 grid--col-sm-1">
                    <div class="grid__item grid__item--7 product-detail__grid-item">
                        <h2 class="product-detail__heading">{{ $getDictionaryValue('Page.ProductDetail.Headings.Description', 'Beskrivning') }}</h2>
                        <a id="long-description" class="product-detail__anchor"></a>
                        <div class="wysiwyg-content" v-html="longDescription"></div>
                        <ProductBrand :brand="brand" />
                    </div>
                    <div class="grid__item grid__item--5">
                        <h2 class="product-detail__heading">{{ $getDictionaryValue('Page.ProductDetail.Headings.Specifications', 'Specifikationer') }}</h2>
                        <DescList :items="specifications" />
                        <Share />
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
import productDetailMixin from '@/mixins/product-detail-mixin'

export default {
    name: 'ProductDetail',
    mixins: [productDetailMixin]
}
</script>
