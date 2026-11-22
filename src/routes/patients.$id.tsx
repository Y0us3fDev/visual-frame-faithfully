import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/patients/$id")({
  head: () => pageHead("Patient details", "Patient details section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="ملف المريض" en="Patient details" />,
});
