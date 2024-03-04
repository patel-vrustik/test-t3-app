import Link from "next/link";
import React from "react";

const HomeButton = () => (
  <Link
    className="mr-4 rounded-full bg-gray-700 px-2.5 py-1.5 text-xs text-white hover:cursor-pointer"
    href={"/"}
  >
    {"<"}
  </Link>
);

export default HomeButton;
