import {
  Button,
  Descriptions,
  DescriptionsProps,
  Modal,
  Tabs,
  TabsProps,
} from "antd";
import { VehiclesAndDestination } from "../../../types/db";
import Package from "./Package";
import { useState } from "react";
import AllSaleDispatch from "./AllSaleDispatch";
import useDashboard from "../../../hooks/useDashboard";
import AddSaleDispatch from "./AddSaleDispatch";
import { formatNumber } from "../../../helpers/functions";
import EditVechicle from "./EditVehicle";
import AddExpense from "./AddExpense";
import VehicleExpenses from "../vehicleExpenses";

interface Props {
  vehicle: VehiclesAndDestination;
}

function ViewReceievdVehicle({ vehicle }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const descs: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Waybill Number",
      children: vehicle.waybill_number,
    },
    {
      key: "2",
      label: "Date Dispatched",
      children: vehicle?.date_dispatched,
    },
    {
      key: "3",
      label: "Date Received",
      children: vehicle?.date_received || "NA",
    },
    {
      key: "4",
      label: "Transport",
      children: vehicle?.transporter || "NA",
    },
    {
      key: "5",
      label: "Driver",
      children: vehicle?.driver_name,
    },
    {
      key: "6",
      label: "Item",
      children: vehicle?.item,
    },
    {
      key: "7",
      label: "Quantity Carried",
      children: `${vehicle?.qty_carried} ${vehicle.item_info.unit}`,
    },
    {
      key: "8",
      label: "Quantity Received",
      children: `${vehicle?.qty_received} ${vehicle.item_info.unit}`,
    },
    {
      key: "9",
      label: "Item Packaged",
      children: vehicle?.item_packaged,
    },
    {
      key: "10",
      label: "Quantity Packaged",
      children: `${vehicle?.qty_packaged}`,
    },
    {
      key: "11",
      label: "Quantity Dispatched",
      children: `${vehicle?.qty_dispatched}`,
    },
    {
      key: "12",
      label: "Quantity Damaged",
      children: `${vehicle?.packaged_damage}`,
    },
    {
      key: "13",
      label: "Balance",
      children: `${vehicle?.packaged_balance}`,
    },
    {
      key: "14",
      label: "Cost",
      children: `₦
          ${formatNumber(
            (vehicle.external_origin_stock.stock_purchases.unit_price || 0) *
              vehicle.qty_carried
          )}`,
    },
    {
      key: "15",
      label: "Sold Value",
      children: `₦
          ${formatNumber(vehicle.sold_value)}`,
    },
    {
      key: "16",
      label: "Total Expenses",
      children: `₦
          ${formatNumber(vehicle.total_expenses)}`,
    },
    {
      key: "17",
      label: "Profit/Loss",
      children: `₦
          ${formatNumber(
            vehicle.sold_value -
              (vehicle.external_origin_stock.stock_purchases.unit_price || 0) *
                vehicle.qty_carried -
              vehicle.total_expenses
          )}`,
    },
    {
      key: "18",
      label: "Residual Valuation",
      children: `₦${formatNumber(
        (vehicle?.packaged_balance || 0) *
          (vehicle.item_packaged_info.unit_price || 0)
      )}`,
    },
    //   {
    //     key: "8",
    //     label: "Balance",
    //     children:
    //       vehicle?.payment_balance != null
    //         ? `₦${formatNumber(vehicle?.payment_balance)}`
    //         : "NA",
    //   },
  ];

  const { isMobile } = useDashboard();

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Details",
      children: (
        <>
          <div className="mb-5 flex space-x-3">
            <EditVechicle vehicle={vehicle} />
            {!vehicle.packaged && <Package vehicle={vehicle} />}
            <AddExpense vehicle={vehicle} />
          </div>
          <div className="mb-10">
            <Descriptions
              column={isMobile ? 1 : 2}
              title="Vehicle Info"
              bordered
              items={descs}
              className="mb-5"
            />
          </div>
          <div>
            <h2 className="mb-5 uppercase">Vehicle Expenses</h2>
            <VehicleExpenses vehicle={vehicle} />
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Sale Dispatches",
      children: (
        <>
          <div className="mb-5">
            <AddSaleDispatch vehicle={vehicle} />
          </div>
          <AllSaleDispatch vehicle={vehicle} />
        </>
      ),
    },
  ];

  return (
    <>
      <Button onClick={handleOpenModal} type="primary">
        View
      </Button>
      <Modal
        footer={null}
        title="Package Vehicle"
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={800}
      >
        <Tabs size="large" defaultActiveKey="1" items={tabs} />
      </Modal>
    </>
  );
}

export default ViewReceievdVehicle;
