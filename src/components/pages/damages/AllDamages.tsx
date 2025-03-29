import { Table } from "antd";
import useAllDamages from "../../../hooks/useAllDamages";
import { damagesAdminColumns } from "../../../tableColumns/damages";

function AllDamages() {
  const {
    isLoading,
    damages,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllDamages();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={damagesAdminColumns}
      dataSource={damages}
      pagination={false} // Disable pagination
      scroll={{ y: 450, x: "max-content" }}
      onScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          fetchNextPage();
        }
      }}
    />
  );
}

export default AllDamages;
