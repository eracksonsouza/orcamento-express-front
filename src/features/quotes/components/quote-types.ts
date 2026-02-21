export type QuoteItemType = "service" | "part";

export type QuoteItem = {
  id: string;
  type: QuoteItemType;
  typeLabel: string;
  description: string;
  quantity: number;
  unitPriceInCents: number;
};

export const INITIAL_QUOTE_ITEMS: QuoteItem[] = [
  {
    id: "item-1",
    type: "service",
    typeLabel: "MÃO DE OBRA",
    description: "Pintura de Para-lama Dianteiro",
    quantity: 1,
    unitPriceInCents: 45000,
  },
  {
    id: "item-2",
    type: "part",
    typeLabel: "PEÇA NOVA",
    description: "Para-lama Dianteiro Direito",
    quantity: 1,
    unitPriceInCents: 89000,
  },
  {
    id: "item-3",
    type: "service",
    typeLabel: "MÃO DE OBRA",
    description: "Funilaria Leve (Reparo de Amassado)",
    quantity: 2,
    unitPriceInCents: 15000,
  },
];

export function getQuoteItemTypeLabel(type: QuoteItemType) {
  return type === "service" ? "MÃO DE OBRA" : "PEÇA NOVA";
}
