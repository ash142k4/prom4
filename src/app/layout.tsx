import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ForceResetHelper from "@/components/ForceResetHelper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTube Clone with Gamification",
  description: "Enhanced YouTube clone with gamification features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
        {/* Development helpers */}
        <ForceResetHelper />
      </body>
    </html>
  );
}
