import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";
import SearchField from "../../searchField";
import { UploadButton } from "../../buttons/upload-button";
import LabelModal from "../../Modal/label-modal"
import { useSelector } from "react-redux";

export const NavBarTabs = () => {
  const { isAuthenticated } = useAuth0();
  const userRole = useSelector((state) => state.user.role);

  const [showUploadModal, setShowUploadModal] = React.useState(false);

  return (
    <div className="nav-bar__tabs">
      {isAuthenticated && (
        <div className="nav-bar-features">
          <div><SearchField/></div>
          {(userRole==="admin") && 
          <div className="admin-features">
            <div><NavBarTab path="/CategorEase/admin/UploadImages" label="Upload Images" /></div>
            <div><UploadButton setShowUploadModal={setShowUploadModal} /></div>
            {showUploadModal && <LabelModal setShowUploadModal={setShowUploadModal} />}
          </div>
          }
        </div>
      )}
    </div>
  );
};
