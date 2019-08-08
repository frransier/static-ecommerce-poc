const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");

const raw = fs.readFileSync("jaktia.json");
const products = JSON.parse(raw);
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
        clubJaktia: Math.round(randomPrice * 0.8).toString()
      };
    })
  )
];

fs.writeFileSync("variants.json", JSON.stringify(variants));

console.log(variants.length);

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
    { type: "experience", value: p.Experience }
  ];

  const attrs = allAttributes.map(a => {
    if (a.value) {
      switch (a.type) {
        case "color":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "sizeShoes":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "sizeClothes":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "sizePants":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "sizeGloves":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "sizeHats":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "sizeOther":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "caliber":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "thread":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "barrelLength":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "stance":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        case "experience":
          return {
            _key: uuid(),
            _type: a.type,
            value: a.value.toString()
          };
        default:
          break;
      }
    }
  });

  return attrs.filter(Boolean);
}
