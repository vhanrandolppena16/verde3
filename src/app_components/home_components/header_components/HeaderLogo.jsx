// FinalHeaderLogo.jsx

// Import libraries
  import React from "react";  

// Import assets (Verde Logo)
  import logo from "../../../assets/images/LOGO2.png"; 

// LOGO CONTAINER
const Logo = () => (
  // Logo Container which also adjusts based on the width of the window
  <div className="
    h-full max-h-[150px]                // Takes full height of parent, max 150px
    w-full max-w-[250px]                // Takes full width of its parent, max 250px
    flex items-center justify-center    // Centers logo both vertically and horizontally
    px-4 py-6                           // Horizontal and vertical padding
  ">
    {/**Image Upload */}
    <img
      src={logo}
      alt="Verde Logo"
      className="
            h-[200%]           // Image fills the height of its container 
            w-auto             // Width adjusts automatically to preserve aspect ratio
            object-contain     // Ensures entire image is visible, maintains aspect ratio
        "
    />
  </div>
);

export default Logo;
