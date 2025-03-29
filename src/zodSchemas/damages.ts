import { z } from "zod";

// Define the Zod schema for the damages table
export const DamagesSchema = z.object({
  id: z.string().uuid().optional(), // UUID of the damage record
  created_at: z.string().optional(), // Timestamp of record creation
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  item: z.string().min(1, "Item is required"), // Name or ID of the damaged item
  quantity: z.number().min(1, "Quantity must be at least 1"), // Quantity of damaged items
  warehouse: z.string().min(1, "Warehouse is required"), // Warehouse location
  added_by: z.string().min(1, "Reported by is required"), // Name or ID of the reporter
});
