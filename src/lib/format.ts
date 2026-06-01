import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatLongDate(date: Date): string {
  return format(date, "EEEE, d 'de' LLLL 'de' yyyy", { locale: ptBR });
}

export function getGreeting(date: Date): string {
  const h = date.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function relativeDays(days: number): string {
  if (days === 0) return "hoje";
  if (days === 1) return "há 1 dia";
  return `há ${days} dias`;
}
