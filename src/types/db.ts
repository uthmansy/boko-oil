import { Database } from "./supabase";

export type vehicleStatus = Database["public"]["Enums"]["vehicle_status"];
export type SalesType = Database["public"]["Enums"]["sales_type"];
export type EmploymentStatus = Database["public"]["Enums"]["employment_status"];
export type ExpenseCategories =
  Database["public"]["Enums"]["expense_categories"];
export type UserRole = Database["public"]["Enums"]["user_role"];
export type PaymentMode = Database["public"]["Enums"]["payment_mode"];
export type States = Database["public"]["Enums"]["state_type"];
export type Request_status = Database["public"]["Enums"]["request_status"];
export type InventoryItemType =
  Database["public"]["Enums"]["inventory_item_type"];
export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type UpdateUserProfile =
  Database["public"]["Tables"]["profiles"]["Update"];
export type Warehouses = Database["public"]["Tables"]["warehouses"]["Row"];
export type Enrollment = Database["public"]["Tables"]["user_enrollment"]["Row"];
export type InsertEnrollment =
  Database["public"]["Tables"]["user_enrollment"]["Insert"];
export type Expenses = Database["public"]["Tables"]["expenses"]["Row"];
export type Damages = Database["public"]["Tables"]["damages"]["Row"];
export type InsertExpenses = Database["public"]["Tables"]["expenses"]["Insert"];
export type UpdateExpenses = Database["public"]["Tables"]["expenses"]["Update"];
export type Employees = Database["public"]["Tables"]["employees"]["Row"];
export type Payrolls = Database["public"]["Tables"]["payrolls"]["Row"];
export type UpdatePayrolls = Database["public"]["Tables"]["payrolls"]["Update"];
export type EmployeePayroll =
  Database["public"]["Tables"]["employee_payroll"]["Row"];
export type UpdateEmployeePayroll =
  Database["public"]["Tables"]["employee_payroll"]["Update"];
export interface EmployeePayrollAndEmployee extends EmployeePayroll {
  employee: Employees;
}
export interface PayrollsAndEmployees extends Payrolls {
  employeePayrolls: EmployeePayrollAndEmployee[];
}
export type InsertPayrolls = Database["public"]["Tables"]["payrolls"]["Insert"];
export type UpdateEmployees =
  Database["public"]["Tables"]["employees"]["Update"];
export type InsertEmployees =
  Database["public"]["Tables"]["employees"]["Insert"];
export type InventoryTransfer =
  Database["public"]["Tables"]["inventory_transfers"]["Row"];
export type InventoryTransferInsert =
  Database["public"]["Tables"]["inventory_transfers"]["Insert"];
export type Vehicles = Database["public"]["Tables"]["vehicles"]["Row"];
export type Requests = Database["public"]["Tables"]["requests"]["Row"];
export type Departments = Database["public"]["Tables"]["departments"]["Row"];
export type Positions = Database["public"]["Tables"]["positions"]["Row"];
export type InsertPositions =
  Database["public"]["Tables"]["positions"]["Insert"];
export type InsertDepartments =
  Database["public"]["Tables"]["departments"]["Insert"];
export type ProductSubmission =
  Database["public"]["Tables"]["product_submission"]["Row"];
export type UpdateSubmission =
  Database["public"]["Tables"]["product_submission"]["Update"];
export type Productions =
  Database["public"]["Tables"]["production_runs"]["Row"];
export type UpdateRequests = Database["public"]["Tables"]["requests"]["Update"];
export type RequestItem = Database["public"]["Tables"]["request_items"]["Row"];
export type ProductionRawMaterials =
  Database["public"]["Tables"]["production_raw_materials"]["Row"];
export type UpdateVehicles = Database["public"]["Tables"]["vehicles"]["Update"];
export interface StockDestination extends Stocks {
  warehouse_info: Warehouses;
}
export interface VehiclesAndDestination extends Vehicles {
  destination_stock: StockDestination;
  origin_stock: Stocks;
  external_origin_stock: ExternalStocksAndPurchases;
  sale: Sales;
  dispatch_officer_info: UserProfile;
  receive_officer_info: UserProfile;
  item_info: InventoryItems;
  item_packaged_info: InventoryItems;
  vehicle_expenses: VehicleExpense[];
  sale_dispatch: SaleDispatchJoined[];
}
export interface VehicleExpensesDetails extends VehicleExpense {
  vehicle_details: Vehicles;
  added_by_details: UserProfile;
}
export interface RequestWithItems extends Requests {
  request_items: RequestItem[];
}
export interface ProductionWithItems extends Productions {
  production_raw_materials: ProductionRawMaterials[];
}
export type Purchases = Database["public"]["Tables"]["stock_purchases"]["Row"];
export type VehicleExpense =
  Database["public"]["Tables"]["vehicle_expenses"]["Row"];
export type InsertVehicleExpense =
  Database["public"]["Tables"]["vehicle_expenses"]["Insert"];
export type Sales = Database["public"]["Tables"]["sales"]["Row"];
export type SaleDispatch = Database["public"]["Tables"]["sale_dispatch"]["Row"];
export type SalesPayments =
  Database["public"]["Tables"]["sales_payments"]["Row"];
export type PurchasePayments =
  Database["public"]["Tables"]["purchase_order_payments"]["Row"];
export type InventoryItems =
  Database["public"]["Tables"]["inventory_items"]["Row"];
export type UpdateInventoryItems =
  Database["public"]["Tables"]["inventory_items"]["Update"];
export type Stocks = Database["public"]["Tables"]["stocks"]["Row"];
export type ExternalStocks =
  Database["public"]["Tables"]["external_stocks"]["Row"];
export interface ExternalStocksAndPurchases extends ExternalStocks {
  stock_purchases: Purchases;
  sales: Sales[];
  item_info: {
    item: InventoryItems;
  };
}
export interface InventoryTransferWithStocks extends InventoryTransfer {
  originStock: Stocks;
  destinationStock: Stocks;
  createdBy: UserProfile;
}
export interface StocksWithSoldBalance extends ExternalStocksAndPurchases {
  totalSoldBalance: number;
}

export interface PurchasesAndPayments extends Purchases {
  payments: PurchasePayments[];
}

export interface SalesAndPayments extends Sales {
  payments: SalesPayments[];
}
export interface SaleDispatchJoined extends SaleDispatch {
  vehicle_info: Vehicles;
  sale_info: Sales;
}

export interface StocksWithDetails extends Stocks {
  item_info: InventoryItems;
}
export interface DamagesWithDetails extends Damages {
  added_by_info: UserProfile;
}
