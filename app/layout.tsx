import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GarageOS — Le logiciel tout-en-un pour garagistes",
  description: "GarageOS révolutionne la gestion de votre garage. Devis, facturation, stock, planning, caisse — tout en un seul endroit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
