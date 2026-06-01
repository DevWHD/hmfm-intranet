export interface Meal {
  name: string;
  items: string[];
}

export interface DayMenu {
  day: string;
  date: string;
  meals: Meal[];
}

export const todayMenu: DayMenu = {
  day: "Quarta-feira",
  date: "29/04/2026",
  meals: [
    {
      name: "Café da manhã",
      items: ["Pão francês com manteiga", "Café com leite", "Mamão papaia", "Iogurte natural"],
    },
    {
      name: "Almoço",
      items: ["Arroz branco", "Feijão preto", "Frango grelhado ao alecrim", "Salada de alface, tomate e cenoura", "Suco de laranja natural"],
    },
    {
      name: "Lanche da tarde",
      items: ["Bolo de fubá", "Chá de camomila", "Maçã"],
    },
    {
      name: "Jantar",
      items: ["Sopa de legumes com macarrão", "Pão integral", "Banana"],
    },
  ],
};

export const weeklyMenu: DayMenu[] = [
  {
    day: "Segunda-feira",
    date: "27/04/2026",
    meals: [
      { name: "Café", items: ["Pão de queijo", "Café com leite", "Melão", "Queijo branco"] },
      { name: "Almoço", items: ["Arroz", "Feijão carioca", "Carne assada", "Purê de batata", "Salada verde", "Suco de uva"] },
      { name: "Lanche", items: ["Biscoito doce", "Suco de maracujá"] },
      { name: "Jantar", items: ["Risoto de legumes", "Salada de pepino", "Pera"] },
    ],
  },
  {
    day: "Terça-feira",
    date: "28/04/2026",
    meals: [
      { name: "Café", items: ["Tapioca com queijo", "Café preto", "Manga", "Granola com iogurte"] },
      { name: "Almoço", items: ["Arroz integral", "Lentilha", "Peixe assado", "Legumes refogados", "Salada de beterraba", "Limonada"] },
      { name: "Lanche", items: ["Bolo de cenoura", "Chá verde"] },
      { name: "Jantar", items: ["Macarrão ao molho de tomate", "Salada mista", "Maçã"] },
    ],
  },
  {
    day: "Quarta-feira",
    date: "29/04/2026",
    meals: todayMenu.meals,
  },
  {
    day: "Quinta-feira",
    date: "30/04/2026",
    meals: [
      { name: "Café", items: ["Pão integral com requeijão", "Leite com chocolate", "Mamão", "Ovo mexido"] },
      { name: "Almoço", items: ["Arroz branco", "Feijão preto", "Estrogonofe de carne", "Batata palha", "Salada de rúcula", "Suco de abacaxi"] },
      { name: "Lanche", items: ["Pão doce", "Vitamina de banana"] },
      { name: "Jantar", items: ["Caldo verde", "Pão francês", "Pêssego em calda"] },
    ],
  },
  {
    day: "Sexta-feira",
    date: "01/05/2026",
    meals: [
      { name: "Café", items: ["Pão francês", "Café com leite", "Salada de frutas", "Mortadela"] },
      { name: "Almoço", items: ["Arroz", "Feijão", "Bife acebolado", "Farofa", "Vinagrete", "Suco de acerola"] },
      { name: "Lanche", items: ["Bolacha recheada", "Suco de manga"] },
      { name: "Jantar", items: ["Sopa de feijão", "Pão integral", "Banana"] },
    ],
  },
  {
    day: "Sábado",
    date: "02/05/2026",
    meals: [
      { name: "Café", items: ["Pão de queijo", "Café com leite", "Melancia", "Queijo prato"] },
      { name: "Almoço", items: ["Arroz", "Feijão", "Frango xadrez", "Legumes salteados", "Salada de alface", "Suco de caju"] },
      { name: "Lanche", items: ["Bolo de chocolate", "Chá de hortelã"] },
      { name: "Jantar", items: ["Polenta com molho", "Salada caprese", "Maçã"] },
    ],
  },
  {
    day: "Domingo",
    date: "03/05/2026",
    meals: [
      { name: "Café", items: ["Pão francês", "Café com leite", "Mamão", "Geleia"] },
      { name: "Almoço", items: ["Arroz", "Feijão tropeiro", "Costela assada", "Mandioca cozida", "Salada de tomate", "Suco de goiaba"] },
      { name: "Lanche", items: ["Pudim de leite", "Café"] },
      { name: "Jantar", items: ["Sanduíche natural", "Sopa de abóbora", "Banana"] },
    ],
  },
];
