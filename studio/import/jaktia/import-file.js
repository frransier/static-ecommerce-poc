const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");
const raw = fs.readFileSync("jaktia.json");
const products = JSON.parse(raw);

// Create categories
const mainCats = [
  ...new Set(
    products.map(p => {
      return p.MainGroup;
    }),
  ),
];

const subCats = [
  ...new Set(
    products.map(p => {
      return p.SubGroup;
    }),
  ),
];

const mainCatFile = mainCats.map(c => {
  return {
    _type: "category",
    _id: uuid(),
    _key: uuid(),
    title: c,
    slug: {
      current: getSlug(`${c}`, { truncate: 200, symbols: true }),
    },
  };
});
const subCatFile = subCats.map(c => {
  return {
    _type: "category",
    _id: uuid(),
    _key: uuid(),
    title: c,
    slug: {
      current: getSlug(`${c}`, { truncate: 200, symbols: true }),
    },
  };
});

const categories = [...mainCatFile, ...subCatFile];

console.log("Categories: ", categories.length);

// Create vendors
const vendorsInit = [
  ...new Set(
    products.map(p => {
      return p.Brand;
    }),
  ),
];

const vendors = vendorsInit.map(c => {
  const number = getRandomInt(15);
  return {
    _type: "vendor",
    _id: uuid(),
    _key: uuid(),
    title: c,
    logo: {
      _type: "image",
      _sanityAsset: `image@file:///Users/mravand/downloads/temp/placeholder${number}.jpg`,
    },
    slug: {
      current: getSlug(`${c}`, { truncate: 200, symbols: true }),
    },
  };
});

console.log("Vendors: ", vendors.length);

// Create variants
const variants = [
  ...new Set(
    products.map(p => {
      const randomPrice = getRandomInt(3000);
      return {
        _type: "variant",
        _id: uuid(),
        _key: uuid(),
        articleNumber: `${p.ArticleIdentifier}`,
        title: p.ArticleName,
        attributes: getAttributes(p),
        parentIdentifier: p.ProductIdentifier,

        standard: randomPrice.toString(),
        discount: Math.round(randomPrice * 0.9).toString(),
        clubJaktia: Math.round(randomPrice * 0.8).toString(),
      };
    }),
  ),
];

console.log("Variants: ", variants.length);

const init = products.map(p => {
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

const initOwners = init.filter(Boolean).map(p => {
  if (p.productName === p.articleName) {
    const random1 = getRandomInt(15);
    const random2 = getRandomInt(15);
    const random3 = getRandomInt(15);
    const random4 = getRandomInt(15);
    const random5 = getRandomInt(15);

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
        _sanityAsset: `image@file:///Users/mravand/downloads/temp/placeholder${random1}.jpg`,
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
          _sanityAsset: `image@file:///Users/mravand/downloads/temp/placeholder${random2}.jpg`,
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/downloads/temp/placeholder${random3}.jpg`,
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/downloads/temp/placeholder${random4}.jpg`,
        },
        {
          _type: "image",
          _sanityAsset: `image@file:///Users/mravand/downloads/temp/placeholder${random5}.jpg`,
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

const all = [...categories, ...vendors, ...variants, ...filteredArr];
fs.writeFileSync("products.json", JSON.stringify(all));

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

// function getProduct(products, p) {
//   const product = products.find(
//     p => p.productIdentifier === p.productIdentifier
//   );

//   if (product) {
//     if (product._id !== p._id)
//       return { _ref: product._id, _key: product._id, _type: "reference" };
//   }
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
    { type: "experience", value: p.Experience },
  ];

  const attrs = allAttributes.map(a => {
    if (a.value) {
      switch (a.type) {
        case "color":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "sizeShoes":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "sizeClothes":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "sizePants":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "sizeGloves":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "sizeHats":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "sizeOther":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "caliber":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "thread":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "barrelLength":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "stance":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        case "experience":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString(),
          };
        default:
          break;
      }
    }
  });

  return attrs.filter(Boolean);
}
