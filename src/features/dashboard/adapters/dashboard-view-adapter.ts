import {
  DashboardSnapshotDTO,
  DashboardNotificationDTO,
  DashboardQuoteDTO,
  DashboardServiceDistributionDTO,
  DashboardViewerDTO,
} from "@/src/features/dashboard/services/dashboard-mock-service";
import {
  DashboardViewModel,
  DashboardNotificationViewModel,
  DashboardMetricViewModel,
  DashboardQuoteViewModel,
  DashboardServiceDistributionViewModel,
  DashboardViewerViewModel,
} from "@/src/features/dashboard/models/dashboard-view-model";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

const notificationTimeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const statusLabelMap: Record<DashboardQuoteDTO["status"], DashboardQuoteViewModel["statusLabel"]> = {
  DRAFT: "Draft",
  GENERATING: "Generating",
  READY: "Ready",
};

const statusToneMap: Record<DashboardQuoteDTO["status"], DashboardQuoteViewModel["statusTone"]> = {
  DRAFT: "neutral",
  GENERATING: "info",
  READY: "success",
};

const authProviderLabelMap: Record<DashboardViewerDTO["authProvider"], string> = {
  INTERNAL: "Internal login",
  GOOGLE: "Google login",
};

function getAvatarFallback(fullName: string): string {
  const parts = fullName
    .trim()
    .split(" ")
    .filter(Boolean);

  if (parts.length === 0) {
    return "US";
  }

  const firstInitial = parts[0]?.[0] ?? "U";
  const secondInitial = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "S" : "S";

  return `${firstInitial}${secondInitial}`.toUpperCase();
}

function mapNotificationTimeLabel(timeIso: string): string {
  const eventTime = new Date(timeIso).getTime();
  const now = Date.now();
  const diffMinutes = Math.round((eventTime - now) / 60000);

  if (Math.abs(diffMinutes) < 60) {
    return notificationTimeFormatter.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) {
    return notificationTimeFormatter.format(diffHours, "hour");
  }

  const diffDays = Math.round(diffHours / 24);
  return notificationTimeFormatter.format(diffDays, "day");
}

function mapMetricValue(metricId: string, value: number): string {
  if (metricId === "total-value") {
    return currencyFormatter.format(value);
  }

  return String(value);
}

function mapMetric(dto: DashboardSnapshotDTO["metrics"][number]): DashboardMetricViewModel {
  const trend: DashboardMetricViewModel["trend"] = dto.deltaPercent >= 0 ? "up" : "down";
  const sign = dto.deltaPercent > 0 ? "+" : "";

  return {
    id: dto.id,
    title: dto.title,
    value: mapMetricValue(dto.id, dto.value),
    delta: `${sign}${dto.deltaPercent}%`,
    trend,
    description: dto.description,
  };
}

function mapQuote(dto: DashboardQuoteDTO): DashboardQuoteViewModel {
  return {
    id: dto.id,
    clientName: dto.clientName,
    vehicleLabel: dto.vehicleLabel,
    dateLabel: dateFormatter.format(new Date(dto.createdAt)),
    valueLabel: currencyFormatter.format(dto.value),
    statusLabel: statusLabelMap[dto.status],
    statusTone: statusToneMap[dto.status],
  };
}

function mapServiceDistribution(
  dto: DashboardServiceDistributionDTO,
): DashboardServiceDistributionViewModel {
  return {
    id: dto.id,
    label: dto.label,
    percentageValue: dto.percentage,
    percentageLabel: `${dto.percentage}%`,
  };
}

function mapViewer(dto: DashboardViewerDTO): DashboardViewerViewModel {
  return {
    name: dto.name,
    role: dto.role,
    avatarUrl: dto.avatarUrl,
    avatarFallback: getAvatarFallback(dto.name),
    authProviderLabel: authProviderLabelMap[dto.authProvider] ?? null,
  };
}

function mapNotification(dto: DashboardNotificationDTO): DashboardNotificationViewModel {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    timeLabel: mapNotificationTimeLabel(dto.timeIso),
    target: dto.target,
    isUnread: dto.isUnread,
  };
}

export function mapDashboardSnapshotToViewModel(snapshot: DashboardSnapshotDTO): DashboardViewModel {
  return {
    heading: snapshot.heading,
    subtitle: snapshot.subtitle,
    viewer: mapViewer(snapshot.viewer),
    notifications: snapshot.notifications.map(mapNotification),
    metrics: snapshot.metrics.map(mapMetric),
    recentQuotes: snapshot.recentQuotes.map(mapQuote),
    serviceDistribution: snapshot.serviceDistribution.map(mapServiceDistribution),
  };
}
