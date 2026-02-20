import { QuoteStatus } from "@/src/types";

export interface QuoteViewModel {
  id: string;
  customerId: string;
  status: QuoteStatus;
  statusLabel: string;
  version: number;
  subtotal: number;
  total: number;
  value: number;
  itemsCount: number;
  source: "api" | "mock";
}
