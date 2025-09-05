import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Train Schedule",
  description: "Simple Train Schedule App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* className="bg-gray-100 text-gray-900 min-h-screen" */}
      <body >
        <Providers>
          {/* <Navbar /> */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
