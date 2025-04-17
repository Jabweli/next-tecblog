import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { ToastContainer } from "react-toastify";

const interLocal = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "TechBlog.",
  description:
    "Discover insightful articles, practical tips, and inspiring stories on tech, coding, personal growth, and creativity. Join a community of curious minds and lifelong learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${interLocal.variable} antialiased`}>
          <Providers>
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              <Navbar />
              {children}
              <ToastContainer position="bottom-right" />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
