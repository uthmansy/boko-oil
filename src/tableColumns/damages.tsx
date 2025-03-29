import { ColumnsType } from "antd/es/table";
import { DamagesWithDetails } from "../types/db"; // Ensure this matches the updated Sales type
import { formatNumber } from "../helpers/functions";

export const damagesAdminColumns: ColumnsType<DamagesWithDetails> = [
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
    title: "Item",
    dataIndex: "item",
    key: "item",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 120,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => (
      <span className="italic">{`${formatNumber(text)} Pieces`}</span>
    ),
    width: 120,
  },
];
