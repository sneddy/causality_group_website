import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { loadNavigation } from "@/lib/content";

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://causality.mbzuai.example"), // replace on deploy
  title: "Causality Group @ MBZUAI",
  description:
    "Research on causal discovery, representation learning, and robust AI led by Professors Kun Zhang at MBZUAI.",
  openGraph: {
    title: "Causality Group @ MBZUAI",
    description:
      "Research on causal discovery, representation learning, and robust AI led by Professors Kun Zhang at MBZUAI.",
    url: "https://causality.mbzuai.example",
    siteName: "Causality Group @ MBZUAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Causality Group @ MBZUAI",
    description:
      "Causal discovery, representation learning, and robust AI research from MBZUAI.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await loadNavigation();

  return (
    <html lang="en">
      <body
        className={`${body.variable} ${display.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="grid-overlay pointer-events-none fixed inset-0 opacity-60" aria-hidden />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader navItems={navItems} />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-5 py-10 md:py-12">
              {children}
            </div>
          </main>
          <SiteFooter navItems={navItems} />
        </div>
      </body>
    </html>
  );
}
