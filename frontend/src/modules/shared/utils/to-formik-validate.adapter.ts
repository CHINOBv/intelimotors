import { z, ZodIssue, ZodSchema } from 'zod';

type Output = object | void;

const toFormikValidateAdapter =
  (schema: ZodSchema, prefix = '') =>
  (vals: z.infer<typeof schema>): Output => {
    const values = prefix ? vals[prefix] : vals;

    const result = schema.safeParse(values);

    if (result.success) return;
    // eslint-disable-next-line consistent-return
    const errors = getValidationBag(result.error.issues);

    const res = prefix ? { [prefix]: errors } : errors;
    // eslint-disable-next-line consistent-return
    return res;
  };

export const getValidationBag = (errors: ZodIssue[]) =>
  errors.reduce((acc, issue) => {
    // @ts-ignore

    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});

export default toFormikValidateAdapter;
