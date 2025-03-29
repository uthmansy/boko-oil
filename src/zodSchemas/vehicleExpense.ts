import { z } from "zod";

// Define the Zod schema for vehicle expenses
export const VehicleExpenseSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Date must be in the format YYYY-MM-DD",
      }
    ),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  amount: z.number().positive({ message: "Amount must be greater than zero" }),
  vehicle_id: z.string().uuid({ message: "Invalid vehicle ID" }),
  added_by: z.string().min(1, { message: "Added by is required" }),
});

export default VehicleExpenseSchema;
