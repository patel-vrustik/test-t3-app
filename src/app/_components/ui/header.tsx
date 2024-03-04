import React from "react";

const Header = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="flex pb-4 pt-10 text-xl font-semibold">{children}</h1>;
};

export default Header;
