import { Page } from './Pages.js';

// Returned to front end
export type MenuAbbr = Pick<Page, 'id' | 'name' | 'to' | 'url'>;
