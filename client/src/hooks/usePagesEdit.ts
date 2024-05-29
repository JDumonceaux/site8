import { useCallback, useMemo } from 'react';
import { REQUIRED_FIELD } from 'utils';
import { z } from 'zod';
import { useForm } from './useForm';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.number(),
  sortby: z.string(),
});
const usePagesEdit = () => {
  // Create a type from the schema
  type FormValues = z.infer<typeof pageSchema>;
  type keys = keyof FormValues;

  // Return default form values
  const defaultFormValues: FormValues = useMemo(
    () => ({
      id: 0,
      parent: '',
      seq: 0,
      sortby: '',
    }),
    [],
  );
  // Create a form
  const {
    formValues,
    setAllValues,
    setFieldValue,
    errors,
    setErrors,
    isFormValid,
  } = useForm<FormValues>(defaultFormValues);

  // Validate form
  // const validateForm = useCallback(() => {
  //   const result = safeParse<FormValues>(pageSchema, formValues);
  //   setErrors(result.errorFormatted);
  //   return result.success;
  // }, [formValues, setErrors]);

  // Handle clear form
  const handleClear = useCallback(() => {
    setAllValues([defaultFormValues]);
    setErrors(null);
  }, [defaultFormValues, setErrors, setAllValues]);

  // Handle form reset
  const handleReset = useCallback(() => {
    // updateFormValues(originalValues);
    // setIsSaved(true);
    // setIsProcessing(false);
    setErrors(null);
  }, []);

  // Handle field change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFieldValue(name as keys, value);
    },
    [setFieldValue],
  );

  const updateField = useCallback(
    (name: string, value: string) => {
      setFieldValue(0, name as keys, value);
    },
    [setFieldValue],
  );

  // Handle save
  const saveItem = useCallback(async (items: FormValues) => {
    // setProcessError(undefined);
    // const { id, create_date, edit_date, parent, ...rest } = items;
    // // const data = {
    //   ...rest,
    //   id,
    //   parent: splitParent(parent),
    //   edit_date: getDateTime(edit_date) ?? new Date(),
    //   create_date: id == 0 ? getDateTime(create_date) ?? new Date() : undefined,
    // };

    // const results =
    //   data.id > 0
    //     ? await patchData(`${ServiceUrl.ENDPOINT_PAGE}`, data)
    //     : await postData(`${ServiceUrl.ENDPOINT_PAGE}`, data);
    // setProcessError(undefined);
    return true;
  }, []);

  // Handle form submission
  const submitForm = useCallback((): boolean => {
    // setIsProcessing(true);
    // if (validateForm()) {
    //   saveItem(formValues);
    //   setIsProcessing(false);
    //   setIsSaved(true);
    //   return true;
    // }
    return false;
  }, []);

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

  const hasError = useCallback(
    (fieldName: keys) => {
      return !getFieldErrors(fieldName);
    },
    [getFieldErrors],
  );

  const getStandardTextInputAttributes = useCallback(
    (fieldName: keys) => {
      return {
        id: fieldName,
        errorText: getFieldErrors(fieldName),
        hasError: hasError(fieldName),
        value: formValues[fieldName],
      };
    },
    [getFieldErrors, hasError, formValues],
  );

  return useMemo(
    () => ({
      formValues,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setAllValues,
      setFieldValue,
      handleClear,
      handleChange,
      handleReset,
      submitForm,
      updateField,
    }),
    [
      formValues,
      getFieldErrors,
      getStandardTextInputAttributes,
      hasError,
      setAllValues,
      setFieldValue,
      handleClear,
      handleChange,
      handleReset,
      submitForm,
      updateField,
    ],
  );
};

export default usePagesEdit;
