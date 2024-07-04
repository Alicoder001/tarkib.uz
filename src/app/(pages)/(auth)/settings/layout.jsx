import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
