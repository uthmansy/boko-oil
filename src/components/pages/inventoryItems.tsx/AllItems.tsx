import { Table } from "antd";
import useAllItems from "../../../hooks/useAllItems";
import { inventoryItemsAdminColumns } from "../../../tableColumns/inventoryItems";

function AllItems() {
  const { isLoading, items, fetchNextPage, isFetchingNextPage, isRefetching } =
    useAllItems();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={inventoryItemsAdminColumns}
      dataSource={items}
      pagination={false} // Disable pagination
      scroll={{ y: 600, x: 800 }}
      onScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          fetchNextPage();
        }
      }}
    />
  );
}

export default AllItems;
