import { z } from 'zod';

/**

 * Validates the shipping address for an order.

 *

 * @param {Object} shippingAddress - The shipping address object.

 * @param {string} shippingAddress.AddressLine1 - The first line of the address.

 * @param {string} shippingAddress.AddressLine2 - The second line of the address (optional).

 * @param {string} shippingAddress.City - The city of the address.

 * @param {string} shippingAddress.State - The state of the address.

 * @param {string} shippingAddress.PostalCode - The postal code of the address.

 * @param {string} shippingAddress.CompanyName - The company name associated with the address.

 *

 * @returns {Array<string>} - An array of validation error messages.

 */

const validateOrderShippingAddress = (shippingAddress) => {
  const re = new RegExp('^\\w$');

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

    State: z.string({ required_error: 'required' }).trim().min(1),

    PostalCode: z

      .string({ required_error: 'required' })

      .trim()

      .regex(re, { message: 'not_valid' }),

    CompanyName: z

      .string({ required_error: 'required' })

      .trim()

      .min(1)

      .regex(re, { message: 'not_valid' }),
  });

  const results = shippingAddressSchema.safeParse(shippingAddress);

  return results.error.issues.map((x) => ({ path: x.path[0], code: x.code }));
};

export default validateOrderShippingAddress;
