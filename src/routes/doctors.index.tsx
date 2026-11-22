import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/doctors/")({
  head: () => pageHead("Doctors", "Doctors section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الأطباء" en="Doctors" />,
});
