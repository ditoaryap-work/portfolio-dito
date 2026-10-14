export const apps = [
  { id: 'projects', label: 'My Projects', file: 'projects', icon: 'folder' },
  { id: 'about', label: 'About Me', file: 'about.txt', icon: 'computer' },
  { id: 'journey', label: 'My Journey', file: 'journey.txt', icon: 'journal' },
  { id: 'contact', label: 'Say Hello', file: 'contact', icon: 'mail' },
  { id: 'experiments', label: 'Recycle Bin', file: 'experiments', icon: 'bin' },
  { id: 'help', label: 'Quick Guide', file: 'help', icon: 'spark' },
] as const;

export type AppId = (typeof apps)[number]['id'];
export type WindowId = AppId | 'welcome';
export type IconName = (typeof apps)[number]['icon'] | 'spark' | 'sound';
