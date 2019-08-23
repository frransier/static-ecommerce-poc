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
  FaBars
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
                .child(S.documentTypeList("product").title("Products")),
              S.listItem()
                .title("Variants")
                .icon(FaClone)
                .child(S.documentTypeList("variant").title("Variants")),
              S.listItem()
                .title("Brands")
                .icon(FaCopyright)
                .child(S.documentTypeList("vendor").title("Brands")),
              S.listItem()
                .title("Categories")
                .icon(FaTags)
                .child(S.documentTypeList("category").title("Categories"))
            ])
        ),

      S.listItem()
        .title("Posts")
        .icon(FaRegEdit)
        .child(
          S.list()
            .title("Posts")
            .items([
              S.listItem()
                .title("Stories")
                .icon(FaBook)
                .child(S.documentTypeList("story").title("Stories")),
              S.listItem()
                .title("Blog posts")
                .icon(FaRegCommentAlt)
                .child(S.documentTypeList("news").title("Blog posts"))
            ])
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
            .documentId("settings")
        )
    ]);
