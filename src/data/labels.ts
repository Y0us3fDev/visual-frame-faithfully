import type { BadgeProps } from "@/components/ui/badge";

export type Tone = NonNullable<BadgeProps["variant"]>;
export type LabelMap = Record<string, { ar: string; en: string; tone?: Tone }>;

export const patientStatus: LabelMap = {
  outpatient: { ar: "عيادات خارجية", en: "Outpatient", tone: "info" },
  admitted: { ar: "مقيم", en: "Admitted", tone: "primary" },
  critical: { ar: "حالة حرجة", en: "Critical", tone: "danger" },
  discharged: { ar: "خرج", en: "Discharged", tone: "muted" },
};
export const gender: LabelMap = {
  male: { ar: "ذكر", en: "Male" },
  female: { ar: "أنثى", en: "Female" },
};
export const doctorStatus: LabelMap = {
  available: { ar: "متاح", en: "Available", tone: "success" },
  busy: { ar: "مشغول", en: "Busy", tone: "warning" },
  on_leave: { ar: "في إجازة", en: "On leave", tone: "info" },
  off: { ar: "خارج الدوام", en: "Off duty", tone: "muted" },
};
export const employeeStatus: LabelMap = {
  active: { ar: "نشط", en: "Active", tone: "success" },
  on_leave: { ar: "في إجازة", en: "On leave", tone: "info" },
  suspended: { ar: "موقوف", en: "Suspended", tone: "warning" },
  terminated: { ar: "منتهي الخدمة", en: "Terminated", tone: "danger" },
};
export const shift: LabelMap = {
  morning: { ar: "صباحي", en: "Morning" },
  evening: { ar: "مسائي", en: "Evening" },
  night: { ar: "ليلي", en: "Night" },
};
export const attendanceStatus: LabelMap = {
  present: { ar: "حاضر", en: "Present", tone: "success" },
  late: { ar: "متأخر", en: "Late", tone: "warning" },
  absent: { ar: "غائب", en: "Absent", tone: "danger" },
  leave: { ar: "إجازة", en: "On leave", tone: "info" },
};
export const leaveType: LabelMap = {
  annual: { ar: "سنوية", en: "Annual" },
  sick: { ar: "مرضية", en: "Sick" },
  emergency: { ar: "طارئة", en: "Emergency" },
  unpaid: { ar: "بدون راتب", en: "Unpaid" },
};
export const leaveStatus: LabelMap = {
  pending: { ar: "قيد المراجعة", en: "Pending", tone: "warning" },
  approved: { ar: "موافق عليها", en: "Approved", tone: "success" },
  rejected: { ar: "مرفوضة", en: "Rejected", tone: "danger" },
};
export const appointmentType: LabelMap = {
  consultation: { ar: "كشف", en: "Consultation" },
  follow_up: { ar: "متابعة", en: "Follow-up" },
  checkup: { ar: "فحص دوري", en: "Check-up" },
  emergency: { ar: "طوارئ", en: "Emergency" },
};
export const appointmentStatus: LabelMap = {
  scheduled: { ar: "مجدول", en: "Scheduled", tone: "info" },
  confirmed: { ar: "مؤكد", en: "Confirmed", tone: "primary" },
  completed: { ar: "مكتمل", en: "Completed", tone: "success" },
  cancelled: { ar: "ملغي", en: "Cancelled", tone: "danger" },
  no_show: { ar: "لم يحضر", en: "No-show", tone: "muted" },
};
export const roomType: LabelMap = {
  general: { ar: "عنبر عام", en: "General ward" },
  private: { ar: "غرفة خاصة", en: "Private room" },
  icu: { ar: "عناية مركزة", en: "ICU" },
  surgery: { ar: "إفاقة جراحة", en: "Surgical recovery" },
  maternity: { ar: "ولادة", en: "Maternity" },
  pediatric: { ar: "أطفال", en: "Pediatric" },
};
export const bedStatus: LabelMap = {
  available: { ar: "متاح", en: "Available", tone: "success" },
  occupied: { ar: "مشغول", en: "Occupied", tone: "primary" },
  reserved: { ar: "محجوز", en: "Reserved", tone: "warning" },
  maintenance: { ar: "صيانة", en: "Maintenance", tone: "muted" },
};
export const testStatus: LabelMap = {
  pending: { ar: "قيد الانتظار", en: "Pending", tone: "warning" },
  in_progress: { ar: "جاري التحليل", en: "In progress", tone: "info" },
  completed: { ar: "مكتمل", en: "Completed", tone: "success" },
  cancelled: { ar: "ملغي", en: "Cancelled", tone: "muted" },
};
export const priority: LabelMap = {
  routine: { ar: "عادي", en: "Routine", tone: "muted" },
  urgent: { ar: "عاجل", en: "Urgent", tone: "danger" },
};
export const labTestTypes: LabelMap = {
  cbc: { ar: "صورة دم كاملة", en: "Complete blood count" },
  lipid: { ar: "دهون الدم", en: "Lipid profile" },
  liver: { ar: "وظائف الكبد", en: "Liver function" },
  kidney: { ar: "وظائف الكلى", en: "Kidney function" },
  glucose: { ar: "سكر صائم وتراكمي", en: "Glucose & HbA1c" },
  thyroid: { ar: "وظائف الغدة الدرقية", en: "Thyroid panel" },
  urine: { ar: "تحليل بول", en: "Urinalysis" },
  crp: { ar: "بروتين سي التفاعلي", en: "C-reactive protein" },
};
export const modality: LabelMap = {
  xray: { ar: "أشعة سينية", en: "X-ray" },
  mri: { ar: "رنين مغناطيسي", en: "MRI" },
  ct: { ar: "أشعة مقطعية", en: "CT scan" },
  ultrasound: { ar: "موجات فوق صوتية", en: "Ultrasound" },
};
export const radiologyStatus: LabelMap = {
  requested: { ar: "مطلوب", en: "Requested", tone: "warning" },
  scheduled: { ar: "مجدول", en: "Scheduled", tone: "info" },
  in_progress: { ar: "جاري الفحص", en: "In progress", tone: "primary" },
  reported: { ar: "تم التقرير", en: "Reported", tone: "success" },
  cancelled: { ar: "ملغي", en: "Cancelled", tone: "muted" },
};
export const invoiceStatus: LabelMap = {
  paid: { ar: "مدفوعة", en: "Paid", tone: "success" },
  pending: { ar: "مستحقة", en: "Pending", tone: "warning" },
  partial: { ar: "مدفوعة جزئياً", en: "Partially paid", tone: "info" },
  overdue: { ar: "متأخرة", en: "Overdue", tone: "danger" },
  cancelled: { ar: "ملغاة", en: "Cancelled", tone: "muted" },
};
export const paymentMethod: LabelMap = {
  cash: { ar: "نقدي", en: "Cash" },
  card: { ar: "بطاقة", en: "Card" },
  insurance: { ar: "تأمين", en: "Insurance" },
  transfer: { ar: "تحويل بنكي", en: "Bank transfer" },
};
export const notificationType: LabelMap = {
  appointment: { ar: "المواعيد", en: "Appointments", tone: "primary" },
  patient: { ar: "المرضى", en: "Patients", tone: "info" },
  stock: { ar: "المخزون", en: "Stock", tone: "warning" },
  payment: { ar: "المدفوعات", en: "Payments", tone: "success" },
  leave: { ar: "الإجازات", en: "Leaves", tone: "muted" },
  system: { ar: "النظام", en: "System", tone: "danger" },
};
export const expenseCategory: LabelMap = {
  salaries: { ar: "الرواتب", en: "Salaries" },
  supplies: { ar: "مستلزمات طبية", en: "Medical supplies" },
  pharmacy: { ar: "مشتريات الصيدلية", en: "Pharmacy purchases" },
  utilities: { ar: "مرافق", en: "Utilities" },
  maintenance: { ar: "صيانة", en: "Maintenance" },
  equipment: { ar: "أجهزة", en: "Equipment" },
};
export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export const weekDays: LabelMap = {
  "0": { ar: "الأحد", en: "Sun" },
  "1": { ar: "الإثنين", en: "Mon" },
  "2": { ar: "الثلاثاء", en: "Tue" },
  "3": { ar: "الأربعاء", en: "Wed" },
  "4": { ar: "الخميس", en: "Thu" },
  "5": { ar: "الجمعة", en: "Fri" },
  "6": { ar: "السبت", en: "Sat" },
};

export function optionsOf(map: LabelMap, lang: "ar" | "en") {
  return Object.entries(map).map(([value, l]) => ({ value, label: l[lang] }));
}
