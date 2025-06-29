
import React from 'react';
import { Crown, Check, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { mockLicense } from '@/data/mockData';

export function LicenseContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Licensing</h1>
        <p className="text-gray-600">Manage your Session Buddy license and features</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span>Current License</span>
            </CardTitle>
            <CardDescription className="text-gray-600">Your active Session Buddy Pro license</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">License Type</span>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">Pro</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Status</span>
              <Badge className="bg-green-100 text-green-700">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Expires</span>
              <span className="text-sm text-gray-600">December 31, 2024</span>
            </div>
            <Separator className="bg-gray-200" />
            <div>
              <h4 className="font-medium mb-2 text-gray-900">Included Features</h4>
              <div className="space-y-2">
                {mockLicense.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Usage Statistics</CardTitle>
            <CardDescription className="text-gray-600">Current month usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Sessions</span>
                <span className="text-sm text-gray-600">24 / ∞</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Storage</span>
                <span className="text-sm text-gray-600">8.2 / 50 GB</span>
              </div>
              <Progress value={16.4} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">API Calls</span>
                <span className="text-sm text-gray-600">1.2K / 10K</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Upgrade Options</CardTitle>
          <CardDescription className="text-gray-600">Enhance your Session Buddy experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Free</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-gray-900">$0</p>
              <p className="text-sm text-gray-500 mb-4">Perfect for personal use</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">5 Sessions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Local Storage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Basic Support</span>
                </li>
              </ul>
            </div>

            <div className="p-6 border-2 border-blue-500 rounded-lg relative bg-blue-50">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Current</Badge>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Pro</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-gray-900">$9.99</p>
              <p className="text-sm text-gray-500 mb-4">For power users</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Unlimited Sessions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Cloud Sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Priority Support</span>
                </li>
              </ul>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-gray-900">Enterprise</h3>
              </div>
              <p className="text-2xl font-bold mb-2 text-gray-900">$29.99</p>
              <p className="text-sm text-gray-500 mb-4">For teams and organizations</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Team Management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-gray-700">Advanced Analytics</span>
                </li>
              </ul>
              <Button className="w-full mt-4 bg-purple-500 hover:bg-purple-600" variant="outline">
                Upgrade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
