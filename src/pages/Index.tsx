
import React, { useState } from 'react';
import { SessionBuddySidebar } from '@/components/sidebar/SessionBuddySidebar';
import { UserMenu } from '@/components/auth/UserMenu';
import { DashboardContent } from '@/components/content/DashboardContent';
import { SessionsContent } from '@/components/content/SessionsContent';
import { CollectionsContent } from '@/components/content/CollectionsContent';
import { HistoryContent } from '@/components/content/HistoryContent';
import { AnalyticsContent } from '@/components/content/AnalyticsContent';
import { UsersContent } from '@/components/content/UsersContent';
import { ChangeLogsContent } from '@/components/content/ChangeLogsContent';
import { LicenseContent } from '@/components/content/LicenseContent';
import { SettingsContent } from '@/components/content/SettingsContent';
import { HelpSupportContent } from '@/components/content/HelpSupportContent';

function SessionBuddyApp() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardContent />;
      case "sessions":
        return <SessionsContent />;
      case "collections":
        return <CollectionsContent />;
      case "history":
        return <HistoryContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "users":
        return <UsersContent />;
      case "logs":
        return <ChangeLogsContent />;
      case "license":
        return <LicenseContent />;
      case "settings":
        return <SettingsContent />;
      case "help":
        return <HelpSupportContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SessionBuddySidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      
      <div className="flex-1 transition-all duration-300 ease-in-out overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 ml-16 md:ml-0">
          <div className="flex justify-end">
            <UserMenu />
          </div>
        </header>
        <main className="p-8 ml-16 md:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

const Index = () => {
  return <SessionBuddyApp />;
};

export default Index;
