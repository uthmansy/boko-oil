import { Space } from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import ViewWaybill from "../../ViewWaybill";
import Package from "./Package";
import AddExpense from "./AddExpense";

interface Props {
  vehicle: VehiclesAndDestination;
}

function TableActions({ vehicle }: Props) {
  return (
    <Space size="small">
      <ViewWaybill vehicle={vehicle} type="received" />
      <ViewWaybill vehicle={vehicle} type="info" />
      {!vehicle.packaged && <Package vehicle={vehicle} />}
      <AddExpense vehicle={vehicle} />
    </Space>
  );
}

export default TableActions;
