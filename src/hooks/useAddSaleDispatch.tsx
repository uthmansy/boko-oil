import { useState } from "react";
import { FieldConfig } from "../types/comps";
import { App } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ZodError } from "zod";
import {
  addSaleDispatch,
  getAllUncompletedSales,
} from "../helpers/apiFunctions";
import { Sales, VehiclesAndDestination } from "../types/db";
import { salesKeys } from "../constants/QUERY_KEYS";
import { SaleDispatchSchema } from "../zodSchemas/saleDispatch";

interface HookReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  formConfig: FieldConfig[];
  handleSubmit: (values: any) => void;
  isLoading: boolean;
}

interface Props {
  vehicle: VehiclesAndDestination;
}

function useAddSaleDispatch({ vehicle }: Props): HookReturn {
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

  const { data: saleOrders } = useQuery({
    queryKey: salesKeys.getUncompletedSales,
    queryFn: async (): Promise<Sales[]> => {
      const orders = await getAllUncompletedSales();
      return orders;
    },
    onError: () => {
      message.error("Failed to Load Sale Orders");
    },
  });

  const formConfig: FieldConfig[] = [
    {
      name: "sale_id",
      label: "Sale Order",
      type: "select",
      options:
        saleOrders?.map((order) => ({
          label: `${order.customer_name} - ${order.item_purchased} - ${order.balance} Pieces remain`,
          value: order.id,
        })) || [],
      required: true,
    },
    {
      name: "dispatch_date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "qty_dispatched",
      label: "Quantity",
      type: "number",
      required: true,
    },
    {
      name: "destination",
      label: "Destination",
      type: "text",
      required: false,
    },
  ];

  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      try {
        values.dispatch_date = values.dispatch_date.format("YYYY-MM-DD");
        values.origin_vehicle = vehicle.id;
        const payload = await SaleDispatchSchema.parseAsync(values);
        await addSaleDispatch(payload);
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
      message.success("record added successfully");
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

export default useAddSaleDispatch; // Export updated hook name
