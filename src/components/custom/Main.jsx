import React from "react";
import BreadCrumb from "./BreadCrumb";

const Main = ({ children }) => {
  return (
    <main className="main">
      <div className="base-container mt-4">
        <BreadCrumb />
      </div>
      {children}
    </main>
  );
};

export default Main;
