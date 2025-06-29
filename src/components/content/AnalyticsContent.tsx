
import React from 'react';
import { TrendingUp, BarChart3, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cnUtil } from '@/utils/className';

export function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Insights into your browsing patterns and session usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sessions This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <p className="text-xs text-green-600">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Tabs per Session</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8.5</div>
            <p className="text-xs text-blue-600">Optimal range: 5-10</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Most Active Day</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Tuesday</div>
            <p className="text-xs text-gray-500">6 sessions avg.</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2.3h</div>
            <p className="text-xs text-green-600">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Top Websites</CardTitle>
            <CardDescription className="text-gray-600">Most frequently visited sites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { site: 'GitHub', visits: 45, percentage: 85 },
                { site: 'Stack Overflow', visits: 32, percentage: 60 },
                { site: 'Google', visits: 28, percentage: 50 },
                { site: 'YouTube', visits: 22, percentage: 40 },
                { site: 'Twitter', visits: 15, percentage: 25 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{item.site}</span>
                      <span className="text-sm text-gray-600">{item.visits} visits</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Session Productivity</CardTitle>
            <CardDescription className="text-gray-600">Weekly session creation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: 'Monday', sessions: 3, productive: true },
                { day: 'Tuesday', sessions: 6, productive: true },
                { day: 'Wednesday', sessions: 4, productive: true },
                { day: 'Thursday', sessions: 2, productive: false },
                { day: 'Friday', sessions: 5, productive: true },
                { day: 'Saturday', sessions: 1, productive: false },
                { day: 'Sunday', sessions: 2, productive: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.day}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{item.sessions} sessions</span>
                    <div className={cnUtil(
                      "w-2 h-2 rounded-full",
                      item.productive ? 'bg-green-500' : 'bg-gray-300'
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
