import { Space } from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import ViewWaybill from "../../ViewWaybill";
import ViewReceievdVehicle from "./ViewReceievdVehicle";

interface Props {
  vehicle: VehiclesAndDestination;
}

function TableActions({ vehicle }: Props) {
  return (
    <Space size="small">
      <ViewWaybill vehicle={vehicle} type="received" />
      <ViewWaybill vehicle={vehicle} type="info" />
      <ViewReceievdVehicle vehicle={vehicle} />
    </Space>
  );
}

export default TableActions;
