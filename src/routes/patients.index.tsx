import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/patients/")({
  head: () => pageHead("Patients", "Patients section of the Al Shifa Hospital management system."),
  validateSearch: (s: Record<string, unknown>): { new?: boolean } => (s["new"] === true || s["new"] === "true" ? { new: true } : {}),
  component: () => <ComingSoon ar="المرضى" en="Patients" />,
});
