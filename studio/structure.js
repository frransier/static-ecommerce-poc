import S from "@sanity/desk-tool/structure-builder";
import {
  FaDiceD6,
  FaShoppingCart,
  FaClone,
  FaCopyright,
  FaTags,
  FaRegEdit,
  FaBook,
  FaRegCommentAlt,
  FaDollarSign,
  FaBars,
} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default () =>
  S.list()
    .title("Admin")
    .items([
      S.listItem()
        .title("Ecommerce")
        .icon(FaShoppingCart)
        .child(
          S.list()
            .title("Ecommerce")
            .items([
              S.listItem()
                .title("Products")
                .icon(FaDiceD6)
                .child(
                  S.documentList()
                    .title("Products")
                    .filter("_type == $type")
                    .params({ type: "product" }),
                ),
              S.listItem()
                .title("Variants")
                .icon(FaClone)
                .child(
                  S.documentList()
                    .title("Variants")
                    .filter("_type == $type")
                    .params({ type: "variant" }),
                ),
              S.listItem()
                .title("Brands")
                .icon(FaCopyright)
                .child(
                  S.documentList()
                    .title("Brands")
                    .filter("_type == $type")
                    .params({ type: "vendor" }),
                ),
              S.listItem()
                .title("Categories")
                .icon(FaTags)
                .child(
                  S.documentList()
                    .title("Categories")
                    .filter("_type == $type")
                    .params({ type: "category" }),
                ),
            ]),
        ),

      S.listItem()
        .title("Content")
        .icon(FaRegEdit)
        .child(
          S.list()
            .title("Content")
            .items([
              S.listItem()
                .title("Stories")
                .icon(FaBook)
                .child(
                  S.documentList()
                    .title("Stories")
                    .filter("_type == $type")
                    .params({ type: "story" }),
                ),
              S.listItem()
                .title("Blog posts")
                .icon(FaRegCommentAlt)
                .child(
                  S.documentList()
                    .title("Blog posts")
                    .filter("_type == $type")
                    .params({ type: "news" }),
                ),
            ]),
        ),

      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages"))
        .icon(FaBars),
      S.listItem()
        .title("Orders")
        .schemaType("order")
        .child(S.documentTypeList("order").title("Orders"))
        .icon(FaDollarSign),
      S.listItem()
        .title("Settings")
        .icon(IoIosSettings)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings"),
        ),
    ]);
