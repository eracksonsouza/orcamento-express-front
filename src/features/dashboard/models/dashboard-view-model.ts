export interface DashboardMetricViewModel {
  id: string;
  title: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  description: string;
}

export interface DashboardQuoteViewModel {
  id: string;
  clientName: string;
  vehicleLabel: string;
  dateLabel: string;
  valueLabel: string;
  statusLabel: string;
  statusTone: "neutral" | "info" | "success";
}

export interface DashboardServiceDistributionViewModel {
  id: string;
  label: string;
  percentageLabel: string;
  percentageValue: number;
}

export interface DashboardViewerViewModel {
  name: string;
  role: "ADMIN" | "CUSTOMER";
  avatarUrl: string | null;
  avatarFallback: string;
  authProviderLabel: string | null;
}

export interface DashboardNotificationViewModel {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  target: "ADMIN" | "CUSTOMER" | "BOTH";
  isUnread: boolean;
}

export interface DashboardViewModel {
  heading: string;
  subtitle: string;
  viewer: DashboardViewerViewModel;
  notifications: DashboardNotificationViewModel[];
  metrics: DashboardMetricViewModel[];
  recentQuotes: DashboardQuoteViewModel[];
  serviceDistribution: DashboardServiceDistributionViewModel[];
}
