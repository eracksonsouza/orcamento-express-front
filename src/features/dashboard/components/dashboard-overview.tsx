import { DashboardViewModel } from "@/src/features/dashboard/models/dashboard-view-model";
import { DashboardStatCard } from "@/src/features/dashboard/components/dashboard-stat-card";
import { DashboardRecentQuotes } from "@/src/features/dashboard/components/dashboard-recent-quotes";
import { DashboardUserPanel } from "@/src/features/dashboard/components/dashboard-user-panel";

type DashboardOverviewProps = {
  model: DashboardViewModel;
};

export function DashboardOverview({ model }: DashboardOverviewProps) {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-[#111827]">{model.heading}</h2>
          <p className="mt-2 text-[#64748B]">{model.subtitle}</p>
        </div>
        <DashboardUserPanel viewer={model.viewer} notifications={model.notifications} />
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {model.metrics.map((metric) => (
          <DashboardStatCard key={metric.id} metric={metric} />
        ))}
      </div>

      <DashboardRecentQuotes quotes={model.recentQuotes} />

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#111827]">Service Distribution</h3>
          <ul className="space-y-3">
            {model.serviceDistribution.map((service) => (
              <li key={service.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#1E293B]">{service.label}</span>
                  <span className="text-[#64748B]">{service.percentageLabel}</span>
                </div>
                <div className="h-2 rounded-full bg-[#E2E8F0]">
                  <div
                    className="h-2 rounded-full bg-[#3C3CF6]"
                    style={{ width: `${service.percentageValue}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#111827]">Precisa de ajuda?</h3>
          <p className="mt-2 text-sm text-[#64748B]">Nos manda mensagem no whatsapp</p>
        </article>
      </div>
    </section>
  );
}
