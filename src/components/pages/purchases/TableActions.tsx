import { Space } from "antd";
import AddPayment from "./AddPayment";
import ViewPayments from "./ViewPayments";

interface Props {
  orderNumber: string;
}

function TableActions({ orderNumber }: Props) {
  return (
    <Space size="small">
      <AddPayment orderNumber={orderNumber} />
      <ViewPayments orderNumber={orderNumber} />
    </Space>
  );
}

export default TableActions;
