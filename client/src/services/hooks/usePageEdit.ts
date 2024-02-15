import { useCallback, useMemo, useState } from 'react';
import { IPage } from 'services/api/models/pages/IPage';
import { ServiceUrl } from 'utils';
import { z } from 'zod';
import usePost from './usePost';

const pageSchema = z.object({
  id: z.number(),
  short_title: z
    .string({ required_error: 'Short Title is required.' })
    .min(1)
    .trim(),
  long_title: z
    .string({ required_error: 'Long Title is required.' })
    .min(1)
    .trim(),
  edit_date: z.string().trim().optional(),
  resources: z.boolean(),
  text: z.string({ required_error: 'Text is required.' }).min(1).trim(),
  parent: z.string().trim().optional(),
  reading_time: z.string().trim().optional(),
  readability_score: z.string().trim().optional(),
});

const usePageEdit = () => {
  type PageFormValues = z.infer<typeof pageSchema>;
  const defaultFormValues: PageFormValues = {
    id: 0,
    short_title: '',
    long_title: '',
    edit_date: '',
    resources: false,
    text: '',
    parent: '',
    reading_time: '',
    readability_score: '',
  };
  const [formValues, setFormValues] =
    useState<PageFormValues>(defaultFormValues);
  const { postData } = usePost<IPage>(`${ServiceUrl.ENDPOINT_PAGE}`);
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  // const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // const [updateError, setUpdateError] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    setFormValues(defaultFormValues);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // setIsProcessing(true);
    const { edit_date, parent, ...rest } = formValues;
    postData(rest);
    //  setIsProcessing(false);
  };

  // setIsProcessing(true);

  return useMemo(
    () => ({
      pageSchema,
      formValues,
      // isProcessing,
      // updateError,
      setFormValues,
      handleCancel,
      handleChange,
      handleSubmit,
    }),
    [
      pageSchema,
      formValues,
      // isProcessing,
      // updateError,
      postData,
      handleCancel,
      handleChange,
      handleSubmit,
    ],
  );
};

export default usePageEdit;
