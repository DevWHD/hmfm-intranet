import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronDown, ChevronUp, Plus, Trash2, ChevronRight } from "lucide-react";
import { ICON_NAMES } from "@/lib/icons";

export type FieldType = "text" | "textarea" | "number" | "select" | "icon";

export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  rows?: number;
}

interface Props<T extends { id: string }> {
  items: T[];
  setItems: (next: T[]) => void;
  fields: FieldConfig<T>[];
  newItem: () => T;
  itemTitle: (item: T) => string;
  itemSubtitle?: (item: T) => string;
  addLabel?: string;
}

export function GenericListEditor<T extends { id: string }>({
  items,
  setItems,
  fields,
  newItem,
  itemTitle,
  itemSubtitle,
  addLabel = "Adicionar item",
}: Props<T>) {
  const [openId, setOpenId] = useState<string | null>(null);

  const updateItem = (id: string, patch: Partial<T>) => {
    setItems(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };
  const removeItem = (id: string) => setItems(items.filter((it) => it.id !== id));
  const addItem = () => {
    const it = newItem();
    setItems([...items, it]);
    setOpenId(it.id);
  };
  const move = (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((it) => it.id === id);
    if (idx === -1) return;
    const tgt = idx + dir;
    if (tgt < 0 || tgt >= items.length) return;
    const next = [...items];
    [next[idx], next[tgt]] = [next[tgt], next[idx]];
    setItems(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button size="sm" onClick={addItem} className="gap-1.5">
          <Plus className="w-4 h-4" /> {addLabel}
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const open = openId === item.id;
          return (
            <Card key={item.id} className="overflow-hidden">
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover-elevate"
                onClick={() => setOpenId(open ? null : item.id)}
                data-testid={`row-${item.id}`}
              >
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{itemTitle(item) || "(sem título)"}</div>
                  {itemSubtitle && (
                    <div className="text-xs text-muted-foreground truncate">{itemSubtitle(item)}</div>
                  )}
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    disabled={idx === 0}
                    onClick={() => move(item.id, -1)}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    disabled={idx === items.length - 1}
                    onClick={() => move(item.id, 1)}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="w-8 h-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => removeItem(item.id)}>
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </button>
              {open && (
                <div className="px-4 pb-4 pt-2 border-t border-border grid gap-3 sm:grid-cols-2">
                  {fields.map((f) => (
                    <FieldEditor
                      key={String(f.key)}
                      field={f}
                      value={item[f.key]}
                      onChange={(v) => updateItem(item.id, { [f.key]: v } as Partial<T>)}
                    />
                  ))}
                </div>
              )}
            </Card>
          );
        })}
        {items.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-8 border border-dashed rounded-md">
            Nenhum item. Clique em "{addLabel}" para começar.
          </div>
        )}
      </div>
    </div>
  );
}

function FieldEditor<T>({
  field,
  value,
  onChange,
}: {
  field: FieldConfig<T>;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const wide = field.type === "textarea";
  return (
    <div className={wide ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
      <Label className="text-xs">{field.label}</Label>
      {field.type === "text" && (
        <Input
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "number" && (
        <Input
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}
      {field.type === "textarea" && (
        <Textarea
          value={String(value ?? "")}
          rows={field.rows ?? 3}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "select" && (
        <Select value={String(value ?? "")} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecionar..." />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {field.type === "icon" && (
        <Select value={String(value ?? "")} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Escolher ícone..." />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {ICON_NAMES.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
