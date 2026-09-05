import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OUTFIT CURATOR — Your Personal AI Stylist",
  description: "Get perfect outfit ideas from your own digital wardrobe for every occasion.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7C4DDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-surface-bg text-font-main min-h-screen">
        {children}
      </body>
    </html>
  );
}
