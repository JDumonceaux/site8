import { REQUIRED_FIELD } from 'lib/utils/constants';
import { Environment } from 'lib/utils/Environment';
import { useEffect } from 'react';
import { z } from 'zod';

export type sortByType = 'seq' | 'name';

// Define Zod Shape
const pageSchema = z.object({
  localId: z.number(),
  id: z.number(),
  name: z.string().optional(),
  parent: z.string().min(1, REQUIRED_FIELD),
  seq: z.string(),
  sortby: z.string(),
  tempId: z.number(),
  type: z.string(),
});

const useInputText = () => {
  // Get the data
  useEffect(() => {
    if (Environment.isLowerEnvironment()) {
      //
    }
    //fetchData(ServiceUrl.ENDPOINT_MENUS_EDIT);
  }, []);

  return {
    data: null,
  };
};

export default useInputText;
