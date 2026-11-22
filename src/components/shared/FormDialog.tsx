import { useEffect, useMemo } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/contexts/settings";
import { cn } from "@/lib/utils";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "tel" | "date" | "time" | "select" | "textarea";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
  min?: number;
  hint?: string;
}

export type FormValues = Record<string, string | number>;

/** Config-driven dialog form (React Hook Form + Zod) used for every add/edit flow. */
export function FormDialog({
  open, onOpenChange, title, description, fields, defaultValues, onSubmit, submitLabel, wide,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: string;
  fields: FieldDef[];
  defaultValues: FormValues;
  onSubmit: (values: FormValues) => void;
  submitLabel?: string;
  wide?: boolean;
}) {
  const { t } = useI18n();
  const schema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const f of fields) {
      if (f.type === "number") {
        shape[f.name] = z.coerce
          .number({ invalid_type_error: t("أدخل رقماً صحيحاً", "Enter a valid number") })
          .min(f.min ?? 0, t(`القيمة يجب ألا تقل عن ${f.min ?? 0}`, `Must be at least ${f.min ?? 0}`));
      } else {
        let s = z.string().trim().max(500, t("النص طويل جداً", "Text is too long"));
        if (f.type === "email") {
          shape[f.name] = f.required
            ? s.email(t("بريد إلكتروني غير صالح", "Invalid email"))
            : s.email(t("بريد إلكتروني غير صالح", "Invalid email")).or(z.literal(""));
          continue;
        }
        if (f.type === "tel") s = s.regex(/^[+\d\s-]*$/, t("رقم هاتف غير صالح", "Invalid phone number"));
        shape[f.name] = f.required ? s.min(1, t("هذا الحقل مطلوب", "This field is required")) : s;
      }
    }
    return z.object(shape);
  }, [fields, t]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues,
  });
  useEffect(() => {
    if (open) form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(wide ? "sm:max-w-2xl" : "sm:max-w-lg")}>
        <DialogHeader className="sm:text-start">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit((v) => {
            onSubmit(v);
            onOpenChange(false);
          })}
          className="space-y-5"
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((f) => {
              const err = form.formState.errors[f.name]?.message as string | undefined;
              return (
                <div key={f.name} className={cn("space-y-1.5", (f.full || f.type === "textarea") && "sm:col-span-2")}>
                  <Label htmlFor={`f-${f.name}`}>
                    {f.label}
                    {f.required && <span className="ms-0.5 text-destructive">*</span>}
                  </Label>
                  {f.type === "select" ? (
                    <Controller
                      control={form.control}
                      name={f.name}
                      render={({ field }) => (
                        <Select value={String(field.value ?? "")} onValueChange={field.onChange}>
                          <SelectTrigger id={`f-${f.name}`} className="w-full">
                            <SelectValue placeholder={f.placeholder ?? t("اختر...", "Select...")} />
                          </SelectTrigger>
                          <SelectContent className="max-h-72">
                            {(f.options ?? []).map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  ) : f.type === "textarea" ? (
                    <Textarea id={`f-${f.name}`} rows={3} placeholder={f.placeholder} {...form.register(f.name)} />
                  ) : (
                    <Input
                      id={`f-${f.name}`}
                      type={f.type ?? "text"}
                      placeholder={f.placeholder}
                      dir={f.type === "tel" || f.type === "email" ? "ltr" : undefined}
                      className={f.type === "tel" || f.type === "email" ? "rtl:text-end" : undefined}
                      {...form.register(f.name)}
                    />
                  )}
                  {err ? <p className="text-xs text-destructive">{err}</p> : f.hint ? <p className="text-xs text-muted-foreground">{f.hint}</p> : null}
                </div>
              );
            })}
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button type="submit">{submitLabel ?? t("حفظ", "Save")}</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** Splits a comma/newline separated string into a trimmed list. */
export function splitList(v: string | number | undefined): string[] {
  return String(v ?? "")
    .split(/[,،\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}
