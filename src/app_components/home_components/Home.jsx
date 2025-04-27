// Home.jsx

// Import libraries
import React, { useState } from "react";

// Importing other components
  import Header from "./header_components/FinalHeader";
  import Sidebar from "./sidebar_components/FinalSidebar";
  import ContentArea from "./content_components/FinalContentArea";

function Home() {
  // Stating navigationText for better understanding in which page
  // State collapsed for the condition of Sidebar
  const [navigationText, setNavigationText] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="
          min-w-[680px]   // Ensures the nav bar doesn't shrink below 640px wide
          w-full          // Makes the nav bar span the full available width
          max-w-screen    // Caps width to the screen width (safe on ultra-wide monitors)
          h-20            // Fixed height (80px)
          bg-green-300    // Light green background
          flex            // Enables flexbox layout
          items-center    // Vertically centers child elements
          shadow-md       // Applies medium shadow for depth
          fixed           // Fixes the nav bar to the top of the screen
          top-0 left-0    // Positions it at the very top-left of the page
          z-[1000]        // Ensures it stays on top of other elements
      ">
        {/**Header accepts navigationText in which it will be displayed */}
        <Header navigationText={navigationText} />
      </div>

      {/**Sidebar accepts events of setNavigationText as it contains buttons for navigation
       * and setCollapsed for its state, whether it is expanded or collapsed.*/}
      <Sidebar
          setNavigationText={setNavigationText}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
      />

      {/**Content Area accepts state of collapsed variable whether collapsed or not
       * as it also adjusts to the current area available
      */}
      <ContentArea collapsed={collapsed} />
    </>
  );
}
  
export default Home;
