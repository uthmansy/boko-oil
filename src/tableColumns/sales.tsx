import { ColumnsType } from "antd/es/table";
import { Sales } from "../types/db"; // Ensure this matches the updated Sales type
import { formatNumber } from "../helpers/functions";
import TableActions from "../components/pages/sales/TableActions";

export const salesAdminColumns: ColumnsType<Sales> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span>{text}</span>, // Adjust formatting as needed
    width: 100,
  },
  {
    title: "Customer",
    dataIndex: "customer_name",
    key: "customer_name",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 130,
  },
  {
    title: "Item",
    dataIndex: "item_purchased",
    key: "item_purchased",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 120,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => (
      <span className="italic">{`${formatNumber(text)} BAGS`}</span>
    ),
    width: 120,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    render: (text) => (
      <span className="italic text-red-700">
        {`${formatNumber(text)}`} bags
      </span>
    ),
    width: 120,
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => <span>{text || "N/A"}</span>, // Display "N/A" if null
    width: 170,
  },
  {
    title: "Customer Phone",
    dataIndex: "customer_phone",
    key: "customer_phone",
    render: (text) => <span>{text || "N/A"}</span>, // Display "N/A" if null
    width: 100,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <TableActions sale={record} orderNumber={record.order_number} />
    ),
  },
];
