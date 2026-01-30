'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Clock,
  UserPlus,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Blue Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#2563EB] via-[#1d4ed8] to-[#1e40af] text-white flex-col justify-center items-center p-12">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute bottom-12 -right-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute top-1/3 right-12 w-48 h-48 bg-white/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-md text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            교사 연수 관리 시스템
          </h1>

          {/* Description */}
          <p className="text-blue-100 text-base leading-relaxed mb-10">
            미래 교육을 선도하는 교사들의 성장을 위한 통합 연수 관리 솔루션입니다.
            체계적인 연수 설계와 이력 관리를 시작해보세요.
          </p>

          {/* Feature Badges */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-medium">안전한 통합 인증</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">실시간 이력 관리</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인</h2>
            <p className="text-gray-500 text-sm">
              교사 및 관리자 계정으로 로그인해 주세요.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@school.go.kr"
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition bg-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="block w-full pl-10 pr-11 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                '로그인'
              )}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              비밀번호를 잊으셨나요?{' '}
            </span>
            <Link
              href="#"
              className="text-sm text-[#2563EB] hover:text-[#1d4ed8] font-medium hover:underline"
            >
              비밀번호 재설정
            </Link>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-xs text-gray-400">또는</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Signup Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">
              아직 계정이 없으신가요?
            </p>
            <Link
              href="/signup"
              className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
            >
              <UserPlus className="w-4 h-4" />
              회원가입 신청하기
            </Link>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center gap-6">
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              이용 약관
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              고객지원
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
