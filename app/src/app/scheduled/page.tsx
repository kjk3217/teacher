'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Plus, Clock, MapPin } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const upcomingTrainings = [
  {
    id: 'upcoming-1',
    title: '2024 교육과정 개정 연수',
    institution: '교육부',
    date: '2024년 3월 예정',
    type: '직무(대면)',
    status: '신청',
  },
  {
    id: 'upcoming-2',
    title: 'AI 기반 교육 도구 활용',
    institution: '한국교육학술정보원',
    date: '2024년 4월 예정',
    type: '직무(원격)',
    status: '신청',
  },
];

export default function ScheduledPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={user.name} department={user.role} />

      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">수강 예정 연수</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              예정된 연수 일정을 확인하고 관리하세요.
            </p>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Empty State Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">예정된 연수가 없습니다.</p>
            <p className="text-sm text-gray-400 mt-1 mb-4">
              새로운 연수를 등록하여 일정을 관리하세요.
            </p>
            <Link
              href="/trainings/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 연수 등록
            </Link>
          </div>

          {/* Upcoming Trainings */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">추천 예정 연수</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrainings.map((training) => (
                <div
                  key={training.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{training.date}</span>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 px-2.5 py-0.5 text-xs font-medium">
                      {training.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{training.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{training.institution}</span>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-2.5 py-0.5 text-xs font-medium">
                    {training.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
