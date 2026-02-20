import { CustomerDTO, QuoteDTO, QuoteStatus, VehicleDTO } from "@/src/types";

export const customersFixture: CustomerDTO[] = [
  {
    id: "cust_001",
    name: "Lucas Rocha",
    email: "lucas@example.com",
    phone: "11999990001",
  },
  {
    id: "cust_002",
    name: "Amanda Reis",
    email: "amanda@example.com",
    phone: "11999990002",
  },
];

export const vehiclesFixture: VehicleDTO[] = [
  {
    id: "veh_001",
    customerId: "cust_001",
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    licensePlate: "ABC1D23",
    type: "CAR",
  },
];

export const quotesFixture: QuoteDTO[] = [
  {
    id: "quo_001",
    customerId: "cust_001",
    status: "DRAFT",
    version: 1,
    items: [],
    subtotal: 0,
    total: 0,
    value: 0,
  },
];

export const quoteStatusFlow: QuoteStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "GENERATING",
  "READY",
  "FAILED",
];
