import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { AdminPage } from "./pages/admin-page";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { UploadImagesPage } from "./pages/upload-images-page";

export const App = () => {
  const { isLoading} = useAuth0();
  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/CategorEase"
        element={<AuthenticationGuard component={AdminPage} />}
      />
      <Route path="/CategorEase/user" element={<ProfilePage />} />
      <Route path="/CategorEase/admin" element={<AdminPage />} />

      <Route
        path="/CategorEase/admin/UploadImages"
        element={<AuthenticationGuard component={UploadImagesPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} /> */
    </Routes>
  );
};
