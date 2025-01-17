import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Ecomm24 - Hackathon E-commerce Project",
  description:
    "A sleek and modern e-commerce UI/UX design developed within 24 hours for a hackathon. Built with a focus on user experience, speed, and design excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-[1440px] mx-auto">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
