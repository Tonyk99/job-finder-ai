import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Finder AI - Find jobs that ACTUALLY fit your CV",
  description: "Upload your resume and let AI scan the internet for your best job matches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
