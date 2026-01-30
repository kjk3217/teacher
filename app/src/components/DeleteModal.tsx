'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  trainingName?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  trainingName,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        {/* Content */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            정말 삭제하시겠습니까?
          </h3>
          {trainingName && (
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-medium text-gray-700">&ldquo;{trainingName}&rdquo;</span>
              {' '}연수 내역이 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </p>
          )}
          {!trainingName && (
            <p className="mt-2 text-sm text-gray-500">
              이 항목이 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
