import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";

import useAuthStore from "../store/auth";
import { VehiclesAndDestination } from "../types/db";
import { getInventoryItems, packageVehicle } from "../helpers/apiFunctions";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS";
import PackageSchema from "../zodSchemas/package";

interface Props {
  vehicle: VehiclesAndDestination;
}

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
  shortage: number;
  onValuesChange: (values: any) => void;
}

function usePackage({ vehicle }: Props): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [shortage, setShortage] = useState<number>(0);

  const onValuesChange = (values: any) => {
    if (values.qty_received)
      setShortage(vehicle.qty_carried - values.qty_received);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getAllProducts,
    queryFn: async (): Promise<SelectOption[]> => {
      const items = await getInventoryItems();
      return items
        .filter((item) => item.type === "product")
        .map((item) => ({ label: item.name, value: item.name }));
    },
    onError: () => {
      message.error("Failed to Load Inventory Items");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "date_packaged",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "item_packaged",
      label: "Item Packaged",
      type: "select",
      required: true,
      options: items || [],
    },
    {
      name: "qty_packaged",
      label: "Quantity Packaged",
      type: "number",
      required: true,
    },
    // {
    //   name: "shortage",
    //   label: "Shortage",
    //   type: "number",
    //   required: true,
    //   dependencies: ["qty_received"],
    //   getValueFromDependency: (values) => {
    //     const stock = origins?.find(
    //       (origin) => origin.id === values?.external_origin_id
    //     )?.stock_purchases.item;

    //     return stock;
    //   },
    // },
  ];

  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date_packaged = values.date_packaged.format("YYYY-MM-DD");
        values.packaged_by = userProfile?.username;
        values.packaged = true;
        values.id = vehicle.id;
        await PackageSchema.parseAsync(values);
        await packageVehicle(values);
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle ZodError separately to extract and display validation errors
          console.error("Zod Validation failed:", error.errors);
          throw error; // Re-throw the ZodError to be caught by the onError handler
        } else if (error instanceof Error) {
          // Handle other types of errors
          console.error("An unexpected error occurred:", error.message);
          throw new Error(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
        }
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      message.success("Vehicle Received successfully");
      handleCloseModal();
      queryClient.invalidateQueries();
    },
  });

  return {
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    formConfig,
    handleSubmit,
    isLoading,
    shortage,
    onValuesChange,
  };
}

export default usePackage;
