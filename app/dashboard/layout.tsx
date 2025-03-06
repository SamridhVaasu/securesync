'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Home,
  AlertTriangle,
  Bell,
  FileText,
  Settings,
  Users,
  FolderSync,
  LogOut,
  Menu,
  X,
  GitBranch,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React from 'react';

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Vulnerabilities', href: '/dashboard/vulnerabilities', icon: AlertTriangle },
  { name: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Add keyboard shortcut for sidebar toggle
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 transform transition-all duration-300 ease-in-out bg-background border-r border-border/50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center gap-3 px-6">
            <div className="p-3 rounded-xl bg-slate-100">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-xl font-semibold text-indigo-600">
              SecureSync
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-slate-100 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 mt-auto">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-indigo-600 text-white">
                <span className="text-sm font-medium">AT</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Admin Test</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-500">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-lg"
      >
        {sidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Main Content */}
      <main className="md:pl-64 min-h-screen">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
} 