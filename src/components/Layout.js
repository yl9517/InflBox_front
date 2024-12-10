// components/Layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
