import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { formatNumber } from "../helpers/functions";
import { FinancialReport } from "../types/api";
import { Tag } from "antd";

export const financialReportsColumns: ColumnsType<FinancialReport> = [
  {
    title: "Month",
    dataIndex: "year_month",
    key: "year_month",
    render: (date) => <span>{dayjs(date, "YYYY-MM").format("MMMM YYYY")}</span>, // Format date
  },
  {
    title: "Total Sales Value",
    dataIndex: "total_sales",
    key: "total_sales",
    render: (text) => (
      <span className="capitalize">{`₦${formatNumber(text)}`}</span>
    ),
  },
  {
    title: "Total Purchase Value",
    dataIndex: "total_purchases",
    key: "total_purchases",
    render: (text) => (
      <span className="capitalize">{`₦${formatNumber(text)}`}</span>
    ),
  },
  {
    title: "Total Profit",
    dataIndex: "profit",
    key: "profit",
    render: (text) => (
      <Tag
        color={text > 0 ? "green" : "red"}
        className="capitalize"
      >{`₦${formatNumber(text)}`}</Tag>
    ),
  },
];
