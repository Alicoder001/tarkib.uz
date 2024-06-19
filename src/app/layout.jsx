import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tarkib loyihasi",
  description: "O'z retseptlaringni yarat",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="uz">
      <body className={`${inter.className} flex h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
