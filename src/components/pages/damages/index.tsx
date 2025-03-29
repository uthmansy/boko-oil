import { damagesKeys } from "../../../constants/QUERY_KEYS";
import useAuthStore from "../../../store/auth";
import RefreshButton from "../../RefreshButton";
import AddNew from "./AddNew";
import AllDamages from "./AllDamages";

function Damages() {
  const { userProfile } = useAuthStore();
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={damagesKeys.getAllDamages} />
        {(userProfile?.role === "SUPER ADMIN" ||
          userProfile?.role === "ADMIN" ||
          userProfile?.role === "INVENTORY") && <AddNew />}
      </div>
      <AllDamages />
    </>
  );
}

export default Damages;
