import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Tarkib loyihasi",
  description: "O'z retseptlaringni yarat",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="uz">
      <body className="flex h-full flex-col">
        <StoreProvider>{children}</StoreProvider>
        <Toaster visibleToasts="1" richColors />
      </body>
    </html>
  );
}
