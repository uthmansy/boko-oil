import { Table } from "antd";
import { enrollmentAdminColumns } from "../../../tableColumns/enrollment"; // Updated columns import
import useAllEnrollment from "../../../hooks/useAllEnrollment"; // Updated hook import

function AllEnrollment() {
  const {
    isLoading,
    enrollment,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useAllEnrollment();

  return (
    <Table
      size="small"
      loading={isLoading || isFetchingNextPage || isRefetching}
      columns={enrollmentAdminColumns} // Updated columns reference
      dataSource={enrollment} // Updated data source
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

export default AllEnrollment;
