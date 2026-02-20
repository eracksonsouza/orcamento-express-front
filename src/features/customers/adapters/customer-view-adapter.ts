import { CustomerDTO } from "@/src/types";

import { CustomerViewModel } from "@/src/features/customers/models/customer-view-model";

export type AdapterSource = "api" | "mock";

export function mapCustomerDTOToView(
  customer: CustomerDTO,
  source: AdapterSource,
): CustomerViewModel {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email ?? null,
    phone: customer.phone ?? null,
    source,
    contactSummary: customer.email ?? customer.phone ?? "Sem contato informado",
  };
}

export function mapCustomerDTOListToView(
  customers: CustomerDTO[],
  source: AdapterSource,
): CustomerViewModel[] {
  return customers.map((customer) => mapCustomerDTOToView(customer, source));
}
