'use client';

import { ReactNode } from 'react';

interface SentinelLayoutProps {
  children: ReactNode;
}

export default function SentinelLayout({ children }: SentinelLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
} 