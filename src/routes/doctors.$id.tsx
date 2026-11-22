import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/doctors/$id")({
  head: () => pageHead("Doctor details", "Doctor details section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="ملف الطبيب" en="Doctor details" />,
});
