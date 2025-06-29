
import { useState, useEffect } from 'react';
import { TabSession, Tab } from '@/types/tab';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useBrowserTabManager } from './useBrowserTabManager';

export function useSessionManager() {
  const [sessions, setSessions] = useState<TabSession[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { currentTabs, getCurrentTabs, openTabs } = useBrowserTabManager();

  const fetchSessions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formattedSessions: TabSession[] = data.map(session => ({
        id: session.id,
        name: session.name,
        description: session.description || undefined,
        tabs: (session.tabs as unknown as Tab[]) || [],
        created: session.created_at,
        lastModified: session.updated_at,
        color: session.color || undefined,
        isActive: false
      }));

      setSessions(formattedSessions);
    } catch (error: any) {
      toast({
        title: "Error loading sessions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentSession = async (name: string, description?: string) => {
    if (!user) return null;

    const tabs = await getCurrentTabs();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .insert({
          user_id: user.id,
          name,
          description,
          tabs: tabs as unknown as any,
        })
        .select()
        .single();

      if (error) throw error;

      const newSession: TabSession = {
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        tabs: (data.tabs as unknown as Tab[]) || [],
        created: data.created_at,
        lastModified: data.updated_at,
        color: data.color || undefined,
        isActive: false
      };

      setSessions(prev => [newSession, ...prev]);
      
      toast({
        title: "Session saved",
        description: `"${name}" has been saved with ${tabs.length} tabs.`,
      });

      return newSession;
    } catch (error: any) {
      toast({
        title: "Error saving session",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const restoreSession = async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      try {
        await openTabs(session.tabs);
        toast({
          title: "Session restored",
          description: `Opening ${session.tabs.length} tabs from "${session.name}".`,
        });
      } catch (error) {
        toast({
          title: "Error restoring session",
          description: "Some tabs may not have opened correctly.",
          variant: "destructive",
        });
      }
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_sessions')
        .delete()
        .eq('id', sessionId)
        .eq('user_id', user.id);

      if (error) throw error;

      setSessions(prev => prev.filter(s => s.id !== sessionId));
      
      toast({
        title: "Session deleted",
        description: "Session has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting session",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateSession = async (sessionId: string, updates: Partial<TabSession>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({
          name: updates.name,
          description: updates.description,
          color: updates.color,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .eq('user_id', user.id);

      if (error) throw error;

      setSessions(prev => prev.map(s => 
        s.id === sessionId 
          ? { ...s, ...updates, lastModified: new Date().toISOString() }
          : s
      ));

      toast({
        title: "Session updated",
        description: "Session has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating session",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  return {
    sessions,
    currentTabs,
    loading,
    saveCurrentSession,
    restoreSession,
    deleteSession,
    updateSession,
    refreshSessions: fetchSessions,
  };
}
