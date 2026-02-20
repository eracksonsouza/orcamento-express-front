"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  PersonIcon,
  BackpackIcon,
  FileTextIcon,
  GearIcon,
  PlusIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Clients", href: "/customers", icon: PersonIcon },
  { label: "Vehicles", href: "/vehicles", icon: BackpackIcon },
  { label: "Quotes", href: "/quotes", icon: FileTextIcon },
  { label: "Settings", href: "/settings", icon: GearIcon },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-screen w-[240px] flex-col bg-white p-5">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#3C3CF6] text-white">
          <MagicWandIcon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold text-[#111827]">Orçamento Express</h2>
      </div>

      <ul className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[17px] transition-colors ${
                  isActive
                    ? "bg-[#3C3CF6] text-[#FFFFFF]"
                    : "text-[#475569] hover:bg-[#EEF2FF]"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#3C3CF6] px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
      >
        <PlusIcon className="h-[18px] w-[18px]" />
        Novo Orçamento
      </button>
    </nav>
  );
};

export default SideBar;
