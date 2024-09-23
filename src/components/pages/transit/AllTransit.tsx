import { Table } from "antd";
import useTransit from "../../../hooks/useTransit";
import { useVehicleColumns } from "../../../tableColumns/vehicles";
import FormBuilder from "../../utils/FormBuilder";

function AllTransit() {
  const {
    isLoading,
    vehicles,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    filterFormConfig,
    handleSubmit,
  } = useTransit();

  const { transitColumns } = useVehicleColumns();

  return (
    <>
      <FormBuilder
        formConfig={filterFormConfig}
        onSubmit={handleSubmit}
        loading={isLoading}
        showSubmitButton={false}
        styles={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px", // Optional: to add spacing between the columns
        }}
      />
      <Table
        size="small"
        loading={isLoading || isFetchingNextPage || isRefetching}
        columns={transitColumns}
        dataSource={vehicles}
        pagination={false} // Disable pagination
        scroll={{ y: 600 }}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
}

export default AllTransit;
