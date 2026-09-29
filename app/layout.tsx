import type { Metadata } from "next";
import "./globals.css";

const title = "Método Rose Oliveira | Mechas, Técnica e Transformação";
const description = "Conheça o Método Rose Oliveira e aprenda um processo simples e prático para desenvolver sua técnica em mechas, do atendimento à finalização.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "pt_BR" },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/logo-metodo.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><head><link rel="preload" as="image" href="/banner-hero-desktop.webp" media="(min-width: 601px)" /><link rel="preload" as="image" href="/banner-hero-mobile.webp" media="(max-width: 600px)" /></head><body>{children}</body></html>;
}
