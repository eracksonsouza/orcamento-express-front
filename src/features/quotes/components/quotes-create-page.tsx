"use client";

import { BackpackIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";

import { QuoteFinancialSummaryCard } from "./quote-financial-summary-card";
import { QuoteItemsCard } from "./quote-items-card";
import { QuoteStatusCollapsible } from "./quote-status-collapsible";
import { INITIAL_QUOTE_ITEMS, type QuoteItem } from "./quote-types";

export function QuotesCreatePage() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(INITIAL_QUOTE_ITEMS);

  const servicesTotalInCents = useMemo(
    () =>
      quoteItems
        .filter((item) => item.type === "service")
        .reduce((sum, item) => sum + item.quantity * item.unitPriceInCents, 0),
    [quoteItems],
  );

  const partsTotalInCents = useMemo(
    () =>
      quoteItems
        .filter((item) => item.type === "part")
        .reduce((sum, item) => sum + item.quantity * item.unitPriceInCents, 0),
    [quoteItems],
  );

  const subtotalInCents = servicesTotalInCents + partsTotalInCents;
  const discountPercentage = 5;
  const discountInCents = Math.round((subtotalInCents * discountPercentage) / 100);
  const taxesInCents = 0;
  const totalInCents = subtotalInCents - discountInCents + taxesInCents;
  const updatedAtLabel = "21/02/2026 às 18:40";

  return (
    <section className="space-y-5">
      <header className="rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-[#64748B]">
            <span>Orçamentos</span>
            <span className="mx-2 text-[#94A3B8]">›</span>
            <span className="font-semibold text-[#111827]">Novo Orçamento</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-xl border border-[#D7DEEA] bg-white px-5 py-2 text-sm font-semibold text-[#5B6B8A] transition-colors hover:bg-[#F8FAFC]"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="rounded-xl bg-[#3C3CF6] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(60,60,246,0.25)] transition-opacity hover:opacity-90"
            >
              Salvar Orçamento
            </button>
          </div>
        </div>
      </header>

      <div className="px-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-[#111827]">
              Criar Orçamento
            </h1>
            <p className="mt-2 text-lg text-[#6D7394]">
              Preencha os detalhes técnicos para gerar a proposta comercial.
            </p>
          </div>
          <QuoteStatusCollapsible
            quoteCode="ORC-2026-0147"
            statusLabel="Rascunho"
            customerName="Cliente não selecionado"
            itemsCount={quoteItems.length}
            totalInCents={totalInCents}
            updatedAtLabel={updatedAtLabel}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <article className="rounded-2xl border border-[#DCE3EF] bg-white shadow-sm">
            <div className="border-b border-[#EDF1F7] px-5 py-4">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#3347F6]">
                <BackpackIcon className="h-5 w-5" />
                Dados do Cliente e Veículo
              </h2>
            </div>

            <div className="space-y-4 px-5 py-4">
              <label className="block space-y-2">
                <span className="text-xs font-bold tracking-wide text-[#6A7193]">CLIENTE</span>
                <span className="relative block">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7F87A5]" />
                  <input
                    defaultValue=""
                    placeholder="Buscar por Nome ou CPF..."
                    className="h-11 w-full rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] pl-10 pr-3 text-base text-[#343B57] placeholder:text-[#9AA3BA] focus:border-[#3C3CF6] focus:outline-none"
                  />
                </span>
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-bold tracking-wide text-[#6A7193]">MARCA / MODELO</span>
                  <div className="grid grid-cols-2 gap-2">
                    <select className="h-11 rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-base text-[#343B57] focus:border-[#3C3CF6] focus:outline-none">
                      <option>Honda</option>
                    </select>
                    <select className="h-11 rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-base text-[#343B57] focus:border-[#3C3CF6] focus:outline-none">
                      <option>Corolla</option>
                    </select>
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold tracking-wide text-[#6A7193]">PLACA DO VEÍCULO</span>
                  <input
                    defaultValue="ABC-1234"
                    className="h-11 w-full rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-base text-[#7A839C] focus:border-[#3C3CF6] focus:outline-none"
                  />
                </label>
              </div>
            </div>
          </article>

          <QuoteItemsCard
            items={quoteItems}
            onAddItem={(item) => setQuoteItems((currentItems) => [...currentItems, item])}
          />
        </div>

        <aside className="space-y-4">
          <QuoteFinancialSummaryCard
            servicesTotalInCents={servicesTotalInCents}
            partsTotalInCents={partsTotalInCents}
            subtotalInCents={subtotalInCents}
            discountPercentage={discountPercentage}
            discountInCents={discountInCents}
            taxesInCents={taxesInCents}
            totalInCents={totalInCents}
          />

          <article className="rounded-2xl border border-[#DCE3EF] bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold tracking-[0.08em] text-[#6C7396]">▣ OBSERVAÇÕES INTERNAS</h3>
            <textarea
              placeholder="Adicione notas sobre o sinistro ou prazos..."
              className="mt-3 h-24 w-full resize-none rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] p-3 text-base text-[#37405D] placeholder:text-[#9CA6BE] focus:border-[#3C3CF6] focus:outline-none"
            />
          </article>
        </aside>
      </div>
    </section>
  );
}
