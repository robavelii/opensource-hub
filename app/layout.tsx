import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, ScrollToTop } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OpensourceHub",
  description: "A tool where you can find opensource projects on github",
  keywords: [
    "OpensourceHub",
    "projects",
    "educational resources",
    "high-quality projects",
    "React",
    "Nodejs",
    "JavaScript",
    "open source",
    "contribution",
    "learners",
  ],
  author: { name: "Robel Fekadu" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
