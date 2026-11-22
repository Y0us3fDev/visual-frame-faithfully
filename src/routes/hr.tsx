import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/hr")({
  head: () => pageHead("HR and Attendance", "HR and Attendance section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الحضور والموارد البشرية" en="HR and Attendance" />,
});
