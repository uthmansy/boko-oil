import { z } from "zod";

export const SaleDispatchSchema = z.object({
  id: z.string().uuid().optional(),
  dispatch_date: z.preprocess((val) => new Date(val as string), z.date()),
  origin_vehicle: z.string().uuid(),
  qty_dispatched: z.number(),
  sale_id: z.string().uuid(),
  destination: z.string().nullable().optional(),
});

export type SaleDispatch = z.infer<typeof SaleDispatchSchema>;
