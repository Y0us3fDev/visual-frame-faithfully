import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/rooms")({
  head: () => pageHead("Rooms and Beds", "Rooms and Beds section of the Al Shifa Hospital management system."),
  component: () => <ComingSoon ar="الغرف والأسرّة" en="Rooms and Beds" />,
});
