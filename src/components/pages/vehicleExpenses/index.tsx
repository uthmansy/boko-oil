import { Table } from "antd";
import useVehicleExpenses from "../../../hooks/useVehicleExpenses";
import { vehicleExpensesColumns } from "../../../tableColumns/vehicleExpenses";

function VehicleExpenses() {
  const {
    isLoading,
    vehicleExpenses,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useVehicleExpenses();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={vehicleExpensesColumns}
      dataSource={vehicleExpenses}
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

export default VehicleExpenses;
