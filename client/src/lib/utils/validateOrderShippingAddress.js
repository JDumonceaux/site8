import { z } from 'zod';


const validateOrderShippingAddress = (shippingAddress) => {
  const re = /^\w$/;

  const shippingAddressSchema = z.object({
    AddressLine1: z
      .string({ required_error: 'required' })
      .trim()
      .min(1)
      .regex(re, { message: 'not_valid' }),
    AddressLine2: z.string().trim().optional(),
    // .regex(REG_EX, {
    //     message: msgFormatter("validation/shippingAddress2NotValid")
    // }),
    City: z
      .string({ required_error: 'required' })
      .trim()
      .min(1)
      .regex(re, { message: 'not_valid' }),
    CompanyName: z
      .string({ required_error: 'required' })
      .trim()
      .min(1)
      .regex(re, { message: 'not_valid' }),
    PostalCode: z
      .string({ required_error: 'required' })
      .trim()
      .regex(re, { message: 'not_valid' }),
    State: z.string({ required_error: 'required' }).trim().min(1),
  });

  const results = shippingAddressSchema.safeParse(shippingAddress);

  return results.error.issues.map((x) => ({ code: x.code, path: x.path[0] }));
};

export default validateOrderShippingAddress;
