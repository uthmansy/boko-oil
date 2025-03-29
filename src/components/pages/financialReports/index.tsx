import { Table } from "antd";
import useFinancialReports from "../../../hooks/useFinancialReports"; // Custom hook for financial reports
import { financialReportsColumns } from "../../../tableColumns/financialReports"; // Column configuration for financial reports
import FinancialReportChart from "./FinancialReportChart";

function FinancialReports() {
  const { isLoading, isRefetching, reports } = useFinancialReports(); // Updated hook for financial reports

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <Table
          size="small"
          loading={isLoading || isRefetching}
          columns={financialReportsColumns} // Updated columns for financial reports
          dataSource={reports} // Updated data source for financial reports
          pagination={false} // Disable pagination
          scroll={{ y: 450, x: "max-content" }}
        />
      </div>
      <div>
        <FinancialReportChart />
      </div>
    </div>
  );
}

export default FinancialReports;
