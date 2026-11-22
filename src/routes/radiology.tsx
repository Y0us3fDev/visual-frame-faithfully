import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/radiology")({
  head: () => pageHead("Radiology", "Radiology section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الأشعة" en="Radiology" />,
});
