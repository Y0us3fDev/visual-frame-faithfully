import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useI18n, useSettings } from "@/contexts/settings";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";
import { Breadcrumbs } from "./Breadcrumbs";

export function AppLayout({ children }: { children: ReactNode }) {
  const { isRTL } = useI18n();
  const { theme } = useSettings();
  return (
    <TooltipProvider delayDuration={200}>
      <SidebarProvider>
        <div className="flex min-h-svh w-full">
          <AppSidebar />
          <SidebarInset className="min-w-0 bg-background">
            <Topbar />
            <main className="mx-auto w-full max-w-[1600px] flex-1 p-4 md:p-6 lg:p-8">
              <div className="no-print mb-4 md:hidden">
                <Breadcrumbs />
              </div>
              {children}
            </main>
          </SidebarInset>
        </div>
        <Toaster position={isRTL ? "top-left" : "top-right"} theme={theme} richColors closeButton />
      </SidebarProvider>
    </TooltipProvider>
  );
}
