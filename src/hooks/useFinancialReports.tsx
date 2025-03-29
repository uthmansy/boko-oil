import { useQuery } from "react-query";
import { App } from "antd";
import { financialReportsKeys } from "../constants/QUERY_KEYS"; // Update to sales query keys
import { FinancialReport } from "../types/api";
import { getMonthlyFinancialReprots } from "../helpers/apiFunctions";

interface HookReturn {
  reports: FinancialReport[]; // Update to Sales array
  isLoading: boolean;
  isRefetching: boolean;
}

function useFinancialReports(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();

  const { data, isLoading, isRefetching } = useQuery(
    financialReportsKeys.getAll,
    {
      queryFn: async () => {
        const reports = await getMonthlyFinancialReprots();
        return reports;
      },
      onError: (error) => {
        message.error(error as string);
      },
    }
  );

  return {
    reports: data || [], // Update to Sales array
    isLoading,
    isRefetching,
  };
}

export default useFinancialReports; // Export updated hook name
