import { VehicleDTO, VehicleType } from "@/src/types";

import { VehicleViewModel } from "@/src/features/vehicles/models/vehicle-view-model";

export type AdapterSource = "api" | "mock";

const vehicleTypeLabelMap: Record<VehicleType, string> = {
  CAR: "Carro",
  MOTORCYCLE: "Moto",
  TRUCK: "Caminhao",
  VAN: "Van",
  SUV: "SUV",
};

export function mapVehicleDTOToView(vehicle: VehicleDTO, source: AdapterSource): VehicleViewModel {
  return {
    id: vehicle.id,
    customerId: vehicle.customerId,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    licensePlate: vehicle.licensePlate,
    type: vehicle.type,
    typeLabel: vehicleTypeLabelMap[vehicle.type],
    source,
  };
}

export function mapVehicleDTOListToView(
  vehicles: VehicleDTO[],
  source: AdapterSource,
): VehicleViewModel[] {
  return vehicles.map((vehicle) => mapVehicleDTOToView(vehicle, source));
}
