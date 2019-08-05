const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");

const jaktiaJson = JSON.parse(fs.readFileSync("jaktia.json"));
const vendors = JSON.parse(fs.readFileSync("vendors.json"));
const categories = JSON.parse(fs.readFileSync("categories.json"));
const variants = JSON.parse(fs.readFileSync("variants.json"));

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
    experience: `${p.Experience}`,
  };
});

console.log("initial: ", init.length);

const products = init.filter(Boolean);

const initOwners = products.map(p => {
  if (p.productName === p.articleName) {
    const random1 = getRandomInt(8);
    const random2 = getRandomInt(8);
    const random3 = getRandomInt(8);
    const random4 = getRandomInt(8);
    const random5 = getRandomInt(8);

    return {
      _type: p._type,
      _id: p._id,
      _key: p._key,
      title: p.title,
      productNumber: p.productIdentifier,
      intro: p.intro,
      body: p.body,
      mainImage: {
        _type: "image",
        _sanityAsset: `image@file:///Users/mattiasravand/downloads/temp/placeholder${random1}.jpg`,
      },

      vendor: getVendor(vendors, p.vendor),
      variants: getVariants(variants, p),
      categories: [
        getCategory(categories, p.mainGroup),
        getCategory(categories, p.subGroup),
      ],
      images: [
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mattiasravand/downloads/temp/placeholder${random2}.jpg`,
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mattiasravand/downloads/temp/placeholder${random3}.jpg`,
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mattiasravand/downloads/temp/placeholder${random4}.jpg`,
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mattiasravand/downloads/temp/placeholder${random5}.jpg`,
        },
      ],
      tags: [],
      slug: {
        current: getSlug(`${p.title}`, { truncate: 200, symbols: true }),
      },
    };
  }
});

const owners = [...new Set(initOwners.filter(Boolean))];
console.log("owners: ", owners.length);

console.log("variants: ", variants.length);
//console.log(variantCheck);

const filteredArr = owners.reduce((acc, current) => {
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

function getVendor(vendors, brandName) {
  const vendor = vendors.find(v => v.title === brandName);
  if (vendor) return { _ref: vendor._id, _key: vendor._id, _type: "reference" };
}

function getVariants(variants, p) {
  const hits = variants
    .filter(v => v.parentIdentifier === p.productIdentifier)
    .filter(Boolean);
  console.log(hits.length);

  if (hits) {
    const variantz = hits.map(h => {
      return {
        _ref: h._id,
        _key: h._key,
        _type: "reference",
      };
    });
    //console.log(variants.filter(Boolean).length);

    return variantz.filter(Boolean);
  }
}

function getCategory(categories, categoryName) {
  const category = categories.find(c => c.title === categoryName);
  if (category)
    return { _ref: category._id, _key: category._id, _type: "reference" };
}

function getProduct(products, p) {
  const product = products.find(
    p => p.productIdentifier === p.productIdentifier,
  );

  if (product) {
    if (product._id !== p._id)
      return { _ref: product._id, _key: product._id, _type: "reference" };
  }
}
