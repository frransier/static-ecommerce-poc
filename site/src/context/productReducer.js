const productReducer = (state, action) => {
  switch (action.type) {
    case "set-variant":
      const variant = action.variant
      const color = variant.attributes.map(a => a._type === "color")
      console.log(color)
      console.log(variant.attributes[0])

      return {
        mainImage: variant.attributes[0].image
          ? variant.attributes[0].image.asset.fixed
          : state.mainImage,
        title: variant.title,
        articleNo: variant.articleNumber,
        standard: variant.standard,
        jaktia: variant.clubJaktia,
        discount: variant.discount,
        attributes: variant.attributes,
      }
    case "set-mainImage":
      return {
        ...state,
        mainImage: action.image.asset.fixed,
      }
    case "reset-variant":
      return action.initialState
    default:
      return state
  }
}

export default productReducer
