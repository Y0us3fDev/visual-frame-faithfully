import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/employees/")({
  head: () => pageHead("Employees", "Employees section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الموظفون" en="Employees" />,
});
