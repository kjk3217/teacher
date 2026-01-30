export const DEFAULT_TRAINING_NAMES = [
  '법정의무연수 묶음과정',
  '청렴·부패방지 교육',
  '개인정보보호 교육',
  '학교안전교육',
  '장애인 인식개선 교육',
  '아동학대 예방 교육',
  '성희롱·성폭력 예방 교육',
  '생명존중 교육',
  '정보통신 윤리교육',
  '교육과정 연수',
  '수업 전문성 향상 연수',
  '디지털 리터러시 교육',
];

export const DEFAULT_INSTITUTIONS = [
  '서울특별시교육청연수원',
  '중앙교육연수원',
  '한국교원대학교 종합교육연수원',
  '한국교육과정평가원',
  '한국교육학술정보원',
  '티처빌원격교육연수원',
];

export const TRAINING_TYPES = [
  { value: '직무(원격)', label: '원격', icon: '💻' },
  { value: '직무(대면)', label: '대면', icon: '👥' },
  { value: '직무(집합)', label: '집합', icon: '🔧' },
] as const;

export const POSITIONS = ['교장', '교감', '교사'] as const;

export const TARGET_HOURS = 65;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
