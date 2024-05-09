import { MenuEntry } from './MenuEntry';

// Returned to front end
export type MenuEntryFlat = Pick<MenuEntry, 'id' | 'name' | 'to' | 'url'>;
