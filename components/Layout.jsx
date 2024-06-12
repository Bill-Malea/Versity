import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="main">{children}</div>
    </div>
  );
};

export default Layout;
