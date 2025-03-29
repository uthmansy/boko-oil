import { Space } from "antd";
import { InventoryItems } from "../../../types/db";
import EditItem from "./EditItem";

interface Props {
  item: InventoryItems;
}

function TableActions({ item }: Props) {
  return (
    <Space size="small">
      <EditItem item={item} />
    </Space>
  );
}

export default TableActions;
