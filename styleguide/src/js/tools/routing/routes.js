import ProductListingPage from '@/components/product/ProductListingPage'
import ProductDetailPage from '@/components/product/ProductDetailPage'
import SearchResultPage from '@/components/search/SearchResultPage'

export const productListingPageRoutes = [
    {
        name: 'productListingPage',
        path: '*/:category',
        props: route => ({
            category: route.params.category,
            queryStrings: route.query
        }),
        component: ProductListingPage
    }
]

export const productDetailPageRoutes = [
    {
        name: 'productDetailPage',
        path: '*/:articleName---:productId-:articleId',
        props: (route) => ({
            articleName: route.params.articleName,
            productId: Number(route.params.productId),
            articleId: Number(route.params.articleId)
        }),
        component: ProductDetailPage
    }
]

export const searchResultPageRoutes = [
    {
        name: 'searchResultPage',
        path: '*/:searchResultPage',
        props: (route) => ({
            queryStrings: route.query
        }),
        component: SearchResultPage
    }
]
