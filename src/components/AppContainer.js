import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

function AppContainer({ children, ...rest }) {
  const location = useLocation();
  const pageName = location.pathname.replace("/", "") || "home";
  const className = "AppContainer page-" + pageName;

  return (
    <div class={className} {...rest}>
      {children}
    </div>
  );
}

export default AppContainer;
