import { Table } from "antd";
import { departmentsAdminColumns } from "../../../tableColumns/departments"; // Updated columns import
import useAllDepartments from "../../../hooks/useAllDepartments"; // Updated hook import

function AllDepartments() {
  const {
    isLoading,
    departments,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllDepartments();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={departmentsAdminColumns} // Updated columns reference
      dataSource={departments} // Updated data source
      pagination={false} // Disable pagination
      scroll={{ y: 600 }}
      onScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          fetchNextPage();
        }
      }}
    />
  );
}

export default AllDepartments;
