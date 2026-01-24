import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/custom/layout/Navbar";

const montserrat = Montserrat({
  variable: "--montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Management SMT",
  description: "Worlds largest event management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
