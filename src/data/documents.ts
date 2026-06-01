export type DocCategory =
  | "Protocolos Clínicos"
  | "Manuais"
  | "Formulários"
  | "POPs"
  | "Resoluções";

export interface DocItem {
  id: string;
  title: string;
  category: DocCategory;
  type: "PDF" | "DOC" | "XLS";
  size: string;
  updatedAt: string;
  sector: string;
  description: string;
}

export const documents: DocItem[] = [
  {
    id: "d1",
    title: "POP — Higienização das Mãos (Rev. 2026)",
    category: "POPs",
    type: "PDF",
    size: "1,2 MB",
    updatedAt: "20/04/2026",
    sector: "CCIH",
    description: "Procedimento operacional padrão para higienização simples e antisséptica das mãos.",
  },
  {
    id: "d2",
    title: "Protocolo de Sepse — Adulto",
    category: "Protocolos Clínicos",
    type: "PDF",
    size: "3,4 MB",
    updatedAt: "12/03/2026",
    sector: "Emergência",
    description: "Protocolo institucional de identificação precoce e manejo da sepse em pacientes adultos.",
  },
  {
    id: "d3",
    title: "Manual de Biossegurança",
    category: "Manuais",
    type: "PDF",
    size: "5,8 MB",
    updatedAt: "02/02/2026",
    sector: "SESMT",
    description: "Diretrizes de biossegurança hospitalar para todos os colaboradores assistenciais.",
  },
  {
    id: "d4",
    title: "Ficha de Notificação SINAN",
    category: "Formulários",
    type: "DOC",
    size: "180 KB",
    updatedAt: "15/01/2026",
    sector: "Vigilância Epidemiológica",
    description: "Ficha individual de notificação compulsória ao SINAN.",
  },
  {
    id: "d5",
    title: "Protocolo de Pré-eclâmpsia (FEBRASGO 2025)",
    category: "Protocolos Clínicos",
    type: "PDF",
    size: "2,1 MB",
    updatedAt: "28/04/2026",
    sector: "Maternidade",
    description: "Protocolo institucional para diagnóstico e manejo da pré-eclâmpsia, atualizado conforme FEBRASGO.",
  },
  {
    id: "d6",
    title: "POP — Punção Venosa Periférica",
    category: "POPs",
    type: "PDF",
    size: "950 KB",
    updatedAt: "10/03/2026",
    sector: "Enfermagem",
    description: "Procedimento operacional padrão para punção venosa periférica em adultos e pediatria.",
  },
  {
    id: "d7",
    title: "Resolução Diretoria 014/2026 — Uniformes",
    category: "Resoluções",
    type: "PDF",
    size: "320 KB",
    updatedAt: "05/04/2026",
    sector: "Diretoria",
    description: "Estabelece padronização de uniformes para áreas assistenciais e administrativas.",
  },
  {
    id: "d8",
    title: "Manual do Servidor HMFM",

    category: "Manuais",
    type: "PDF",
    size: "4,2 MB",
    updatedAt: "01/02/2026",
    sector: "Recursos Humanos",
    description: "Direitos, deveres, benefícios e fluxos administrativos para servidores do HMFM.",
  },
  {
    id: "d9",
    title: "Escala de Braden — Avaliação de Risco de LPP",
    category: "Formulários",
    type: "PDF",
    size: "210 KB",
    updatedAt: "18/02/2026",
    sector: "Enfermagem",
    description: "Formulário para avaliação de risco de lesão por pressão (Escala de Braden).",
  },
  {
    id: "d10",
    title: "Relatório de Satisfação — Abril/2026",
    category: "Manuais",
    type: "XLS",
    size: "780 KB",
    updatedAt: "27/04/2026",
    sector: "Recursos Humanos",
    description: "Resultados consolidados da pesquisa de satisfação dos colaboradores referente a abril.",
  },
];
