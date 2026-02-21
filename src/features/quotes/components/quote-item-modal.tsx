"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

import { type QuoteItemType } from "./quote-types";

type QuoteItemModalProps = {
  isOpen: boolean;
  mode: "service" | "part" | "line";
  onClose: () => void;
  onSubmit: (data: {
    type: QuoteItemType;
    description: string;
    quantity: number;
    unitPriceInCents: number;
  }) => void;
};

function getModalTitle(mode: QuoteItemModalProps["mode"]) {
  if (mode === "service") return "Adicionar Serviço";
  if (mode === "part") return "Adicionar Peça";
  return "Adicionar Linha de Item";
}

export function QuoteItemModal({ isOpen, mode, onClose, onSubmit }: QuoteItemModalProps) {
  const [type, setType] = useState<QuoteItemType>("service");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");

  const resolvedType = useMemo<QuoteItemType>(() => {
    if (mode === "line") return type;
    return mode;
  }, [mode, type]);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "service") setType("service");
    if (mode === "part") setType("part");
    if (mode === "line") setType("service");

    setDescription("");
    setQuantity("1");
    setUnitPrice("");
  }, [isOpen, mode]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedQuantity = Number(quantity);
    const parsedUnitPrice = Number(unitPrice.replace(",", "."));

    if (!description.trim()) return;
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) return;
    if (!Number.isFinite(parsedUnitPrice) || parsedUnitPrice < 0) return;

    onSubmit({
      type: resolvedType,
      description: description.trim(),
      quantity: Math.round(parsedQuantity),
      unitPriceInCents: Math.round(parsedUnitPrice * 100),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-[#0B1020]/45"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[#DCE3EF] bg-white p-5 shadow-[0_25px_80px_rgba(14,22,38,0.25)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-[#111827]">{getModalTitle(mode)}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#D7DEEA] px-3 py-1 text-sm font-semibold text-[#5B6B8A] hover:bg-[#F8FAFC]"
          >
            Fechar
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "line" && (
            <label className="block space-y-2">
              <span className="text-xs font-bold tracking-wide text-[#6A7193]">TIPO</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value as QuoteItemType)}
                className="h-11 w-full rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-base text-[#343B57] focus:border-[#3C3CF6] focus:outline-none"
              >
                <option value="service">Serviço</option>
                <option value="part">Peça</option>
              </select>
            </label>
          )}

          <label className="block space-y-2">
            <span className="text-xs font-bold tracking-wide text-[#6A7193]">DESCRIÇÃO</span>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva o item"
              className="h-11 w-full rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-base text-[#343B57] placeholder:text-[#9AA3BA] focus:border-[#3C3CF6] focus:outline-none"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-xs font-bold tracking-wide text-[#6A7193]">QUANTIDADE</span>
              <input
                type="number"
                min={1}
                step={1}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="h-11 w-full rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-base text-[#343B57] focus:border-[#3C3CF6] focus:outline-none"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-bold tracking-wide text-[#6A7193]">P. UNITÁRIO (R$)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={unitPrice}
                onChange={(event) => setUnitPrice(event.target.value)}
                placeholder="0,00"
                className="h-11 w-full rounded-xl border border-[#D6DCE8] bg-[#F7F8FC] px-3 text-base text-[#343B57] placeholder:text-[#9AA3BA] focus:border-[#3C3CF6] focus:outline-none"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D7DEEA] bg-white px-4 py-2 text-sm font-semibold text-[#5B6B8A] hover:bg-[#F8FAFC]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#3C3CF6] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Adicionar Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
