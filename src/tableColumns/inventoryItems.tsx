import { ColumnsType } from "antd/es/table";
import { InventoryItems } from "../types/db";
import { Tag } from "antd";
import TableActions from "../components/pages/inventoryItems.tsx/TableActions";
import { formatNumber } from "../helpers/functions";

export const inventoryItemsAdminColumns: ColumnsType<InventoryItems> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="font-semibold capitalize">{text}</span>,
  },
  {
    title: "Item Code",
    key: "code",
    dataIndex: "code",
    render: (_, { code }) => (
      <>
        <Tag color="blue">{code}</Tag>
      </>
    ),
  },
  {
    title: "Item Type",
    key: "type",
    dataIndex: "type",
    render: (_, { type }) => (
      <>
        <Tag color="magenta">{type}</Tag>
      </>
    ),
  },
  {
    title: "Item Unit",
    key: "unit",
    dataIndex: "unit",
    render: (_, { unit }) => (
      <>
        <Tag color="geekblue">{unit}</Tag>
      </>
    ),
  },
  {
    title: "Unit Price",
    key: "unit_price",
    dataIndex: "unit_price",
    render: (_, { unit_price }) => (
      <>
        <Tag color="geekblue">
          {unit_price && `₦${formatNumber(unit_price)}`}
        </Tag>
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <TableActions item={record} />,
  },
];
