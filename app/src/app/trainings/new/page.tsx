'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Monitor,
  Users,
  Wrench,
  Calendar,
  Upload,
  GraduationCap,
  FileText,
  Bell,
  ChevronRight,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTrainings } from '@/contexts/TrainingContext';
import {
  DEFAULT_TRAINING_NAMES,
  DEFAULT_INSTITUTIONS,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
} from '@/lib/constants';
import { TrainingFormData } from '@/types';

type TrainingTypeValue = '직무(원격)' | '직무(대면)' | '직무(집합)';

interface FormErrors {
  training_name?: string;
  institution_name?: string;
  training_type?: string;
  start_date?: string;
  end_date?: string;
  hours?: string;
  fee?: string;
  certificate_file?: string;
}

function Combobox({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes((search || value).toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        onClick={() => setOpen(true)}
      >
        <input
          type="text"
          className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent"
          placeholder={placeholder}
          value={search !== '' ? search : value}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setSearch(value);
            setOpen(true);
          }}
        />
        <button
          type="button"
          className="px-3 text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filtered.map((opt) => (
            <li
              key={opt}
              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 flex items-center justify-between ${
                value === opt ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
              }`}
              onMouseDown={() => {
                onChange(opt);
                setSearch('');
                setOpen(false);
              }}
            >
              {opt}
              {value === opt && <Check className="w-4 h-4 text-blue-600" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NewTrainingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTraining } = useTrainings();

  const [formData, setFormData] = useState<TrainingFormData>({
    training_name: '',
    institution_name: '',
    training_type: '직무(원격)',
    start_date: '',
    end_date: '',
    hours: 0,
    is_paid: false,
    fee: null,
    certificate_file: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trainingTypes: { value: TrainingTypeValue; label: string; icon: React.ReactNode }[] = [
    { value: '직무(원격)', label: '원격', icon: <Monitor className="w-5 h-5" /> },
    { value: '직무(대면)', label: '대면', icon: <Users className="w-5 h-5" /> },
    { value: '직무(집합)', label: '집합', icon: <Wrench className="w-5 h-5" /> },
  ];

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.training_name.trim()) {
      newErrors.training_name = '연수명을 입력해 주세요.';
    }
    if (!formData.institution_name.trim()) {
      newErrors.institution_name = '기관명을 입력해 주세요.';
    }
    if (!formData.training_type) {
      newErrors.training_type = '연수 구분을 선택해 주세요.';
    }
    if (!formData.start_date) {
      newErrors.start_date = '시작일을 선택해 주세요.';
    }
    if (!formData.end_date) {
      newErrors.end_date = '종료일을 선택해 주세요.';
    }
    if (formData.start_date && formData.end_date && formData.end_date < formData.start_date) {
      newErrors.end_date = '종료일은 시작일 이후여야 합니다.';
    }
    if (!formData.hours || formData.hours <= 0) {
      newErrors.hours = '이수 시간을 입력해 주세요.';
    }
    if (formData.is_paid && (!formData.fee || formData.fee <= 0)) {
      newErrors.fee = '결제 금액을 입력해 주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleFileSelect(file: File) {
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, certificate_file: '파일 크기는 5MB 이하여야 합니다.' }));
      return;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        certificate_file: 'PDF, JPG 또는 PNG 파일만 업로드할 수 있습니다.',
      }));
      return;
    }
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { certificate_file: _removed, ...rest } = prev;
      return rest;
    });
    setFormData((prev) => ({ ...prev, certificate_file: file }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await addTraining(formData);
      router.push('/dashboard');
    } catch {
      setSubmitting(false);
    }
  }

  const navLinks = [
    { href: '/dashboard', label: '대시보드' },
    { href: '/certificates', label: '이수증 관리' },
    { href: '/trainings/new', label: '연수 기록', active: true },
    { href: '/settings', label: '설정' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">EduTrain</span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      link.active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
            대시보드
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>연수 정보</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">새 연수 등록</span>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">연수 정보 등록</h1>
          <p className="mt-1 text-sm text-gray-500">
            전문성 개발을 위한 연수 상세 내역을 입력해 주세요.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: 연수 기본 정보 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">연수 기본 정보</h2>
            </div>

            <div className="space-y-5">
              {/* 연수명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  연수명 <span className="text-red-500">*</span>
                </label>
                <Combobox
                  options={DEFAULT_TRAINING_NAMES}
                  value={formData.training_name}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, training_name: val }))
                  }
                  placeholder="연수명을 선택하거나 입력하세요"
                />
                {errors.training_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.training_name}</p>
                )}
              </div>

              {/* 기관명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  기관명 <span className="text-red-500">*</span>
                </label>
                <Combobox
                  options={DEFAULT_INSTITUTIONS}
                  value={formData.institution_name}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, institution_name: val }))
                  }
                  placeholder="기관명을 선택하거나 입력하세요"
                />
                {errors.institution_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.institution_name}</p>
                )}
              </div>

              {/* 연수 구분 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  연수 구분 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {trainingTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, training_type: type.value }))
                      }
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        formData.training_type === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {type.icon}
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
                {errors.training_type && (
                  <p className="mt-1 text-sm text-red-500">{errors.training_type}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: 이수 일정 및 시간 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">이수 일정 및 시간</h2>
            </div>

            <div className="space-y-5">
              {/* 이수 기간 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  이수 기간 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, start_date: e.target.value }))
                      }
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="시작"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, end_date: e.target.value }))
                      }
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="종료"
                    />
                  </div>
                </div>
                {errors.start_date && (
                  <p className="mt-1 text-sm text-red-500">{errors.start_date}</p>
                )}
                {errors.end_date && (
                  <p className="mt-1 text-sm text-red-500">{errors.end_date}</p>
                )}
              </div>

              {/* 이수 시간 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  이수 시간 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={formData.hours || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hours: parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder="예: 12.5"
                    className="w-full px-4 py-2.5 pr-14 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    시간
                  </span>
                </div>
                {errors.hours && (
                  <p className="mt-1 text-sm text-red-500">{errors.hours}</p>
                )}
              </div>

              {/* 연수비 토글 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">유료 연수인가요?</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${!formData.is_paid ? 'text-gray-900 font-medium' : 'text-gray-400'}`}
                    >
                      무료
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          is_paid: !prev.is_paid,
                          fee: !prev.is_paid ? prev.fee : null,
                        }))
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        formData.is_paid ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          formData.is_paid ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span
                      className={`text-sm ${formData.is_paid ? 'text-gray-900 font-medium' : 'text-gray-400'}`}
                    >
                      유료
                    </span>
                  </div>
                </div>

                {/* 결제 금액 */}
                {formData.is_paid && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      결제 금액 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        &#8361;
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={formData.fee ?? ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fee: e.target.value ? parseInt(e.target.value) : null,
                          }))
                        }
                        placeholder="금액을 입력하세요"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    {errors.fee && (
                      <p className="mt-1 text-sm text-red-500">{errors.fee}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: 이수 확인 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">이수 확인</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                이수증 업로드
              </label>

              {formData.certificate_file ? (
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {formData.certificate_file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(formData.certificate_file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, certificate_file: null }))
                    }
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleFileSelect(file);
                  }}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">
                    클릭하여 업로드하거나 파일을 여기로 끌어다 놓으세요
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG 또는 PNG (최대 5MB)
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                  e.target.value = '';
                }}
              />
              {errors.certificate_file && (
                <p className="mt-1 text-sm text-red-500">{errors.certificate_file}</p>
              )}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 pb-8">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
