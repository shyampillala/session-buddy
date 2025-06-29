
import {
  LayoutDashboard, 
  Archive,
  FileText,
  Activity,
  BarChart3,
  Users,
  Bell,
  Crown,
  Settings,
  HelpCircle
} from 'lucide-react';
import { NavigationItem } from '@/types';

export const navigationItems: NavigationItem[] = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "sessions", name: "Sessions", icon: Archive, href: "/sessions", badge: "12" },
  { id: "collections", name: "Collections", icon: FileText, href: "/collections" },
  { id: "history", name: "History", icon: Activity, href: "/history" },
  { id: "analytics", name: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "users", name: "User Manager", icon: Users, href: "/users", adminOnly: true },
  { id: "logs", name: "Change Logs", icon: Bell, href: "/logs", adminOnly: true, badge: "3" },
  { id: "license", name: "Licensing", icon: Crown, href: "/license" },
  { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
  { id: "help", name: "Help & Support", icon: HelpCircle, href: "/help" },
];
