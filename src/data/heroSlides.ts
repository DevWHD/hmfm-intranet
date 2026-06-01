export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  cta: string;
  bg: "blue" | "teal" | "darkblue" | "green";
  icon: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "pcp",
    eyebrow: "Plano de Capacidade Plena",
    title: "Você sabe o que é",
    highlight: "PCP?",
    body: "Conheça o plano que organiza o fluxo da emergência em momentos de superlotação. Capacitação obrigatória para todas as equipes assistenciais.",
    cta: "Assistir o vídeo",
    bg: "blue",
    icon: "PlayCircle",
  },
  {
    id: "cets",
    eyebrow: "Capacitações no CETS",
    title: "No HMFM, todo dia é dia de",
    highlight: "se aperfeiçoar.",
    body: "Capacitações diárias com certificação. BLS, Vias Aéreas, Stop the Bleed, Manejo de Lesão por Pressão e Acesso Venoso Central. Inscrições no 7º andar.",
    cta: "Ver cronograma",
    bg: "darkblue",
    icon: "GraduationCap",
  },
  {
    id: "viva",
    eyebrow: "Viva Conecta",
    title: "A rede social interna",
    highlight: "dos colaboradores.",
    body: "Conecte-se com seus colegas, compartilhe boas práticas e participe das comunidades de cada setor do hospital.",
    cta: "Acessar Viva Conecta",
    bg: "teal",
    icon: "Users",
  },
  {
    id: "eprontuario",
    eyebrow: "E-Prontuário",
    title: "Prontuário eletrônico",
    highlight: "TI MED.",
    body: "Acesse o histórico clínico integrado do paciente, prescreva e evolua de forma rápida e segura, em qualquer ponto do hospital.",
    cta: "Abrir TI MED",
    bg: "green",
    icon: "FileHeart",
  },
];
