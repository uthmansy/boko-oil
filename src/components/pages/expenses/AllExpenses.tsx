import { Table } from "antd";
import { expensesAdminColumns } from "../../../tableColumns/expenses"; // Updated columns import
import useAllExpenses from "../../../hooks/useAllExpenses"; // Updated hook import
import FormBuilder from "../../utils/FormBuilder";

function AllExpenses() {
  const {
    isLoading,
    expenses,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    filterFormConfig,
    handleSubmit,
  } = useAllExpenses();

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
        columns={expensesAdminColumns} // Updated columns reference
        dataSource={expenses} // Updated data source
        pagination={false} // Disable pagination
        scroll={{ y: 450, x: "max-content" }}
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

export default AllExpenses;
