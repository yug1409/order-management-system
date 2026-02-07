import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        menuItemId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .min(1),

  customerName: z.string().min(2),
  address: z.string().min(5),
  phone: z.string().min(10),
});
