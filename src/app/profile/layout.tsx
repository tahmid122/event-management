import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Sidebar from "./components/Sidebar";
// import "../../styles/global.css";
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
    <main className="min-h-screen">
      <section className="flex gap-5">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 min-h-[92vh] py-5"> {children}</div>
      </section>
    </main>
  );
}
