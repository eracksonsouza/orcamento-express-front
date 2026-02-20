import { QuoteDTO, QuoteStatus } from "@/src/types";

import { QuoteViewModel } from "@/src/features/quotes/models/quote-view-model";

export type AdapterSource = "api" | "mock";

const quoteStatusLabelMap: Record<QuoteStatus, string> = {
  DRAFT: "Rascunho",
  SUBMITTED: "Enviado",
  GENERATING: "Gerando",
  READY: "Pronto",
  FAILED: "Falhou",
};

export function mapQuoteDTOToView(quote: QuoteDTO, source: AdapterSource): QuoteViewModel {
  return {
    id: quote.id,
    customerId: quote.customerId,
    status: quote.status,
    statusLabel: quoteStatusLabelMap[quote.status],
    version: quote.version,
    subtotal: quote.subtotal,
    total: quote.total,
    value: quote.value,
    itemsCount: quote.items.length,
    source,
  };
}

export function mapQuoteDTOListToView(quotes: QuoteDTO[], source: AdapterSource): QuoteViewModel[] {
  return quotes.map((quote) => mapQuoteDTOToView(quote, source));
}
