import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { pageHead } from "@/utils/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead("Dashboard", "Live overview of patients, beds, appointments and revenue at Al Shifa Hospital."),
  component: DashboardPage,
});
