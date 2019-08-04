const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");

const raw = fs.readFileSync("jaktia.json");
const products = JSON.parse(raw);
const mainCats = [
  ...new Set(
    products.map(p => {
      return p.MainGroup;
    })
  )
];

const subCats = [
  ...new Set(
    products.map(p => {
      return p.SubGroup;
    })
  )
];

const mainCatFile = mainCats.map(c => {
  return {
    _type: "category",
    _id: uuid(),
    _key: uuid(),
    title: c,
    slug: {
      current: getSlug(`${c}`, { truncate: 200, symbols: true })
    }
  };
});
const subCatFile = subCats.map(c => {
  return {
    _type: "category",
    _id: uuid(),
    _key: uuid(),
    title: c,
    slug: {
      current: getSlug(`${c}`, { truncate: 200, symbols: true })
    }
  };
});

const cats = [...mainCatFile, ...subCatFile];

fs.writeFileSync("categories.json", JSON.stringify(cats));

console.log(mainCats);
