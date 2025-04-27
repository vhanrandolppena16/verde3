// FinalContentArea.jsx

// Importing Libraries
  import React from "react";
  import { Outlet } from "react-router-dom"; // Allows for overlaying or fitting other components

// Checking if the sidebar is collapsed or not
const ContentArea = ({ collapsed }) => {
  return (
    // Adjust the dimensions based on collapsed variable
    <div
      className={`
        h-screen
        w-full
        pl-[105px] ${!collapsed ? "pl-[250px]" : ""}
        transition-all duration-300 ease-in-out
        relative
      `}
    >
      {/**Background for Content Area */}
      <div
        className={`
          absolute top-0 left-0 h-full w-full
          bg-cover bg-center bg-no-repeat
        `}
        style={{
          backgroundImage: "url('https://i.imgur.com/8EQhjs0.jpeg')",
        }}
      />

      {/* Outlet Container */}
      <div className="relative items-center top-15 z-20 w-full max-h-[640px] h-full p-6 overflow-y-auto xl:overflow-hidden">
          <Outlet />
      </div>
    </div>
  );
};

export default ContentArea;
