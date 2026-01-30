'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { mockTeacherSummaries } from '@/lib/mock-data';
import {
  Search,
  Bell,
  Download,
  Users,
  Clock,
  BarChart3,
  ChevronDown,
  MoreHorizontal,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function getProgressColor(rate: number): string {
  if (rate > 70) return 'bg-green-500';
  if (rate >= 30) return 'bg-orange-400';
  return 'bg-red-500';
}

function getProgressTextColor(rate: number): string {
  if (rate > 70) return 'text-green-700';
  if (rate >= 30) return 'text-orange-600';
  return 'text-red-600';
}

export default function AdminDashboardPage() {
  const [positionFilter, setPositionFilter] = useState('전체');
  const [hoursFilter, setHoursFilter] = useState('20시간 이상');
  const [typeFilter, setTypeFilter] = useState('전체');

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Left Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="text-sm text-gray-500">
            <span className="text-gray-400">홈</span>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-gray-700 font-medium">관리자 대시보드</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="데이터 검색..."
                className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">김지민</p>
                <p className="text-xs text-gray-500">총괄 관리자</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                김
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Page Heading */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">시스템 통계</h1>
              <p className="mt-1 text-sm text-gray-500">
                교내 교사들의 연수 이수 현황 및 전문성 개발 지표를 모니터링합니다.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              리포트 내보내기
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Total Teachers */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">전체 교사 수</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">124</p>
                  <p className="mt-1 text-sm text-green-600">
                    <span className="font-medium">↑5.2%</span>{' '}
                    <span className="text-gray-500">지난 학기 대비</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Total Hours */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">전체 이수 시간</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">3,450</p>
                  <p className="mt-1 text-sm text-red-600">
                    <span className="font-medium">↓2.1%</span>{' '}
                    <span className="text-gray-500">지난 학기 대비</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Average Hours per Teacher */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">교사당 평균 시간</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">27.8</p>
                  <p className="mt-1 text-sm text-green-600">
                    <span className="font-medium">↑12.4%</span>{' '}
                    <span className="text-gray-500">목표 달성률 개선</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content: Two Columns */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Teacher Training Status (wider) */}
            <div className="col-span-2 bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">교사별 연수 현황</h2>
              </div>

              {/* Filter Row */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">직급:</label>
                  <div className="relative">
                    <select
                      value={positionFilter}
                      onChange={(e) => setPositionFilter(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>전체</option>
                      <option>교장</option>
                      <option>교감</option>
                      <option>교사</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">시간:</label>
                  <div className="relative">
                    <select
                      value={hoursFilter}
                      onChange={(e) => setHoursFilter(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>20시간 이상</option>
                      <option>10시간 이상</option>
                      <option>전체</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">유형:</label>
                  <div className="relative">
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>전체</option>
                      <option>직무(원격)</option>
                      <option>직무(대면)</option>
                      <option>직무(집합)</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        교사명
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        직급
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        이수 시간
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        달성률
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        상세보기
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockTeacherSummaries.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-medium">
                              {teacher.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {teacher.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{teacher.position}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {teacher.totalHours}시간
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getProgressColor(teacher.achievementRate)}`}
                                style={{ width: `${Math.min(teacher.achievementRate, 100)}%` }}
                              />
                            </div>
                            <span
                              className={`text-sm font-medium ${getProgressTextColor(teacher.achievementRate)}`}
                            >
                              {teacher.achievementRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  전체 <span className="font-medium text-gray-700">124</span>명 중{' '}
                  <span className="font-medium text-gray-700">4</span>명 표시
                </p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    이전
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    다음
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 space-y-6">
              {/* Training Type Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">연수 유형별 분포</h2>

                <div className="space-y-4">
                  {/* Online */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-700">원격 (온라인)</span>
                      <span className="text-sm font-semibold text-gray-900">64%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '64%' }} />
                    </div>
                  </div>

                  {/* In-person */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-700">집합/대면 (워크숍)</span>
                      <span className="text-sm font-semibold text-gray-900">36%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: '36%' }} />
                    </div>
                  </div>
                </div>

                {/* Stat Boxes */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-700">12</p>
                    <p className="text-xs text-blue-600 mt-0.5">예정</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-700">8</p>
                    <p className="text-xs text-green-600 mt-0.5">진행 중</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-orange-700">3</p>
                    <p className="text-xs text-orange-600 mt-0.5">대기</p>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">최근 주요 활동</h2>

                <div className="space-y-4">
                  {/* Activity 1 */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">마이클 장</span>: &quot;디지털 안전&quot; 이수 완료
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        2시간 전 &bull; 이수증 발급됨
                      </p>
                    </div>
                  </div>

                  {/* Activity 2 */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">신규 모듈</span>: &quot;교실 내 AI 활용&quot;
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        어제 &bull; 14명 신청
                      </p>
                    </div>
                  </div>

                  {/* Activity 3 */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">감사 알림</span>: 과학과
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        2일 전 &bull; 평균 이수 시간 15시간 미만
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-5 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  모든 활동 보기
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 left-[calc(16rem+2rem)] z-10 flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          새 연수 등록
        </button>
      </div>
    </div>
  );
}
