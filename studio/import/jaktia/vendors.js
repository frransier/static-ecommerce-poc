const fs = require("fs");
const uuid = require("uuid");
const getSlug = require("speakingurl");

const raw = fs.readFileSync("jaktia.json");
const products = JSON.parse(raw);
const vendors = [
  ...new Set(
    products.map(p => {
      return p.Brand;
    })
  )
];

const vendorFile = vendors.map(c => {
  return {
    _type: "vendor",
    _id: uuid(),
    _key: uuid(),
    title: c,
    slug: {
      current: getSlug(`${c}`, { truncate: 200, symbols: true })
    }
  };
});

fs.writeFileSync("vendors.json", JSON.stringify(vendorFile));
