import { z } from 'zod';

const TOrderValidationSchema = z.object({
    email: z.string().email(),
    productId: z.string().nonempty(),
    price: z.number().nonnegative(),
    quantity: z.number().int().nonnegative()
});

export default TOrderValidationSchema;