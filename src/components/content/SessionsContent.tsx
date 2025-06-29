import React, { useState } from 'react';
import { Filter, Play, Edit, Download, Trash2, Eye, Search, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useSessionManager } from '@/hooks/useSessionManager';
import { useSearch } from '@/hooks/useSearch';
import { SaveSessionDialog } from '@/components/session/SaveSessionDialog';
import { CurrentTabsView } from '@/components/session/CurrentTabsView';
import { SessionTabsView } from '@/components/session/SessionTabsView';
import { TabSession } from '@/types/tab';

export function SessionsContent() {
  const { 
    sessions, 
    currentTabs, 
    saveCurrentSession, 
    restoreSession, 
    deleteSession,
    updateSession 
  } = useSessionManager();

  const { searchQuery, setSearchQuery, filteredSessions } = useSearch(sessions);
  const [selectedSession, setSelectedSession] = useState<TabSession | null>(null);
  const [showSessionTabs, setShowSessionTabs] = useState(false);

  const handleSaveSession = (name: string, description?: string) => {
    saveCurrentSession(name, description);
  };

  const handleViewSessionTabs = (session: TabSession) => {
    setSelectedSession(session);
    setShowSessionTabs(true);
  };

  const handleUpdateSessionTabs = (updatedTabs: any[]) => {
    if (selectedSession) {
      updateSession(selectedSession.id, { 
        ...selectedSession, 
        tabs: updatedTabs 
      });
      setSelectedSession({
        ...selectedSession,
        tabs: updatedTabs
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-600">Manage your saved browser sessions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search sessions, tabs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <SaveSessionDialog 
            onSave={handleSaveSession}
            currentTabCount={currentTabs.length}
          />
        </div>
      </div>

      <CurrentTabsView tabs={currentTabs} />

      <Card className="border-gray-200 bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-600">Name</TableHead>
                <TableHead className="text-gray-600">Tabs</TableHead>
                <TableHead className="text-gray-600">Created</TableHead>
                <TableHead className="text-gray-600">Last Modified</TableHead>
                <TableHead className="text-right text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.length === 0 && searchQuery ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No sessions found matching "{searchQuery}"
                  </TableCell>
                </TableRow>
              ) : filteredSessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No saved sessions yet. Save your current tabs to get started!
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessions.map((session) => (
                  <TableRow key={session.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{session.name}</p>
                        {session.description && (
                          <p className="text-sm text-gray-500">{session.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {session.tabs.length} tabs
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {formatDate(session.created)}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {formatDate(session.lastModified)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => restoreSession(session.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            Restore Session
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewSessionTabs(session)}>
                            <List className="mr-2 h-4 w-4" />
                            View & Edit Tabs
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Session
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => deleteSession(session.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showSessionTabs} onOpenChange={setShowSessionTabs}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Session Tabs Management</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto">
            {selectedSession && (
              <SessionTabsView
                tabs={selectedSession.tabs}
                sessionName={selectedSession.name}
                onTabsUpdate={handleUpdateSessionTabs}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
