import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { DashboardUserPanel } from "@/src/features/dashboard/components/dashboard-user-panel";
import {
  DashboardNotificationViewModel,
  DashboardViewerViewModel,
} from "@/src/features/dashboard/models/dashboard-view-model";

const viewerFixture: DashboardViewerViewModel = {
  name: "Ana Luiza Silva",
  role: "ADMIN",
  avatarUrl: null,
  avatarFallback: "AS",
  authProviderLabel: "Google login",
};

const notificationsFixture: DashboardNotificationViewModel[] = [
  {
    id: "notif-1",
    title: "Quote updated",
    description: "Customer got repair update",
    timeLabel: "5 minutes ago",
    target: "BOTH",
    isUnread: true,
  },
  {
    id: "notif-2",
    title: "Pickup reminder",
    description: "Notify customer about pickup",
    timeLabel: "2 hours ago",
    target: "ADMIN",
    isUnread: true,
  },
  {
    id: "notif-3",
    title: "Repair in progress",
    description: "Customer progress notification",
    timeLabel: "1 day ago",
    target: "CUSTOMER",
    isUnread: false,
  },
];

describe("DashboardUserPanel", () => {
  it("renders avatar fallback and auth provider label", () => {
    render(<DashboardUserPanel viewer={viewerFixture} notifications={notificationsFixture} />);

    expect(screen.getByText("AS")).toBeInTheDocument();
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
    expect(screen.getByText("Google login")).toBeInTheDocument();
  });

  it("shows unread count and opens notifications list", async () => {
    const user = userEvent.setup();

    render(<DashboardUserPanel viewer={viewerFixture} notifications={notificationsFixture} />);

    expect(screen.getByText("2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open notifications" }));

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Quote updated")).toBeInTheDocument();
    expect(screen.getByText("Pickup reminder")).toBeInTheDocument();
    expect(screen.getByText("Repair in progress")).toBeInTheDocument();
  });
});
