
import { useState, useMemo } from 'react';
import { TabSession } from '@/types/tab';

export function useSearch(sessions: TabSession[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return sessions;

    const query = searchQuery.toLowerCase();
    return sessions.filter(session => {
      // Search in session name and description
      const matchesSession = 
        session.name.toLowerCase().includes(query) ||
        (session.description && session.description.toLowerCase().includes(query));

      // Search in tab titles and URLs
      const matchesTabs = session.tabs.some(tab => 
        tab.title.toLowerCase().includes(query) ||
        tab.url.toLowerCase().includes(query)
      );

      return matchesSession || matchesTabs;
    });
  }, [sessions, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredSessions
  };
}
