import { ColumnsType } from "antd/es/table";
import { VehiclesAndDestination } from "../types/db";
import TransitTableActions from "../components/pages/transit/TransitTableActions";
import useAuthStore from "../store/auth";
import TableActions from "../components/pages/receivedVehicles/TableActions";
import { formatNumber } from "../helpers/functions";

export const useVehicleColumns = (): {
  transitColumns: ColumnsType<VehiclesAndDestination>;
  receivedColumns: ColumnsType<VehiclesAndDestination>;
  dispatchedColumns: ColumnsType<VehiclesAndDestination>;
} => {
  const { userProfile } = useAuthStore();

  // Define common columns
  const commonColumns: ColumnsType<VehiclesAndDestination> = [
    {
      title: "S.N",
      render: (_, __, index) => index + 1, // Calculate row number
      width: 40,
      fixed: "left",
    },
    {
      title: "Date Loaded",
      dataIndex: "date_dispatched",
      key: "date_dispatched",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Vehicle Number",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Waybill Number",
      dataIndex: "waybill_number",
      key: "waybill_number",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "ITEM",
      dataIndex: "item",
      key: "item",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "QTY",
      dataIndex: "qty_carried",
      key: "qty_carried",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    ...((userProfile?.role === "SUPER ADMIN" || userProfile?.role === "ADMIN"
      ? [
          {
            title: "Driver Phone",
            dataIndex: "driver_number",
            key: "driver_number",
            render: (text) => <span className="capitalize">{text}</span>,
          },
        ]
      : []) as ColumnsType<VehiclesAndDestination>),
    {
      title: "Origin",
      dataIndex: "external_origin_stock",
      key: "external_origin_stock",
      render: (_, record) => (
        <span className="capitalize">
          {record.external_origin_stock?.stock_purchases?.seller ||
            record.origin_stock?.warehouse}
        </span>
      ),
    },
  ];

  // Extend common columns for transit table
  const transitColumns: ColumnsType<VehiclesAndDestination> = [
    ...commonColumns,
    {
      title: "Destination",
      dataIndex: "destination_stock",
      key: "destination_stock",
      render: (_, record) => (
        <span className="capitalize">
          {record.destination_stock.warehouse || ""}
        </span>
      ),
    },
    {
      title: "Driver Name",
      dataIndex: "driver_name",
      key: "driver_name",
      render: (_, record) => (
        <span className="capitalize">{record.driver_name || ""}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <TransitTableActions vehicle={record} />,
    },
  ];

  // Extend common columns for received vehicles table
  const receivedColumns: ColumnsType<VehiclesAndDestination> = [
    ...commonColumns,
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => <ReceivedTableActions vehicle={record} />,
    // },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (_, record) => (
        <span className="capitalize">
          ₦
          {formatNumber(
            (record.external_origin_stock.stock_purchases.unit_price || 0) *
              record.qty_carried
          )}
        </span>
      ),
    },
    {
      title: "Destination",
      dataIndex: "destination_stock",
      key: "destination_stock",
      render: (destination_stock) => (
        <span className="capitalize">{destination_stock.warehouse || ""}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <TableActions vehicle={record} />,
    },
  ];
  const dispatchedColumns: ColumnsType<VehiclesAndDestination> = [
    ...commonColumns,
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => (
        <span className="capitalize">{record.sale.customer_name || ""}</span>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => <ReceivedTableActions vehicle={record} />,
    // },
  ];
  return { dispatchedColumns, receivedColumns, transitColumns };
};
