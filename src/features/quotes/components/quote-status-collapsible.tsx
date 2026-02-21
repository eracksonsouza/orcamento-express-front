"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { formatCurrency } from "./quote-formatters";

type QuoteStatusCollapsibleProps = {
  quoteCode: string;
  statusLabel: string;
  customerName: string;
  itemsCount: number;
  totalInCents: number;
  updatedAtLabel: string;
};

export function QuoteStatusCollapsible({
  quoteCode,
  statusLabel,
  customerName,
  itemsCount,
  totalInCents,
  updatedAtLabel,
}: QuoteStatusCollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full max-w-[360px] rounded-2xl border border-[#E7D390] bg-gradient-to-b from-[#FFF7D4] to-[#FFF0BC] p-2 shadow-[0_8px_26px_rgba(152,110,0,0.18)]"
    >
      <div className="flex items-center justify-between gap-3 rounded-xl border border-[#ECD693] bg-[#FFEAA0] px-3 py-2">
        <span className="inline-flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#986E00]" />
          <span className="truncate text-sm font-semibold text-[#8E6700]">{statusLabel}</span>
        </span>

        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg border border-[#E5CF8C] bg-[#FFE7A2] text-[#8E6700] hover:bg-[#FBDC88] hover:text-[#7E5A00]"
          >
            <ChevronsUpDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            <span className="sr-only">Alternar detalhes do orçamento</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-2 overflow-hidden data-[state=closed]:[animation:accordion-up_200ms_ease-out] data-[state=open]:[animation:accordion-down_200ms_ease-out]">
        <div className="rounded-xl border border-[#ECD693] bg-white/70 p-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-[#6D7394]">Orçamento</span>
              <span className="font-bold text-[#8E6700]">{quoteCode}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-[#6D7394]">Cliente</span>
              <span className="truncate font-semibold text-[#2C334F]">{customerName}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-[#6D7394]">Itens</span>
              <span className="font-semibold text-[#2C334F]">{itemsCount}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-[#6D7394]">Valor Atual</span>
              <span className="font-bold text-[#2C334F]">{formatCurrency(totalInCents)}</span>
            </div>
            <div className="h-px bg-[#E4DAB2]" />
            <p className="text-xs text-[#7A839C]">Atualizado em {updatedAtLabel}</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
