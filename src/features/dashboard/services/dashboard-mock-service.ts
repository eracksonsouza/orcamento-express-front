export interface DashboardMetricDTO {
  id: string;
  title: string;
  value: number;
  deltaPercent: number;
  description: string;
}

export interface DashboardQuoteDTO {
  id: string;
  clientName: string;
  vehicleLabel: string;
  createdAt: string;
  value: number;
  status: "GENERATING" | "READY" | "DRAFT";
}

export interface DashboardServiceDistributionDTO {
  id: string;
  label: string;
  percentage: number;
}

export interface DashboardViewerDTO {
  name: string;
  role: "ADMIN" | "CUSTOMER";
  avatarUrl: string | null;
  authProvider: "INTERNAL" | "GOOGLE";
}

export interface DashboardNotificationDTO {
  id: string;
  title: string;
  description: string;
  timeIso: string;
  target: "ADMIN" | "CUSTOMER" | "BOTH";
  isUnread: boolean;
}

export interface DashboardSnapshotDTO {
  heading: string;
  subtitle: string;
  viewer: DashboardViewerDTO;
  notifications: DashboardNotificationDTO[];
  metrics: DashboardMetricDTO[];
  recentQuotes: DashboardQuoteDTO[];
  serviceDistribution: DashboardServiceDistributionDTO[];
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshotDTO> {
  return {
    heading: "Dashboard",
    subtitle: "Overview of shop performance and recent activity.",
    viewer: {
      name: "Ana Luiza Silva",
      role: "ADMIN",
      avatarUrl: null,
      authProvider: "GOOGLE",
    },
    notifications: [
      {
        id: "notif-1",
        title: "Quote QTE-124 updated",
        description: "Customer received repair status update.",
        timeIso: "2026-02-20T12:20:00.000Z",
        target: "BOTH",
        isUnread: true,
      },
      {
        id: "notif-2",
        title: "Pickup reminder",
        description: "Send reminder to customer Mariana Costa.",
        timeIso: "2026-02-20T10:10:00.000Z",
        target: "ADMIN",
        isUnread: true,
      },
      {
        id: "notif-3",
        title: "Repair in progress",
        description: "Customer can track workshop step updates.",
        timeIso: "2026-02-19T16:40:00.000Z",
        target: "CUSTOMER",
        isUnread: false,
      },
    ],
    metrics: [
      {
        id: "total-quotes",
        title: "Total Quotes",
        value: 124,
        deltaPercent: 12,
        description: "Vs. last month: 110",
      },
      {
        id: "total-value",
        title: "Total Value",
        value: 45200,
        deltaPercent: 5,
        description: "Monthly target: R$ 50k",
      },
      {
        id: "pending-items",
        title: "Pending Items",
        value: 8,
        deltaPercent: -2,
        description: "Quotes needing action",
      },
    ],
    recentQuotes: [
      {
        id: "QTE-124",
        clientName: "Ricardo Mendes",
        vehicleLabel: "Toyota Corolla (ABC-1234)",
        createdAt: "2023-10-24",
        value: 2450,
        status: "GENERATING",
      },
      {
        id: "QTE-123",
        clientName: "Ana Luiza Silva",
        vehicleLabel: "Honda HR-V (XYZ-9876)",
        createdAt: "2023-10-23",
        value: 890,
        status: "READY",
      },
      {
        id: "QTE-122",
        clientName: "Carlos Eduardo",
        vehicleLabel: "VW Golf (GTI-0001)",
        createdAt: "2023-10-23",
        value: 5120,
        status: "DRAFT",
      },
      {
        id: "QTE-121",
        clientName: "Mariana Costa",
        vehicleLabel: "Jeep Compass (JEE-4433)",
        createdAt: "2023-10-22",
        value: 1200,
        status: "GENERATING",
      },
    ],
    serviceDistribution: [
      { id: "paint", label: "Painting Services", percentage: 65 },
      { id: "body", label: "Body Work", percentage: 25 },
      { id: "detail", label: "Detailing", percentage: 10 },
    ],
  };
}
