
import React from 'react';
import { Download, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

export function SettingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your Session Buddy preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-100 border border-gray-200">
          <TabsTrigger value="general" className="data-[state=active]:bg-white">General</TabsTrigger>
          <TabsTrigger value="sync" className="data-[state=active]:bg-white">Sync & Backup</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-white">Privacy</TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-white">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">General Settings</CardTitle>
              <CardDescription className="text-gray-600">Basic application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-900">Auto-save sessions</Label>
                  <p className="text-sm text-gray-500">Automatically save sessions when closing tabs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-900">Show notifications</Label>
                  <p className="text-sm text-gray-500">Display system notifications for important events</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-200" />
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-gray-900">Theme</Label>
                <select id="theme" className="w-full p-2 border border-gray-200 rounded-md bg-white text-gray-900">
                  <option>System</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Sync & Backup</CardTitle>
              <CardDescription className="text-gray-600">Manage data synchronization and backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-900">Cloud sync</Label>
                  <p className="text-sm text-gray-500">Sync your sessions across devices</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-900">Auto backup</Label>
                  <p className="text-sm text-gray-500">Automatically backup your data daily</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-200" />
              <div className="space-y-2">
                <Label className="text-gray-900">Last backup</Label>
                <p className="text-sm text-gray-500">January 15, 2024 at 3:00 AM</p>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Download className="h-4 w-4 mr-2" />
                  Download Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Privacy Settings</CardTitle>
              <CardDescription className="text-gray-600">Control your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-900">Analytics</Label>
                  <p className="text-sm text-gray-500">Help improve Session Buddy by sharing usage data</p>
                </div>
                <Switch />
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-900">Crash reports</Label>
                  <p className="text-sm text-gray-500">Automatically send crash reports to help fix bugs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-200" />
              <div className="space-y-2">
                <Label className="text-base text-red-600">Danger Zone</Label>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-600 mb-2">Delete Account</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600">
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900">Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" className="border-gray-200">Cancel</Button>
                        <Button variant="destructive" className="bg-red-500 hover:bg-red-600">Delete Account</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Advanced Settings</CardTitle>
              <CardDescription className="text-gray-600">Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint" className="text-gray-900">API Endpoint</Label>
                <Input id="api-endpoint" defaultValue="https://api.sessionbuddy.com" className="border-gray-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-sessions" className="text-gray-900">Maximum Sessions</Label>
                <Input id="max-sessions" type="number" defaultValue="100" className="border-gray-200" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-900">Debug mode</Label>
                  <p className="text-sm text-gray-500">Enable detailed logging for troubleshooting</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
