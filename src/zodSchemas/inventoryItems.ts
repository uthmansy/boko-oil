import { z } from "zod";

export const InventoryItemSchema = z.object({
  code: z.string().regex(/^[A-Z0-9]{2}$/),
  name: z.string(),
  type: z.enum(["raw", "product"]),
});
