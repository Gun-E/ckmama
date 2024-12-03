import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "쿡힘마마",
  description: "쿡힘마마",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <div className="ckcontainer">
        {children}
      </div>
      </body>
    </html>
  );
}
