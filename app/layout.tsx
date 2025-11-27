import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Nunito_Sans } from "next/font/google";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "IFETO E-Commerce",
  description: "Your shopping from abroad made easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
