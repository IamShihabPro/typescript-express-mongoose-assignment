import { z } from 'zod';

const TVariantValidationSchema = z.object({
  type: z.string(),value: z.string()
});

const TInventoryValidationSchema = z.object({
  quantity: z.number(),inStock: z.boolean()
});

const TProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(TVariantValidationSchema),
  inventory: TInventoryValidationSchema
});

export default TProductValidationSchema;