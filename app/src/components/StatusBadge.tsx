'use client';

import React from 'react';

type Status = '완료' | '승인 대기' | '반려' | '진행 중';

interface StatusBadgeProps {
  status: Status;
}

const statusStyles: Record<Status, string> = {
  '완료': 'bg-green-100 text-green-700',
  '승인 대기': 'bg-yellow-100 text-yellow-700',
  '반려': 'bg-red-100 text-red-700',
  '진행 중': 'bg-blue-100 text-blue-700',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
