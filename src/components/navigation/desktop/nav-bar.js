import React from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";
import { NavBarTabs } from "./nav-bar-tabs";
import { useLocation } from "react-router-dom";


export const NavBar = () => {

  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarBrand />
        { (path!=='/') &&
          <NavBarTabs />}
        <NavBarButtons />
      </nav>
    </div>
  );
};
