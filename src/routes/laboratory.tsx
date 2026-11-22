import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/laboratory")({
  head: () => pageHead("Laboratory", "Laboratory section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="المعمل" en="Laboratory" />,
});
