import { QuoteItemType, QuoteStatus, VehicleType } from "@/src/types/enums";

export interface CreateCustomerInput {
  name: string;
  email?: string;
  phone?: string;
}

export interface VehicleInput {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  type: VehicleType;
}

export interface CreateQuoteInput {
  customerId: string;
}

export interface QuoteItemInput {
  description?: string | null;
  quantity: number;
  unitPrice: number;
  type: QuoteItemType;
}

export interface CustomerDTO {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface VehicleDTO {
  id: string;
  customerId: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  type: VehicleType;
}

export interface QuoteItemDTO {
  id: string;
  quoteId: string;
  description?: string | null;
  quantity: number;
  unitPrice: number;
  type: QuoteItemType;
}

export interface QuoteDTO {
  id: string;
  customerId: string;
  status: QuoteStatus;
  version: number;
  items: QuoteItemDTO[];
  subtotal: number;
  total: number;
  value: number;
}
