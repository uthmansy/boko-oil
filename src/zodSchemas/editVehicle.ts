import { z } from "zod";

export const EditVehicleSchema = z.object({
  id: z.string().uuid(),
  packaged_damage: z.number().optional().nullable(),
});

export type EditVehicleType = z.infer<typeof EditVehicleSchema>;
