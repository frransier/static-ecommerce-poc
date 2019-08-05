// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import product from "./product";
import vendor from "./vendor";
import variant from "./variant";

// Attributes
import barrelLength from "./attributes/barrelLength";
import caliber from "./attributes/caliber";
import color from "./attributes/color";
import experience from "./attributes/experience";
import sizeClothes from "./attributes/sizeClothes";
import sizeGloves from "./attributes/sizeGloves";
import sizeHats from "./attributes/sizeHats";
import sizeOther from "./attributes/sizeOther";
import sizePants from "./attributes/sizePants";
import sizeShoes from "./attributes/sizeShoes";
import stance from "./attributes/stance";
import thread from "./attributes/thread";

import localeString from "./locale/String";
import localeText from "./locale/Text";
import localeBlockContent from "./locale/BlockContent";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    product,
    vendor,
    category,

    // Attribues
    barrelLength,
    caliber,
    color,
    experience,
    sizeClothes,
    sizeGloves,
    sizeHats,
    sizeOther,
    sizePants,
    sizeShoes,
    stance,
    thread,

    blockContent,
    localeText,
    localeBlockContent,
    localeString,
    variant,
  ]),
});
