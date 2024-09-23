import { Space } from "antd";
import AddPayment from "./AddPayment";
import ViewPayments from "./ViewPayments";
import { Sales } from "../../../types/db";
import DeleteSale from "./DeleteSale";
import useAuthStore from "../../../store/auth";

interface Props {
  orderNumber: string;
  sale: Sales;
}

function TableActions({ orderNumber, sale }: Props) {
  const { userProfile } = useAuthStore();
  return (
    <Space size="small">
      {(userProfile?.role === "SUPER ADMIN" ||
        userProfile?.role === "ADMIN" ||
        userProfile?.role === "ACCOUNTING") && (
        <AddPayment orderNumber={orderNumber} />
      )}
      <ViewPayments sale={sale} orderNumber={orderNumber} />
      {sale.quantity_taken === 0 &&
        (userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN") && <DeleteSale sale={sale} />}
    </Space>
  );
}

export default TableActions;
