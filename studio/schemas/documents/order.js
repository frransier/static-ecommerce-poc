import { FaDollarSign } from "react-icons/fa";

export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "email",
      title: "Email",
      type: "string"
    },
    {
      name: "status",
      title: "Order status",
      type: "string"
    },
    {
      name: "orderId",
      title: "Klarna order id",
      type: "string"
    },
    {
      name: "orderDate",
      title: "Order date",
      type: "datetime"
    },
    {
      name: "total",
      title: "Order value",
      type: "number"
    },
    {
      name: "acknowledged",
      title: "Confirmed by Klarna",
      type: "boolean"
    },
    {
      name: "orderItems",
      title: "Order items",
      type: "array",
      of: [
        {
          type: "string"
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "email",
      total: "total",
      dateString: "orderDate"
    },
    prepare(selection) {
      const { title, total, dateString } = selection;
      const date = new Date(dateString);
      return {
        title: title,
        media: FaDollarSign,
        subtitle: `${total} kr | ${date.getDate()}/${date.getMonth()} ${date.getFullYear()}`
      };
    }
  }
};
