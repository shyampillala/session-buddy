
import { User, Session, ActivityLog, LicenseInfo, Collection, HistoryItem, ChangeLog } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastLogin: '2024-01-15', sessions: 12 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', lastLogin: '2024-01-14', sessions: 8 },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'inactive', lastLogin: '2024-01-10', sessions: 3 },
];

export const mockSessions: Session[] = [
  { id: '1', name: 'Work Session', tabs: 15, created: '2024-01-15', lastModified: '2024-01-15', size: '2.3 MB' },
  { id: '2', name: 'Research Project', tabs: 8, created: '2024-01-14', lastModified: '2024-01-15', size: '1.1 MB' },
  { id: '3', name: 'Shopping List', tabs: 5, created: '2024-01-13', lastModified: '2024-01-14', size: '0.8 MB' },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: '1', user: 'John Doe', action: 'Created new session "Work Session"', timestamp: '2024-01-15 10:30', type: 'session' },
  { id: '2', user: 'Jane Smith', action: 'Logged in', timestamp: '2024-01-15 09:15', type: 'user' },
  { id: '3', user: 'System', action: 'Backup completed', timestamp: '2024-01-15 08:00', type: 'system' },
];

export const mockLicense: LicenseInfo = {
  type: 'pro',
  status: 'active',
  expiresAt: '2024-12-31',
  features: ['Unlimited Sessions', 'Cloud Sync', 'Advanced Analytics', 'Priority Support']
};

export const mockCollections: Collection[] = [
  { id: '1', name: 'Work Projects', description: 'Development and design work sessions', sessions: 8, created: '2024-01-10', color: 'blue' },
  { id: '2', name: 'Research', description: 'Academic and personal research sessions', sessions: 5, created: '2024-01-12', color: 'green' },
  { id: '3', name: 'Shopping', description: 'Online shopping and price comparison', sessions: 3, created: '2024-01-14', color: 'purple' },
];

export const mockHistory: HistoryItem[] = [
  { id: '1', url: 'https://github.com', title: 'GitHub', visitTime: '2024-01-15 14:30', sessionId: '1' },
  { id: '2', url: 'https://stackoverflow.com', title: 'Stack Overflow', visitTime: '2024-01-15 14:25', sessionId: '1' },
  { id: '3', url: 'https://google.com', title: 'Google', visitTime: '2024-01-15 14:20' },
  { id: '4', url: 'https://youtube.com', title: 'YouTube', visitTime: '2024-01-15 13:45' },
];

export const mockChangeLogs: ChangeLog[] = [
  { 
    id: '1', 
    version: '4.0.1', 
    date: '2024-01-15', 
    type: 'bugfix', 
    title: 'Fixed session sync issues', 
    description: 'Resolved problems with session synchronization across devices'
  },
  { 
    id: '2', 
    version: '4.0.0', 
    date: '2024-01-10', 
    type: 'feature', 
    title: 'Major UI overhaul', 
    description: 'Complete redesign with modern interface and improved user experience'
  },
  { 
    id: '3', 
    version: '3.9.5', 
    date: '2024-01-05', 
    type: 'security', 
    title: 'Security updates', 
    description: 'Enhanced security measures and data encryption improvements'
  },
];
