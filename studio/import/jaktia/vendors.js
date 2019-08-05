const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const raw = fs.readFileSync("jaktia.json");
const products = JSON.parse(raw);
const vendors = [
  ...new Set(
    products.map(p => {
      return p.Brand;
    }),
  ),
];

const vendorFile = vendors.map(c => {
  const number = getRandomInt(5);
  return {
    _type: "vendor",
    _id: uuid(),
    _key: uuid(),
    title: c,
    logo: {
      _type: "image",
      _sanityAsset: `image@file:///Users/mattiasravand/downloads/temp/placeholder${number}.jpg`,
    },
    slug: {
      current: getSlug(`${c}`, { truncate: 200, symbols: true }),
    },
  };
});

fs.writeFileSync("vendors.json", JSON.stringify(vendorFile));
