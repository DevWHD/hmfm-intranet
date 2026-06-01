import { useRef, useState } from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Download,
  Upload,
  RefreshCcw,
  Plus,
  Trash2,
  Image as ImageIcon,
  Eye,
} from "lucide-react";
import { useContent } from "@/store/content";
import { ICON_NAMES } from "@/lib/icons";
import { GenericListEditor, type FieldConfig } from "@/components/admin/GenericListEditor";
import type { HeroSlide } from "@/data/heroSlides";
import type { HeaderButton, NavLinkConfig, IndicatorItem, FooterLink } from "@/data/branding";
import type { Notice } from "@/data/notices";
import type { Shift, SectorShiftWeek } from "@/data/shifts";
import type { DocItem } from "@/data/documents";
import type { Sector } from "@/data/sectors";
import type { UrgentComm } from "@/data/urgentComms";
import type { Contact } from "@/data/contacts";
import type { Department, SystemCard } from "@/data/departments";
import type { DayMenu, Meal } from "@/data/menu";

const newId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const HeroSlideEditor = GenericListEditor<HeroSlide>;
const IndicatorEditor = GenericListEditor<IndicatorItem>;
const SystemEditor = GenericListEditor<SystemCard>;
const DepartmentEditor = GenericListEditor<Department>;
const NoticeEditor = GenericListEditor<Notice>;
const ShiftEditor = GenericListEditor<Shift>;
const DocumentEditor = GenericListEditor<DocItem>;
const SectorEditor = GenericListEditor<Sector>;
const UrgentCommEditor = GenericListEditor<UrgentComm>;
const ContactEditor = GenericListEditor<Contact>;
const HeaderButtonEditor = GenericListEditor<HeaderButton>;
const NavLinkEditor = GenericListEditor<NavLinkConfig & { id: string }>;
const FooterLinkEditor = GenericListEditor<FooterLink & { id: string }>;

export default function Admin() {
  const { content, setContent, updateBranding, resetAll, exportJson, importJson } = useContent();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hmas-intranet-conteudo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exportado", description: "Backup baixado com sucesso." });
  };

  const handleImportFile = async (file: File) => {
    const text = await file.text();
    if (importJson(text)) {
      toast({ title: "Importado", description: "Conteúdo restaurado a partir do arquivo." });
    } else {
      toast({ title: "Erro", description: "Arquivo inválido.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(199_30%_97%)]">
      <div className="bg-[hsl(196_100%_18%)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/70">Painel</div>
              <h1 className="font-serif text-2xl font-bold">HMFM Intranet</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild className="bg-transparent text-white border-white/30 hover:bg-white/10">
              <Link href="/">
                <Eye className="w-4 h-4 mr-1.5" /> Ver site
              </Link>
            </Button>
            <Button variant="outline" onClick={handleExport} className="bg-transparent text-white border-white/30 hover:bg-white/10">
              <Download className="w-4 h-4 mr-1.5" /> Exportar
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImportFile(f);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="bg-transparent text-white border-white/30 hover:bg-white/10">
              <Upload className="w-4 h-4 mr-1.5" /> Importar
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
                  <RefreshCcw className="w-4 h-4 mr-1.5" /> Restaurar padrão
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Restaurar conteúdo padrão?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Isto descarta todas as suas edições e volta o intranet ao estado original.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      resetAll();
                      toast({ title: "Restaurado", description: "Conteúdo padrão recuperado." });
                    }}
                  >
                    Restaurar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="identidade" className="w-full">
          <TabsList className="flex flex-wrap h-auto justify-start gap-1 bg-white border border-border p-1 rounded-md">
            <TabsTrigger value="identidade">Identidade</TabsTrigger>
            <TabsTrigger value="home">Página inicial</TabsTrigger>
            <TabsTrigger value="hero">Slides</TabsTrigger>
            <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
            <TabsTrigger value="sistemas">Sistemas</TabsTrigger>
            <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
            <TabsTrigger value="avisos">Avisos</TabsTrigger>
            <TabsTrigger value="escalas">Escalas</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="setores">Setores</TabsTrigger>
            <TabsTrigger value="cardapio">Cardápio</TabsTrigger>
            <TabsTrigger value="urgentes">Urgentes</TabsTrigger>
            <TabsTrigger value="contatos">Contatos</TabsTrigger>
            <TabsTrigger value="botoes">Botões & Menu</TabsTrigger>
            <TabsTrigger value="rodape">Rodapé</TabsTrigger>
          </TabsList>

          <TabsContent value="identidade" className="mt-4 space-y-4">
            <Card className="p-5 space-y-5">
              <SectionTitle title="Logo" subtitle="Texto e imagem da identidade do hospital" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Texto principal (sigla)">
                  <Input
                    value={content.branding.logo.primary}
                    onChange={(e) => updateBranding({ logo: { ...content.branding.logo, primary: e.target.value } })}
                  />
                </Field>
                <Field label="Texto secundário">
                  <Input
                    value={content.branding.logo.secondary}
                    onChange={(e) => updateBranding({ logo: { ...content.branding.logo, secondary: e.target.value } })}
                  />
                </Field>
              </div>
              <Field label="Imagem do logo (opcional — substitui o ícone)">
                <ImageUploader
                  value={content.branding.logo.imageUrl}
                  onChange={(url) => updateBranding({ logo: { ...content.branding.logo, imageUrl: url } })}
                />
              </Field>
            </Card>

            <Card className="p-5 space-y-5">
              <SectionTitle title="Barra superior" subtitle="Telefone, e-mail, endereço e texto à direita" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Telefone">
                  <Input
                    value={content.branding.topBar.phone}
                    onChange={(e) => updateBranding({ topBar: { ...content.branding.topBar, phone: e.target.value } })}
                  />
                </Field>
                <Field label="E-mail">
                  <Input
                    value={content.branding.topBar.email}
                    onChange={(e) => updateBranding({ topBar: { ...content.branding.topBar, email: e.target.value } })}
                  />
                </Field>
                <Field label="Endereço">
                  <Input
                    value={content.branding.topBar.address}
                    onChange={(e) => updateBranding({ topBar: { ...content.branding.topBar, address: e.target.value } })}
                  />
                </Field>
                <Field label="Texto à direita">
                  <Input
                    value={content.branding.topBar.rightText}
                    onChange={(e) => updateBranding({ topBar: { ...content.branding.topBar, rightText: e.target.value } })}
                  />
                </Field>
              </div>
            </Card>

            <Card className="p-5 space-y-5">
              <SectionTitle title="Saudação ao usuário" subtitle="Aparece logo abaixo do cabeçalho" />
              <div className="flex items-center gap-3">
                <Switch
                  checked={content.branding.greeting.showGreeting}
                  onCheckedChange={(v) => updateBranding({ greeting: { ...content.branding.greeting, showGreeting: v } })}
                />
                <span className="text-sm text-muted-foreground">Mostrar barra de saudação</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nome do usuário">
                  <Input
                    value={content.branding.greeting.userName}
                    onChange={(e) => updateBranding({ greeting: { ...content.branding.greeting, userName: e.target.value } })}
                  />
                </Field>
                <Field label="Iniciais">
                  <Input
                    value={content.branding.greeting.userInitials}
                    onChange={(e) => updateBranding({ greeting: { ...content.branding.greeting, userInitials: e.target.value } })}
                  />
                </Field>
                <Field label="Cargo / Função">
                  <Input
                    value={content.branding.greeting.userRole}
                    onChange={(e) => updateBranding({ greeting: { ...content.branding.greeting, userRole: e.target.value } })}
                  />
                </Field>
                <Field label="Setor">
                  <Input
                    value={content.branding.greeting.sector}
                    onChange={(e) => updateBranding({ greeting: { ...content.branding.greeting, sector: e.target.value } })}
                  />
                </Field>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="home" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Seções da página inicial" subtitle="Ative ou oculte cada bloco" />
              <div className="grid sm:grid-cols-2 gap-3">
                {(
                  [
                    ["showHero", "Carrossel de destaques"],
                    ["showUrgentBanner", "Banner de comunicados urgentes"],
                    ["showIndicators", "Indicadores assistenciais"],
                    ["showSistemas", "Grade de sistemas"],
                    ["showStats", "Cards de estatísticas"],
                    ["showAvisos", "Avisos recentes"],
                    ["showEscala", "Escala de hoje"],
                    ["showDepartamentos", "Departamentos"],
                    ["showCardapio", "Prévia do cardápio"],
                    ["showPesquisa", "Pesquisa de satisfação"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 p-3 rounded-md border border-border bg-white">
                    <Switch
                      checked={content.branding.homeSections[key]}
                      onCheckedChange={(v) =>
                        updateBranding({ homeSections: { ...content.branding.homeSections, [key]: v } })
                      }
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <SectionTitle title="Pesquisa de satisfação" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Selo">
                  <Input
                    value={content.branding.pesquisa.badge}
                    onChange={(e) => updateBranding({ pesquisa: { ...content.branding.pesquisa, badge: e.target.value } })}
                  />
                </Field>
                <Field label="Botão">
                  <Input
                    value={content.branding.pesquisa.cta}
                    onChange={(e) => updateBranding({ pesquisa: { ...content.branding.pesquisa, cta: e.target.value } })}
                  />
                </Field>
                <Field label="Título" wide>
                  <Input
                    value={content.branding.pesquisa.title}
                    onChange={(e) => updateBranding({ pesquisa: { ...content.branding.pesquisa, title: e.target.value } })}
                  />
                </Field>
                <Field label="Texto" wide>
                  <Textarea
                    value={content.branding.pesquisa.body}
                    rows={3}
                    onChange={(e) => updateBranding({ pesquisa: { ...content.branding.pesquisa, body: e.target.value } })}
                  />
                </Field>
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <SectionTitle title="Banner urgente" />
              <Field label="Texto do botão">
                <Input
                  value={content.branding.urgentBanner.ctaLabel}
                  onChange={(e) => updateBranding({ urgentBanner: { ctaLabel: e.target.value } })}
                />
              </Field>
            </Card>
          </TabsContent>

          <TabsContent value="hero" className="mt-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Slides do carrossel" subtitle="Destaques rotativos da página inicial" />
              <HeroSlideEditor
                items={content.heroSlides}
                setItems={(items) => setContent((p) => ({ ...p, heroSlides: items }))}
                newItem={() => ({
                  id: newId("h"),
                  eyebrow: "Novo destaque",
                  title: "Título do slide",
                  highlight: "destaque",
                  body: "Descrição do slide.",
                  cta: "Saiba mais",
                  bg: "blue",
                  icon: "PlayCircle",
                })}
                itemTitle={(s) => s.title + " " + s.highlight}
                itemSubtitle={(s) => s.eyebrow}
                fields={[
                  { key: "eyebrow", label: "Sobretítulo (eyebrow)", type: "text" },
                  { key: "cta", label: "Texto do botão", type: "text" },
                  { key: "title", label: "Título principal", type: "text" },
                  { key: "highlight", label: "Trecho destacado", type: "text" },
                  { key: "body", label: "Texto descritivo", type: "textarea", rows: 3 },
                  {
                    key: "bg",
                    label: "Cor de fundo",
                    type: "select",
                    options: [
                      { value: "blue", label: "Azul institucional" },
                      { value: "darkblue", label: "Azul escuro" },
                      { value: "teal", label: "Turquesa" },
                      { value: "green", label: "Verde" },
                    ],
                  },
                  { key: "icon", label: "Ícone", type: "icon" },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="indicadores" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Cabeçalho do bloco" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Sobretítulo">
                  <Input
                    value={content.branding.indicators.eyebrow}
                    onChange={(e) =>
                      updateBranding({ indicators: { ...content.branding.indicators, eyebrow: e.target.value } })
                    }
                  />
                </Field>
                <Field label="Título">
                  <Input
                    value={content.branding.indicators.title}
                    onChange={(e) =>
                      updateBranding({ indicators: { ...content.branding.indicators, title: e.target.value } })
                    }
                  />
                </Field>
              </div>
            </Card>
            <Card className="p-5 space-y-4">
              <SectionTitle title="Indicadores" />
              <IndicatorEditor
                items={content.branding.indicators.items}
                setItems={(items) =>
                  updateBranding({ indicators: { ...content.branding.indicators, items } })
                }
                newItem={() => ({
                  id: newId("ind"),
                  label: "Novo indicador",
                  value: 0,
                  prefix: "+",
                  icon: "Activity",
                })}
                itemTitle={(it) => `${it.prefix}${it.value.toLocaleString("pt-BR")} — ${it.label}`}
                fields={[
                  { key: "label", label: "Rótulo", type: "text" },
                  { key: "value", label: "Valor", type: "number" },
                  { key: "prefix", label: "Prefixo (ex: +)", type: "text" },
                  { key: "icon", label: "Ícone", type: "icon" },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="sistemas" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Cabeçalho" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Sobretítulo">
                  <Input
                    value={content.branding.sistemas.eyebrow}
                    onChange={(e) => updateBranding({ sistemas: { ...content.branding.sistemas, eyebrow: e.target.value } })}
                  />
                </Field>
                <Field label="Título">
                  <Input
                    value={content.branding.sistemas.title}
                    onChange={(e) => updateBranding({ sistemas: { ...content.branding.sistemas, title: e.target.value } })}
                  />
                </Field>
                <Field label="Subtítulo" wide>
                  <Textarea
                    rows={2}
                    value={content.branding.sistemas.subtitle}
                    onChange={(e) => updateBranding({ sistemas: { ...content.branding.sistemas, subtitle: e.target.value } })}
                  />
                </Field>
              </div>
            </Card>
            <Card className="p-5 space-y-4">
              <SectionTitle title="Cards de sistemas" />
              <SystemEditor
                items={content.systems}
                setItems={(items) => setContent((p) => ({ ...p, systems: items }))}
                newItem={() => ({
                  id: newId("sys"),
                  name: "Novo Sistema",
                  icon: "Activity",
                  description: "Descrição do sistema.",
                  color: "blue",
                })}
                itemTitle={(s) => s.name}
                itemSubtitle={(s) => s.description}
                fields={[
                  { key: "name", label: "Nome", type: "text" },
                  { key: "icon", label: "Ícone", type: "icon" },
                  { key: "description", label: "Descrição", type: "textarea", rows: 2 },
                  {
                    key: "color",
                    label: "Cor",
                    type: "select",
                    options: [
                      { value: "blue", label: "Azul" },
                      { value: "darkblue", label: "Azul escuro" },
                      { value: "teal", label: "Turquesa" },
                      { value: "green", label: "Verde" },
                    ],
                  },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="departamentos" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Cabeçalho" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Sobretítulo">
                  <Input
                    value={content.branding.departamentos.eyebrow}
                    onChange={(e) => updateBranding({ departamentos: { ...content.branding.departamentos, eyebrow: e.target.value } })}
                  />
                </Field>
                <Field label="Título">
                  <Input
                    value={content.branding.departamentos.title}
                    onChange={(e) => updateBranding({ departamentos: { ...content.branding.departamentos, title: e.target.value } })}
                  />
                </Field>
                <Field label="Subtítulo" wide>
                  <Textarea
                    rows={2}
                    value={content.branding.departamentos.subtitle}
                    onChange={(e) => updateBranding({ departamentos: { ...content.branding.departamentos, subtitle: e.target.value } })}
                  />
                </Field>
              </div>
            </Card>
            <Card className="p-5 space-y-4">
              <SectionTitle title="Departamentos" />
              <DepartmentEditor
                items={content.departments}
                setItems={(items) => setContent((p) => ({ ...p, departments: items }))}
                newItem={() => ({
                  id: newId("dep"),
                  name: "Novo Departamento",
                  icon: "Building2",
                  description: "Descrição do departamento.",
                  href: "/setores",
                })}
                itemTitle={(d) => d.name}
                itemSubtitle={(d) => d.description}
                fields={[
                  { key: "name", label: "Nome", type: "text" },
                  { key: "icon", label: "Ícone", type: "icon" },
                  { key: "description", label: "Descrição", type: "textarea", rows: 2 },
                  { key: "href", label: "Link de destino", type: "text" },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="avisos" className="mt-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Mural de avisos" />
              <NoticeEditor
                items={content.notices}
                setItems={(items) => setContent((p) => ({ ...p, notices: items }))}
                newItem={() => ({
                  id: newId("n"),
                  title: "Novo aviso",
                  body: "Conteúdo do aviso...",
                  author: "Autor",
                  authorInitials: "AU",
                  authorRole: "Cargo",
                  daysAgo: 0,
                  likes: 0,
                  priority: "normal",
                  sector: "Geral",
                })}
                itemTitle={(n) => n.title}
                itemSubtitle={(n) => `${n.author} · ${n.sector}`}
                fields={[
                  { key: "title", label: "Título", type: "text" },
                  { key: "sector", label: "Setor", type: "text" },
                  { key: "body", label: "Conteúdo", type: "textarea", rows: 4 },
                  { key: "author", label: "Autor", type: "text" },
                  { key: "authorInitials", label: "Iniciais do autor", type: "text" },
                  { key: "authorRole", label: "Cargo do autor", type: "text" },
                  { key: "daysAgo", label: "Dias atrás", type: "number" },
                  { key: "likes", label: "Curtidas", type: "number" },
                  {
                    key: "priority",
                    label: "Prioridade",
                    type: "select",
                    options: [
                      { value: "alta", label: "Alta" },
                      { value: "normal", label: "Normal" },
                      { value: "informativo", label: "Informativo" },
                    ],
                  },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="escalas" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Plantonistas de hoje" subtitle="Aparece em destaque na home" />
              <ShiftEditor
                items={content.todayShifts}
                setItems={(items) => setContent((p) => ({ ...p, todayShifts: items }))}
                newItem={() => ({
                  id: newId("s"),
                  name: "Nome do colaborador",
                  initials: "NC",
                  role: "Função",
                  hours: "07:00 – 19:00",
                  type: "diurno",
                  sector: "Setor",
                  day: 0,
                })}
                itemTitle={(s) => `${s.name} — ${s.hours}`}
                itemSubtitle={(s) => `${s.role} · ${s.sector}`}
                fields={[
                  { key: "name", label: "Nome", type: "text" },
                  { key: "initials", label: "Iniciais", type: "text" },
                  { key: "role", label: "Função", type: "text" },
                  { key: "sector", label: "Setor", type: "text" },
                  { key: "hours", label: "Horário", type: "text" },
                  {
                    key: "type",
                    label: "Turno",
                    type: "select",
                    options: [
                      { value: "diurno", label: "Diurno" },
                      { value: "noturno", label: "Noturno" },
                    ],
                  },
                ]}
              />
            </Card>
            <Card className="p-5 space-y-4">
              <SectionTitle title="Escala semanal por setor" subtitle="Página /escalas" />
              <WeekScheduleEditor
                value={content.weekSchedule}
                onChange={(items) => setContent((p) => ({ ...p, weekSchedule: items }))}
              />
            </Card>
          </TabsContent>

          <TabsContent value="documentos" className="mt-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Documentos & protocolos" />
              <DocumentEditor
                items={content.documents}
                setItems={(items) => setContent((p) => ({ ...p, documents: items }))}
                newItem={() => ({
                  id: newId("d"),
                  title: "Novo documento",
                  category: "POPs",
                  type: "PDF",
                  size: "1 MB",
                  updatedAt: new Date().toLocaleDateString("pt-BR"),
                  sector: "Geral",
                  description: "Descrição do documento.",
                })}
                itemTitle={(d) => d.title}
                itemSubtitle={(d) => `${d.category} · ${d.sector}`}
                fields={[
                  { key: "title", label: "Título", type: "text" },
                  { key: "sector", label: "Setor", type: "text" },
                  { key: "description", label: "Descrição", type: "textarea", rows: 2 },
                  {
                    key: "category",
                    label: "Categoria",
                    type: "select",
                    options: [
                      { value: "Protocolos Clínicos", label: "Protocolos Clínicos" },
                      { value: "Manuais", label: "Manuais" },
                      { value: "Formulários", label: "Formulários" },
                      { value: "POPs", label: "POPs" },
                      { value: "Resoluções", label: "Resoluções" },
                    ],
                  },
                  {
                    key: "type",
                    label: "Formato",
                    type: "select",
                    options: [
                      { value: "PDF", label: "PDF" },
                      { value: "DOC", label: "DOC" },
                      { value: "XLS", label: "XLS" },
                    ],
                  },
                  { key: "size", label: "Tamanho", type: "text" },
                  { key: "updatedAt", label: "Atualizado em", type: "text" },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="setores" className="mt-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Setores hospitalares" />
              <SectorEditor
                items={content.sectors}
                setItems={(items) => setContent((p) => ({ ...p, sectors: items }))}
                newItem={() => ({
                  id: newId("sec"),
                  name: "Novo Setor",
                  icon: "Building2",
                  description: "Descrição do setor.",
                  ramal: "0000",
                  responsavel: "Responsável",
                  localizacao: "Andar · Bloco",
                })}
                itemTitle={(s) => s.name}
                itemSubtitle={(s) => `${s.responsavel} · ramal ${s.ramal}`}
                fields={[
                  { key: "name", label: "Nome do setor", type: "text" },
                  { key: "icon", label: "Ícone", type: "icon" },
                  { key: "description", label: "Descrição", type: "textarea", rows: 2 },
                  { key: "ramal", label: "Ramal", type: "text" },
                  { key: "responsavel", label: "Responsável", type: "text" },
                  { key: "localizacao", label: "Localização", type: "text" },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="cardapio" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Cardápio do dia" subtitle="Mostrado na página inicial" />
              <DayMenuEditor
                value={content.todayMenu}
                onChange={(v) => setContent((p) => ({ ...p, todayMenu: v }))}
              />
            </Card>
            <Card className="p-5 space-y-4">
              <SectionTitle title="Cardápio da semana" subtitle="Página /cardapio" />
              <WeeklyMenuEditor
                value={content.weeklyMenu}
                onChange={(v) => setContent((p) => ({ ...p, weeklyMenu: v }))}
              />
            </Card>
          </TabsContent>

          <TabsContent value="urgentes" className="mt-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Comunicados urgentes" />
              <UrgentCommEditor
                items={content.urgentComms}
                setItems={(items) => setContent((p) => ({ ...p, urgentComms: items }))}
                newItem={() => ({
                  id: newId("u"),
                  title: "Novo comunicado urgente",
                  body: "Detalhes do comunicado...",
                  severity: "media",
                  publishedAt: new Date().toLocaleString("pt-BR"),
                  author: "Autor",
                  sector: "Geral",
                })}
                itemTitle={(u) => u.title}
                itemSubtitle={(u) => `${u.author} · ${u.publishedAt}`}
                fields={[
                  { key: "title", label: "Título", type: "text" },
                  { key: "sector", label: "Setor", type: "text" },
                  { key: "body", label: "Conteúdo", type: "textarea", rows: 4 },
                  { key: "author", label: "Autor", type: "text" },
                  { key: "publishedAt", label: "Publicado em", type: "text" },
                  {
                    key: "severity",
                    label: "Severidade",
                    type: "select",
                    options: [
                      { value: "alta", label: "Alta" },
                      { value: "media", label: "Média" },
                      { value: "baixa", label: "Baixa" },
                    ],
                  },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="contatos" className="mt-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Lista de contatos" />
              <ContactEditor
                items={content.contacts}
                setItems={(items) => setContent((p) => ({ ...p, contacts: items }))}
                newItem={() => ({
                  id: newId("c"),
                  name: "Novo Contato",
                  initials: "NC",
                  role: "Função",
                  sector: "Setor",
                  ramal: "0000",
                  email: "email@hmas.com.br",
                })}
                itemTitle={(c) => c.name}
                itemSubtitle={(c) => `${c.role} · ${c.sector}`}
                fields={[
                  { key: "name", label: "Nome", type: "text" },
                  { key: "initials", label: "Iniciais", type: "text" },
                  { key: "role", label: "Função", type: "text" },
                  { key: "sector", label: "Setor", type: "text" },
                  { key: "ramal", label: "Ramal", type: "text" },
                  { key: "email", label: "E-mail", type: "text" },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="botoes" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Botões do cabeçalho" subtitle="Aparecem no canto superior direito" />
              <HeaderButtonEditor
                items={content.branding.headerButtons}
                setItems={(items) => updateBranding({ headerButtons: items })}
                newItem={() => ({
                  id: newId("btn"),
                  label: "Novo botão",
                  icon: "ArrowRight",
                  variant: "primary",
                  href: "#",
                })}
                itemTitle={(b) => b.label}
                itemSubtitle={(b) => `${b.variant} · ${b.href}`}
                fields={[
                  { key: "label", label: "Texto", type: "text" },
                  { key: "href", label: "Link", type: "text" },
                  { key: "icon", label: "Ícone", type: "icon" },
                  {
                    key: "variant",
                    label: "Estilo",
                    type: "select",
                    options: [
                      { value: "primary", label: "Azul preenchido" },
                      { value: "outline", label: "Contorno" },
                      { value: "green", label: "Verde" },
                      { value: "darkblue", label: "Azul escuro" },
                      { value: "gradient", label: "Gradiente" },
                    ],
                  },
                ]}
              />
            </Card>
            <Card className="p-5 space-y-4">
              <SectionTitle title="Menu de navegação" subtitle="Links principais do site" />
              <NavLinkEditor
                items={content.branding.navLinks.map((n, i) => ({ ...n, id: `nav-${i}-${n.href}` }))}
                setItems={(items) =>
                  updateBranding({
                    navLinks: items.map(({ id, ...rest }) => rest as NavLinkConfig),
                  })
                }
                newItem={() => ({ id: newId("nav"), href: "/", label: "Novo link", icon: "Home" })}
                itemTitle={(n) => n.label}
                itemSubtitle={(n) => n.href}
                fields={[
                  { key: "label", label: "Texto", type: "text" },
                  { key: "href", label: "URL", type: "text" },
                  { key: "icon", label: "Ícone", type: "icon" },
                ]}
              />
            </Card>
          </TabsContent>

          <TabsContent value="rodape" className="mt-4 space-y-4">
            <Card className="p-5 space-y-4">
              <SectionTitle title="Rodapé" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Sigla">
                  <Input
                    value={content.branding.footer.primary}
                    onChange={(e) => updateBranding({ footer: { ...content.branding.footer, primary: e.target.value } })}
                  />
                </Field>
                <Field label="Nome completo">
                  <Input
                    value={content.branding.footer.secondary}
                    onChange={(e) => updateBranding({ footer: { ...content.branding.footer, secondary: e.target.value } })}
                  />
                </Field>
                <Field label="Descrição" wide>
                  <Textarea
                    rows={3}
                    value={content.branding.footer.description}
                    onChange={(e) => updateBranding({ footer: { ...content.branding.footer, description: e.target.value } })}
                  />
                </Field>
                <Field label="Texto de copyright" wide>
                  <Input
                    value={content.branding.footer.copyright}
                    onChange={(e) => updateBranding({ footer: { ...content.branding.footer, copyright: e.target.value } })}
                  />
                </Field>
                <Field label="Texto secundário (direita)" wide>
                  <Input
                    value={content.branding.footer.tagline}
                    onChange={(e) => updateBranding({ footer: { ...content.branding.footer, tagline: e.target.value } })}
                  />
                </Field>
              </div>
            </Card>
            <Card className="p-5 space-y-4">
              <SectionTitle title="Links institucionais" />
              <FooterLinkEditor
                items={content.branding.footer.institucionalLinks.map((l, i) => ({ ...l, id: `fl-${i}-${l.href}` }))}
                setItems={(items) =>
                  updateBranding({
                    footer: {
                      ...content.branding.footer,
                      institucionalLinks: items.map(({ id, ...rest }) => rest as FooterLink),
                    },
                  })
                }
                newItem={() => ({ id: newId("fl"), label: "Novo link", href: "https://" })}
                itemTitle={(l) => l.label}
                itemSubtitle={(l) => l.href}
                fields={[
                  { key: "label", label: "Texto", type: "text" },
                  { key: "href", label: "URL", type: "text" },
                ]}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[hsl(198_100%_28%)]">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`space-y-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

function ImageUploader({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 rounded-md">
          {value ? <AvatarImage src={value} /> : null}
          <AvatarFallback className="rounded-md bg-muted">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            if (f.size > 500_000) {
              setError("Imagem muito grande. Máx. 500KB.");
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              onChange(String(reader.result));
              setError(null);
            };
            reader.readAsDataURL(f);
          }}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          <Upload className="w-4 h-4 mr-1.5" /> Enviar imagem
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            <Trash2 className="w-4 h-4 mr-1.5" /> Remover
          </Button>
        )}
      </div>
      <Input
        placeholder="ou cole uma URL: https://..."
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function DayMenuEditor({ value, onChange }: { value: DayMenu; onChange: (v: DayMenu) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Dia">
          <Input value={value.day} onChange={(e) => onChange({ ...value, day: e.target.value })} />
        </Field>
        <Field label="Data">
          <Input value={value.date} onChange={(e) => onChange({ ...value, date: e.target.value })} />
        </Field>
      </div>
      <MealsEditor
        meals={value.meals}
        onChange={(meals) => onChange({ ...value, meals })}
      />
    </div>
  );
}

function MealsEditor({ meals, onChange }: { meals: Meal[]; onChange: (m: Meal[]) => void }) {
  const addMeal = () =>
    onChange([...meals, { name: "Nova refeição", items: [""] }]);
  return (
    <div className="space-y-3">
      {meals.map((meal, mi) => (
        <Card key={mi} className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Input
              value={meal.name}
              onChange={(e) => {
                const next = [...meals];
                next[mi] = { ...meal, name: e.target.value };
                onChange(next);
              }}
              className="font-medium"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => onChange(meals.filter((_, i) => i !== mi))}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {meal.items.map((it, ii) => (
              <div key={ii} className="flex items-center gap-2">
                <Input
                  value={it}
                  onChange={(e) => {
                    const next = [...meals];
                    next[mi] = {
                      ...meal,
                      items: meal.items.map((x, j) => (j === ii ? e.target.value : x)),
                    };
                    onChange(next);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => {
                    const next = [...meals];
                    next[mi] = { ...meal, items: meal.items.filter((_, j) => j !== ii) };
                    onChange(next);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [...meals];
                next[mi] = { ...meal, items: [...meal.items, ""] };
                onChange(next);
              }}
            >
              <Plus className="w-4 h-4 mr-1.5" /> Adicionar item
            </Button>
          </div>
        </Card>
      ))}
      <Button type="button" variant="outline" onClick={addMeal}>
        <Plus className="w-4 h-4 mr-1.5" /> Adicionar refeição
      </Button>
    </div>
  );
}

function WeeklyMenuEditor({ value, onChange }: { value: DayMenu[]; onChange: (v: DayMenu[]) => void }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {value.map((day, idx) => (
        <Card key={idx}>
          <button
            type="button"
            className="w-full px-4 py-3 text-left flex items-center justify-between hover-elevate"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <div className="font-medium">{day.day} · {day.date}</div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onChange(value.filter((_, i) => i !== idx));
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </button>
          {open === idx && (
            <div className="px-4 pb-4 border-t border-border pt-3">
              <DayMenuEditor
                value={day}
                onChange={(d) => onChange(value.map((x, i) => (i === idx ? d : x)))}
              />
            </div>
          )}
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange([
            ...value,
            { day: "Novo dia", date: "", meals: [{ name: "Café", items: [] }] },
          ])
        }
      >
        <Plus className="w-4 h-4 mr-1.5" /> Adicionar dia
      </Button>
    </div>
  );
}

const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function WeekScheduleEditor({
  value,
  onChange,
}: {
  value: SectorShiftWeek[];
  onChange: (v: SectorShiftWeek[]) => void;
}) {
  type Row = SectorShiftWeek["rows"][number];
  type Day = Row["days"][number];

  const updateSec = (idx: number, patch: Partial<SectorShiftWeek>) => {
    onChange(value.map((x, i) => (i === idx ? { ...x, ...patch } : x)));
  };

  const updateRow = (secIdx: number, rowIdx: number, patch: Partial<Row>) => {
    const sec = value[secIdx];
    const newRows = sec.rows.map((r, i) => (i === rowIdx ? { ...r, ...patch } : r));
    updateSec(secIdx, { rows: newRows });
  };

  const updateDay = (secIdx: number, rowIdx: number, dayIdx: number, patch: Partial<Day>) => {
    const sec = value[secIdx];
    const row = sec.rows[rowIdx];
    const newDays = row.days.map((d, i) => (i === dayIdx ? { ...d, ...patch } : d));
    updateRow(secIdx, rowIdx, { days: newDays });
  };

  const setRowHoursAll = (secIdx: number, rowIdx: number, hours: string) => {
    const row = value[secIdx].rows[rowIdx];
    updateRow(secIdx, rowIdx, { days: row.days.map((d) => ({ ...d, hours })) });
  };

  const setRowTypeAll = (secIdx: number, rowIdx: number, type: "diurno" | "noturno") => {
    const row = value[secIdx].rows[rowIdx];
    updateRow(secIdx, rowIdx, { days: row.days.map((d) => ({ ...d, type })) });
  };

  const newRow = (): Row => ({
    name: "Novo profissional",
    role: "Função",
    days: WEEK_DAYS.map((day) => ({ day, hours: "07:00 – 19:00", type: "diurno" })),
  });

  return (
    <div className="space-y-4">
      {value.map((sec, secIdx) => (
        <Card key={`${sec.sector}-${secIdx}`} className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Input
              value={sec.sector}
              onChange={(e) => updateSec(secIdx, { sector: e.target.value })}
              className="font-medium max-w-sm"
              data-testid={`input-sector-${secIdx}`}
            />
            <div className="flex-1" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => onChange(value.filter((_, i) => i !== secIdx))}
              data-testid={`button-delete-sector-${secIdx}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {sec.rows.map((row, rowIdx) => {
              const firstHours = row.days[0]?.hours ?? "";
              const firstType = row.days[0]?.type ?? "diurno";
              return (
                <div
                  key={rowIdx}
                  className="rounded-lg border border-border p-3 space-y-2 bg-muted/30"
                  data-testid={`row-${secIdx}-${rowIdx}`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      value={row.name}
                      placeholder="Nome"
                      onChange={(e) => updateRow(secIdx, rowIdx, { name: e.target.value })}
                    />
                    <Input
                      value={row.role}
                      placeholder="Função"
                      onChange={(e) => updateRow(secIdx, rowIdx, { role: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px_auto] gap-2 items-center">
                    <Input
                      value={firstHours}
                      placeholder="Horário (todos os dias)"
                      onChange={(e) => setRowHoursAll(secIdx, rowIdx, e.target.value)}
                    />
                    <select
                      value={firstType}
                      onChange={(e) => setRowTypeAll(secIdx, rowIdx, e.target.value as "diurno" | "noturno")}
                      className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="diurno">Diurno</option>
                      <option value="noturno">Noturno</option>
                    </select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => updateSec(secIdx, { rows: sec.rows.filter((_, i) => i !== rowIdx) })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {row.days.map((d, dayIdx) => (
                      <div key={dayIdx} className="flex flex-col gap-1">
                        <Input
                          value={d.day}
                          onChange={(e) => updateDay(secIdx, rowIdx, dayIdx, { day: e.target.value })}
                          className="h-8 text-xs text-center px-1"
                        />
                        <select
                          value={d.type}
                          onChange={(e) =>
                            updateDay(secIdx, rowIdx, dayIdx, { type: e.target.value as "diurno" | "noturno" })
                          }
                          className="h-7 rounded-md border border-input bg-background text-[10px] px-1"
                        >
                          <option value="diurno">D</option>
                          <option value="noturno">N</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateSec(secIdx, { rows: [...sec.rows, newRow()] })}
              data-testid={`button-add-row-${secIdx}`}
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Adicionar linha
            </Button>
          </div>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => onChange([...value, { sector: "Novo Setor", rows: [] }])}
        data-testid="button-add-sector"
      >
        <Plus className="w-4 h-4 mr-1.5" /> Adicionar setor
      </Button>
    </div>
  );
}
