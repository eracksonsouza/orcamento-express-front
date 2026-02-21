"use client";

import { FileTextIcon, PlusIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";

import { formatCurrency } from "./quote-formatters";
import { QuoteItemModal } from "./quote-item-modal";
import { getQuoteItemTypeLabel, type QuoteItem, type QuoteItemType } from "./quote-types";

type QuoteItemsCardProps = {
  items: QuoteItem[];
  onAddItem: (item: QuoteItem) => void;
};

type ModalMode = "service" | "part" | "line";

export function QuoteItemsCard({ items, onAddItem }: QuoteItemsCardProps) {
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);

  const tableRows = useMemo(
    () =>
      items.map((item) => {
        const rowSubtotal = item.quantity * item.unitPriceInCents;
        const badgeClassName =
          item.type === "service" ? "bg-[#DBEAFE] text-[#2563EB]" : "bg-[#D1FAE5] text-[#059669]";

        return {
          ...item,
          rowSubtotal,
          badgeClassName,
        };
      }),
    [items],
  );

  const handleAddItem = (data: {
    type: QuoteItemType;
    description: string;
    quantity: number;
    unitPriceInCents: number;
  }) => {
    onAddItem({
      id: `${data.type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: data.type,
      typeLabel: getQuoteItemTypeLabel(data.type),
      description: data.description,
      quantity: data.quantity,
      unitPriceInCents: data.unitPriceInCents,
    });
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-[#DCE3EF] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDF1F7] px-5 py-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#3347F6]">
            <FileTextIcon className="h-5 w-5" />
            Itens do Orçamento
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModalMode("service")}
              className="inline-flex items-center gap-1 rounded-xl bg-[#EEF0FF] px-3 py-2 text-sm font-semibold text-[#3C3CF6] hover:bg-[#E4E7FF]"
            >
              <PlusIcon className="h-4 w-4" />
              Add Serviço
            </button>
            <button
              type="button"
              onClick={() => setModalMode("part")}
              className="inline-flex items-center gap-1 rounded-xl bg-[#EEF0FF] px-3 py-2 text-sm font-semibold text-[#3C3CF6] hover:bg-[#E4E7FF]"
            >
              <PlusIcon className="h-4 w-4" />
              Add Peça
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr className="bg-[#F6F8FC] text-sm font-semibold text-[#5A6286]">
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Qtd</th>
                <th className="px-4 py-3">P. Unitário</th>
                <th className="px-4 py-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((item) => (
                <tr key={item.id}>
                  <td className="border-t border-[#EDF1F7] px-4 py-4 align-top">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold ${item.badgeClassName}`}
                    >
                      {item.type === "service" ? "✕" : "≡"}
                    </span>
                  </td>
                  <td className="border-t border-[#EDF1F7] px-4 py-4">
                    <p className="text-[1.7rem] leading-tight text-[#111827]">{item.description}</p>
                    <p
                      className={`mt-1 text-xs font-bold tracking-wide ${
                        item.type === "service" ? "text-[#3B82F6]" : "text-[#059669]"
                      }`}
                    >
                      {item.typeLabel}
                    </p>
                  </td>
                  <td className="border-t border-[#EDF1F7] px-4 py-4 text-[1.6rem] text-[#111827]">{item.quantity}</td>
                  <td className="border-t border-[#EDF1F7] px-4 py-4 text-[1.6rem] text-[#111827]">
                    {formatCurrency(item.unitPriceInCents)}
                  </td>
                  <td className="border-t border-[#EDF1F7] px-4 py-4 text-[1.6rem] font-semibold text-[#3C3CF6]">
                    {formatCurrency(item.rowSubtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-5 text-center">
          <button
            type="button"
            onClick={() => setModalMode("line")}
            className="text-sm font-semibold text-[#3C3CF6] hover:underline"
          >
            ⊕ Adicionar nova linha de item
          </button>
        </div>
      </article>

      <QuoteItemModal
        isOpen={modalMode !== null}
        mode={modalMode ?? "line"}
        onClose={() => setModalMode(null)}
        onSubmit={handleAddItem}
      />
    </>
  );
}
