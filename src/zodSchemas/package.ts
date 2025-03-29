import { z } from "zod";

// Define the Zod schema
export const PackageSchema = z.object({
  date_packaged: z
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
    )
    .optional(),
  qty_packaged: z.number(),
  packaged_by: z.string(),
  id: z.string().uuid(),
  item_packaged: z.string(),
});

export default PackageSchema;
