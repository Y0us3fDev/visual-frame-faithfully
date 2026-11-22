import type {
  Activity, AppNotification, Appointment, Attendance, Department, Doctor, Employee, Expense, Invoice,
  LabResult, LabTest, LeaveRequest, Medicine, Patient, Payment, RadiologyRequest, Room, Txt, BloodType,
} from "@/types";
import { addDays, toISODate } from "@/utils/date";

export interface Collections {
  patients: Patient[];
  doctors: Doctor[];
  employees: Employee[];
  appointments: Appointment[];
  departments: Department[];
  rooms: Room[];
  medicines: Medicine[];
  labTests: LabTest[];
  radiology: RadiologyRequest[];
  invoices: Invoice[];
  payments: Payment[];
  expenses: Expense[];
  attendance: Attendance[];
  leaves: LeaveRequest[];
  notifications: AppNotification[];
  activities: Activity[];
}

/** Deterministic PRNG so server and browser build identical demo data. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MALE: [string, string][] = [
  ["محمد", "Mohamed"], ["أحمد", "Ahmed"], ["محمود", "Mahmoud"], ["مصطفى", "Mostafa"], ["عمر", "Omar"],
  ["خالد", "Khaled"], ["يوسف", "Youssef"], ["حسن", "Hassan"], ["علي", "Ali"], ["إبراهيم", "Ibrahim"],
  ["كريم", "Karim"], ["طارق", "Tarek"], ["ياسر", "Yasser"], ["هشام", "Hesham"], ["شريف", "Sherif"], ["عمرو", "Amr"],
];
const FEMALE: [string, string][] = [
  ["فاطمة", "Fatma"], ["مريم", "Mariam"], ["نور", "Nour"], ["سارة", "Sara"], ["هبة", "Heba"], ["منى", "Mona"],
  ["ياسمين", "Yasmin"], ["دينا", "Dina"], ["رنا", "Rana"], ["آية", "Aya"], ["ندى", "Nada"], ["سلمى", "Salma"],
  ["إيمان", "Eman"], ["هالة", "Hala"],
];
const LAST: [string, string][] = [
  ["عبد الله", "Abdallah"], ["السيد", "El-Sayed"], ["حسين", "Hussein"], ["عبد الرحمن", "Abdelrahman"],
  ["الشريف", "El-Sherif"], ["منصور", "Mansour"], ["فؤاد", "Fouad"], ["سليمان", "Soliman"], ["رمضان", "Ramadan"],
  ["عادل", "Adel"], ["جمال", "Gamal"], ["صبري", "Sabry"], ["الجندي", "El-Gendy"], ["زكي", "Zaki"], ["نصار", "Nassar"],
  ["البنا", "El-Banna"],
];
const CITIES: Txt[] = [
  { ar: "مدينة نصر، القاهرة", en: "Nasr City, Cairo" }, { ar: "المعادي، القاهرة", en: "Maadi, Cairo" },
  { ar: "الدقي، الجيزة", en: "Dokki, Giza" }, { ar: "مصر الجديدة، القاهرة", en: "Heliopolis, Cairo" },
  { ar: "٦ أكتوبر، الجيزة", en: "6th of October, Giza" }, { ar: "المهندسين، الجيزة", en: "Mohandessin, Giza" },
  { ar: "شبرا، القاهرة", en: "Shubra, Cairo" }, { ar: "التجمع الخامس، القاهرة", en: "New Cairo" },
];
const ALLERGIES: Txt[] = [
  { ar: "البنسلين", en: "Penicillin" }, { ar: "الأسبرين", en: "Aspirin" }, { ar: "الفول السوداني", en: "Peanuts" },
  { ar: "اللاتكس", en: "Latex" }, { ar: "السلفا", en: "Sulfa drugs" }, { ar: "المأكولات البحرية", en: "Shellfish" },
];
const CONDITIONS: Txt[] = [
  { ar: "ارتفاع ضغط الدم", en: "Hypertension" }, { ar: "السكري النوع الثاني", en: "Type 2 diabetes" },
  { ar: "الربو الشعبي", en: "Asthma" }, { ar: "قصور الغدة الدرقية", en: "Hypothyroidism" },
  { ar: "ارتفاع الكوليسترول", en: "High cholesterol" }, { ar: "خشونة المفاصل", en: "Osteoarthritis" },
  { ar: "الصداع النصفي", en: "Migraine" }, { ar: "قرحة المعدة", en: "Peptic ulcer" },
];
const MEDS: Txt[] = [
  "Concor 5mg", "Glucophage 1000mg", "Ventolin Inhaler", "Euthyrox 50mcg", "Lipitor 20mg", "Aspocid 75mg",
  "Nexium 40mg", "Augmentin 1g", "Cataflam 50mg", "Insulin Mixtard",
];
const REASONS: [Txt, Txt][] = [
  [{ ar: "ألم في الصدر", en: "Chest pain" }, { ar: "ذبحة صدرية مستقرة", en: "Stable angina" }],
  [{ ar: "صداع متكرر", en: "Recurrent headache" }, { ar: "صداع نصفي", en: "Migraine" }],
  [{ ar: "ألم في الركبة", en: "Knee pain" }, { ar: "خشونة الركبة", en: "Knee osteoarthritis" }],
  [{ ar: "ارتفاع في الحرارة", en: "High fever" }, { ar: "التهاب الحلق البكتيري", en: "Bacterial pharyngitis" }],
  [{ ar: "متابعة سكر", en: "Diabetes follow-up" }, { ar: "سكري منضبط", en: "Controlled diabetes" }],
  [{ ar: "ضيق تنفس", en: "Shortness of breath" }, { ar: "نوبة ربو", en: "Asthma exacerbation" }],
  [{ ar: "ألم في البطن", en: "Abdominal pain" }, { ar: "التهاب المعدة", en: "Gastritis" }],
  [{ ar: "طفح جلدي", en: "Skin rash" }, { ar: "إكزيما", en: "Eczema" }],
];

export const DEPARTMENTS_SEED: { id: string; name: Txt; desc: Txt; icon: string; specs: Txt[]; floor: number }[] = [
  { id: "dep_card", name: { ar: "القلب والأوعية الدموية", en: "Cardiology" }, desc: { ar: "تشخيص وعلاج أمراض القلب والقسطرة", en: "Heart diagnostics, cath lab and cardiac care" }, icon: "heart", floor: 3, specs: [{ ar: "استشاري قلب", en: "Cardiologist" }, { ar: "جراحة القلب", en: "Cardiac surgeon" }] },
  { id: "dep_neuro", name: { ar: "المخ والأعصاب", en: "Neurology" }, desc: { ar: "أمراض الجهاز العصبي والسكتات", en: "Nervous system disorders and stroke care" }, icon: "brain", floor: 4, specs: [{ ar: "استشاري مخ وأعصاب", en: "Neurologist" }] },
  { id: "dep_ortho", name: { ar: "العظام", en: "Orthopedics" }, desc: { ar: "الكسور والمفاصل والعمود الفقري", en: "Fractures, joints and spine" }, icon: "bone", floor: 2, specs: [{ ar: "جراحة العظام", en: "Orthopedic surgeon" }] },
  { id: "dep_ped", name: { ar: "طب الأطفال", en: "Pediatrics" }, desc: { ar: "رعاية الأطفال وحديثي الولادة", en: "Children and newborn care" }, icon: "baby", floor: 1, specs: [{ ar: "طب الأطفال", en: "Pediatrician" }] },
  { id: "dep_obg", name: { ar: "النساء والتوليد", en: "Obstetrics & Gynecology" }, desc: { ar: "متابعة الحمل والولادة", en: "Pregnancy follow-up and delivery" }, icon: "flower", floor: 2, specs: [{ ar: "نساء وتوليد", en: "Obstetrician" }] },
  { id: "dep_er", name: { ar: "الطوارئ", en: "Emergency" }, desc: { ar: "استقبال الحالات الطارئة على مدار الساعة", en: "24/7 emergency reception" }, icon: "ambulance", floor: 0, specs: [{ ar: "طب الطوارئ", en: "Emergency physician" }] },
  { id: "dep_int", name: { ar: "الباطنة", en: "Internal Medicine" }, desc: { ar: "الأمراض الباطنية والمزمنة", en: "Internal and chronic diseases" }, icon: "stethoscope", floor: 1, specs: [{ ar: "استشاري باطنة", en: "Internist" }, { ar: "أمراض الجهاز الهضمي", en: "Gastroenterologist" }] },
  { id: "dep_surg", name: { ar: "الجراحة العامة", en: "General Surgery" }, desc: { ar: "العمليات الجراحية والمناظير", en: "Surgical procedures and laparoscopy" }, icon: "scissors", floor: 3, specs: [{ ar: "جراحة عامة", en: "General surgeon" }] },
  { id: "dep_oph", name: { ar: "الرمد", en: "Ophthalmology" }, desc: { ar: "أمراض وجراحات العيون", en: "Eye diseases and surgery" }, icon: "eye", floor: 1, specs: [{ ar: "طب وجراحة العيون", en: "Ophthalmologist" }] },
  { id: "dep_derm", name: { ar: "الجلدية", en: "Dermatology" }, desc: { ar: "الأمراض الجلدية والتجميل", en: "Skin conditions and aesthetics" }, icon: "hand", floor: 1, specs: [{ ar: "الأمراض الجلدية", en: "Dermatologist" }] },
];

export function createSeed(): Collections {
  const r = rng(20261122);
  const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(r() * arr.length)] as T;
  const int = (min: number, max: number) => Math.floor(r() * (max - min + 1)) + min;
  const pickSome = <T,>(arr: readonly T[], max: number): T[] => {
    const n = int(0, max);
    const out: T[] = [];
    for (let i = 0; i < n; i++) {
      const v = pick(arr);
      if (!out.includes(v)) out.push(v);
    }
    return out;
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = (offset: number) => toISODate(addDays(today, offset));
  const iso = (offsetDays: number, hour = 9) => {
    const d = addDays(today, offsetDays);
    d.setHours(hour, int(0, 59));
    return d.toISOString();
  };
  const phone = () => `01${pick(["0", "1", "2", "5"])}${String(int(10000000, 99999999))}`;
  const person = (g: "male" | "female", prefix?: [string, string]): Txt => {
    const f = g === "male" ? pick(MALE) : pick(FEMALE);
    const l = pick(LAST);
    const pa = prefix ? `${prefix[0]} ` : "";
    const pe = prefix ? `${prefix[1]} ` : "";
    return { ar: `${pa}${f[0]} ${l[0]}`, en: `${pe}${f[1]} ${l[1]}` };
  };
  const emailOf = (n: Txt) =>
    `${(typeof n === "string" ? n : n.en).replace(/^Dr\.\s*/, "").toLowerCase().replace(/[^a-z]+/g, ".")}@alshifa-hospital.eg`;
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "14:00", "15:30", "17:00", "18:30"];

  // Doctors
  const doctors: Doctor[] = [];
  let dn = 1;
  for (const dep of DEPARTMENTS_SEED) {
    const count = dep.id === "dep_er" || dep.id === "dep_int" || dep.id === "dep_card" ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const g = r() > 0.35 ? "male" : "female";
      const name = person(g, ["د.", "Dr."]);
      const days = [0, 1, 2, 3, 4, 6].filter(() => r() > 0.3);
      doctors.push({
        id: `doc_${dn++}`,
        name,
        gender: g,
        specialty: pick(dep.specs),
        departmentId: dep.id,
        phone: phone(),
        email: emailOf(name),
        fee: pick([300, 350, 400, 500, 600, 750, 900]),
        experience: int(5, 28),
        rating: Math.round((4 + r()) * 10) / 10,
        status: pick(["available", "available", "available", "busy", "on_leave", "off"] as const),
        schedule: (days.length ? days : [0, 2, 4]).map((d) => ({ day: d, from: pick(["09:00", "10:00", "13:00"]), to: pick(["15:00", "17:00", "21:00"]) })),
        bio: {
          ar: `خبرة ${int(5, 25)} عاماً في ${typeof dep.name === "string" ? dep.name : dep.name.ar}، عضو الجمعية المصرية للتخصص وزميل كلية الأطباء الملكية.`,
          en: `Seasoned specialist in ${typeof dep.name === "string" ? dep.name : dep.name.en}, member of the Egyptian specialty society and fellow of the Royal College of Physicians.`,
        },
      });
    }
  }

  const departments: Department[] = DEPARTMENTS_SEED.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.desc,
    icon: d.icon,
    floor: d.floor,
    managerId: doctors.find((x) => x.departmentId === d.id)?.id ?? "",
  }));

  // Patients
  const patients: Patient[] = [];
  for (let i = 1; i <= 64; i++) {
    const g = r() > 0.5 ? "male" : "female";
    const doc = pick(doctors);
    const visits = Array.from({ length: int(1, 4) }, (_, k) => {
      const [reason, diagnosis] = pick(REASONS);
      return { date: day(-int(5, 400) - k * 30), doctorId: pick(doctors).id, reason, diagnosis };
    }).sort((a, b) => b.date.localeCompare(a.date));
    patients.push({
      id: `pat_${i}`,
      name: person(g),
      gender: g,
      dob: toISODate(new Date(int(1948, 2020), int(0, 11), int(1, 28))),
      phone: phone(),
      nationalId: `${pick(["2", "3"])}${int(10000000, 99999999)}${int(10000, 99999)}`,
      address: pick(CITIES),
      bloodType: pick(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O+", "O-", "A+"] as BloodType[]),
      allergies: pickSome(ALLERGIES, 2),
      medications: pickSome(MEDS, 3),
      medicalHistory: pickSome(CONDITIONS, 3),
      status: pick(["outpatient", "outpatient", "outpatient", "admitted", "admitted", "critical", "discharged"] as const),
      departmentId: doc.departmentId,
      doctorId: doc.id,
      registeredAt: day(-int(0, 360)),
      visits,
    });
  }

  // Employees
  const JOBS: Txt[] = [
    { ar: "ممرض/ة", en: "Nurse" }, { ar: "ممرض/ة", en: "Nurse" }, { ar: "ممرض/ة أول", en: "Senior nurse" },
    { ar: "فني معمل", en: "Lab technician" }, { ar: "فني أشعة", en: "Radiographer" }, { ar: "صيدلي", en: "Pharmacist" },
    { ar: "موظف استقبال", en: "Receptionist" }, { ar: "محاسب", en: "Accountant" }, { ar: "مسؤول موارد بشرية", en: "HR officer" },
    { ar: "فني صيانة", en: "Maintenance technician" }, { ar: "مسؤول أمن", en: "Security officer" }, { ar: "أخصائي تغذية", en: "Dietitian" },
  ];
  const employees: Employee[] = [];
  for (let i = 1; i <= 42; i++) {
    const g = r() > 0.45 ? "female" : "male";
    const name = person(g);
    const job = pick(JOBS);
    employees.push({
      id: `emp_${i}`,
      name,
      gender: g,
      jobTitle: job,
      departmentId: pick(DEPARTMENTS_SEED).id,
      phone: phone(),
      email: emailOf(name),
      salary: pick([6500, 7200, 8000, 9500, 11000, 12500, 14000, 16000]),
      status: pick(["active", "active", "active", "active", "active", "on_leave", "suspended"] as const),
      shift: pick(["morning", "morning", "evening", "night"] as const),
      hireDate: day(-int(60, 3000)),
    });
  }

  // Appointments: ~10 today, spread across ±30 days
  const appointments: Appointment[] = [];
  let an = 1;
  for (let offset = -30; offset <= 21; offset++) {
    const n = offset === 0 ? 11 : int(1, 4);
    for (let k = 0; k < n; k++) {
      const p = pick(patients);
      const past = offset < 0;
      appointments.push({
        id: `apt_${an++}`,
        patientId: p.id,
        doctorId: r() > 0.3 ? p.doctorId : pick(doctors).id,
        date: day(offset),
        time: pick(times),
        type: pick(["consultation", "consultation", "follow_up", "checkup", "emergency"] as const),
        status: past
          ? pick(["completed", "completed", "completed", "cancelled", "no_show"] as const)
          : offset === 0
            ? pick(["scheduled", "confirmed", "confirmed", "completed"] as const)
            : pick(["scheduled", "confirmed"] as const),
      });
    }
  }

  // Rooms and beds; occupied beds hold admitted/critical patients
  const inpatients = patients.filter((p) => p.status === "admitted" || p.status === "critical");
  let ip = 0;
  const rooms: Room[] = [];
  const roomDefs: { type: Room["type"]; dep: string; beds: number }[] = [
    { type: "icu", dep: "dep_card", beds: 2 }, { type: "icu", dep: "dep_neuro", beds: 2 }, { type: "icu", dep: "dep_er", beds: 3 },
    { type: "general", dep: "dep_int", beds: 4 }, { type: "general", dep: "dep_int", beds: 4 }, { type: "general", dep: "dep_ortho", beds: 4 },
    { type: "general", dep: "dep_surg", beds: 3 }, { type: "private", dep: "dep_card", beds: 1 }, { type: "private", dep: "dep_surg", beds: 1 },
    { type: "private", dep: "dep_obg", beds: 1 }, { type: "private", dep: "dep_neuro", beds: 1 }, { type: "surgery", dep: "dep_surg", beds: 2 },
    { type: "surgery", dep: "dep_ortho", beds: 2 }, { type: "maternity", dep: "dep_obg", beds: 3 }, { type: "maternity", dep: "dep_obg", beds: 2 },
    { type: "pediatric", dep: "dep_ped", beds: 4 }, { type: "pediatric", dep: "dep_ped", beds: 3 }, { type: "general", dep: "dep_er", beds: 4 },
  ];
  roomDefs.forEach((def, idx) => {
    const floor = DEPARTMENTS_SEED.find((d) => d.id === def.dep)?.floor ?? 1;
    const number = `${floor}${String(idx + 1).padStart(2, "0")}`;
    rooms.push({
      id: `room_${idx + 1}`,
      number,
      floor,
      type: def.type,
      departmentId: def.dep,
      beds: Array.from({ length: def.beds }, (_, b) => {
        const roll = r();
        if (roll < 0.55 && ip < inpatients.length) {
          return { id: `bed_${idx + 1}_${b + 1}`, label: `${number}-${String.fromCharCode(65 + b)}`, status: "occupied" as const, patientId: inpatients[ip++]?.id };
        }
        return {
          id: `bed_${idx + 1}_${b + 1}`,
          label: `${number}-${String.fromCharCode(65 + b)}`,
          status: roll < 0.65 ? ("reserved" as const) : roll < 0.72 ? ("maintenance" as const) : ("available" as const),
        };
      }),
    });
  });

  // Pharmacy
  const MEDICINES: [string, string, Txt, Txt, string, number][] = [
    ["Panadol Extra", "Paracetamol + Caffeine", { ar: "مسكنات", en: "Analgesics" }, { ar: "أقراص", en: "Tablets" }, "GSK", 45],
    ["Augmentin 1g", "Amoxicillin + Clavulanate", { ar: "مضادات حيوية", en: "Antibiotics" }, { ar: "أقراص", en: "Tablets" }, "GSK", 118],
    ["Concor 5mg", "Bisoprolol", { ar: "القلب والضغط", en: "Cardiovascular" }, { ar: "أقراص", en: "Tablets" }, "Merck", 64],
    ["Glucophage 1000mg", "Metformin", { ar: "السكري", en: "Diabetes" }, { ar: "أقراص", en: "Tablets" }, "Merck", 52],
    ["Nexium 40mg", "Esomeprazole", { ar: "الجهاز الهضمي", en: "Gastrointestinal" }, { ar: "كبسولات", en: "Capsules" }, "AstraZeneca", 156],
    ["Ventolin Inhaler", "Salbutamol", { ar: "الجهاز التنفسي", en: "Respiratory" }, { ar: "بخاخ", en: "Inhaler" }, "GSK", 38],
    ["Cataflam 50mg", "Diclofenac potassium", { ar: "مسكنات", en: "Analgesics" }, { ar: "أقراص", en: "Tablets" }, "Novartis", 49],
    ["Lipitor 20mg", "Atorvastatin", { ar: "القلب والضغط", en: "Cardiovascular" }, { ar: "أقراص", en: "Tablets" }, "Pfizer", 189],
    ["Euthyrox 50mcg", "Levothyroxine", { ar: "الغدد", en: "Endocrine" }, { ar: "أقراص", en: "Tablets" }, "Merck", 33],
    ["Ceftriaxone 1g", "Ceftriaxone", { ar: "مضادات حيوية", en: "Antibiotics" }, { ar: "حقن", en: "Injection" }, "EIPICO", 42],
    ["Insulin Mixtard 30", "Human insulin", { ar: "السكري", en: "Diabetes" }, { ar: "حقن", en: "Injection" }, "Novo Nordisk", 210],
    ["Aspocid 75mg", "Aspirin", { ar: "القلب والضغط", en: "Cardiovascular" }, { ar: "أقراص", en: "Tablets" }, "Cid", 18],
    ["Brufen 400mg", "Ibuprofen", { ar: "مسكنات", en: "Analgesics" }, { ar: "أقراص", en: "Tablets" }, "Abbott", 36],
    ["Zithromax 500mg", "Azithromycin", { ar: "مضادات حيوية", en: "Antibiotics" }, { ar: "أقراص", en: "Tablets" }, "Pfizer", 142],
    ["Omeprazole 20mg", "Omeprazole", { ar: "الجهاز الهضمي", en: "Gastrointestinal" }, { ar: "كبسولات", en: "Capsules" }, "Pharco", 29],
    ["Normal Saline 500ml", "Sodium chloride 0.9%", { ar: "محاليل", en: "IV fluids" }, { ar: "محلول وريدي", en: "IV bag" }, "Otsuka", 22],
    ["Ringer Lactate 500ml", "Lactated Ringer's", { ar: "محاليل", en: "IV fluids" }, { ar: "محلول وريدي", en: "IV bag" }, "Otsuka", 25],
    ["Clexane 40mg", "Enoxaparin", { ar: "مضادات التجلط", en: "Anticoagulants" }, { ar: "حقن", en: "Injection" }, "Sanofi", 98],
    ["Plavix 75mg", "Clopidogrel", { ar: "مضادات التجلط", en: "Anticoagulants" }, { ar: "أقراص", en: "Tablets" }, "Sanofi", 235],
    ["Zyrtec 10mg", "Cetirizine", { ar: "مضادات الحساسية", en: "Antihistamines" }, { ar: "أقراص", en: "Tablets" }, "UCB", 31],
    ["Flagyl 500mg", "Metronidazole", { ar: "مضادات حيوية", en: "Antibiotics" }, { ar: "أقراص", en: "Tablets" }, "Sanofi", 21],
    ["Voltaren Gel", "Diclofenac", { ar: "مسكنات", en: "Analgesics" }, { ar: "جل", en: "Gel" }, "Novartis", 58],
    ["Amaryl 2mg", "Glimepiride", { ar: "السكري", en: "Diabetes" }, { ar: "أقراص", en: "Tablets" }, "Sanofi", 74],
    ["Tavanic 500mg", "Levofloxacin", { ar: "مضادات حيوية", en: "Antibiotics" }, { ar: "أقراص", en: "Tablets" }, "Sanofi", 128],
    ["Lasix 40mg", "Furosemide", { ar: "القلب والضغط", en: "Cardiovascular" }, { ar: "أقراص", en: "Tablets" }, "Sanofi", 15],
    ["Solu-Medrol 40mg", "Methylprednisolone", { ar: "الكورتيزون", en: "Corticosteroids" }, { ar: "حقن", en: "Injection" }, "Pfizer", 67],
    ["Vitamin D3 50000IU", "Cholecalciferol", { ar: "فيتامينات", en: "Vitamins" }, { ar: "كبسولات", en: "Capsules" }, "Pharco", 44],
    ["Neurobion", "Vitamin B complex", { ar: "فيتامينات", en: "Vitamins" }, { ar: "أقراص", en: "Tablets" }, "Merck", 39],
    ["Primperan 10mg", "Metoclopramide", { ar: "الجهاز الهضمي", en: "Gastrointestinal" }, { ar: "حقن", en: "Injection" }, "Sanofi", 12],
    ["Ketolac 30mg", "Ketorolac", { ar: "مسكنات", en: "Analgesics" }, { ar: "حقن", en: "Injection" }, "Amoun", 27],
  ];
  const medicines: Medicine[] = MEDICINES.map(([name, generic, category, form, manufacturer, price], i) => {
    const minStock = pick([30, 50, 80, 100]);
    const low = r() < 0.22;
    return {
      id: `med_${i + 1}`,
      name,
      generic,
      category,
      form,
      manufacturer,
      price,
      minStock,
      stock: low ? int(0, minStock - 1) : int(minStock + 10, minStock * 6),
      expiry: day(r() < 0.12 ? int(5, 60) : int(120, 900)),
    };
  });

  // Laboratory
  const RESULT_TEMPLATES: Record<string, [string, string, string, number, number][]> = {
    cbc: [["Hemoglobin", "g/dL", "12 – 16", 9, 17], ["WBC", "×10³/µL", "4 – 11", 3, 15], ["Platelets", "×10³/µL", "150 – 450", 120, 480]],
    lipid: [["Total cholesterol", "mg/dL", "< 200", 150, 260], ["LDL", "mg/dL", "< 130", 80, 190], ["HDL", "mg/dL", "> 40", 30, 70]],
    liver: [["ALT", "U/L", "7 – 56", 10, 90], ["AST", "U/L", "10 – 40", 12, 70], ["Bilirubin", "mg/dL", "0.1 – 1.2", 0.3, 2.1]],
    kidney: [["Creatinine", "mg/dL", "0.6 – 1.3", 0.5, 2.4], ["Urea", "mg/dL", "15 – 45", 12, 80]],
    glucose: [["Fasting glucose", "mg/dL", "70 – 100", 75, 210], ["HbA1c", "%", "< 5.7", 4.8, 9.5]],
    thyroid: [["TSH", "mIU/L", "0.4 – 4.0", 0.2, 7], ["Free T4", "ng/dL", "0.8 – 1.8", 0.6, 2.1]],
    urine: [["pH", "", "4.5 – 8", 5, 7.5], ["Protein", "mg/dL", "< 15", 0, 40]],
    crp: [["CRP", "mg/L", "< 5", 0.5, 60]],
  };
  const parseRange = (range: string): [number, number] => {
    const m = range.match(/([\d.]+)\s*–\s*([\d.]+)/);
    if (m) return [Number(m[1]), Number(m[2])];
    const lt = range.match(/<\s*([\d.]+)/);
    if (lt) return [-Infinity, Number(lt[1])];
    const gt = range.match(/>\s*([\d.]+)/);
    return [gt ? Number(gt[1]) : -Infinity, Infinity];
  };
  const makeResults = (type: string): LabResult[] =>
    (RESULT_TEMPLATES[type] ?? []).map(([parameter, unit, range, lo, hi]) => {
      const v = Math.round((lo + r() * (hi - lo)) * 10) / 10;
      const [min, max] = parseRange(range);
      return { parameter, unit, range, value: String(v), flag: v < min ? "low" : v > max ? "high" : "normal" };
    });
  const labTests: LabTest[] = Array.from({ length: 44 }, (_, i) => {
    const p = pick(patients);
    const testType = pick(Object.keys(RESULT_TEMPLATES));
    const status = pick(["pending", "in_progress", "completed", "completed", "completed", "cancelled"] as const);
    return {
      id: `lab_${i + 1}`,
      code: `LAB-${String(24100 + i)}`,
      patientId: p.id,
      doctorId: p.doctorId,
      testType,
      priority: r() < 0.25 ? ("urgent" as const) : ("routine" as const),
      status,
      requestedAt: iso(-int(0, 20), int(8, 20)),
      results: status === "completed" ? makeResults(testType) : [],
    };
  }).sort((a, b) => b.requestedAt.localeCompare(a.requestedAt));

  // Radiology
  const BODY: Txt[] = [
    { ar: "الصدر", en: "Chest" }, { ar: "الركبة اليمنى", en: "Right knee" }, { ar: "المخ", en: "Brain" },
    { ar: "البطن والحوض", en: "Abdomen & pelvis" }, { ar: "العمود الفقري القطني", en: "Lumbar spine" },
    { ar: "الكتف الأيسر", en: "Left shoulder" }, { ar: "الغدة الدرقية", en: "Thyroid" },
  ];
  const radiology: RadiologyRequest[] = Array.from({ length: 32 }, (_, i) => {
    const p = pick(patients);
    const status = pick(["requested", "scheduled", "in_progress", "reported", "reported", "cancelled"] as const);
    return {
      id: `rad_${i + 1}`,
      code: `RAD-${String(8800 + i)}`,
      patientId: p.id,
      doctorId: p.doctorId,
      modality: pick(["xray", "xray", "mri", "ct", "ultrasound"] as const),
      bodyPart: pick(BODY),
      priority: r() < 0.2 ? ("urgent" as const) : ("routine" as const),
      status,
      requestedAt: iso(-int(0, 25), int(8, 20)),
      findings: status === "reported" ? "No acute abnormality detected. Normal alignment and density. No effusion." : undefined,
      impression: status === "reported" ? pick(["Normal study.", "Mild degenerative changes.", "Findings consistent with mild inflammation; clinical correlation advised."]) : undefined,
    };
  }).sort((a, b) => b.requestedAt.localeCompare(a.requestedAt));

  // Invoices and payments
  const SERVICES: [Txt, number][] = [
    [{ ar: "كشف استشاري", en: "Specialist consultation" }, 500], [{ ar: "صورة دم كاملة", en: "CBC test" }, 180],
    [{ ar: "أشعة مقطعية", en: "CT scan" }, 1800], [{ ar: "رنين مغناطيسي", en: "MRI scan" }, 2800],
    [{ ar: "إقامة ليلة - غرفة خاصة", en: "Private room - night" }, 1500], [{ ar: "إقامة ليلة - عناية مركزة", en: "ICU - night" }, 4500],
    [{ ar: "أدوية", en: "Medications" }, 650], [{ ar: "رسوم عملية جراحية", en: "Surgical procedure" }, 12000],
    [{ ar: "موجات فوق صوتية", en: "Ultrasound" }, 450], [{ ar: "جلسة علاج طبيعي", en: "Physiotherapy session" }, 300],
  ];
  const invoices: Invoice[] = [];
  const payments: Payment[] = [];
  for (let i = 0; i < 60; i++) {
    const p = pick(patients);
    const items = Array.from({ length: int(1, 4) }, () => {
      const [description, price] = pick(SERVICES);
      return { description, qty: int(1, 3), price };
    });
    const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
    const discount = r() < 0.25 ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discount;
    const offset = -int(0, 75);
    const status = pick(["paid", "paid", "paid", "pending", "partial", "overdue", "cancelled"] as const);
    const paid = status === "paid" ? total : status === "partial" ? Math.round(total * 0.4) : 0;
    const inv: Invoice = {
      id: `inv_${i + 1}`,
      number: `INV-2026-${String(1200 + i)}`,
      patientId: p.id,
      date: day(offset),
      dueDate: day(offset + 14),
      items,
      discount,
      paid,
      status,
    };
    invoices.push(inv);
    if (paid > 0) {
      payments.push({ id: `pay_${i + 1}`, invoiceId: inv.id, patientId: p.id, date: day(offset + int(0, 5)), amount: paid, method: pick(["cash", "card", "insurance", "transfer"] as const) });
    }
  }
  invoices.sort((a, b) => b.date.localeCompare(a.date));
  payments.sort((a, b) => b.date.localeCompare(a.date));

  const expenses: Expense[] = Array.from({ length: 24 }, (_, i) => {
    const category = pick(["salaries", "supplies", "pharmacy", "utilities", "maintenance", "equipment"]);
    const amounts: Record<string, [number, number]> = { salaries: [180000, 260000], supplies: [20000, 60000], pharmacy: [30000, 90000], utilities: [12000, 28000], maintenance: [5000, 25000], equipment: [40000, 150000] };
    const [lo, hi] = amounts[category] ?? [5000, 20000];
    return {
      id: `exp_${i + 1}`,
      category,
      description: { ar: "مصروف تشغيلي شهري", en: "Monthly operating expense" },
      amount: int(lo, hi),
      date: day(-int(0, 90)),
    };
  }).sort((a, b) => b.date.localeCompare(a.date));

  // Attendance for the last 7 days
  const attendance: Attendance[] = [];
  for (let d = 0; d < 7; d++) {
    const date = day(-d);
    for (const e of employees) {
      if (e.status === "terminated") continue;
      const roll = r();
      const status = e.status === "on_leave" ? "leave" : roll < 0.75 ? "present" : roll < 0.9 ? "late" : "absent";
      const base = e.shift === "morning" ? 8 : e.shift === "evening" ? 16 : 0;
      const inH = base + (status === "late" ? 1 : 0);
      attendance.push({
        id: `att_${d}_${e.id}`,
        employeeId: e.id,
        date,
        status,
        checkIn: status === "present" || status === "late" ? `${String(inH).padStart(2, "0")}:${String(int(0, 25)).padStart(2, "0")}` : undefined,
        checkOut: (status === "present" || status === "late") && d > 0 ? `${String((base + 8) % 24).padStart(2, "0")}:${String(int(0, 40)).padStart(2, "0")}` : undefined,
      });
    }
  }

  const REASONS_LEAVE: Txt[] = [
    { ar: "ظروف عائلية", en: "Family matters" }, { ar: "إجازة سنوية مخططة", en: "Planned vacation" },
    { ar: "وعكة صحية", en: "Feeling unwell" }, { ar: "حضور مؤتمر طبي", en: "Attending a medical conference" },
  ];
  const leaves: LeaveRequest[] = Array.from({ length: 14 }, (_, i) => {
    const start = int(-20, 20);
    return {
      id: `lev_${i + 1}`,
      employeeId: pick(employees).id,
      type: pick(["annual", "annual", "sick", "emergency", "unpaid"] as const),
      from: day(start),
      to: day(start + int(1, 7)),
      reason: pick(REASONS_LEAVE),
      status: start > 0 ? pick(["pending", "pending", "approved"] as const) : pick(["approved", "rejected"] as const),
      createdAt: iso(start - int(2, 10)),
    };
  });

  const pn = (i: number) => patients[i]?.name ?? "";
  const nameAr = (t: Txt) => (typeof t === "string" ? t : t.ar);
  const nameEn = (t: Txt) => (typeof t === "string" ? t : t.en);
  const lowMed = medicines.find((m) => m.stock < m.minStock) ?? medicines[0];
  const notifications: AppNotification[] = [
    { id: "ntf_1", type: "appointment", title: { ar: "موعد جديد", en: "New appointment" }, message: { ar: `تم حجز موعد جديد للمريض ${nameAr(pn(3))} اليوم الساعة ١١:٠٠`, en: `New appointment booked for ${nameEn(pn(3))} today at 11:00` }, createdAt: iso(0, 8), read: false },
    { id: "ntf_2", type: "stock", title: { ar: "تنبيه نقص مخزون", en: "Low stock alert" }, message: { ar: `مخزون ${lowMed?.name} أقل من الحد الأدنى`, en: `${lowMed?.name} is below minimum stock` }, createdAt: iso(0, 7), read: false, important: true },
    { id: "ntf_3", type: "patient", title: { ar: "تسجيل مريض جديد", en: "Patient registered" }, message: { ar: `تم تسجيل المريض ${nameAr(pn(7))} بقسم الطوارئ`, en: `${nameEn(pn(7))} was registered in Emergency` }, createdAt: iso(-1, 19), read: false },
    { id: "ntf_4", type: "payment", title: { ar: "مدفوعات معلقة", en: "Pending payments" }, message: { ar: "يوجد ٨ فواتير متأخرة السداد تحتاج متابعة", en: "8 overdue invoices need follow-up" }, createdAt: iso(-1, 14), read: false, important: true },
    { id: "ntf_5", type: "leave", title: { ar: "طلب إجازة", en: "Leave request" }, message: { ar: "طلب إجازة سنوية جديد بانتظار الموافقة", en: "A new annual leave request awaits approval" }, createdAt: iso(-1, 10), read: true },
    { id: "ntf_6", type: "system", title: { ar: "صيانة مجدولة", en: "Scheduled maintenance" }, message: { ar: "صيانة جهاز الرنين المغناطيسي يوم الخميس من ٨ إلى ١٢ ظهراً", en: "MRI scanner maintenance on Thursday from 8 AM to 12 PM" }, createdAt: iso(-2, 16), read: true, important: true },
    { id: "ntf_7", type: "appointment", title: { ar: "إلغاء موعد", en: "Appointment cancelled" }, message: { ar: `ألغى المريض ${nameAr(pn(11))} موعد المتابعة`, en: `${nameEn(pn(11))} cancelled a follow-up visit` }, createdAt: iso(-2, 11), read: true },
    { id: "ntf_8", type: "stock", title: { ar: "أدوية قاربت على الانتهاء", en: "Medicines expiring soon" }, message: { ar: "٣ أصناف تنتهي صلاحيتها خلال ٦٠ يوماً", en: "3 items expire within 60 days" }, createdAt: iso(-3, 9), read: true },
    { id: "ntf_9", type: "patient", title: { ar: "نتيجة تحليل حرجة", en: "Critical lab result" }, message: { ar: `نتيجة تحليل غير طبيعية للمريض ${nameAr(pn(5))}`, en: `Abnormal lab result for ${nameEn(pn(5))}` }, createdAt: iso(-3, 13), read: false, important: true },
    { id: "ntf_10", type: "system", title: { ar: "نسخة احتياطية", en: "Backup completed" }, message: { ar: "تم أخذ نسخة احتياطية من البيانات بنجاح", en: "Data backup completed successfully" }, createdAt: iso(-4, 2), read: true },
  ];

  const activities: Activity[] = [
    { id: "act_1", type: "patient", text: { ar: `تم قبول ${nameAr(pn(2))} في قسم الباطنة`, en: `${nameEn(pn(2))} admitted to Internal Medicine` }, createdAt: iso(0, 9) },
    { id: "act_2", type: "payment", text: { ar: "تم سداد الفاتورة INV-2026-1204 بالكامل", en: "Invoice INV-2026-1204 paid in full" }, createdAt: iso(0, 8) },
    { id: "act_3", type: "appointment", text: { ar: `أكمل ${nameAr(doctors[0]?.name ?? "")} ٦ كشوفات صباحية`, en: `${nameEn(doctors[0]?.name ?? "")} completed 6 morning consultations` }, createdAt: iso(0, 7) },
    { id: "act_4", type: "stock", text: { ar: "استلام شحنة أدوية جديدة (٢٤ صنف)", en: "New pharmacy shipment received (24 items)" }, createdAt: iso(-1, 17) },
    { id: "act_5", type: "patient", text: { ar: `خروج المريض ${nameAr(pn(9))} بعد تحسن الحالة`, en: `${nameEn(pn(9))} discharged after recovery` }, createdAt: iso(-1, 13) },
    { id: "act_6", type: "leave", text: { ar: "تمت الموافقة على ٣ طلبات إجازة", en: "3 leave requests approved" }, createdAt: iso(-1, 11) },
    { id: "act_7", type: "system", text: { ar: "تحديث أسعار الكشوفات لقسم القلب", en: "Cardiology consultation fees updated" }, createdAt: iso(-2, 15) },
  ];

  return {
    patients, doctors, employees, appointments, departments, rooms, medicines, labTests, radiology,
    invoices, payments, expenses, attendance, leaves, notifications, activities,
  };
}

/** Last 12 months of revenue/expenses for charts (EGP). */
export function monthlyFinance(lang: "ar" | "en") {
  const r = rng(77);
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    const revenue = Math.round((1.6 + r() * 0.9 + i * 0.06) * 1_000_000);
    const expenses = Math.round(revenue * (0.58 + r() * 0.15));
    const patients = Math.round(900 + r() * 450 + i * 25);
    return {
      month: new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", { month: "short" }).format(d),
      revenue,
      expenses,
      profit: revenue - expenses,
      patients,
      newPatients: Math.round(patients * (0.25 + r() * 0.1)),
      inpatients: Math.round(patients * (0.12 + r() * 0.05)),
    };
  });
}
