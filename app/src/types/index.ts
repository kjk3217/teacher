export interface User {
  id: string;
  email: string;
  full_name: string;
  position: '교장' | '교감' | '교사';
  is_admin: boolean;
  created_at: string;
}

export interface Training {
  id: string;
  user_id: string;
  training_name: string;
  institution_name: string;
  training_type: '직무(원격)' | '직무(대면)' | '직무(집합)';
  start_date: string;
  end_date: string;
  hours: number;
  is_paid: boolean;
  fee: number | null;
  certificate_url: string | null;
  certificate_file_name?: string | null;
  status?: '완료' | '승인 대기' | '반려' | '진행 중';
  category?: string;
  created_at: string;
  updated_at: string;
  // joined fields
  user_name?: string;
  user_position?: string;
}

export interface TrainingFormData {
  training_name: string;
  institution_name: string;
  training_type: '직무(원격)' | '직무(대면)' | '직무(집합)';
  start_date: string;
  end_date: string;
  hours: number;
  is_paid: boolean;
  fee: number | null;
  certificate_file?: File | null;
}

export interface DashboardStats {
  totalTrainings: number;
  totalHours: number;
  targetHours: number;
  achievementRate: number;
  thisMonthCount: number;
  thisMonthHours: number;
}

export interface AdminStats {
  totalTeachers: number;
  totalTrainings: number;
  totalHours: number;
  avgHoursPerTeacher: number;
  teacherGrowthRate: number;
  trainingGrowthRate: number;
  hoursGrowthRate: number;
}

export interface TeacherSummary {
  id: string;
  name: string;
  position: string;
  email: string;
  totalTrainings: number;
  totalHours: number;
  achievementRate: number;
  avatar?: string;
}
