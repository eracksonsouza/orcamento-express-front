import { describe, expect, it } from "vitest";

import { apiContracts } from "@/services/api/contracts";

describe("api contracts bootstrap", () => {
  it("loads customer and quote statuses", () => {
    expect(apiContracts.quoteStatus).toContain("DRAFT");
    expect(apiContracts.vehicleType).toContain("CAR");
  });
});
