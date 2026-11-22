import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/settings")({
  head: () => pageHead("Settings", "Settings section of the Al Shifa Hospital management system."),
  validateSearch: (s: Record<string, unknown>): { tab?: string | undefined } => (typeof s["tab"] === "string" ? { tab: s["tab"] } : {}),
  component: () => <ComingSoon ar="الإعدادات" en="Settings" />,
});
