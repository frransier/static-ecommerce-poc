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
  if (hit) return { _ref: hit._id, _key: hit._id, _type: "reference" };
}
function getCategory(categories, p) {
  const hit = categories.find(c => c.title === p);
  if (hit) return { _ref: hit._id, _key: hit._id, _type: "reference" };
}
function getProduct(ownerz, p) {
  const hit = ownerz.find(prod => prod._id === p);

  if (hit) return { _ref: hit._id, _key: hit._id, _type: "reference" };
}

function getVariants(variants, p) {
  const hits = variants.filter(v => v.productIdentifier === p);
  if (hits) {
    const variantz = hits.map(h => {
      return {
        _ref: h._id,
        _key: h._key,
        _type: "reference",
      };
    });

    return variantz;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const prevars = products.map(p => {
  if (p.ProductName !== p.ArticleName) {
    return {
      _type: "product",
      _id: uuid(),
      _key: uuid(),
      title: p.ArticleName,
      productId: `${p.ArticleIdentifier}`,
      productIdentifier: `${p.ProductIdentifier}`,
      productName: `${p.ProductName}`,
      intro: p.DescriptionShort,
      // images: [
      //   {
      //     _type: "image",
      //     _sanityAsset: `image@file:///Users/mravand/projects/placeholder${number}.jpg`
      //   }
      // ],

      body: p.DescriptionLong,
      brandName: p.Brand,
      // attributes: variantAttributes,
      vendor: getVendor(vendors, p.Brand),
      //parentProduct: getProduct(fullOwners, p.ProductIdentifier),
      categories: [
        getCategory(categories, p.MainGroup),
        getCategory(categories, p.MainGroup),
      ],
      mainGroup: p.MainGroup,
      subGroup: p.SubGroup,
      categories0: p.MainGroup,
      categories1: `${p.MainGroup} > ${p.SubGroup}`,
      tags: [],
      slug: {
        current: getSlug(`${p.ArticleName}`, { truncate: 200, symbols: true }),
      },
    };
  }
});
// console.log("prevars", prevars.length);

const variants = prevars.filter(Boolean);

// console.log("variants", variants.length);

const owners = products.map(p => {
  if (p.ProductIdentifier.substring(2) === p.ArticleIdentifier.toString()) {
    const number = getRandomInt(7);
    const attributes = getAttributes(p);
    return {
      _type: "product",
      _id: uuid(),
      _key: uuid(),
      title: p.ProductName,
      productId: `${p.ArticleIdentifier}`,
      productIdentifier: `${p.ProductIdentifier}`,
      intro: p.DescriptionShort,
      images: [
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${number}.jpg`,
        },
      ],

      body: p.DescriptionLong,
      attributes: attributes,
      vendor: getVendor(vendors, p.Brand),
      variants: getVariants(variants, p.ProductIdentifier),
      categories: [
        getCategory(categories, p.MainGroup),
        getCategory(categories, p.SubGroup),
      ],
      categories0: p.MainGroup,
      categories1: `${p.MainGroup} > ${p.SubGroup}`,
      tags: [],
      slug: {
        current: getSlug(`${p.ProductName}`, { truncate: 200, symbols: true }),
      },
    };
  }
});

const fullOwners = owners.filter(Boolean);

const varz = variants.map(p => {
  if (p.productName !== p.title) {
    const number = getRandomInt(7);
    const variantAttributes = getAttributes(p);
    return {
      _type: "product",
      _id: p._id,
      _key: p._key,
      title: p.title,
      productId: `${p.productId}`,
      productIdentifier: `${p.productIdentifier}`,
      intro: p.intro,
      images: [
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${number}.jpg`,
        },
      ],

      body: p.body,
      attributes: variantAttributes,
      vendor: getVendor(vendors, p.brandName),
      parentProduct: getProduct(fullOwners, p._id),
      categories: [
        getCategory(categories, p.mainGroup),
        getCategory(categories, p.subGroup),
      ],
      categories0: p.mainGroup,
      categories1: `${p.mainGroup} > ${p.subGroup}`,
      tags: [],
      slug: {
        current: getSlug(`${p.title}`, { truncate: 200, symbols: true }),
      },
    };
  }
});

const fullVariants = varz.filter(Boolean);
console.log(fullVariants[34].parentProduct);

// console.log("varz", fullVariants[124]);

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
    { type: "experience", value: p.Experience },
  ];

  const attrs = allAttributes.map(a => {
    if (a.value) {
      switch (a.type) {
        case "color":
          return {
            _key: uuid(),
            _type: a.type,
            color: a.value.toString(),
          };
        case "sizeShoes":
          return {
            _key: uuid(),
            _type: a.type,
            sizeShoes: a.value.toString(),
          };
        case "sizeClothes":
          return {
            _key: uuid(),
            _type: a.type,
            sizeClothes: a.value.toString(),
          };
        case "sizePants":
          return {
            _key: uuid(),
            _type: a.type,
            sizePants: a.value.toString(),
          };
        case "sizeGloves":
          return {
            _key: uuid(),
            _type: a.type,
            sizeGloves: a.value.toString(),
          };
        case "sizeHats":
          return {
            _key: uuid(),
            _type: a.type,
            sizeHats: a.value.toString(),
          };
        case "sizeOther":
          return {
            _key: uuid(),
            _type: a.type,
            sizeOther: a.value.toString(),
          };
        case "caliber":
          return {
            _key: uuid(),
            _type: a.type,
            caliber: a.value.toString(),
          };
        case "thread":
          return {
            _key: uuid(),
            _type: a.type,
            thread: a.value.toString(),
          };
        case "barrelLength":
          return {
            _key: uuid(),
            _type: a.type,
            barrelLength: a.value.toString(),
          };
        case "stance":
          return {
            _key: uuid(),
            _type: a.type,
            stance: a.value.toString(),
          };
        case "experience":
          return {
            _key: uuid(),
            _type: a.type,
            experience: a.value.toString(),
          };
        default:
          break;
      }
    }
  });
  return attrs.filter(Boolean);
}
fs.writeFileSync("products.json", JSON.stringify(fullOwners));
fs.writeFileSync("variants.json", JSON.stringify(fullVariants));

// cat variants.json | jq -c '.[]' > variants.ndjson

// sanity dataset import products.ndjson development
