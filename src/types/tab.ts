
export interface Tab {
  id: string;
  url: string;
  title: string;
  favIconUrl?: string;
  pinned: boolean;
  active: boolean;
  windowId: number;
  index: number;
  lastAccessed: string;
}

export interface TabSession {
  id: string;
  name: string;
  description?: string;
  tabs: Tab[];
  created: string;
  lastModified: string;
  color?: string;
  isActive: boolean;
}

export interface SessionCollection {
  id: string;
  name: string;
  description: string;
  sessions: TabSession[];
  created: string;
  color: string;
}
