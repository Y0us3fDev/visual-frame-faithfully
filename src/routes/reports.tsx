import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/reports")({
  head: () => pageHead("Reports", "Reports section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="التقارير والتحليلات" en="Reports" />,
});
