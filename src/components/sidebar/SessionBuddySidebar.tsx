
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { navigationItems } from '@/data/navigationItems';
import { cn } from '@/lib/utils';

interface SessionBuddySidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export function SessionBuddySidebar({ activeItem, setActiveItem }: SessionBuddySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const filteredNavigationItems = navigationItems.filter(item => {
    if (searchQuery) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-white shadow-md border border-gray-200 md:hidden hover:bg-gray-50 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? 
          <X className="h-5 w-5 text-gray-600" /> : 
          <Menu className="h-5 w-5 text-gray-600" />
        }
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300" 
          onClick={toggleSidebar} 
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-gray-50 border-r border-gray-200 z-40 transition-all duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-80",
          "md:translate-x-0 md:static md:z-auto"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/50">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">SB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-lg">Session Buddy</span>
                <span className="text-xs text-gray-500">v4.0 Enterprise</span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn("h-4 w-4 text-gray-600 transition-transform", isCollapsed && "rotate-180")} />
          </button>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="px-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search navigation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 border-gray-200"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="space-y-1">
            {filteredNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group relative",
                      isActive
                        ? "bg-blue-500 text-white shadow-sm"
                        : "text-gray-600 hover:bg-white hover:text-gray-900",
                      isCollapsed && "justify-center px-2"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className="flex items-center justify-center min-w-[20px]">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                    </div>
                    
                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className={cn("text-sm", isActive ? "font-medium" : "font-normal")}>
                          {item.name}
                        </span>
                        {item.badge && (
                          <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    )}

                    {isCollapsed && item.badge && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white border-2 border-gray-50">
                        <span className="text-[10px] font-medium">
                          {parseInt(item.badge) > 9 ? '9+' : item.badge}
                        </span>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* License Status */}
        {!isCollapsed && (
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="p-3 bg-white/70 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Pro License</span>
                <Badge className="text-xs bg-green-100 text-green-700">Active</Badge>
              </div>
              <p className="text-xs text-gray-500">Expires Dec 31, 2024</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
