import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";
import { getAllDamages } from "../helpers/apiFunctions"; // Update to damages API function
import { DamagesWithDetails } from "../types/db"; // Update to damages type
import { App } from "antd";
import { damagesKeys } from "../constants/QUERY_KEYS"; // Update to damages query keys
import useAuthStore from "../store/auth";

interface HookReturn {
  damages: DamagesWithDetails[]; // Update to Damages array
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<DamagesWithDetails[], unknown>>; // Update to Damages type
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

function useAllDamages(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();
  const { userProfile } = useAuthStore();

  const fetchData = async ({ pageParam = 1 }) => {
    let isAdmin: boolean =
      userProfile?.role === "SUPER ADMIN" || userProfile?.role === "ADMIN";
    const damages = await getAllDamages(
      pageParam,
      isAdmin,
      userProfile?.warehouse
    ); // Update to damages API function
    return damages;
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(damagesKeys.getAllDamages, fetchData, {
    // Update to damages query keys
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

  const damages = data?.pages.flatMap((page) => page);

  return {
    damages: damages || [], // Update to Damages array
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  };
}

export default useAllDamages; // Export updated hook name
