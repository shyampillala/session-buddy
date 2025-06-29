
export interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  adminOnly?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  sessions: number;
}

export interface Session {
  id: string;
  name: string;
  tabs: number;
  created: string;
  lastModified: string;
  size: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'session' | 'user' | 'system';
}

export interface LicenseInfo {
  type: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'expired' | 'trial';
  expiresAt?: string;
  features: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  sessions: number;
  created: string;
  color: string;
}

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  visitTime: string;
  sessionId?: string;
}

export interface ChangeLog {
  id: string;
  version: string;
  date: string;
  type: 'feature' | 'bugfix' | 'security' | 'improvement';
  title: string;
  description: string;
}
