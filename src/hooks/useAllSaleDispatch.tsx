import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllSaleDispatches } from "../helpers/apiFunctions"; // Update to sales API function
import { SaleDispatchJoined, VehiclesAndDestination } from "../types/db"; // Update to sales type
import { App } from "antd";
import { saleDispatchKeys } from "../constants/QUERY_KEYS"; // Update to sales query keys

interface HookReturn {
  dispatches: SaleDispatchJoined[]; // Update to Sales array
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<SaleDispatchJoined[], unknown>>; // Update to Sales type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface Props {
  vehicle: VehiclesAndDestination;
}

function useAllSaleDispatch({ vehicle }: Props): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const fetchData = async ({ pageParam = 1 }) => {
    const dispatches = await getAllSaleDispatches(pageParam, vehicle.id); // Update to sales API function
    return dispatches;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(saleDispatchKeys.getVehicleSaleDispatches, fetchData, {
    // Update to sales query keys
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 10) {
        return allPages.length + 1; // Increment page number
      }
      return undefined; // No more pages to fetch
    },
    onError: (error) => {
      message.error(error as string);
    },
  });

  const dispatches = data?.pages.flatMap((page) => page);

  return {
    dispatches: dispatches || [], // Update to Sales array
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllSaleDispatch; // Export updated hook name
