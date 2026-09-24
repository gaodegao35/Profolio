import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaode Gao — Product Designer & Creative Developer",
  description:
    "An interactive portrait of Gaode Gao’s work in product design, learning experiences, and human–AI interaction. Carnegie Mellon METALS.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
