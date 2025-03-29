import { z } from "zod";

export const InventoryItemSchema = z.object({
  code: z.string().regex(/^[A-Z0-9]{2}$/),
  name: z.string(),
  unit: z.string(),
  unit_price: z.number().optional(),
  type: z.enum(["raw", "product"]),
});

export const UpdateInventoryItemSchema = z.object({
  id: z.string().uuid(),
  code: z
    .string()
    .regex(/^[A-Z0-9]{2}$/)
    .optional(),
  name: z.string().optional(),
  unit: z.string().optional(),
  unit_price: z.number().optional(),
  type: z.enum(["raw", "product"]).optional(),
});
