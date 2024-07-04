import { AlertLogin } from "@/components/custom/AlertLogin";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./StoreProvider";
import "./globals.css";

export const metadata = {
  title: "Tarkib loyihasi",
  description: "O'z retseptlaringni yarat",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="uz">
      <body className="flex h-full flex-col">
        <StoreProvider>
          {children}
          <AlertLogin />
        </StoreProvider>
        <Toaster visibleToasts="1" richColors />
      </body>
    </html>
  );
}
