
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockChangeLogs } from '@/data/mockData';

export function ChangeLogsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Change Logs</h1>
        <p className="text-gray-600">Stay updated with the latest features and improvements</p>
      </div>

      <div className="space-y-4">
        {mockChangeLogs.map((log) => (
          <Card key={log.id} className="border-gray-200 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={
                      log.type === 'feature' ? 'default' :
                      log.type === 'bugfix' ? 'secondary' :
                      log.type === 'security' ? 'destructive' : 'outline'
                    }
                    className="text-xs"
                  >
                    {log.type}
                  </Badge>
                  <span className="font-mono text-sm text-gray-600">v{log.version}</span>
                </div>
                <span className="text-sm text-gray-500">{log.date}</span>
              </div>
              <CardTitle className="text-gray-900">{log.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{log.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Subscribe to Updates</CardTitle>
          <CardDescription className="text-gray-600">Get notified about new releases and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Bell className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
