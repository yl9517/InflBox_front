// components/Layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-20 m-20">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
