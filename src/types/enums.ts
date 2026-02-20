export const VEHICLE_TYPES = ["CAR", "MOTORCYCLE", "TRUCK", "VAN", "SUV"] as const;
export const QUOTE_ITEM_TYPES = ["PART", "SERVICE"] as const;
export const QUOTE_STATUSES = ["DRAFT", "SUBMITTED", "GENERATING", "READY", "FAILED"] as const;

export type VehicleType = (typeof VEHICLE_TYPES)[number];
export type QuoteItemType = (typeof QUOTE_ITEM_TYPES)[number];
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];
