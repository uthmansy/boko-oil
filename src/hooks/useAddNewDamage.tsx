import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { addDamage, getInventoryItems } from "../helpers/apiFunctions"; // Update to damage API function
import { DamagesSchema } from "../zodSchemas/damages"; // Update to damage schema
import useAuthStore from "../store/auth";
import { InventoryItems } from "../types/db";
import { inventoryItemsKeys } from "../constants/QUERY_KEYS";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewDamage(): HookReturn {
  // Updated hook name
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data: items } = useQuery({
    queryKey: inventoryItemsKeys.getAllProducts,
    queryFn: async (): Promise<InventoryItems[]> => {
      const items = await getInventoryItems();
      return items;
    },
    onError: () => {
      message.error("Failed to Load Inventory Items");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "item",
      label: "Item",
      type: "select",
      required: true,
      options:
        items
          ?.filter((item) => item.type === "product")
          .map((item) => ({ label: item.name, value: item.name })) || [],
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
    },
  ];
  const { userProfile } = useAuthStore();

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.date = values.date.format("YYYY-MM-DD");
        values.added_by = userProfile?.username;
        values.warehouse = userProfile?.warehouse;
        await DamagesSchema.parseAsync(values); // Update to damage schema validation
        await addDamage(values); // Update to damage API function
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Zod Validation failed:", error.errors);
          throw error; // Re-throw the ZodError to be caught by the onError handler
        } else if (error instanceof Error) {
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
      message.success("Damage record added successfully");
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
  };
}

export default useAddNewDamage; // Export updated hook name
