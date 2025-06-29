
import React from 'react';
import { Archive, Clock, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSessionManager } from '@/hooks/useSessionManager';

export function DashboardContent() {
  const { sessions, currentTabs } = useSessionManager();

  const stats = [
    {
      title: "Current Tabs",
      value: currentTabs.length,
      description: "Open in current window",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Saved Sessions",
      value: sessions.length,
      description: "Total sessions saved",
      icon: Archive,
      color: "text-green-600"
    },
    {
      title: "Total Tabs Saved",
      value: sessions.reduce((total, session) => total + session.tabs.length, 0),
      description: "Across all sessions",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Recent Activity",
      value: sessions.filter(s => {
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return new Date(s.lastModified) > dayAgo;
      }).length,
      description: "Sessions in last 24h",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Session Buddy Pro</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-gray-200 bg-white hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Sessions</CardTitle>
            <CardDescription className="text-gray-600">Your most recently modified sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No sessions saved yet</p>
            ) : (
              <div className="space-y-3">
                {sessions
                  .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
                  .slice(0, 5)
                  .map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{session.name}</p>
                        <p className="text-sm text-gray-500">{session.tabs.length} tabs</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(session.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Save Current Session</p>
                <p className="text-sm text-gray-500">Quickly save your current {currentTabs.length} tabs</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Browse History</p>
                <p className="text-sm text-gray-500">View your browsing history</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Manage Collections</p>
                <p className="text-sm text-gray-500">Organize sessions into collections</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
