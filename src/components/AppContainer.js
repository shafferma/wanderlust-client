import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

function AppContainer({ children, ...rest }) {
  const location = useLocation();
  const pageName = location.pathname.replace("/", "") || "home";
  const className = "AppContainer page-" + pageName;

  return (
    <ToastProvider>
      <div class={className} {...rest}>
        {children}
      </div>
    </ToastProvider>
  );
}

export default AppContainer;
