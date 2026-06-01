export type Severity = "alta" | "media" | "baixa";

export interface UrgentComm {
  id: string;
  title: string;
  body: string;
  severity: Severity;
  publishedAt: string;
  author: string;
  sector: string;
}

export const urgentComms: UrgentComm[] = [
  {
    id: "u1",
    title: "ALERTA: Falta de insumos — Kit de sutura em falta",
    body: "Alertamos que o estoque de Kits de Sutura no almoxarifado central está abaixo do nível mínimo. Estamos em contato com o fornecedor. Solicitamos uso racional até a próxima reposição prevista para 02/05.",
    severity: "alta",
    publishedAt: "29/04/2026 06:42",
    author: "Almoxarifado Central",
    sector: "Suprimentos",
  },
  {
    id: "u2",
    title: "Manutenção programada — Sistema TI MED no domingo (02h–05h)",
    body: "O sistema TI MED (E-Prontuário) ficará indisponível no domingo, 04/05, das 02h às 05h, para atualização de versão. Utilizar protocolo de contingência em papel disponível em todos os postos de enfermagem.",
    severity: "alta",
    publishedAt: "28/04/2026 18:10",
    author: "Equipe de TI",
    sector: "TI",
  },
  {
    id: "u3",
    title: "Aviso: Treinamento PCP obrigatório até 15/05",
    body: "Todos os colaboradores assistenciais devem concluir o treinamento do Plano de Capacidade Plena (PCP) até 15/05. Disponível na plataforma EAD do CETS.",
    severity: "media",
    publishedAt: "27/04/2026 09:30",
    author: "Coord. CETS",
    sector: "Educação Continuada",
  },
];
