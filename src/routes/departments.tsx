import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/departments")({
  head: () => pageHead("Departments", "Departments section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الأقسام" en="Departments" />,
});
