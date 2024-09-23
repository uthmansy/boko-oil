import { Space } from "antd";
import { Expenses } from "../../../types/db";
import DeleteExpense from "./DeleteExpense";
import ApproveExpense from "./ApproveExpense";

interface Props {
  expense: Expenses;
}

function TableActions({ expense }: Props) {
  return (
    <Space size="small">
      {!expense.approved && (
        <>
          <DeleteExpense expense={expense} />
          <ApproveExpense expense={expense} />
        </>
      )}
    </Space>
  );
}

export default TableActions;
