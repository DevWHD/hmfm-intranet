export type NoticePriority = "alta" | "normal" | "informativo";

export interface Notice {
  id: string;
  title: string;
  body: string;
  author: string;
  authorInitials: string;
  authorRole: string;
  daysAgo: number;
  likes: number;
  priority: NoticePriority;
  sector: string;
}

export const notices: Notice[] = [
  {
    id: "n1",
    title: "Protocolo atualizado: Manejo do pré-eclâmpsia",
    body: "Comunicamos a atualização do Protocolo Institucional de Manejo da Pré-eclâmpsia, com base nas novas diretrizes da FEBRASGO 2025. Toda a equipe da Maternidade e Centro Obstétrico deve revisar o documento e participar do treinamento na próxima quinta-feira, 14h, no auditório do 7º andar.",
    author: "Dr. Ricardo Mendes",
    authorInitials: "RM",
    authorRole: "Coordenador Médico — Obstetrícia",
    daysAgo: 1,
    likes: 12,
    priority: "alta",
    sector: "Maternidade",
  },
  {
    id: "n2",
    title: "Reunião de equipe — Sexta-feira 14h",
    body: "Reunião mensal de alinhamento da equipe assistencial. Pauta: indicadores de abril, ajustes na escala de plantão e apresentação do novo fluxo de notificação SINAN. Presença obrigatória dos coordenadores de setor.",
    author: "Coord. Ana Beatriz",
    authorInitials: "AB",
    authorRole: "Coordenação de Enfermagem",
    daysAgo: 1,
    likes: 7,
    priority: "normal",
    sector: "Administrativo",
  },
  {
    id: "n3",
    title: "Troca de plantão aprovada — Enfermagem",
    body: "Solicitação de troca entre Enf. Patrícia Lima e Enf. Sofia Rocha referente ao plantão de 02/05 foi aprovada. Por favor, atualizar o quadro físico do setor e o sistema de escalas.",
    author: "Coord. Ana Beatriz",
    authorInitials: "AB",
    authorRole: "Coordenação de Enfermagem",
    daysAgo: 2,
    likes: 3,
    priority: "normal",
    sector: "Enfermagem",
  },
  {
    id: "n4",
    title: "Novo equipamento de cardiotocografia disponível",
    body: "Chegou ao Centro Obstétrico um novo cardiotocógrafo Philips Avalon FM30. Treinamento de operação será conduzido pela Engenharia Clínica nesta sexta, das 9h às 11h e das 14h às 16h. Inscrições no setor NEOVERO.",
    author: "Dr. Fernando Costa",
    authorInitials: "FC",
    authorRole: "Diretor Clínico",
    daysAgo: 4,
    likes: 15,
    priority: "informativo",
    sector: "Centro Obstétrico",
  },
  {
    id: "n5",
    title: "Campanha de vacinação contra Influenza — Maio/2026",
    body: "A campanha anual de vacinação contra Influenza para colaboradores começa em 02/05 e segue até 31/05. Postos volantes no refeitório (7h-10h e 12h-14h) e no SESMT (8h-17h). Levar crachá funcional.",
    author: "Enf. Patrícia Lima",
    authorInitials: "PL",
    authorRole: "SESMT",
    daysAgo: 5,
    likes: 22,
    priority: "informativo",
    sector: "SESMT",
  },
  {
    id: "n6",
    title: "Atualização do Sistema TI MED — Janela de manutenção",
    body: "O sistema TI MED (E-Prontuário) passará por manutenção programada no domingo, 04/05, das 02h às 05h. Durante esse período, utilizar o protocolo de contingência em papel disponível em todos os postos de enfermagem.",
    author: "Equipe de TI",
    authorInitials: "TI",
    authorRole: "Tecnologia da Informação",
    daysAgo: 6,
    likes: 9,
    priority: "alta",
    sector: "TI",
  },
  {
    id: "n7",
    title: "Resultado da Pesquisa de Satisfação — Abril/2026",
    body: "O índice geral de satisfação dos colaboradores subiu para 87,4% em abril (+3,2 p.p. em relação a março). Destaques positivos: clima entre equipes e suporte da chefia. Pontos de melhoria: comunicação interna e equipamentos. Veja o relatório completo em Documentos.",
    author: "Coord. Marcos Silva",
    authorInitials: "MS",
    authorRole: "Recursos Humanos",
    daysAgo: 8,
    likes: 31,
    priority: "informativo",
    sector: "Recursos Humanos",
  },
  {
    id: "n8",
    title: "Novo POP — Higienização de Mãos (Revisão 2026)",
    body: "Está disponível na seção Documentos a revisão 2026 do POP de Higienização de Mãos, alinhado às recomendações da OMS e ANVISA. Treinamento obrigatório para todos os colaboradores assistenciais até 31/05.",
    author: "Enf. Carolina Dias",
    authorInitials: "CD",
    authorRole: "CCIH",
    daysAgo: 10,
    likes: 18,
    priority: "alta",
    sector: "CCIH",
  },
  {
    id: "n9",
    title: "Inscrições abertas — Curso de Suporte Avançado em Trauma",
    body: "O CETS abre 30 vagas para o curso ATLS (Advanced Trauma Life Support). Carga horária: 20h. Pré-requisitos: profissionais médicos e residentes do HMFM. Inscrições até 15/05 pelo Educação Continuada.",
    author: "Dra. Leandra Coelho",
    authorInitials: "LC",
    authorRole: "Coordenação CETS",
    daysAgo: 12,
    likes: 14,
    priority: "informativo",
    sector: "Educação Continuada",
  },
];
