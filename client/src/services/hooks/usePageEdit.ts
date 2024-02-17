import { useCallback, useMemo, useState } from 'react';
import { IPage } from 'services/api/models/pages/IPage';
import { ServiceUrl } from 'utils';
import { z } from 'zod';
import usePost from './usePost';
import { safeParse } from 'utils/zodHelper';

const REQUIRED_FIELD = 'Required Field';

const pageSchema = z.object({
  id: z.number(),
  short_title: z
    .string({ required_error: 'Short Title is required.' })
    .min(1, REQUIRED_FIELD)
    .max(30, 'Max length exceeded: 30')
    .trim(),
  long_title: z
    .string({ required_error: 'Long Title is required.' })
    .min(1, REQUIRED_FIELD)
    .max(250)
    .trim(),
  edit_date: z.string().max(10).trim().optional(),
  resources: z.boolean(),
  text: z
    .string({ required_error: 'Text is required.' })
    .min(1, REQUIRED_FIELD)
    .trim(),
  parent: z.string().trim().optional(),
  reading_time: z.string().trim().optional(),
  readability_score: z.string().trim().optional(),
});

const usePageEdit = () => {
  type PageFormValues = z.infer<typeof pageSchema>;
  type keys = keyof PageFormValues;

  const defaultFormValues: PageFormValues = useMemo(
    () => ({
      id: 0,
      short_title: '',
      long_title: '',
      edit_date: '',
      resources: false,
      text: '',
      parent: '',
      reading_time: '',
      readability_score: '',
    }),
    [],
  );

  const [formValues, setFormValues] =
    useState<PageFormValues>(defaultFormValues);
  const { postData } = usePost<IPage>(`${ServiceUrl.ENDPOINT_PAGE}`);
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  // const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // const [updateError, setUpdateError] = useState<boolean>(false);

  const [errors, setErrors] =
    useState<z.ZodFormattedError<PageFormValues> | null>(null);

  const validateForm = useCallback(() => {
    const result = safeParse<PageFormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues]);

  const handleCancel = useCallback(() => {
    setFormValues(defaultFormValues);
  }, [defaultFormValues]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      // Handle form submission here
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //setIsProcessing(true);

      if (validateForm()) {
        const { edit_date, parent, ...rest } = formValues;
        // postData(rest);
        //  setIsProcessing(false);
      }
    },
    [formValues, validateForm],
  );

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

  const isValid = useCallback(
    (fieldName: keys) => {
      return getFieldErrors(fieldName) ? false : true;
    },
    [getFieldErrors],
  );

  // setIsProcessing(true);

  return useMemo(
    () => ({
      pageSchema,
      formValues,
      // isProcessing,
      // updateError,
      getFieldErrors,
      isValid,
      setFormValues,
      handleCancel,
      handleChange,
      handleSubmit,
    }),
    [formValues, getFieldErrors, isValid, handleCancel, handleSubmit],
  );
};

export default usePageEdit;
