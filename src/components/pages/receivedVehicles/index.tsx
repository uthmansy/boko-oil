import { Typography } from "antd";
import { vehiclesKeys } from "../../../constants/QUERY_KEYS";
import RefreshButton from "../../RefreshButton";
import AllReceivedVehicles from "./AllReceivedVehicles";

function ReceivedVehicles() {
  return (
    <>
      <div className="mb-5 flex space-x-3 items-center">
        <RefreshButton queryKey={vehiclesKeys.getReceivedVehicles} />
        <Typography className="uppercase font-semibold">
          Received Vehicles
        </Typography>
      </div>
      <AllReceivedVehicles />
    </>
  );
}

export default ReceivedVehicles;
