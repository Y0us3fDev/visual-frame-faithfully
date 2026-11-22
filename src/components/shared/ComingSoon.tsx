import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { useI18n } from "@/contexts/settings";

/** Temporary page shown for sections not built yet. */
export function ComingSoon({ ar, en }: { ar: string; en: string }) {
  const { t } = useI18n();
  return (
    <div>
      <PageHeader title={t(ar, en)} />
      <div className="surface">
        <EmptyState
          icon={Construction}
          title={t("هذا القسم قيد الإنشاء", "This section is still being built")}
          description={t("سيتم إضافة هذه الصفحة قريباً.", "This page will be added soon.")}
          action={<Button asChild variant="outline"><Link to="/">{t("العودة للوحة التحكم", "Back to dashboard")}</Link></Button>}
        />
      </div>
    </div>
  );
}
