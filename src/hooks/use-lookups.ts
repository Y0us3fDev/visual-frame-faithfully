import { useMemo } from "react";
import { useCollection } from "@/data/store";
import { useI18n } from "@/contexts/settings";
import type { Department, Doctor, Employee, Patient } from "@/types";

/** Id → record lookups with localized names for cross-entity display. */
export function useLookups() {
  const { tx } = useI18n();
  const { items: patients } = useCollection("patients");
  const { items: doctors } = useCollection("doctors");
  const { items: departments } = useCollection("departments");
  const { items: employees } = useCollection("employees");

  return useMemo(() => {
    const pm = new Map<string, Patient>(patients.map((p) => [p.id, p]));
    const dm = new Map<string, Doctor>(doctors.map((d) => [d.id, d]));
    const depm = new Map<string, Department>(departments.map((d) => [d.id, d]));
    const em = new Map<string, Employee>(employees.map((e) => [e.id, e]));
    return {
      patients,
      doctors,
      departments,
      employees,
      patient: (id?: string) => (id ? pm.get(id) : undefined),
      doctor: (id?: string) => (id ? dm.get(id) : undefined),
      department: (id?: string) => (id ? depm.get(id) : undefined),
      employee: (id?: string) => (id ? em.get(id) : undefined),
      patientName: (id?: string) => tx(id ? pm.get(id)?.name : undefined) || "—",
      doctorName: (id?: string) => tx(id ? dm.get(id)?.name : undefined) || "—",
      departmentName: (id?: string) => tx(id ? depm.get(id)?.name : undefined) || "—",
      employeeName: (id?: string) => tx(id ? em.get(id)?.name : undefined) || "—",
      patientOptions: patients.map((p) => ({ value: p.id, label: tx(p.name) })),
      doctorOptions: doctors.map((d) => ({ value: d.id, label: tx(d.name) })),
      departmentOptions: departments.map((d) => ({ value: d.id, label: tx(d.name) })),
      employeeOptions: employees.map((e) => ({ value: e.id, label: tx(e.name) })),
    };
  }, [patients, doctors, departments, employees, tx]);
}
