import { ReactNode } from "react";
import SideBar from "@/src/components/shared/SideBar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside aria-label="Menu lateral">
        <SideBar />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
