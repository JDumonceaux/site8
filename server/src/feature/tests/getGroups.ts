import type { TestGroupsResponse } from './TestsGroupsService.js';

import { createGetHandler } from '../../lib/http/genericHandlers.js';
import { getTestsGroupsService } from '../../utils/ServiceFactory.js';

export const getGroups = createGetHandler<TestGroupsResponse>({
  errorResponse: { groups: [] },
  getData: async () => getTestsGroupsService().getItems(),
  handlerName: 'Tests:getGroups',
  return204OnEmpty: false,
});
