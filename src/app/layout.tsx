import type { Metadata } from "next";
import { Inter, Play } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import "./style.css";
// import "./all.min.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const play = Play({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-play",
});

export const metadata: Metadata = {
  title: "Perkin Steel",
  description: "Premium Steel Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${play.variable}`}>
      <body>
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}