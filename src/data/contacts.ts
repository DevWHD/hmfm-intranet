export interface Contact {
  id: string;
  name: string;
  initials: string;
  role: string;
  sector: string;
  ramal: string;
  email: string;
}

export const contacts: Contact[] = [
  { id: "c1", name: "Dra. Maria Oliveira", initials: "MO", role: "Médica Obstetra", sector: "Maternidade", ramal: "2305", email: "maria.oliveira@hmas.com.br" },
  { id: "c2", name: "Dr. Ricardo Mendes", initials: "RM", role: "Coord. Médico", sector: "Maternidade", ramal: "2306", email: "ricardo.mendes@hmas.com.br" },
  { id: "c3", name: "Dr. Fernando Costa", initials: "FC", role: "Diretor Clínico", sector: "Diretoria", ramal: "2001", email: "fernando.costa@hmas.com.br" },
  { id: "c4", name: "Enf. Patrícia Lima", initials: "PL", role: "Enfermeira Coord.", sector: "Emergência", ramal: "2102", email: "patricia.lima@hmas.com.br" },
  { id: "c5", name: "Enf. Sofia Rocha", initials: "SR", role: "Obstetriz", sector: "Maternidade", ramal: "2307", email: "sofia.rocha@hmas.com.br" },
  { id: "c6", name: "Coord. Ana Beatriz", initials: "AB", role: "Coord. de Enfermagem", sector: "Enfermagem", ramal: "2010", email: "ana.beatriz@hmas.com.br" },
  { id: "c7", name: "Dra. Helena Martins", initials: "HM", role: "Médica Intensivista", sector: "UTI Adulto", ramal: "2202", email: "helena.martins@hmas.com.br" },
  { id: "c8", name: "Dra. Júlia Pereira", initials: "JP", role: "Médica Pediatra", sector: "UTI Neonatal", ramal: "2208", email: "julia.pereira@hmas.com.br" },
  { id: "c9", name: "Dr. Felipe Andrade", initials: "FA", role: "Cirurgião Geral", sector: "Centro Cirúrgico", ramal: "2511", email: "felipe.andrade@hmas.com.br" },
  { id: "c10", name: "Dr. Marcelo Pinto", initials: "MP", role: "Anestesiologista", sector: "Centro Cirúrgico", ramal: "2512", email: "marcelo.pinto@hmas.com.br" },
  { id: "c11", name: "Farm. Beatriz Machado", initials: "BM", role: "Farmacêutica Resp.", sector: "Farmácia", ramal: "2730", email: "beatriz.machado@hmas.com.br" },
  { id: "c12", name: "Dra. Renata Borges", initials: "RB", role: "Bioquímica Resp.", sector: "Laboratório", ramal: "2840", email: "renata.borges@hmas.com.br" },
  { id: "c13", name: "Dr. Eduardo Pires", initials: "EP", role: "Médico Radiologista", sector: "Radiologia", ramal: "2950", email: "eduardo.pires@hmas.com.br" },
  { id: "c14", name: "Nutri. Aline Cavalcante", initials: "AC", role: "Nutricionista Chefe", sector: "Nutrição", ramal: "3060", email: "aline.cavalcante@hmas.com.br" },
  { id: "c15", name: "Adm. Rogério Lopes", initials: "RL", role: "Coord. SAME", sector: "SAME", ramal: "3170", email: "rogerio.lopes@hmas.com.br" },
  { id: "c16", name: "Coord. Marcos Silva", initials: "MS", role: "RH", sector: "Recursos Humanos", ramal: "2020", email: "marcos.silva@hmas.com.br" },
  { id: "c17", name: "Enf. Carolina Dias", initials: "CD", role: "CCIH", sector: "CCIH", ramal: "2050", email: "carolina.dias@hmas.com.br" },
  { id: "c18", name: "Dra. Leandra Coelho", initials: "LC", role: "Coord. CETS", sector: "Educação Continuada", ramal: "2060", email: "leandra.coelho@hmas.com.br" },
];
