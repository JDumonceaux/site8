import type { TestsSection } from '@site8/shared';

import { createCollectionHandler } from '../../lib/http/createCollectionHandler.js';
import { getTestsSectionsService } from '../../utils/ServiceFactory.js';

export const getSections = createCollectionHandler<TestsSection>({
  defaultTitle: 'Tests',
  getService: getTestsSectionsService,
  handlerName: 'Tests:getSections',
  return204OnEmpty: false,
});
