import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/notifications")({
  head: () => pageHead("Notifications", "Notifications section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الإشعارات" en="Notifications" />,
});
