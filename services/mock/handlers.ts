import {
  CreateCustomerInput,
  CreateQuoteInput,
  CustomerDTO,
  QuoteDTO,
  VehicleDTO,
  VehicleInput,
} from "@/src/types";
import { customersFixture, quotesFixture, vehiclesFixture } from "@/services/mock/fixtures";

const db = {
  customers: [...customersFixture],
  vehicles: [...vehiclesFixture],
  quotes: [...quotesFixture],
};

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export const mockHandlers = {
  async listCustomers(): Promise<CustomerDTO[]> {
    return [...db.customers];
  },

  async createCustomer(input: CreateCustomerInput): Promise<CustomerDTO> {
    const customer: CustomerDTO = {
      id: createId("cust"),
      ...input,
    };

    db.customers.push(customer);
    return customer;
  },

  async listVehiclesByCustomer(customerId: string): Promise<VehicleDTO[]> {
    return db.vehicles.filter((vehicle) => vehicle.customerId === customerId);
  },

  async createVehicle(customerId: string, input: VehicleInput): Promise<VehicleDTO> {
    const vehicle: VehicleDTO = {
      id: createId("veh"),
      customerId,
      ...input,
    };

    db.vehicles.push(vehicle);
    return vehicle;
  },

  async listQuotes(): Promise<QuoteDTO[]> {
    return [...db.quotes];
  },

  async createQuote(input: CreateQuoteInput): Promise<QuoteDTO> {
    const quote: QuoteDTO = {
      id: createId("quo"),
      customerId: input.customerId,
      status: "DRAFT",
      version: 1,
      items: [],
      subtotal: 0,
      total: 0,
      value: 0,
    };

    db.quotes.push(quote);
    return quote;
  },
};
