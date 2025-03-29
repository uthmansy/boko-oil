import { ColumnsType } from "antd/es/table";
import { formatNumber } from "../helpers/functions";
import { VehicleExpensesDetails } from "../types/db";

export const vehicleExpensesColumns: ColumnsType<VehicleExpensesDetails> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span>{text}</span>, // Adjust formatting as needed
    width: 100,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 130,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <span className="capitalize">{text}</span>,
    width: 120,
  },
  {
    title: "Vehicle No",
    key: "vehicle_number",
    render: (_, record) => (
      <span className="">{record.vehicle_details.vehicle_number}</span>
    ),
    width: 120,
  },
  {
    title: "Waybill No",
    key: "waybill_number",
    render: (_, record) => (
      <span className="">{record.vehicle_details.waybill_number}</span>
    ),
    width: 120,
  },
  {
    title: "Order No",
    key: "order_number",
    render: (_, record) => <span className="">{record.order_number}</span>,
    width: 120,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <span className="italic">{`${formatNumber(text)}`}</span>,
    width: 120,
  },

  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <TableActions sale={record} orderNumber={record.order_number} />
  //     ),
  //   },
];
