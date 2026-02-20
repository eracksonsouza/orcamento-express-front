import { mapDashboardSnapshotToViewModel } from "@/src/features/dashboard/adapters/dashboard-view-adapter";
import { DashboardOverview } from "@/src/features/dashboard/components/dashboard-overview";
import { getDashboardSnapshot } from "@/src/features/dashboard/services/dashboard-mock-service";

export default async function DashboardPage() {
  const dashboardSnapshot = await getDashboardSnapshot();
  const dashboardViewModel = mapDashboardSnapshotToViewModel(dashboardSnapshot);

  return <DashboardOverview model={dashboardViewModel} />;
}
