import { Table } from "antd";
import useAllSaleDispatch from "../../../hooks/useAllSaleDispatch";
import { VehiclesAndDestination } from "../../../types/db";
import { saleDispatchColumns } from "../../../tableColumns/saleDispatch";

interface Props {
  vehicle: VehiclesAndDestination;
}

function AllSaleDispatch({ vehicle }: Props) {
  const {
    isLoading,
    dispatches,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllSaleDispatch({ vehicle });

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={saleDispatchColumns}
      dataSource={dispatches}
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

export default AllSaleDispatch;
