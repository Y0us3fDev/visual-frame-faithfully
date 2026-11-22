import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/finance")({
  head: () => pageHead("Finance", "Finance section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="المالية" en="Finance" />,
});
