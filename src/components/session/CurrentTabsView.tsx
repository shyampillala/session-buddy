
import React, { useState } from 'react';
import { ExternalLink, Pin, RefreshCw, Trash2, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tab } from '@/types/tab';
import { useBrowserTabManager } from '@/hooks/useBrowserTabManager';

interface CurrentTabsViewProps {
  tabs: Tab[];
}

export function CurrentTabsView({ tabs }: CurrentTabsViewProps) {
  const { openTab, openSelectedTabs, refreshTabs, isLoading } = useBrowserTabManager();
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);

  const handleTabSelect = (tabId: string, checked: boolean) => {
    if (checked) {
      setSelectedTabs(prev => [...prev, tabId]);
    } else {
      setSelectedTabs(prev => prev.filter(id => id !== tabId));
    }
  };

  const handleSelectAll = () => {
    if (selectedTabs.length === tabs.length) {
      setSelectedTabs([]);
    } else {
      setSelectedTabs(tabs.map(tab => tab.id));
    }
  };

  const handleOpenSelected = () => {
    if (selectedTabs.length > 0) {
      openSelectedTabs(selectedTabs, tabs);
      setSelectedTabs([]);
    }
  };

  const handleOpenTab = (url: string) => {
    openTab(url);
  };

  return (
    <Card className="border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900">Current Browser Tabs</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {tabs.length} tabs
            </Badge>
            {selectedTabs.length > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {selectedTabs.length} selected
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={refreshTabs}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        {tabs.length > 0 && (
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="flex items-center gap-2"
            >
              {selectedTabs.length === tabs.length ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              {selectedTabs.length === tabs.length ? 'Deselect All' : 'Select All'}
            </Button>
            {selectedTabs.length > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={handleOpenSelected}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Selected ({selectedTabs.length})
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                selectedTabs.includes(tab.id) 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'hover:bg-gray-50 border-gray-100'
              }`}
            >
              <Checkbox
                checked={selectedTabs.includes(tab.id)}
                onCheckedChange={(checked) => handleTabSelect(tab.id, checked as boolean)}
              />
              {tab.favIconUrl && (
                <img 
                  src={tab.favIconUrl} 
                  alt="" 
                  className="w-4 h-4 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{tab.title}</p>
                <p className="text-sm text-gray-500 truncate">{tab.url}</p>
                <p className="text-xs text-gray-400">
                  Last accessed: {new Date(tab.lastAccessed).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {tab.pinned && (
                  <Pin className="h-3 w-3 text-blue-500" />
                )}
                {tab.active && (
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                    Active
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => handleOpenTab(tab.url)}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          {tabs.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No tabs detected. Make sure you have tabs open in your browser.
            </div>
          )}
          {isLoading && (
            <div className="text-center py-8 text-gray-500">
              Loading current tabs...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
