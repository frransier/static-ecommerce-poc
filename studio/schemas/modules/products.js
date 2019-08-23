import { FaShoppingCart } from "react-icons/fa";

export default {
  name: "products",
  title: "Featured products",
  type: "object",
  fields: [
    {
      title: "Featured products",
      name: "products",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }]
    }
  ],
  preview: {
    select: {
      products: "products"
    },
    prepare(selection) {
      const { products } = selection;
      return {
        title: products.length + " products",
        media: FaShoppingCart,
        subtitle: "Products module"
      };
    }
  }
};
