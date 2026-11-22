import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/contexts/settings";
import { downloadCSV, printPage } from "@/utils/export";

export function ExportMenu({ filename, headers, rows }: { filename: string; headers: string[]; rows: () => (string | number)[][] }) {
  const { t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download />
          {t("تصدير", "Export")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => {
            downloadCSV(filename, headers, rows());
            toast.success(t("تم تصدير ملف Excel", "Excel file exported"));
          }}
        >
          <FileSpreadsheet className="text-success" />
          {t("تصدير Excel", "Export to Excel")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { toast.info(t("اختر «حفظ كـ PDF» من نافذة الطباعة", "Choose “Save as PDF” in the print dialog")); setTimeout(printPage, 300); }}>
          <FileText className="text-destructive" />
          {t("تصدير PDF", "Export to PDF")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={printPage}>
          <Printer />
          {t("طباعة", "Print")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
