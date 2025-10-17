import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Armario - SaaS Platform",
  description: "Secure, Fast, Scalable SaaS Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
