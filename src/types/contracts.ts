import { z } from "zod";

import { QUOTE_ITEM_TYPES, QUOTE_STATUSES, VEHICLE_TYPES } from "@/src/types/enums";

export const vehicleTypeSchema = z.enum(VEHICLE_TYPES);
export const quoteItemTypeSchema = z.enum(QUOTE_ITEM_TYPES);
export const quoteStatusSchema = z.enum(QUOTE_STATUSES);

export const apiContracts = {
  vehicleType: vehicleTypeSchema.options,
  quoteItemType: quoteItemTypeSchema.options,
  quoteStatus: quoteStatusSchema.options,
};
