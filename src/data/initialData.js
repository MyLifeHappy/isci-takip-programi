export const COMPANY_INFO = {
  name: 'FEHA GRUP İNŞAAT A.Ş.',
  title: 'İşçi Takip ve Maaş Bordro Sistemi',
  address: 'Dilovası / Kocaeli - Türkiye',
  taxOffice: '',
  taxNumber: '',
  phone: '',
  email: '',
};

export const USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Yönetici' },
  { id: 2, username: 'personel', password: '1234', role: 'staff', name: 'Personel Girişi' },
];

export const DEFAULT_SETTINGS = {
  startTime: '07:30',
  endTime: '17:00',
  lunchBreakHours: 1,
  workDaysPerWeek: 5,
  normalDailyHours: 8.5,
  overtimeMultiplier: 1.5,
};

export const INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    identityNo: '11111111111',
    department: 'Üretim',
    jobTitle: 'Üretim Personeli',
    startDate: '2026-01-01',
    legalSalary: 25000,
    cashSalary: 10000,
    active: true,
  },
];

export const INITIAL_ATTENDANCE = [];
export const INITIAL_CALENDAR_OVERRIDES = [];
