import type { Invoice } from "@/types";

export function invoiceSubtotal(inv: Pick<Invoice, "items">): number {
  return inv.items.reduce((s, it) => s + it.qty * it.price, 0);
}
export function invoiceTotal(inv: Pick<Invoice, "items" | "discount">): number {
  return Math.max(0, invoiceSubtotal(inv) - inv.discount);
}
export function invoiceBalance(inv: Pick<Invoice, "items" | "discount" | "paid" | "status">): number {
  if (inv.status === "cancelled") return 0;
  return Math.max(0, invoiceTotal(inv) - inv.paid);
}
/** Status implied by the amount paid against the invoice total. */
export function statusForPaid(total: number, paid: number, dueDate: string, today: string): Invoice["status"] {
  if (paid >= total && total > 0) return "paid";
  if (paid > 0) return "partial";
  return dueDate < today ? "overdue" : "pending";
}
