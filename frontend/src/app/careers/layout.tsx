import { Raleway } from "next/font/google";
import "../../app/globals.css";
import type { Metadata } from "next";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Careers - BiruhaTech",
  description: "Explore job openings at BiruhaTech",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${raleway.variable} font-[var(--font-raleway)] bg-gray-50 min-h-screen`}>
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}
