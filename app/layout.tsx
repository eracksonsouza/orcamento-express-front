import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { AppProviders } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orcamento Express Frontend",
  description: "Frontend base com Next.js para o Orcamento Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
