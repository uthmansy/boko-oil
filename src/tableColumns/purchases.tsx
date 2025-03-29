import { ColumnsType } from "antd/es/table";
import { PurchasesAndPayments } from "../types/db";
import TableActions from "../components/pages/purchases/TableActions";
import { formatNumber } from "../helpers/functions";

export const purchasesAdminColumns: ColumnsType<PurchasesAndPayments> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 30,
    fixed: "left",
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
    width: 120,
  },
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
    width: 150,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => (
      <span className="italic">{`${formatNumber(text)}`} Pieces</span>
    ),
    width: 120,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => (
      <span className="italic text-green-700">{`₦${formatNumber(text)}`}</span>
    ),
    width: 120,
  },
  {
    title: "Amount Paid",
    dataIndex: "paid",
    key: "paid",
    render: (text) => (
      <span className="italic text-green-700">{`₦${formatNumber(text)}`}</span>
    ),
    width: 120,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    render: (text) => (
      <span className="italic text-red-700">{`₦${formatNumber(text)}`}</span>
    ),
    width: 120,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <TableActions purchase={record} />,
  },
];
