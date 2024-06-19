import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tarkib loyihasi",
  description: "O'z retseptlaringni yarat",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="uz">
      <body className={`${inter.className} flex h-full flex-col`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
