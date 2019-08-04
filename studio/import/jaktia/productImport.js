const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");

const jaktiaJson = JSON.parse(fs.readFileSync("jaktia.json"));
const vendors = JSON.parse(fs.readFileSync("vendors.json"));
const categories = JSON.parse(fs.readFileSync("categories.json"));

const init = jaktiaJson.map(p => {
  return {
    _type: "product",
    _id: uuid(),
    _key: uuid(),
    title: `${p.ArticleName}`,
    vendor: `${p.Brand}`,
    productId: `${p.ArticleIdentifier}`,
    productIdentifier: `${p.ProductIdentifier}`,
    productName: `${p.ProductName}`,
    articleName: `${p.ArticleName}`,
    intro: `${p.DescriptionShort}`,
    body: `${p.DescriptionLong}`,
    mainGroup: `${p.MainGroup}`,
    subGroup: `${p.SubGroup}`,
    categories0: `${p.MainGroup}`,
    categories1: `${p.MainGroup} > ${p.SubGroup}`,
    color: `${p.Color}`,
    sizeShoes: `${p.SizeShoes}`,
    sizeClothes: `${p.SizeClothes}`,
    sizePants: `${p.SizeTrousers}`,
    sizeGloves: `${p.SizeGloves}`,
    sizeHats: `${p.SizeHats}`,
    sizeOther: `${p.SizeOther}`,
    caliber: `${p.Caliber}`,
    thread: `${p.Thread}`,
    barrelLength: `${p.BarrelLengthcm}`,
    stance: `${p.Stance}`,
    experience: `${p.Experience}`
  };
});

console.log("initial: ", init.length);

const products = init.filter(Boolean);

const initOwners = products.map(p => {
  if (p.productName === p.articleName) {
    const random1 = getRandomInt(7);
    const random2 = getRandomInt(7);
    const random3 = getRandomInt(7);
    const random4 = getRandomInt(7);
    const random5 = getRandomInt(7);

    return {
      _type: p._type,
      _id: p._id,
      _key: p._key,
      title: p.title,
      productId: p.productId,
      intro: p.intro,
      body: p.body,
      categories0: p.categories0,
      categories1: p.categories1,
      mainImage: {
        _type: "image",
        _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random1}.jpg`
      },

      attributes: getAttributes(p),
      vendor: getVendor(vendors, p.vendor),
      variants: getVariants(products, p),
      categories: [
        getCategory(categories, p.mainGroup),
        getCategory(categories, p.subGroup)
      ],
      images: [
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random2}.jpg`
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random3}.jpg`
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random4}.jpg`
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random5}.jpg`
        }
      ],
      tags: [],
      slug: {
        current: getSlug(`${p.title}`, { truncate: 200, symbols: true })
      }
    };
  }
});

const owners = [...new Set(initOwners.filter(Boolean))];
console.log("owners: ", owners.length);

const initVariants = products.map(p => {
  if (p.productIdentifier.substring(2) !== p.productId.toString()) {
    const random1 = getRandomInt(7);
    const random2 = getRandomInt(7);
    const random3 = getRandomInt(7);
    const random4 = getRandomInt(7);
    const random5 = getRandomInt(7);

    return {
      _type: p._type,
      _id: p._id,
      _key: p._key,
      title: p.title,
      productId: p.productId,
      intro: p.intro,
      body: p.body,
      categories0: p.categories0,
      categories1: p.categories1,
      mainImage: {
        _type: "image",
        _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random1}.jpg`
      },

      attributes: getAttributes(p),
      vendor: getVendor(vendors, p.vendor),
      parentProduct: getProduct(products, p),
      categories: [
        getCategory(categories, p.mainGroup),
        getCategory(categories, p.subGroup)
      ],
      images: [
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random2}.jpg`
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random3}.jpg`
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random4}.jpg`
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/projects/placeholder${random5}.jpg`
        }
      ],
      tags: []
    };
  }
});

const variants = [...new Set(initVariants.filter(Boolean))];

console.log("variants: ", variants.length);
//console.log(variantCheck);

const allProducts = [...owners, ...variants];

console.log("all: ", allProducts.length);

const filteredArr = allProducts.reduce((acc, current) => {
  const x = acc.find(item => item._id === current._id);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);

console.log(filteredArr.length);

fs.writeFileSync("products.json", JSON.stringify(filteredArr));
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getAttributes(p) {
  const allAttributes = [
    { type: "color", value: p.color },
    { type: "sizeShoes", value: p.sizeShoes },
    { type: "sizeClothes", value: p.sizeClothes },
    { type: "sizePants", value: p.sizePants },
    { type: "sizeGloves", value: p.sizeGloves },
    { type: "sizeHats", value: p.sizeHats },
    { type: "sizeOther", value: p.sizeOther },
    { type: "caliber", value: p.caliber },
    { type: "thread", value: p.thread },
    { type: "barrelLength", value: p.barrelLength },
    { type: "stance", value: p.stance },
    { type: "experience", value: p.experience }
  ];
  // console.log(allAttributes);

  const attrs = allAttributes.map(a => {
    if (a.value) {
      switch (a.type) {
        case "color":
          return {
            _key: uuid(),
            _type: a.type,
            color: a.value.toString()
          };
        case "sizeShoes":
          return {
            _key: uuid(),
            _type: a.type,
            sizeShoes: a.value.toString()
          };
        case "sizeClothes":
          return {
            _key: uuid(),
            _type: a.type,
            sizeClothes: a.value.toString()
          };
        case "sizePants":
          return {
            _key: uuid(),
            _type: a.type,
            sizePants: a.value.toString()
          };
        case "sizeGloves":
          return {
            _key: uuid(),
            _type: a.type,
            sizeGloves: a.value.toString()
          };
        case "sizeHats":
          return {
            _key: uuid(),
            _type: a.type,
            sizeHats: a.value.toString()
          };
        case "sizeOther":
          return {
            _key: uuid(),
            _type: a.type,
            sizeOther: a.value.toString()
          };
        case "caliber":
          return {
            _key: uuid(),
            _type: a.type,
            caliber: a.value.toString()
          };
        case "thread":
          return {
            _key: uuid(),
            _type: a.type,
            thread: a.value.toString()
          };
        case "barrelLength":
          return {
            _key: uuid(),
            _type: a.type,
            barrelLength: a.value.toString()
          };
        case "stance":
          return {
            _key: uuid(),
            _type: a.type,
            stance: a.value.toString()
          };
        case "experience":
          return {
            _key: uuid(),
            _type: a.type,
            experience: a.value.toString()
          };
        default:
          break;
      }
    }
  });

  return attrs.filter(Boolean);
}

function getVendor(vendors, brandName) {
  const vendor = vendors.find(v => v.title === brandName);
  if (vendor) return { _ref: vendor._id, _key: vendor._id, _type: "reference" };
}

function getVariants(products, p) {
  const hits = products
    .filter(v => v.productIdentifier === p.productIdentifier)
    .filter(Boolean);
  // console.log(hits.length);

  if (hits) {
    const variants = hits.map(h => {
      if (h._id !== p._id)
        return {
          _ref: h._id,
          _key: h._key,
          _type: "reference"
        };
    });
    //console.log(variants.filter(Boolean).length);

    return variants.filter(Boolean);
  }
}

function getCategory(categories, categoryName) {
  const category = categories.find(c => c.title === categoryName);
  if (category)
    return { _ref: category._id, _key: category._id, _type: "reference" };
}

function getProduct(products, p) {
  const product = products.find(
    p => p.productIdentifier === p.productIdentifier
  );

  if (product) {
    if (product._id !== p._id)
      return { _ref: product._id, _key: product._id, _type: "reference" };
  }
}
