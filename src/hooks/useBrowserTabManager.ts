
import { useState, useEffect, useCallback } from 'react';
import { Tab } from '@/types/tab';

export function useBrowserTabManager() {
  const [currentTabs, setCurrentTabs] = useState<Tab[]>([]);
  const [isExtensionMode, setIsExtensionMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if running as Chrome extension
  useEffect(() => {
    const checkExtensionMode = () => {
      const hasChrome = typeof window !== 'undefined' && 
                       window.chrome && 
                       window.chrome.tabs;
      setIsExtensionMode(!!hasChrome);
      return !!hasChrome;
    };

    checkExtensionMode();
  }, []);

  // Get current tabs from browser with real-time data
  const getCurrentTabs = useCallback(async (): Promise<Tab[]> => {
    setIsLoading(true);
    try {
      if (isExtensionMode && window.chrome?.tabs) {
        const tabs = await window.chrome.tabs.query({});
        const formattedTabs = tabs.map((tab, index) => ({
          id: tab.id?.toString() || `tab-${index}`,
          url: tab.url || '',
          title: tab.title || 'Untitled',
          favIconUrl: tab.favIconUrl,
          pinned: tab.pinned || false,
          active: tab.active || false,
          windowId: tab.windowId || 0,
          index: tab.index || index,
          lastAccessed: new Date().toISOString()
        }));
        return formattedTabs;
      } else {
        // Enhanced mock data with more realistic tabs for development
        return getMockTabs();
      }
    } catch (error) {
      console.error('Error fetching browser tabs:', error);
      return getMockTabs();
    } finally {
      setIsLoading(false);
    }
  }, [isExtensionMode]);

  // Enhanced mock tabs with more variety for development
  const getMockTabs = (): Tab[] => {
    return [
      {
        id: '1',
        url: 'https://github.com/dashboard',
        title: 'GitHub Dashboard',
        favIconUrl: 'https://github.com/favicon.ico',
        pinned: true,
        active: true,
        windowId: 1,
        index: 0,
        lastAccessed: new Date().toISOString()
      },
      {
        id: '2',
        url: 'https://stackoverflow.com/questions/tagged/react',
        title: 'React Questions - Stack Overflow',
        favIconUrl: 'https://stackoverflow.com/favicon.ico',
        pinned: false,
        active: false,
        windowId: 1,
        index: 1,
        lastAccessed: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: '3',
        url: 'https://supabase.com/docs',
        title: 'Supabase Documentation',
        favIconUrl: 'https://supabase.com/favicon.ico',
        pinned: true,
        active: false,
        windowId: 1,
        index: 2,
        lastAccessed: new Date(Date.now() - 600000).toISOString()
      },
      {
        id: '4',
        url: 'https://react.dev/learn',
        title: 'Learn React',
        favIconUrl: 'https://react.dev/favicon.ico',
        pinned: false,
        active: false,
        windowId: 1,
        index: 3,
        lastAccessed: new Date(Date.now() - 900000).toISOString()
      },
      {
        id: '5',
        url: 'https://tailwindcss.com/docs',
        title: 'Tailwind CSS Documentation',
        favIconUrl: 'https://tailwindcss.com/favicon.ico',
        pinned: false,
        active: false,
        windowId: 1,
        index: 4,
        lastAccessed: new Date(Date.now() - 1200000).toISOString()
      },
      {
        id: '6',
        url: 'https://www.youtube.com/watch?v=example',
        title: 'React Tutorial - YouTube',
        favIconUrl: 'https://www.youtube.com/favicon.ico',
        pinned: false,
        active: false,
        windowId: 1,
        index: 5,
        lastAccessed: new Date(Date.now() - 1500000).toISOString()
      }
    ];
  };

  // Open specific tab
  const openTab = async (url: string) => {
    if (isExtensionMode && window.chrome?.tabs) {
      try {
        await window.chrome.tabs.create({ url });
      } catch (error) {
        console.error('Error opening tab:', error);
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

  // Open multiple tabs with delay to prevent overwhelming
  const openTabs = async (tabs: Tab[]) => {
    for (const tab of tabs) {
      await openTab(tab.url);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  };

  // Open selected tabs
  const openSelectedTabs = async (tabIds: string[], allTabs: Tab[]) => {
    const selectedTabs = allTabs.filter(tab => tabIds.includes(tab.id));
    await openTabs(selectedTabs);
  };

  // Refresh current tabs with loading state
  const refreshTabs = useCallback(async () => {
    const tabs = await getCurrentTabs();
    setCurrentTabs(tabs);
  }, [getCurrentTabs]);

  // Initialize and set up auto-refresh
  useEffect(() => {
    refreshTabs();
    
    // Refresh tabs every 3 seconds for better real-time tracking
    const interval = setInterval(refreshTabs, 3000);
    
    return () => clearInterval(interval);
  }, [refreshTabs]);

  return {
    currentTabs,
    isExtensionMode,
    isLoading,
    getCurrentTabs,
    openTab,
    openTabs,
    openSelectedTabs,
    refreshTabs
  };
}
