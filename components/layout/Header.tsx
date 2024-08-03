"use client"

import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
    const pathname = usePathname();

    const getNavTitle = () => {
      switch (pathname) {
        case "/":
          return "Dashboard";
        case "/patients":
          return "Patients";
        case "/doctors":
          return "Doctors";
        default:
          return "Dashboard"
      }
    }
  return (
    <div className="w-full flex items-center justify-between text-xl py-[30px]  px-[10px]">
      <div>{getNavTitle()}</div>
      <div>settings</div>
    </div>
  );
};

export default Header;
