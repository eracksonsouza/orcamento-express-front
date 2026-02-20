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

export function adaptApiCustomer(customer: CustomerDTO) {
  return mapCustomerDTOToView(customer, "api");
}

export function adaptApiCustomers(customers: CustomerDTO[]) {
  return mapCustomerDTOListToView(customers, "api");
}

export function adaptApiVehicle(vehicle: VehicleDTO) {
  return mapVehicleDTOToView(vehicle, "api");
}

export function adaptApiVehicles(vehicles: VehicleDTO[]) {
  return mapVehicleDTOListToView(vehicles, "api");
}

export function adaptApiQuote(quote: QuoteDTO) {
  return mapQuoteDTOToView(quote, "api");
}

export function adaptApiQuotes(quotes: QuoteDTO[]) {
  return mapQuoteDTOListToView(quotes, "api");
}
