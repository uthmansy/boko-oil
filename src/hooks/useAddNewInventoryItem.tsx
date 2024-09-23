import { useState } from "react";
import { FieldConfig, SelectOption } from "../types/comps";
import { INVENTORY_ITEM_TYPE } from "../constants/ENUMS";
import { App } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ZodError } from "zod";
import { addInventoryItem } from "../helpers/apiFunctions";
import { InventoryItemSchema } from "../zodSchemas/inventoryItems";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

function useAddNewInventoryItem(): HookReturn {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const itemTypeOptions: SelectOption[] = INVENTORY_ITEM_TYPE.map((state) => ({
    value: state,
    label: state.charAt(0).toUpperCase() + state.slice(1),
  }));

  const formConfig: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      required: true,
      rules: [
        {
          pattern: /^[A-Z0-9]{2}$/,
          message: "Code must be 2-letter uppercase or 2 integer numbers",
        },
      ],
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: itemTypeOptions,
      required: true,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        await InventoryItemSchema.parseAsync(values);
        await addInventoryItem(values);
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
      message.success("Item added successfully");
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

export default useAddNewInventoryItem;
