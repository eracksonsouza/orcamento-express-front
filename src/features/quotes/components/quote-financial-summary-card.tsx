import { formatCurrency } from "./quote-formatters";

type QuoteFinancialSummaryCardProps = {
  servicesTotalInCents: number;
  partsTotalInCents: number;
  subtotalInCents: number;
  discountPercentage: number;
  discountInCents: number;
  taxesInCents: number;
  totalInCents: number;
};

export function QuoteFinancialSummaryCard({
  servicesTotalInCents,
  partsTotalInCents,
  subtotalInCents,
  discountPercentage,
  discountInCents,
  taxesInCents,
  totalInCents,
}: QuoteFinancialSummaryCardProps) {
  return (
    <article className="rounded-2xl border border-[#DCE3EF] bg-white shadow-sm">
      <div className="rounded-t-2xl border-b border-[#E6EBF4] bg-[#F4F5FF] px-5 py-4">
        <h2 className="text-xs font-bold tracking-[0.14em] text-[#3347F6]">RESUMO FINANCEIRO</h2>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div className="space-y-3 text-2xl md:text-[1.7rem]">
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <span className="text-[#6A7193]">Total Serviços</span>
            <span className="whitespace-nowrap font-semibold text-[#111827]">{formatCurrency(servicesTotalInCents)}</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <span className="text-[#6A7193]">Total Peças</span>
            <span className="whitespace-nowrap font-semibold text-[#111827]">{formatCurrency(partsTotalInCents)}</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <span className="text-[#6A7193]">Subtotal</span>
            <span className="whitespace-nowrap font-semibold text-[#111827]">{formatCurrency(subtotalInCents)}</span>
          </div>
        </div>

        <div className="h-px bg-[#E6EBF4]" />

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#6A7193]">Desconto Global (%)</label>
          <div className="flex h-11 items-center justify-between rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-2xl text-[#111827] md:text-[1.6rem]">
            <span>{discountPercentage}</span>
            <span className="text-[#8D96B0]">%</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#6A7193]">Impostos / Taxas</label>
          <div className="flex h-11 items-center justify-end rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-xl text-[#8D96B0] md:text-[1.5rem]">
            {formatCurrency(taxesInCents)}
          </div>
        </div>

        <div className="h-px bg-[#E6EBF4]" />

        <div className="flex flex-col gap-2">
          <span className="text-2xl font-semibold text-[#171B26] md:text-[2rem]">Total Final</span>
          <div className="min-w-0 text-left md:text-right">
            <p className="text-[2rem] font-semibold leading-none text-[#3C3CF6] sm:text-[2.2rem] md:text-[2.4rem]">
              {formatCurrency(totalInCents)}
            </p>
            <p className="mt-1 text-xs text-[#8D96B0]">Valor com desconto de {formatCurrency(discountInCents)} aplicado</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-[#EDF1F7] p-5">
        <button
          type="button"
          className="w-full rounded-xl bg-[#0F9E6E] py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
        >
          ⊙ Aprovar Orçamento
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-[#D7DEEA] bg-white py-3 text-base font-semibold text-[#2C334F] transition-colors hover:bg-[#F8FAFC]"
        >
          ▣ Exportar PDF
        </button>
      </div>
    </article>
  );
}
