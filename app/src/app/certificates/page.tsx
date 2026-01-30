'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Eye, Download, Award } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useTrainings } from '@/contexts/TrainingContext';

export default function CertificatesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { trainings } = useTrainings();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  const completedTrainings = useMemo(() => {
    return trainings.filter((t) => t.status === '완료');
  }, [trainings]);

  const stats = useMemo(() => {
    const total = completedTrainings.length;

    const now = new Date();
    const thisMonth = completedTrainings.filter((t) => {
      const d = new Date(t.end_date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return { total, thisMonth, downloadable: total };
  }, [completedTrainings]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={user.name} department={user.role} />

      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">이수증 관리</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              연수 이수증을 관리하고 다운로드하세요.
            </p>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">총 이수증 수</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">이번 달 발급</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.thisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">다운로드 가능</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.downloadable}</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Cards */}
          {completedTrainings.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">등록된 이수증이 없습니다.</p>
              <p className="text-sm text-gray-400 mt-1">
                연수를 완료하면 이수증이 자동으로 등록됩니다.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTrainings.map((training) => (
                <div
                  key={training.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {training.training_name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{training.institution_name}</p>
                  <p className="text-xs text-gray-400 mb-3">
                    완료일: {training.end_date}
                  </p>
                  <span className="inline-flex items-center self-start rounded-full bg-blue-100 text-blue-700 px-2.5 py-0.5 text-xs font-medium mb-4">
                    {training.hours}시간
                  </span>
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      미리보기
                    </button>
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      다운로드
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
