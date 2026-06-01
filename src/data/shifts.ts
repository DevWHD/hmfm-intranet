export type ShiftType = "diurno" | "noturno";

export interface Shift {
  id: string;
  name: string;
  initials: string;
  role: string;
  hours: string;
  type: ShiftType;
  sector: string;
  day: number;
}

export const todayShifts: Shift[] = [
  {
    id: "s1",
    name: "Dra. Maria Oliveira",
    initials: "MO",
    role: "Médica Obstetra",
    hours: "07:00 – 19:00",
    type: "diurno",
    sector: "Maternidade",
    day: 0,
  },
  {
    id: "s2",
    name: "Enf. Patrícia Lima",
    initials: "PL",
    role: "Enfermeira",
    hours: "07:00 – 19:00",
    type: "diurno",
    sector: "Emergência",
    day: 0,
  },
  {
    id: "s3",
    name: "Dr. Fernando Costa",
    initials: "FC",
    role: "Médico Intensivista",
    hours: "19:00 – 07:00",
    type: "noturno",
    sector: "UTI Adulto",
    day: 0,
  },
  {
    id: "s4",
    name: "Enf. Sofia Rocha",
    initials: "SR",
    role: "Enfermeira",
    hours: "19:00 – 07:00",
    type: "noturno",
    sector: "UTI Neonatal",
    day: 0,
  },
];

export interface SectorShiftWeek {
  sector: string;
  rows: {
    name: string;
    role: string;
    days: { day: string; hours: string; type: ShiftType }[];
  }[];
}

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const D = (h: string): { hours: string; type: ShiftType } => ({ hours: h, type: "diurno" });
const N = (h: string): { hours: string; type: ShiftType } => ({ hours: h, type: "noturno" });

const weekDiurno = days.map((day) => ({ day, ...D("07:00 – 19:00") }));
const weekNoturno = days.map((day) => ({ day, ...N("19:00 – 07:00") }));

export const weekSchedule: SectorShiftWeek[] = [
  {
    sector: "Emergência",
    rows: [
      { name: "Dr. Rafael Souza", role: "Médico Plantonista", days: weekDiurno },
      { name: "Enf. Patrícia Lima", role: "Enfermeira Coord.", days: weekDiurno },
      { name: "Dr. Bruno Carvalho", role: "Médico Plantonista", days: weekNoturno },
      { name: "Enf. Tiago Ramos", role: "Enfermeiro", days: weekNoturno },
    ],
  },
  {
    sector: "UTI Adulto",
    rows: [
      { name: "Dra. Helena Martins", role: "Médica Intensivista", days: weekDiurno },
      { name: "Enf. Camila Duarte", role: "Enfermeira", days: weekDiurno },
      { name: "Dr. Fernando Costa", role: "Médico Intensivista", days: weekNoturno },
      { name: "Enf. Lucas Almeida", role: "Enfermeiro", days: weekNoturno },
    ],
  },
  {
    sector: "Maternidade",
    rows: [
      { name: "Dra. Maria Oliveira", role: "Médica Obstetra", days: weekDiurno },
      { name: "Enf. Carolina Dias", role: "Obstetriz", days: weekDiurno },
      { name: "Dr. Ricardo Mendes", role: "Médico Obstetra", days: weekNoturno },
      { name: "Enf. Sofia Rocha", role: "Obstetriz", days: weekNoturno },
    ],
  },
  {
    sector: "Pediatria",
    rows: [
      { name: "Dra. Júlia Pereira", role: "Médica Pediatra", days: weekDiurno },
      { name: "Enf. Roberta Lima", role: "Enfermeira", days: weekDiurno },
      { name: "Dr. André Tavares", role: "Médico Pediatra", days: weekNoturno },
      { name: "Enf. Paula Mendes", role: "Enfermeira", days: weekNoturno },
    ],
  },
  {
    sector: "Centro Cirúrgico",
    rows: [
      { name: "Dr. Felipe Andrade", role: "Cirurgião Geral", days: weekDiurno },
      { name: "Enf. Ana Vitória", role: "Enf. Sala", days: weekDiurno },
      { name: "Dr. Marcelo Pinto", role: "Anestesiologista", days: weekDiurno },
      { name: "Enf. Diego Nunes", role: "Enf. Sala", days: weekNoturno },
    ],
  },
];
