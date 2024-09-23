import RefreshButton from "../../RefreshButton";
import { expensesKeys } from "../../../constants/QUERY_KEYS"; // Updated query keys import
import AddNew from "./AddNew"; // Assuming AddNew is also updated for expenses
import AllExpenses from "./AllExpenses"; // Renamed component for displaying all expenses

function Expenses() {
  return (
    <>
      <div className="mb-5 flex space-x-3">
        <RefreshButton queryKey={expensesKeys.getExpenses} />
        {/* Updated query key */}
        <AddNew />
      </div>
      <AllExpenses /> {/* Updated component */}
    </>
  );
}

export default Expenses;
