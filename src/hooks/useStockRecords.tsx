import { useQuery } from "react-query";
import {
  inventoryItemsKeys,
  stocksKeys,
  warehousesKeys,
} from "../constants/QUERY_KEYS";
import { App, DescriptionsProps } from "antd";
import {
  getItemRecord,
  getItemsNames,
  getWarehousesNames,
} from "../helpers/apiFunctions";
import { useEffect, useState } from "react";
import { Stocks, StocksWithDetails } from "../types/db";
import { formatNumber } from "../helpers/functions";
import useAuthStore from "../store/auth";

interface HookReturn {
  warehouses: string[];
  items: string[];
  tableItems: DescriptionsProps["items"];
  handleWarehouse: (warehouse: string) => void;
  handleItem: (item: string) => void;
  record: Stocks | undefined;
  isLoading: boolean;
}

function useStockRecords(): HookReturn {
  const { message } = App.useApp();
  const [warehouse, setWarehouse] = useState<string>("");
  const [item, setItem] = useState<string>("");

  const handleWarehouse = (warehouse: string) => setWarehouse(warehouse);
  const handleItem = (item: string) => setItem(item);

  const { data: warehouses } = useQuery({
    queryKey: warehousesKeys.getWarehousesNames,
    queryFn: async (): Promise<string[]> => {
      const warehouses = await getWarehousesNames();
      return warehouses.map((warehouse) => warehouse.name);
    },
    onError: () => {
      message.error("Failed to Load Warehouses Names");
    },
  });

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getItemsNames,
    queryFn: async (): Promise<string[]> => {
      const items = await getItemsNames();
      return items.map((item) => item.name);
    },
    onError: () => {
      message.error("Failed to Load Items Names");
    },
  });

  const { userProfile } = useAuthStore();

  useEffect(() => {
    if (warehouses && warehouses.length > 0 && items && items.length > 0) {
      handleWarehouse(userProfile?.warehouse || warehouses[0]);
      handleItem(items[0]);
    }
  }, [warehouses, items, userProfile]);

  const {
    data: record,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [stocksKeys.getItemRecordWithDetails, warehouse, item],
    queryFn: async (): Promise<StocksWithDetails> => {
      const record = await getItemRecord(warehouse, item);
      return record;
    },
    onError: () => {
      message.error("Failed to Load Item");
    },
  });

  const tableItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Balance in Store",
      children: (
        <div className="flex">
          <span className="w-1/2">
            {formatNumber(record?.balance || 0)} {record?.item_info.unit}
          </span>
        </div>
      ),
    },
    {
      key: "2",
      label: "Dispatched",
      children: (
        <div className="flex">
          <span className="w-1/2">
            {formatNumber(record?.dispatched || 0)} {record?.item_info.unit}
          </span>
        </div>
      ),
    },
    {
      key: "3",
      label: "Received",
      children: (
        <div className="flex">
          <span className="w-1/2">
            {formatNumber(record?.received || 0)} {record?.item_info.unit}
          </span>
        </div>
      ),
    },
    ...(record?.item_info.type === "product"
      ? [
          {
            key: "4",
            label: "Packaged",
            children: (
              <div className="flex">
                <span className="w-1/2">
                  {formatNumber(record?.packaged_received || 0)}{" "}
                  {record?.item_info.unit}
                </span>
              </div>
            ),
          },
          {
            key: "4",
            label: "Damaged",
            children: (
              <div className="flex">
                <span className="w-1/2">
                  {formatNumber(record?.damaged || 0)} {record?.item_info.unit}
                </span>
              </div>
            ),
          },
          {
            key: "4",
            label: "Estimated Value",
            children: (
              <div className="flex">
                <span className="w-1/2">
                  ₦
                  {record.balance &&
                    record.item_info.unit_price &&
                    formatNumber(record?.balance * record.item_info.unit_price)}
                </span>
              </div>
            ),
          },
        ]
      : []),
  ];

  return {
    items: items || [],
    warehouses: warehouses || [],
    tableItems,
    handleItem,
    handleWarehouse,
    isLoading: isLoading || isRefetching,
    record,
  };
}

export default useStockRecords;
