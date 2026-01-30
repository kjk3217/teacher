'use client';

import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  userRole?: string;
}

export default function Header({
  userName = '홍길동',
  userRole,
}: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="알림"
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            {userName.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            {userRole && (
              <p className="text-xs text-gray-500">{userRole}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
