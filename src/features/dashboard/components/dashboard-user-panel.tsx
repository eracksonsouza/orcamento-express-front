"use client";

import { useMemo, useState } from "react";
import { BellIcon } from "@radix-ui/react-icons";

import {
  DashboardNotificationViewModel,
  DashboardViewerViewModel,
} from "@/src/features/dashboard/models/dashboard-view-model";

type DashboardUserPanelProps = {
  viewer: DashboardViewerViewModel;
  notifications: DashboardNotificationViewModel[];
};

const targetLabelMap: Record<DashboardNotificationViewModel["target"], string> = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
  BOTH: "Admin + Customer",
};

export function DashboardUserPanel({ viewer, notifications }: DashboardUserPanelProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.isUnread).length,
    [notifications],
  );

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <button
          type="button"
          aria-label="Open notifications"
          onClick={() => setIsNotificationsOpen((current) => !current)}
          className="relative rounded-full border border-[#E2E8F0] bg-white p-2 text-[#64748B] transition-colors hover:text-[#0F172A]"
        >
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          ) : null}
        </button>

        {isNotificationsOpen ? (
          <div className="absolute right-0 top-11 z-20 w-80 rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-md">
            <p className="px-2 py-2 text-sm font-semibold text-[#111827]">Notifications</p>
            <ul className="max-h-72 space-y-1 overflow-auto">
              {notifications.map((notification) => (
                <li key={notification.id} className="rounded-xl px-2 py-2 hover:bg-[#F8FAFC]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{notification.title}</p>
                      <p className="mt-1 text-xs text-[#64748B]">{notification.description}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">
                        {targetLabelMap[notification.target]} • {notification.timeLabel}
                      </p>
                    </div>
                    {notification.isUnread ? (
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#3B82F6]" aria-label="Unread" />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-2 py-1.5">
        {viewer.avatarUrl ? (
          <span
            role="img"
            aria-label={viewer.name}
            className="h-9 w-9 rounded-full border border-[#E2E8F0] bg-cover bg-center"
            style={{ backgroundImage: `url(${viewer.avatarUrl})` }}
          />
        ) : (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FDEAD7] text-xs font-bold text-[#7C2D12]">
            {viewer.avatarFallback}
          </span>
        )}

        <div className="pr-2">
          <p className="text-xs font-semibold leading-none text-[#111827]">{viewer.role}</p>
          <p className="mt-1 text-[11px] leading-none text-[#64748B]">
            {viewer.authProviderLabel ?? "Account"}
          </p>
        </div>
      </div>
    </div>
  );
}
