import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { DashboardRecentQuotes } from "@/src/features/dashboard/components/dashboard-recent-quotes";
import { DashboardViewModel } from "@/src/features/dashboard/models/dashboard-view-model";

const quotesFixture: DashboardViewModel["recentQuotes"] = [
  {
    id: "QTE-124",
    clientName: "Ricardo Mendes",
    vehicleLabel: "Toyota Corolla (ABC-1234)",
    dateLabel: "Oct 24, 2023",
    valueLabel: "R$ 2.450,00",
    statusLabel: "Generating",
    statusTone: "info",
  },
  {
    id: "QTE-123",
    clientName: "Ana Luiza Silva",
    vehicleLabel: "Honda HR-V (XYZ-9876)",
    dateLabel: "Oct 23, 2023",
    valueLabel: "R$ 890,00",
    statusLabel: "Ready",
    statusTone: "success",
  },
];

describe("DashboardRecentQuotes", () => {
  it("filters by customer name and quote id", async () => {
    const user = userEvent.setup();

    render(<DashboardRecentQuotes quotes={quotesFixture} />);

    const searchInput = screen.getByPlaceholderText("Search quotes or clients...");

    await user.type(searchInput, "Ricardo");
    expect(screen.getByText("Ricardo Mendes")).toBeInTheDocument();
    expect(screen.queryByText("Ana Luiza Silva")).not.toBeInTheDocument();

    await user.clear(searchInput);
    await user.type(searchInput, "QTE-123");
    expect(screen.getByText("Ana Luiza Silva")).toBeInTheDocument();
    expect(screen.queryByText("Ricardo Mendes")).not.toBeInTheDocument();
  });

  it("shows empty state when no quote matches search", async () => {
    const user = userEvent.setup();

    render(<DashboardRecentQuotes quotes={quotesFixture} />);

    const searchInput = screen.getByPlaceholderText("Search quotes or clients...");
    await user.type(searchInput, "nao-existe");

    expect(screen.getByText("No quotes found for: nao-existe")).toBeInTheDocument();
  });

  it("opens actions menu with edit and status links", async () => {
    const user = userEvent.setup();

    render(<DashboardRecentQuotes quotes={quotesFixture} />);

    const actionsButton = screen.getByRole("button", {
      name: "Actions for quote QTE-124",
    });
    await user.click(actionsButton);

    const editLink = screen.getByRole("link", { name: "Edit quote" });
    const statusLink = screen.getByRole("link", { name: "Check status" });

    expect(editLink).toHaveAttribute("href", "/quotes?edit=QTE-124");
    expect(statusLink).toHaveAttribute("href", "/quotes?status=QTE-124");
  });
});
