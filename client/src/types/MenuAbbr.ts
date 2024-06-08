import { Page } from './Page';

// Returned to front end
export type MenuAbbr = Pick<Page, 'id' | 'name' | 'to' | 'url'>;
