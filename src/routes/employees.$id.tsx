import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/employees/$id")({
  head: () => pageHead("Employee details", "Employee details section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="ملف الموظف" en="Employee details" />,
});
