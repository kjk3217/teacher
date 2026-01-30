'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bell,
  BookOpen,
  Clock,
  Plus,
  Download,
  ArrowRight,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { useTrainings } from '@/contexts/TrainingContext';
import { TARGET_HOURS } from '@/lib/constants';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { trainings } = useTrainings();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  const stats = useMemo(() => {
    const totalTrainings = trainings.length;
    const totalHours = trainings.reduce((sum, t) => sum + t.hours, 0);
    const achievementRate = TARGET_HOURS > 0 ? Math.round((totalHours / TARGET_HOURS) * 100) : 0;

    const now = new Date();
    const thisMonthCount = trainings.filter((t) => {
      const d = new Date(t.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return { totalTrainings, totalHours, achievementRate, thisMonthCount };
  }, [trainings]);

  const recentTrainings = useMemo(() => {
    return [...trainings]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [trainings]);

  const milestones = [
    { label: '의무 법정 연수', percentage: 100 },
    { label: '선택 연수 시간', percentage: 55 },
    { label: '에듀테크 통합 연수', percentage: 15 },
  ];

  function getMilestoneColor(pct: number): string {
    if (pct > 70) return 'bg-green-500';
    if (pct >= 30) return 'bg-orange-400';
    return 'bg-red-500';
  }

  function getMilestoneTextColor(pct: number): string {
    if (pct > 70) return 'text-green-600';
    if (pct >= 30) return 'text-orange-500';
    return 'text-red-500';
  }

  if (!user) {
    return null;
  }

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (stats.achievementRate / 100) * circumference;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={user.name} department={user.role} />

      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">교사 대시보드</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                안녕하세요, {user.name} 선생님! 오늘의 연수 이수 현황입니다.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="알림"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link
                href="/trainings/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                새 연수 등록
              </Link>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Trainings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">총 연수 횟수</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalTrainings}</p>
                  <p className="text-xs text-gray-400 mt-1">이번 달 +{stats.thisMonthCount}건</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Total Hours */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">총 이수 시간</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalHours}</p>
                  <p className="text-xs text-gray-400 mt-1">2일 전 업데이트됨</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Achievement Rate */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">연간 목표 달성률</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {stats.totalHours}/{TARGET_HOURS} 시간
                  </p>
                </div>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-blue-600">
                    {stats.achievementRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Trainings Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">최근 연수 내역</h2>
                <Link
                  href="/trainings"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  전체 보기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                        연수명
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                        연수 기관
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                        날짜
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentTrainings.map((training) => (
                      <tr key={training.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {training.training_name}
                            </p>
                            {training.category && (
                              <p className="text-xs text-gray-400 mt-0.5">{training.category}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {training.institution_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {training.start_date}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={(training.status || '완료') as '완료' | '승인 대기' | '반려' | '진행 중'} />
                        </td>
                      </tr>
                    ))}
                    {recentTrainings.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">
                          등록된 연수가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Milestones */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">주요 마일스톤</h2>
                <div className="space-y-5">
                  {milestones.map((ms) => (
                    <div key={ms.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700">{ms.label}</span>
                        <span className={`text-sm font-semibold ${getMilestoneTextColor(ms.percentage)}`}>
                          {ms.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${getMilestoneColor(ms.percentage)}`}
                          style={{ width: `${ms.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-xs text-gray-500">낮음 (&lt;30%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                    <span className="text-xs text-gray-500">중간 (30-70%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-500">높음 (&gt;70%)</span>
                  </div>
                </div>
              </div>

              {/* Certificate CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-sm">
                <h3 className="text-lg font-semibold">이수증을 출력하시겠습니까?</h3>
                <p className="text-sm text-blue-100 mt-1">
                  디지털 포트폴리오에 등록 가능한 3개의 신규 이수증이 있습니다.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  이수증 내려받기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
