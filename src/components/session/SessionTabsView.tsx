
import React, { useEffect, useState } from 'react';
import { useSessionBuddy } from "@/hooks/useSessionBuddy";
import { ExternalLink, Pin, Trash2, CheckSquare, Square, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Tab } from '@/types/tab';
import { useBrowserTabManager } from '@/hooks/useBrowserTabManager';

interface SessionTabsViewProps {
  tabs: Tab[];
  sessionName: string;
  onTabsUpdate?: (updatedTabs: Tab[]) => void;
  readonly?: boolean;
}

export function SessionTabsView({ 
  tabs, 
  sessionName, 
  onTabsUpdate, 
  readonly = false 
}: SessionTabsViewProps) {
  const { openTab, openSelectedTabs } = useBrowserTabManager();
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');

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

  const handleDeleteSelected = () => {
    if (selectedTabs.length > 0 && onTabsUpdate) {
      const updatedTabs = tabs.filter(tab => !selectedTabs.includes(tab.id));
      onTabsUpdate(updatedTabs);
      setSelectedTabs([]);
    }
  };

  const handleEditTab = (tab: Tab) => {
    setEditingTab(tab.id);
    setEditTitle(tab.title);
    setEditUrl(tab.url);
  };

  const handleSaveEdit = () => {
    if (editingTab && onTabsUpdate) {
      const updatedTabs = tabs.map(tab => 
        tab.id === editingTab 
          ? { ...tab, title: editTitle, url: editUrl }
          : tab
      );
      onTabsUpdate(updatedTabs);
      setEditingTab(null);
      setEditTitle('');
      setEditUrl('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTab(null);
    setEditTitle('');
    setEditUrl('');
  };

  const handleDeleteTab = (tabId: string) => {
    if (onTabsUpdate) {
      const updatedTabs = tabs.filter(tab => tab.id !== tabId);
      onTabsUpdate(updatedTabs);
    }
  };

  return (
    <Card className="border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900">
            Tabs in "{sessionName}"
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {tabs.length} tabs
            </Badge>
            {selectedTabs.length > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {selectedTabs.length} selected
              </Badge>
            )}
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
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleOpenSelected}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Selected ({selectedTabs.length})
                </Button>
                {!readonly && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                )}
              </>
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
                {editingTab === tab.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Tab title"
                      className="text-sm"
                    />
                    <Input
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      placeholder="Tab URL"
                      className="text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-medium text-gray-900 truncate">{tab.title}</p>
                    <p className="text-sm text-gray-500 truncate">{tab.url}</p>
                    <p className="text-xs text-gray-400">
                      Added: {new Date(tab.lastAccessed).toLocaleString()}
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-1">
                {tab.pinned && (
                  <Pin className="h-3 w-3 text-blue-500" />
                )}
                {editingTab === tab.id ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-green-600"
                      onClick={handleSaveEdit}
                    >
                      <Save className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-red-600"
                      onClick={handleCancelEdit}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => openTab(tab.url)}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    {!readonly && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEditTab(tab)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 text-red-600"
                          onClick={() => handleDeleteTab(tab.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          {tabs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tabs in this session.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
