import { ColumnsType } from "antd/es/table";
import { InventoryItems } from "../types/db";
import { Tag } from "antd";

export const inventoryItemsAdminColumns: ColumnsType<InventoryItems> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: "5%",
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
];
