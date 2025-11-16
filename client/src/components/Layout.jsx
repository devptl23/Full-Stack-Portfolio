import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <>
      <Navigation />
      <div style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Outlet />
      </div>
    </>
  );
}
