export interface CustomerViewModel {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: "api" | "mock";
  contactSummary: string;
}
