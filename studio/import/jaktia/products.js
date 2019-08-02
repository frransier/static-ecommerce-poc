const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");
const rawdata = fs.readFileSync("jaktia.json");
const rawVendors = fs.readFileSync("vendors.json");
const vendors = JSON.parse(rawVendors);
const rawCategories = fs.readFileSync("categories.json");
const categories = JSON.parse(rawCategories);
const products = JSON.parse(rawdata);

function getVendor(vendors, p) {
  const hit = vendors.find(v => v.title === p);
  const vendor = { _ref: hit._id, _key: hit._id, _type: "reference" };
  return vendor;
}
function getCategory(categories, p) {
  const hit = categories.find(c => c.title === p);
  const category = { _ref: hit._id, _key: hit._id, _type: "reference" };
  return category;
}

function getAttributes(p) {
  const allAttributes = [
    { type: "color", value: p.Color },
    { type: "sizeShoes", value: p.SizeShoes },
    { type: "sizeClothes", value: p.SizeClothes },
    { type: "sizePants", value: p.SizeTrousers },
    { type: "sizeGloves", value: p.SizeGloves },
    { type: "sizeHats", value: p.SizeHats },
    { type: "sizeOther", value: p.SizeOther },
    { type: "caliber", value: p.Caliber },
    { type: "thread", value: p.Thread },
    { type: "barrelLength", value: p.BarrelLengthcm },
    { type: "stance", value: p.Stance },
    { type: "experience", value: p.Experience }
  ];

  const attrs = allAttributes.map(a => {
    if (a.value !== "") {
      switch (a.type) {
        case "color":
          return {
            _type: a.type,
            color: a.value
          };
        case "sizeShoes":
          return {
            _type: a.type,
            sizeShoes: a.value
          };
        case "sizeClothes":
          return {
            _type: a.type,
            sizeClothes: a.value
          };
        case "sizePants":
          return {
            _type: a.type,
            sizePants: a.value
          };
        case "sizeGloves":
          return {
            _type: a.type,
            sizeGloves: a.value
          };
        case "sizeHats":
          return {
            _type: a.type,
            sizeHats: a.value
          };
        case "sizeOther":
          return {
            _type: a.type,
            sizeOther: a.value
          };
        case "caliber":
          return {
            _type: a.type,
            caliber: a.value
          };
        case "thread":
          return {
            _type: a.type,
            thread: a.value
          };
        case "barrelLength":
          return {
            _type: a.type,
            barrelLength: a.value
          };
        case "stance":
          return {
            _type: a.type,
            stance: a.value
          };
        case "experience":
          return {
            _type: a.type,
            experience: a.value
          };
        default:
          break;
      }
    }
  });
  return attrs.filter(Boolean);
}

const owners = products.map(p => {
  if (p.ProductName === p.ArticleName) {
    const attributes = getAttributes(p);
    return {
      _type: "product",
      _id: uuid(),
      _key: uuid(),
      title: p.ProductName,
      productId: p.ProductIdentifier,
      excerpt: p.DescriptionShort,
      description: p.DescriptionLong,
      tags: p.Tags,

      defaultProductVariant: {
        variantId: p.ArticleIdentifier,
        title: p.ArticleName,
        attributes: attributes
      },
      variants: [],
      vendor: getVendor(vendors, p.Brand),
      categories: [
        getCategory(categories, p.MainGroup),
        getCategory(categories, p.SubGroup)
      ],
      slug: {
        current: getSlug(`${p.ProductName}`, { truncate: 200, symbols: true })
      }
    };
  }
});

const productOwners = owners.filter(Boolean);

// const variants = products.map(p=>{
//     if(p.ProductName !== p.VariantName) {
//         const attributes = getAttributes(p)
//         const variantId = p.ArticleIdentifier
//         const owner = owners.filter(o => o.productId === p.ProductIdentifier)

//     }
// })

fs.writeFileSync("productos.json", JSON.stringify(productOwners));

// cat productos.json | jq -c '.[]' > products.ndjson
