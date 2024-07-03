import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import React from "react";
import Main from "../../components/custom/Main";

const AllLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Main className="main">{children}</Main>
      <Footer />
    </>
  );
};

export default AllLayout;
