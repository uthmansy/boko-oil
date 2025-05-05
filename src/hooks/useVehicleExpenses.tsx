import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllVehicleExpenses } from "../helpers/apiFunctions"; // Update to vehicle expenses API function
import { VehicleExpensesDetails } from "../types/db"; // Update to vehicle expense type
import { App } from "antd";
import { vehicleExpenseKeys } from "../constants/QUERY_KEYS"; // Update to vehicle expense query keys

interface HookReturn {
  vehicleExpenses: VehicleExpensesDetails[]; // Update to Vehicle Expenses array
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<VehicleExpensesDetails[], unknown>>; // Update to Vehicle Expense type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  vehicle_id?: string;
}

function useVehicleExpenses({ vehicle_id }: Props): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const vehicleExpenses = await getAllVehicleExpenses(pageParam, vehicle_id); // Update to vehicle expenses API function
    return vehicleExpenses;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [vehicleExpenseKeys.getAllPaginated, vehicle_id],
    fetchData,
    {
      // Update to vehicle expense query keys
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 10) {
          return allPages.length + 1; // Increment page number
        }
        return undefined; // No more pages to fetch
      },
      onError: (error) => {
        message.error(error as string);
      },
    }
  );

  const vehicleExpenses = data?.pages.flatMap((page) => page);

  return {
    vehicleExpenses: vehicleExpenses || [], // Update to Vehicle Expenses array
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useVehicleExpenses; // Export updated hook name
