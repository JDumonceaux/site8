import { Page } from './Page.js';

// Returned to front end
export type MenuAbbr = Pick<Page, 'id' | 'name' | 'to' | 'url'>;
