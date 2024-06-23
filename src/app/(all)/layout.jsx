import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import React from "react";

const AllLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default AllLayout;
