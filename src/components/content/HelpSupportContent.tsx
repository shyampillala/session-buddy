
import React from 'react';
import { BookOpen, Video, FileQuestion, ExternalLink, Mail, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HelpSupportContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600">Get help and support for using Session Buddy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle className="text-gray-900">Documentation</CardTitle>
            <CardDescription className="text-gray-600">Complete guide to using Session Buddy</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-gray-200">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <Video className="h-8 w-8 text-green-500 mb-2" />
            <CardTitle className="text-gray-900">Video Tutorials</CardTitle>
            <CardDescription className="text-gray-600">Step-by-step video guides</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-gray-200">
              <ExternalLink className="h-4 w-4 mr-2" />
              Watch Videos
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <FileQuestion className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle className="text-gray-900">FAQ</CardTitle>
            <CardDescription className="text-gray-600">Frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-gray-200">
              <ExternalLink className="h-4 w-4 mr-2" />
              View FAQ
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Contact Support</CardTitle>
            <CardDescription className="text-gray-600">Get direct help from our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@sessionbuddy.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Live Chat</p>
                <p className="text-sm text-gray-600">Available 9 AM - 5 PM EST</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Phone Support</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Quick Help</CardTitle>
            <CardDescription className="text-gray-600">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Creating a new session</p>
              <p className="text-xs text-gray-600">Click the "+" button or press Ctrl+Shift+S</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Restoring sessions</p>
              <p className="text-xs text-gray-600">Right-click any session and select "Restore"</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Syncing across devices</p>
              <p className="text-xs text-gray-600">Enable cloud sync in Settings &gt; Sync & Backup</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">System Information</CardTitle>
          <CardDescription className="text-gray-600">Information to help with troubleshooting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Version:</span>
              <span className="ml-2 text-gray-600">4.0.1</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Browser:</span>
              <span className="ml-2 text-gray-600">Chrome 120.0.0</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Platform:</span>
              <span className="ml-2 text-gray-600">Windows 10</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">License:</span>
              <span className="ml-2 text-gray-600">Pro (Active)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
