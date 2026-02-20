import { DashboardMetricViewModel } from "@/src/features/dashboard/models/dashboard-view-model";

type DashboardStatCardProps = {
  metric: DashboardMetricViewModel;
};

export function DashboardStatCard({ metric }: DashboardStatCardProps) {
  const deltaClassName = metric.trend === "up" ? "text-[#0F766E] bg-[#DFF7F3]" : "text-[#B45309] bg-[#FEEFD6]";

  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full px-2 py-1 text-xs font-semibold text-[#334155] bg-[#F1F5F9]">
          {metric.title}
        </span>
        <span className={`rounded-full px-2 py-1 text-xs font-bold ${deltaClassName}`}>{metric.delta}</span>
      </div>

      <p className="text-3xl font-semibold text-[#111827]">{metric.value}</p>
      <p className="mt-2 text-sm text-[#64748B]">{metric.description}</p>
    </article>
  );
}
