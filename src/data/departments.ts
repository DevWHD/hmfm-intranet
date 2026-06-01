export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
}

export const departments: Department[] = [
  {
    id: "rh",
    name: "Recursos Humanos",
    icon: "Users",
    description: "Folha, benefícios, férias e fluxos administrativos.",
    href: "/setores",
  },
  {
    id: "nutri",
    name: "Nutrição",
    icon: "UtensilsCrossed",
    description: "Cardápio semanal, dietas terapêuticas e acompanhamento nutricional.",
    href: "/cardapio",
  },
  {
    id: "ed",
    name: "Educação Continuada",
    icon: "GraduationCap",
    description: "Treinamentos, cursos e capacitações no CETS.",
    href: "/avisos",
  },
  {
    id: "enf",
    name: "Formulários de Enfermagem",
    icon: "ClipboardList",
    description: "Escalas métricas (Braden, Glasgow, NAS) e impressos institucionais.",
    href: "/documentos",
  },
  {
    id: "cets",
    name: "HMFM — CETS / EAD",

    icon: "Library",
    description: "Plataforma de ensino a distância do Centro de Treinamento e Simulação.",
    href: "/avisos",
  },
  {
    id: "neovero",
    name: "NEOVERO",
    icon: "Wrench",
    description: "Engenharia clínica, manutenção de equipamentos e chamados.",
    href: "/setores",
  },
  {
    id: "protocolos",
    name: "Protocolos Institucionais",
    icon: "FileText",
    description: "Repositório de protocolos, POPs, manuais e resoluções.",
    href: "/documentos",
  },
  {
    id: "setores",
    name: "Setores",
    icon: "Building2",
    description: "Diretório completo de setores, ramais e responsáveis.",
    href: "/setores",
  },
];

export interface SystemCard {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: "blue" | "teal" | "green" | "darkblue";
}

export const systems: SystemCard[] = [
  {
    id: "viva-conecta",
    name: "VIVA CONECTA",
    icon: "Users",
    description: "Rede social interna dos colaboradores do HMFM.",
    color: "blue",
  },
  {
    id: "ti-med",
    name: "TI MED",
    icon: "FileHeart",
    description: "Prontuário eletrônico unificado do paciente.",
    color: "darkblue",
  },
  {
    id: "rpacs",
    name: "RPACS",
    icon: "ScanLine",
    description: "Sistema de imagens diagnósticas (PACS).",
    color: "teal",
  },
  {
    id: "data-care",
    name: "DATA CARE",
    icon: "BarChart3",
    description: "Indicadores assistenciais e relatórios de gestão.",
    color: "green",
  },
];
