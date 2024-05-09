import { MenuEntry } from './MenuEntry.js';

// Returned to front end
export type MenuEntryFlat = Pick<MenuEntry, 'id' | 'name' | 'to' | 'url'>;
