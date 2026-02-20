"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DotsVerticalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { DashboardViewModel } from "@/src/features/dashboard/models/dashboard-view-model";

type DashboardRecentQuotesProps = {
  quotes: DashboardViewModel["recentQuotes"];
};

const statusToneClassMap: Record<DashboardViewModel["recentQuotes"][number]["statusTone"], string> = {
  neutral: "text-[#475569] bg-[#E2E8F0]",
  info: "text-[#3C3CF6] bg-[#E9EAFE]",
  success: "text-[#0F766E] bg-[#DFF7F3]",
};

export function DashboardRecentQuotes({ quotes }: DashboardRecentQuotesProps) {
  const [search, setSearch] = useState("");
  const [openMenuQuoteId, setOpenMenuQuoteId] = useState<string | null>(null);

  const filteredQuotes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return quotes;
    }

    return quotes.filter((quote) => {
      return (
        quote.id.toLowerCase().includes(normalizedSearch) ||
        quote.clientName.toLowerCase().includes(normalizedSearch) ||
        quote.vehicleLabel.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search, quotes]);

  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-[#111827]">Recent Quotes</h3>

        <label className="relative block w-full sm:max-w-[24rem]">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search quotes or clients..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#3C3CF6] focus:outline-none"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[#64748B]">
              <th className="border-b border-[#E2E8F0] px-3 py-3 font-semibold">Client & Vehicle</th>
              <th className="border-b border-[#E2E8F0] px-3 py-3 font-semibold">Date</th>
              <th className="border-b border-[#E2E8F0] px-3 py-3 font-semibold">Value</th>
              <th className="border-b border-[#E2E8F0] px-3 py-3 font-semibold">Status</th>
              <th className="border-b border-[#E2E8F0] px-3 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map((quote) => {
                const isMenuOpen = openMenuQuoteId === quote.id;

                return (
                  <tr key={quote.id}>
                    <td className="border-b border-[#E2E8F0] px-3 py-3 align-top">
                      <p className="font-semibold text-[#0F172A]">{quote.clientName}</p>
                      <p className="mt-1 text-xs text-[#64748B]">{quote.vehicleLabel}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">Quote #{quote.id}</p>
                    </td>
                    <td className="border-b border-[#E2E8F0] px-3 py-3 text-[#334155]">{quote.dateLabel}</td>
                    <td className="border-b border-[#E2E8F0] px-3 py-3 font-semibold text-[#0F172A]">
                      {quote.valueLabel}
                    </td>
                    <td className="border-b border-[#E2E8F0] px-3 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-bold uppercase ${statusToneClassMap[quote.statusTone]}`}
                      >
                        {quote.statusLabel}
                      </span>
                    </td>
                    <td className="border-b border-[#E2E8F0] px-3 py-3">
                      <div className="relative flex justify-end">
                        <button
                          type="button"
                          aria-label={`Actions for quote ${quote.id}`}
                          onClick={() => setOpenMenuQuoteId(isMenuOpen ? null : quote.id)}
                          className="rounded-lg border border-[#E2E8F0] p-2 text-[#64748B] transition-colors hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                        >
                          <DotsVerticalIcon className="h-4 w-4" />
                        </button>

                        {isMenuOpen ? (
                          <div className="absolute right-0 top-11 z-10 w-44 rounded-xl border border-[#E2E8F0] bg-white p-1 shadow-md">
                            <Link
                              href={`/quotes?edit=${quote.id}`}
                              className="block rounded-lg px-3 py-2 text-sm text-[#0F172A] hover:bg-[#F1F5F9]"
                              onClick={() => setOpenMenuQuoteId(null)}
                            >
                              Edit quote
                            </Link>
                            <Link
                              href={`/quotes?status=${quote.id}`}
                              className="block rounded-lg px-3 py-2 text-sm text-[#0F172A] hover:bg-[#F1F5F9]"
                              onClick={() => setOpenMenuQuoteId(null)}
                            >
                              Check status
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-3 py-6 text-sm text-[#64748B]" colSpan={5}>
                  No quotes found for: {search}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
