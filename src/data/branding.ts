export type ButtonVariant = "primary" | "outline" | "green" | "darkblue" | "gradient";

export interface HeaderButton {
  id: string;
  label: string;
  icon: string;
  variant: ButtonVariant;
  href: string;
}

export interface NavLinkConfig {
  href: string;
  label: string;
  icon: string;
}

export interface IndicatorItem {
  id: string;
  label: string;
  value: number;
  prefix: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Branding {
  topBar: {
    phone: string;
    email: string;
    address: string;
    rightText: string;
  };
  logo: {
    primary: string;
    secondary: string;
    imageUrl: string;
  };
  headerButtons: HeaderButton[];
  navLinks: NavLinkConfig[];
  greeting: {
    userName: string;
    userInitials: string;
    userRole: string;
    sector: string;
    showGreeting: boolean;
  };
  indicators: {
    eyebrow: string;
    title: string;
    items: IndicatorItem[];
  };
  sistemas: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  departamentos: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  pesquisa: {
    badge: string;
    title: string;
    body: string;
    cta: string;
  };
  footer: {
    primary: string;
    secondary: string;
    description: string;
    copyright: string;
    tagline: string;
    institucionalLinks: FooterLink[];
  };
  urgentBanner: {
    ctaLabel: string;
  };
  homeSections: {
    showHero: boolean;
    showUrgentBanner: boolean;
    showIndicators: boolean;
    showSistemas: boolean;
    showAvisos: boolean;
    showEscala: boolean;
    showStats: boolean;
    showDepartamentos: boolean;
    showCardapio: boolean;
    showPesquisa: boolean;
  };
}

export const branding: Branding = {
  topBar: {
    phone: "(21) 3878-2327",
    email: "immsmagalhaes@pcrj.rj.gov.br",
    address: "R. Gen. José Cristino, 87 - Imperial de São Cristóvão, Rio de Janeiro - RJ, 20921-400",
    rightText: "",
  },
  logo: {
    primary: "HMFM",
    secondary: "Hospital Maternidade Fernando Magalhães",
    imageUrl: "",
  },
  headerButtons: [
    { id: "b1", label: "Notificação de Risco", icon: "AlertTriangle", variant: "primary", href: "#" },
    { id: "b2", label: "Log In", icon: "LogIn", variant: "outline", href: "#" },
    { id: "b3", label: "Whatsapp", icon: "MessageCircle", variant: "green", href: "#" },
    { id: "b4", label: "HCI", icon: "FileHeart", variant: "darkblue", href: "#" },
    { id: "b5", label: "Ramais", icon: "ArrowRight", variant: "gradient", href: "/contatos" },
  ],
  navLinks: [
    { href: "/", label: "Início", icon: "Home" },
    { href: "/avisos", label: "Mural de Avisos", icon: "Megaphone" },
    { href: "/escalas", label: "Escalas", icon: "CalendarDays" },
    { href: "/documentos", label: "Documentos", icon: "FolderOpen" },
    { href: "/setores", label: "Setores", icon: "Building2" },
    { href: "/cardapio", label: "Cardápio", icon: "UtensilsCrossed" },
    { href: "/comunicados-urgentes", label: "Urgentes", icon: "Siren" },
    { href: "/contatos", label: "Contatos", icon: "PhoneCall" },
  ],
  greeting: {
    userName: "Dra. Maria Oliveira",
    userInitials: "MO",
    userRole: "Médica",
    sector: "Maternidade",
    showGreeting: true,
  },
  indicators: {
    eyebrow: "Indicadores Assistenciais",
    title: "Compromisso com a saúde da Zona Oeste do Rio",
    items: [
      { id: "i1", label: "Partos em 2026", value: 3144, prefix: "+", icon: "Baby" },
      { id: "i2", label: "Internações em 2026", value: 17001, prefix: "+", icon: "BedDouble" },
      { id: "i3", label: "Cirurgias em 2026", value: 9674, prefix: "+", icon: "Scissors" },
    ],
  },
  sistemas: {
    eyebrow: "Sistemas",
    title: "Acessos rápidos",
    subtitle: "Atalhos para os sistemas e plataformas mais utilizados pelos colaboradores do HMFM.",
  },
  departamentos: {
    eyebrow: "Departamentos",
    title: "Áreas e serviços do HMFM",
    subtitle: "Acesso rápido aos principais departamentos administrativos e assistenciais.",

  },
  pesquisa: {
    badge: "Pesquisa de Satisfação",
    title: "Sua opinião melhora o HMFM todos os dias.",
    body: "Leva menos de 2 minutos e nos ajuda a evoluir o ambiente de trabalho, os processos e os recursos disponíveis para os colaboradores.",
    cta: "Responder pesquisa",
  },
  footer: {
    primary: "HMFM",
    secondary: "Hospital Maternidade Fernando Magalhães",
    description:
      "Hospital público da Prefeitura da Cidade do Rio de Janeiro, parte do SUS, em São Cristóvão. Referência em obstetrícia, neonatologia, pediatria e emergência na Zona Oeste.",
    copyright: "© 2026 Hospital Maternidade Fernando Magalhães · Prefeitura da Cidade do Rio de Janeiro",

    tagline: "Intranet institucional · uso restrito a colaboradores",
    institucionalLinks: [
      { label: "Prefeitura do Rio", href: "https://prefeitura.rio" },
      { label: "SUS", href: "https://www.gov.br/saude/pt-br" },
      { label: "Viva Rio", href: "https://vivario.org.br" },
    ],
  },
  urgentBanner: {
    ctaLabel: "Ver agora",
  },
  homeSections: {
    showHero: true,
    showUrgentBanner: true,
    showIndicators: true,
    showSistemas: true,
    showAvisos: true,
    showEscala: true,
    showStats: true,
    showDepartamentos: true,
    showCardapio: true,
    showPesquisa: true,
  },
};
