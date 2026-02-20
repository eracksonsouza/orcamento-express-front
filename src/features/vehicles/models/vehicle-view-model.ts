import { VehicleType } from "@/src/types";

export interface VehicleViewModel {
  id: string;
  customerId: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  type: VehicleType;
  typeLabel: string;
  source: "api" | "mock";
}
