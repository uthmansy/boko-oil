import { supabase } from "../lib/supabase";
import { FinancialReport } from "../types/api";
import {
  Damages,
  DamagesWithDetails,
  Departments,
  Employees,
  Enrollment,
  Expenses,
  ExternalStocksAndPurchases,
  InsertDepartments,
  InsertEmployees,
  InsertEnrollment,
  InsertExpenses,
  InsertPayrolls,
  InsertVehicleExpense,
  InventoryItems,
  InventoryTransferInsert,
  InventoryTransferWithStocks,
  PayrollsAndEmployees,
  Positions,
  ProductSubmission,
  ProductionWithItems,
  PurchasePayments,
  Purchases,
  PurchasesAndPayments,
  RequestWithItems,
  Sales,
  SalesAndPayments,
  SalesPayments,
  Stocks,
  StocksWithDetails,
  UpdateEmployeePayroll,
  UpdateEmployees,
  UpdateExpenses,
  UpdateInventoryItems,
  UpdatePayrolls,
  UpdateRequests,
  UpdateSubmission,
  UpdateUserProfile,
  UpdateVehicles,
  UserProfile,
  VehicleExpensesDetails,
  Vehicles,
  VehiclesAndDestination,
  Warehouses,
  vehicleStatus,
} from "../types/db";
import {
  AddProductionSubmission,
  CreateProduction,
  CreateRequest,
} from "../types/forms";

export const getAllWarehouses = async (
  pageNumber: number = 1
): Promise<Warehouses[]> => {
  const { data, error } = await supabase
    .from("warehouses")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllStockPurchases = async (
  pageNumber: number = 1
): Promise<PurchasesAndPayments[]> => {
  const { data, error } = await supabase
    .from("stock_purchases")
    .select("*, payments:purchase_order_payments (*)")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getDepartments = async (
  pageNumber: number = 1
): Promise<Departments[]> => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getEnrollments = async (
  pageNumber: number = 1
): Promise<Enrollment[]> => {
  const { data, error } = await supabase
    .from("user_enrollment")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getExpenses = async (
  pageNumber: number = 1,
  search: string
): Promise<Expenses[]> => {
  let query = supabase.from("expenses").select("*");

  if (search) {
    query = query.textSearch(`description`, search);
  }

  // Apply ordering and pagination after filtering
  query = query
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) throw error.message;

  return data;
};

export const getPayrolls = async (
  pageNumber: number = 1
): Promise<PayrollsAndEmployees[]> => {
  const { data, error } = await supabase
    .from("payrolls")
    .select("*, employeePayrolls:employee_payroll(*, employee:employee_id(*))")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;
  console.log(data);
  return data;
};

export const getPositions = async (
  pageNumber: number = 1
): Promise<Positions[]> => {
  const { data, error } = await supabase
    .from("positions")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllSales = async (
  pageNumber: number = 1,
  isAdmin: boolean,
  warehouse?: string | null
): Promise<SalesAndPayments[]> => {
  let query = supabase
    .from("sales")
    .select("*, payments:sales_payments (*)")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  // If not an admin, apply the warehouse filter if it's provided
  if (!isAdmin && warehouse) {
    query = query.eq("warehouse", warehouse);
  }

  const { data, error } = await query;

  if (error) throw error.message;

  return data;
};

export const getAllDamages = async (
  pageNumber: number = 1,
  isAdmin: boolean,
  warehouse?: string | null
): Promise<DamagesWithDetails[]> => {
  let query = supabase
    .from("damages")
    .select("*, added_by_info:added_by (*)")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  // If not an admin, apply the warehouse filter if it's provided
  if (!isAdmin && warehouse) {
    query = query.eq("warehouse", warehouse);
  }

  const { data, error } = await query;

  if (error) throw error.message;

  return data;
};

export const getUsers = async (
  pageNumber: number = 1
): Promise<UserProfile[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getUncompletedSales = async (
  pageNumber: number = 1
): Promise<Sales[]> => {
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .gt("balance", 0)
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllVehicleExpenses = async (
  pageNumber: number = 1
): Promise<VehicleExpensesDetails[]> => {
  const { data, error } = await supabase
    .from("vehicle_expenses")
    .select("*, vehicle_details:vehicle_id(*), added_by_details:added_by(*)")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllUncompletedSales = async (): Promise<Sales[]> => {
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .gt("balance", 0)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllInternalStocks = async (): Promise<Stocks[]> => {
  const { data, error } = await supabase
    .from("stocks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getVehicles = async (
  status: vehicleStatus = "dispatched",
  pageNumber: number = 1,
  item: string = "all",
  destination: string | null = "all",
  search: string = "",
  origin: string = "all"
): Promise<VehiclesAndDestination[]> => {
  let query = supabase
    .from("vehicles")
    .select(
      "*, item_info:item(*), vehicle_expenses(*), receive_officer_info:received_by (*), dispatch_officer_info:dispatched_by (*), destination_stock:destination!inner(*, warehouse_info:warehouse (*)), origin_stock:origin_stock_id (*), external_origin_stock:external_origin_id (*, stock_purchases:order_number (*))"
    )
    .eq("status", status);

  // Check the value of status and adjust the join type accordingly
  if (status === "delivered") {
    query = supabase
      .from("vehicles")
      .select(
        "*, item_info:item(*), vehicle_expenses(*), receive_officer_info:received_by (*), dispatch_officer_info:dispatched_by (*), destination_stock:destination!left(*, warehouse_info:warehouse (*)), sale:sale_order_number (*), origin_stock:origin_stock_id (*), external_origin_stock:external_origin_id (*, stock_purchases:order_number (*))"
      )
      .eq("status", status);
  }

  // Apply item filter if it's not 'all'
  if (item !== "all") {
    query = query.eq("item", item);
  }

  // Apply destination filter using inner join if it's not 'all'
  if (destination !== "all") {
    query = query.eq("destination_stock.warehouse", destination);
  }

  // Apply origin filter using inner join if it's not 'all'
  if (origin !== "all") {
    query = query.eq("origin_state", origin);
  }

  // Apply search filter to vehicle_number if search term is provided
  if (search) {
    query = query.textSearch(`vehicle_number`, search);
  }

  // Apply ordering and pagination after filtering
  query = query
    .order("created_at", { ascending: false })
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1);

  const { data, error } = await query;

  if (error) throw error.message;
  return data;
};

export const getVehicleByWaybill = async (
  waybillNumber: string
): Promise<VehiclesAndDestination | undefined> => {
  let query = supabase
    .from("vehicles")
    .select(
      "*, receive_officer_info:received_by (*), dispatch_officer_info:dispatched_by (*), destination_stock:destination!inner(*, warehouse_info:warehouse (*)), origin_stock:origin_stock_id (*), external_origin_stock:external_origin_id (*, stock_purchases:order_number (*))"
    )
    .eq("waybill_number", waybillNumber)
    .single();

  const { data, error } = await query;

  if (error) throw error.message;
  return data;
};

export const getAllRequests = async (
  pageNumber: number = 1
): Promise<RequestWithItems[]> => {
  const { data, error } = await supabase
    .from("requests")
    .select("*, request_items (*)")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getEmployees = async (
  pageNumber: number = 1
): Promise<Employees[]> => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getInventoryTransfers = async (
  pageNumber: number = 1
): Promise<InventoryTransferWithStocks[]> => {
  const { data, error } = await supabase
    .from("inventory_transfers")
    .select(
      "*, originStock:origin_stock_id (*), destinationStock:destination_stock_id (*), createdBy:created_by (*)"
    )
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllInventoryTransfers = async (): Promise<
  InventoryTransferWithStocks[]
> => {
  const { data, error } = await supabase
    .from("inventory_transfers")
    .select(
      "*, originStock:origin_stock_id (*), destinationStock:destination_stock_id (*), createdBy:created_by (*)"
    )
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getUncompletedInventoryTransfers = async (): Promise<
  InventoryTransferWithStocks[]
> => {
  const { data, error } = await supabase
    .from("inventory_transfers")
    .select(
      "*, originStock:origin_stock_id (*), destinationStock:destination_stock_id (*), createdBy:created_by (*)"
    )
    .gt("balance", 0)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllProductSubmissions = async (
  pageNumber: number = 1
): Promise<ProductSubmission[]> => {
  const { data, error } = await supabase
    .from("product_submission")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllProductions = async (
  pageNumber: number = 1
): Promise<ProductionWithItems[]> => {
  const { data, error } = await supabase
    .from("production_runs")
    .select("*, production_raw_materials (*)")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllPurchasePayments = async (
  pageNumber: number = 1,
  orderNumber: string // Assuming orderNumber is of type string
): Promise<PurchasePayments[]> => {
  const { data, error } = await supabase
    .from("purchase_order_payments")
    .select("*")
    .eq("order_number", orderNumber) // Filter by order_number
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllSalesPayments = async (
  pageNumber: number = 1,
  orderNumber: string // Assuming orderNumber is of type string
): Promise<SalesPayments[]> => {
  const { data, error } = await supabase
    .from("sales_payments")
    .select("*")
    .eq("order_number", orderNumber) // Filter by order_number
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllInventoryItems = async (
  pageNumber: number = 1
): Promise<InventoryItems[]> => {
  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .range((pageNumber - 1) * 20, pageNumber * 20 - 1)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getInventoryItems = async (): Promise<InventoryItems[]> => {
  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getWarehouses = async (): Promise<Warehouses[]> => {
  const { data, error } = await supabase
    .from("warehouses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllDepartments = async (): Promise<Departments[]> => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getAllPositions = async (): Promise<Positions[]> => {
  const { data, error } = await supabase
    .from("positions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getWarehousesNames = async (): Promise<{ name: string }[]> => {
  const { data, error } = await supabase
    .from("warehouses")
    .select("name")
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getItemsNames = async (): Promise<{ name: string }[]> => {
  const { data, error } = await supabase
    .from("inventory_items")
    .select("name")
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  return data;
};

export const getItemRecord = async (
  warehouse: string,
  item: string
): Promise<StocksWithDetails> => {
  const { data, error } = await supabase
    .from("stocks")
    .select("*, item_info:item(*)")
    .eq("warehouse", warehouse)
    .eq("item", item)
    .single();

  if (error) throw error.message;

  return data;
};

export const verifyEmail = async (
  email: string
): Promise<Enrollment | null> => {
  const { data, error } = await supabase
    .from("user_enrollment")
    .select("*", { count: "exact" }) // Fetch count to check for multiple rows
    .eq("email", email);

  if (error) {
    throw new Error(error.message); // Rethrow any other errors
  }

  if (data.length === 0) {
    return null; // No records found
  }

  if (data.length > 1) {
    // Handle the case where multiple records are found
    throw new Error("Multiple records found for email");
    // Optionally: You can return null or throw an error depending on your needs
  }

  return data[0]; // Return the single record found
};

export const getItemExternalRecord = async (
  item: string
): Promise<ExternalStocksAndPurchases[]> => {
  const { data, error } = await supabase
    .from("external_stocks")
    .select("*, stock_purchases!inner(*), item_info:order_number(item(*))")
    .eq("stock_purchases.item", item);

  if (error) throw error.message;

  return data;
};

export const getDestinationStockId = async (
  item: string,
  warehouse: string
): Promise<string> => {
  const { data, error } = await supabase
    .from("stocks")
    .select("id")
    .eq("item", item)
    .eq("warehouse", warehouse)
    .single();

  if (error) throw error.message;

  return data.id;
};

export const getExternalStocks = async (): Promise<
  ExternalStocksAndPurchases[]
> => {
  const { data, error } = await supabase
    .from("external_stocks")
    .select("*, stock_purchases!inner(*), sales(*)")
    .gt("balance", 0);

  if (error) throw error.message;

  return data;
};

export const getAllExternalStocks = async (): Promise<
  ExternalStocksAndPurchases[]
> => {
  const { data, error } = await supabase
    .from("external_stocks")
    .select("*, stock_purchases!inner(*), sales(*)");

  if (error) throw error.message;

  return data;
};

export const addWarehouse = async (payload: Warehouses): Promise<void> => {
  const { error } = await supabase.from("warehouses").insert([payload]);

  if (error) throw new Error(error.message);
};
export const addDamage = async (payload: Damages): Promise<void> => {
  const { error } = await supabase.from("damages").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addDepartment = async (
  payload: InsertDepartments
): Promise<void> => {
  const { error } = await supabase.from("departments").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addEnrollment = async (
  payload: InsertEnrollment
): Promise<void> => {
  const { error } = await supabase.from("user_enrollment").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addExpense = async (payload: InsertExpenses): Promise<void> => {
  const { error } = await supabase.from("expenses").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addPayroll = async (payload: InsertPayrolls): Promise<void> => {
  const { error } = await supabase.from("payrolls").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addPosition = async (payload: InsertPosition): Promise<void> => {
  const { error } = await supabase.from("positions").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addEmployee = async (payload: InsertEmployees): Promise<void> => {
  const { error } = await supabase.from("employees").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addNewVehicle = async (
  payload: Vehicles
): Promise<VehiclesAndDestination> => {
  const { data, error } = await supabase
    .from("vehicles")
    .insert([payload])
    .select(
      "*, item_info:item (*), receive_officer_info:received_by (*), dispatch_officer_info:dispatched_by (*), destination_stock:destination (*,  warehouse_info:warehouse (*)), origin_stock:origin_stock_id (*), external_origin_stock:external_origin_id (*, stock_purchases:order_number (*))"
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    return data;
  } else {
    throw new Error("Failed to retrieve the newly added vehicle.");
  }
};

export const addInventoryItem = async (
  payload: InventoryItems
): Promise<void> => {
  const { error } = await supabase.from("inventory_items").insert([payload]);

  if (error) throw new Error(error.message);
};

export const addPurchase = async (payload: Purchases): Promise<void> => {
  const { error } = await supabase.from("stock_purchases").insert([payload]);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const addVehicleExpense = async (
  payload: InsertVehicleExpense
): Promise<void> => {
  const { error } = await supabase.from("vehicle_expenses").insert([payload]);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const addSale = async (payload: Sales): Promise<void> => {
  const { error } = await supabase.from("sales").insert([payload]);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const receiveVehicle = async (
  payload: UpdateVehicles
): Promise<void> => {
  const { error } = await supabase
    .from("vehicles")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};
export const packageVehicle = async (
  payload: UpdateVehicles
): Promise<void> => {
  const { error } = await supabase
    .from("vehicles")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const updateEmployee = async (
  payload: UpdateEmployees
): Promise<void> => {
  const { error } = await supabase
    .from("employees")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};
export const updateInventoryItem = async (
  payload: UpdateInventoryItems
): Promise<void> => {
  const { error } = await supabase
    .from("inventory_items")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};
export const updateUser = async (payload: UpdateUserProfile): Promise<void> => {
  const { error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const updateEmployeePayroll = async (
  payload: UpdateEmployeePayroll
): Promise<void> => {
  const { error } = await supabase
    .from("employee_payroll")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const approveRequest = async (
  payload: UpdateRequests
): Promise<void> => {
  const { error } = await supabase
    .from("requests")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const restrictUser = async (
  payload: UpdateUserProfile
): Promise<void> => {
  console.log(payload);
  const { error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const approveExpense = async (
  payload: UpdateExpenses
): Promise<void> => {
  const { error } = await supabase
    .from("expenses")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const payPayroll = async (payload: UpdatePayrolls): Promise<void> => {
  const { error } = await supabase
    .from("payrolls")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const approveSubmission = async (
  payload: UpdateSubmission
): Promise<void> => {
  const { error } = await supabase
    .from("product_submission")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const rejectRequest = async (payload: UpdateRequests): Promise<void> => {
  const { error } = await supabase
    .from("requests")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const rejectSubmission = async (
  payload: UpdateSubmission
): Promise<void> => {
  const { error } = await supabase
    .from("product_submission")
    .update(payload)
    .eq("id", payload.id);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const deleteRequest = async (requestId: string): Promise<void> => {
  const { error } = await supabase
    .from("requests")
    .delete()
    .eq("id", requestId);

  if (error) {
    console.error("Failed to delete request:", error);
    throw new Error(error.message);
  }
};

export const deletePayroll = async (payrollId: string): Promise<void> => {
  const { error } = await supabase
    .from("payrolls")
    .delete()
    .eq("id", payrollId);

  if (error) {
    console.error("Failed to delete payroll:", error);
    throw new Error(error.message);
  }
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId);

  if (error) {
    console.error("Failed to delete payroll:", error);
    throw new Error(error.message);
  }
};

export const deleteSale = async (saleId: string): Promise<void> => {
  const { error } = await supabase.from("sales").delete().eq("id", saleId);

  if (error) {
    console.error("Failed to delete Sale:", error);
    throw new Error(error.message);
  }
};

export const deleteProduction = async (productionId: string): Promise<void> => {
  const { error } = await supabase
    .from("production_runs")
    .delete()
    .eq("id", productionId);

  if (error) {
    console.error("Failed to delete production:", error);
    throw new Error(error.message);
  }
};

export const deleteSubmission = async (submissionId: string): Promise<void> => {
  const { error } = await supabase
    .from("product_submission")
    .delete()
    .eq("id", submissionId);

  if (error) {
    console.error("Failed to delete submission:", error);
    throw new Error(error.message);
  }
};

export const addPurchasePayment = async (payload: Purchases): Promise<void> => {
  const { error } = await supabase
    .from("purchase_order_payments")
    .insert([payload]);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const addSalesPayment = async (
  payload: SalesPayments
): Promise<void> => {
  const { error } = await supabase.from("sales_payments").insert([payload]);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const createRequest = async (payload: CreateRequest): Promise<void> => {
  const { error } = await supabase.rpc("create_request", {
    request_data: payload,
  });

  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const addInventoryTransfer = async (
  payload: InventoryTransferInsert
): Promise<void> => {
  const { error } = await supabase
    .from("inventory_transfers")
    .insert([payload]);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const createProduction = async (
  payload: CreateProduction
): Promise<void> => {
  const { error } = await supabase.rpc("create_production", {
    production_data: payload,
  });

  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const addProductSubmission = async (
  payload: AddProductionSubmission
): Promise<void> => {
  const { error } = await supabase.from("product_submission").insert([payload]);
  if (error) console.error(error);
  if (error) throw new Error(error.message);
};

export const getMonthlyFinancialReprots = async (): Promise<
  FinancialReport[]
> => {
  const { data, error } = await supabase.rpc(
    "generate_monthly_financial_report"
  );

  if (error) {
    throw new Error("Error fetching financial report");
  }
  console.log(data);

  return data as FinancialReport[]; // Type assertion to FinancialReport array
};
