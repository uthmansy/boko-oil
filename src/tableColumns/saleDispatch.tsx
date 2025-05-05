import { ColumnsType } from "antd/es/table";
import { SaleDispatchJoined } from "../types/db"; // Ensure this matches the updated Sales type
import { formatNumber } from "../helpers/functions";
// import { formatNumber } from "../helpers/functions";
// import TableActions from "../components/pages/sales/TableActions";

export const saleDispatchColumns: ColumnsType<SaleDispatchJoined> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 40,
  },
  {
    title: "Date",
    dataIndex: "dispatch_date",
    key: "dispatch_date",
    render: (_, record) => <span>{record.dispatch_date}</span>, // Adjust formatting as needed
  },
  {
    title: "Quantity",
    key: "quantity",
    render: (_, record) => <span>{record.qty_dispatched}</span>, // Adjust formatting as needed
  },
  {
    title: "Dispatch Price",
    key: "dispatch_price",
    render: (_, record) => <span>₦{formatNumber(record.dispatch_price)}</span>, // Adjust formatting as needed
  },
  {
    title: "Amount",
    key: "amount",
    render: (_, record) => (
      <span>
        ₦{formatNumber(record.dispatch_price * record.qty_dispatched)}
      </span>
    ), // Adjust formatting as needed
  },
  {
    title: "Order Number",
    key: "custumer",
    render: (_, record) => <span>{record.sale_info.order_number}</span>, // Adjust formatting as needed
  },
  {
    title: "Customer",
    key: "custumer",
    render: (_, record) => <span>{record.sale_info.customer_name}</span>, // Adjust formatting as needed
  },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <TableActions sale={record} orderNumber={record.order_number} />
  //     ),
  //   },
];
