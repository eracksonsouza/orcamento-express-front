import {
  mapCustomerDTOListToView,
  mapCustomerDTOToView,
} from "@/src/features/customers/adapters/customer-view-adapter";
import {
  mapQuoteDTOListToView,
  mapQuoteDTOToView,
} from "@/src/features/quotes/adapters/quote-view-adapter";
import {
  mapVehicleDTOListToView,
  mapVehicleDTOToView,
} from "@/src/features/vehicles/adapters/vehicle-view-adapter";
import { CustomerDTO, QuoteDTO, VehicleDTO } from "@/src/types";

export function adaptMockCustomer(customer: CustomerDTO) {
  return mapCustomerDTOToView(customer, "mock");
}

export function adaptMockCustomers(customers: CustomerDTO[]) {
  return mapCustomerDTOListToView(customers, "mock");
}

export function adaptMockVehicle(vehicle: VehicleDTO) {
  return mapVehicleDTOToView(vehicle, "mock");
}

export function adaptMockVehicles(vehicles: VehicleDTO[]) {
  return mapVehicleDTOListToView(vehicles, "mock");
}

export function adaptMockQuote(quote: QuoteDTO) {
  return mapQuoteDTOToView(quote, "mock");
}

export function adaptMockQuotes(quotes: QuoteDTO[]) {
  return mapQuoteDTOListToView(quotes, "mock");
}
