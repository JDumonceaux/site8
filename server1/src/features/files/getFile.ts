import { createGetHandlerWithParams } from '../../lib/http/genericHandlers.js';
import { getFileService } from '../../utils/ServiceFactory.js';

export const getFile = createGetHandlerWithParams<unknown>({
  errorResponse: {},
  getData: async (req) => {
    const { filename } = req.params;
    const filePath = (filename ?? '').trim() + '.json';
    const service = getFileService();
    const fileData = await service.getFile(filePath);
    return fileData ?? {};
  },
  handlerName: 'Files:getFile',
  return204OnEmpty: true,
  validateParams: (req) => {
    const { filename } = req.params;
    if (!filename) {
      return { errorMessage: 'Invalid filename', isValid: false };
    }
    return { isValid: true };
  },
});
