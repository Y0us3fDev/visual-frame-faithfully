/** Text that is either a single user-entered string or a bilingual pair from demo data. */
export type Txt = string | { ar: string; en: string };
export type Lang = "ar" | "en";
export type Gender = "male" | "female";
export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface Visit {
  date: string;
  doctorId: string;
  reason: Txt;
  diagnosis: Txt;
}

export type PatientStatus = "outpatient" | "admitted" | "critical" | "discharged";
export interface Patient {
  id: string;
  name: Txt;
  gender: Gender;
  dob: string;
  phone: string;
  nationalId: string;
  address: Txt;
  bloodType: BloodType;
  allergies: Txt[];
  medications: Txt[];
  medicalHistory: Txt[];
  status: PatientStatus;
  departmentId: string;
  doctorId: string;
  registeredAt: string;
  visits: Visit[];
}

export type DoctorStatus = "available" | "busy" | "on_leave" | "off";
export interface ScheduleSlot {
  day: number; // 0 = Sunday
  from: string;
  to: string;
}
export interface Doctor {
  id: string;
  name: Txt;
  gender: Gender;
  specialty: Txt;
  departmentId: string;
  phone: string;
  email: string;
  fee: number;
  experience: number;
  rating: number;
  status: DoctorStatus;
  schedule: ScheduleSlot[];
  bio: Txt;
}

export type EmployeeStatus = "active" | "on_leave" | "suspended" | "terminated";
export type Shift = "morning" | "evening" | "night";
export interface Employee {
  id: string;
  name: Txt;
  gender: Gender;
  jobTitle: Txt;
  departmentId: string;
  phone: string;
  email: string;
  salary: number;
  status: EmployeeStatus;
  shift: Shift;
  hireDate: string;
}

export type AttendanceStatus = "present" | "late" | "absent" | "leave";
export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
}

export type LeaveType = "annual" | "sick" | "emergency" | "unpaid";
export type LeaveStatus = "pending" | "approved" | "rejected";
export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  from: string;
  to: string;
  reason: Txt;
  status: LeaveStatus;
  createdAt: string;
}

export type AppointmentType = "consultation" | "follow_up" | "checkup" | "emergency";
export type AppointmentStatus = "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
}

export interface Department {
  id: string;
  name: Txt;
  description: Txt;
  icon: string;
  managerId: string;
  floor: number;
}

export type RoomType = "general" | "private" | "icu" | "surgery" | "maternity" | "pediatric";
export type BedStatus = "available" | "occupied" | "maintenance" | "reserved";
export interface Bed {
  id: string;
  label: string;
  status: BedStatus;
  patientId?: string;
}
export interface Room {
  id: string;
  number: string;
  floor: number;
  type: RoomType;
  departmentId: string;
  beds: Bed[];
}

export interface Medicine {
  id: string;
  name: string;
  generic: string;
  category: Txt;
  form: Txt;
  manufacturer: string;
  stock: number;
  minStock: number;
  price: number;
  expiry: string;
}

export type TestStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type Priority = "routine" | "urgent";
export interface LabResult {
  parameter: string;
  value: string;
  unit: string;
  range: string;
  flag: "normal" | "high" | "low";
}
export interface LabTest {
  id: string;
  code: string;
  patientId: string;
  doctorId: string;
  testType: string;
  priority: Priority;
  status: TestStatus;
  requestedAt: string;
  results: LabResult[];
  notes?: string;
}

export type Modality = "xray" | "mri" | "ct" | "ultrasound";
export type RadiologyStatus = "requested" | "scheduled" | "in_progress" | "reported" | "cancelled";
export interface RadiologyRequest {
  id: string;
  code: string;
  patientId: string;
  doctorId: string;
  modality: Modality;
  bodyPart: Txt;
  priority: Priority;
  status: RadiologyStatus;
  requestedAt: string;
  findings?: string;
  impression?: string;
}

export type InvoiceStatus = "paid" | "pending" | "partial" | "overdue" | "cancelled";
export interface InvoiceItem {
  description: Txt;
  qty: number;
  price: number;
}
export interface Invoice {
  id: string;
  number: string;
  patientId: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  discount: number;
  paid: number;
  status: InvoiceStatus;
}

export type PaymentMethod = "cash" | "card" | "insurance" | "transfer";
export interface Payment {
  id: string;
  invoiceId: string;
  patientId: string;
  date: string;
  amount: number;
  method: PaymentMethod;
}

export interface Expense {
  id: string;
  category: string;
  description: Txt;
  amount: number;
  date: string;
}

export type NotificationType = "appointment" | "patient" | "stock" | "payment" | "leave" | "system";
export interface AppNotification {
  id: string;
  type: NotificationType;
  title: Txt;
  message: Txt;
  createdAt: string;
  read: boolean;
  important?: boolean;
}

export interface Activity {
  id: string;
  type: NotificationType;
  text: Txt;
  createdAt: string;
}
