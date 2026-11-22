import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/pharmacy")({
  head: () => pageHead("Pharmacy", "Pharmacy section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الصيدلية" en="Pharmacy" />,
});
