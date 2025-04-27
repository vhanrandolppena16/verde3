// AuthLayout.jsx

// Import React and necessary modules from React Router
import React from "react";
import { Outlet } from "react-router-dom"; // For rendering nested routes

// Import assets
import logo from "../../assets/images/Verde Full Logo.png";
import hydroponics from "../../assets/images/hydroponics2.jpg";
import AppBackground from "./AppBackground";     // Sets up the background

// Define the AuthLayout component
const AuthLayout = () => {
  return (
    <>
          <AppBackground />

      {/* Logo Section - fixed to top-left corner */}
      <div className="fixed top-2.5 left-2.5 z-20">
        {/*
          Tailwind:
          - fixed: keeps the logo in a fixed position relative to the viewport.
          - top-2.5 left-2.5: offsets from the top-left corner (10px if base = 4px).
          - z-20: ensures it's on top of other content.
        */}
        <img src={logo} alt="Logo" className="w-[200px] h-auto" />
        {/*
          Tailwind:
          - w-[200px]: sets a fixed width of 200px.
          - h-auto: auto height to maintain aspect ratio.
        */}
      </div>

      {/* Main container for layout */}
      <nav className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center w-[70%] h-[80%] bg-white/20 p-5 rounded-[15px]">
        {/*
          Tailwind:
          - absolute: allows centering via transform.
          - top-1/2 left-1/2: position from center.
          - transform -translate-x-1/2 -translate-y-1/2: perfect centering.
          - flex: horizontal flex container.
          - justify-between: space between left and right panels.
          - items-center: vertically center children.
          - w-[70%] h-[80%]: responsive width and height.
          - bg-white/20: semi-transparent white background.
          - p-5: padding of 20px on all sides.
          - rounded-[15px]: 15px rounded corners.
        */}

        {/* Left Panel - Image with overlay and tagline */}
        <div
          className="relative w-1/2 h-full flex items-end justify-start text-left rounded-[30px] overflow-hidden"
          style={{
            backgroundImage: `url(${hydroponics})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/*
            Tailwind:
            - relative: for positioning overlay inside.
            - w-1/2: 50% width of parent.
            - h-full: full height of parent.
            - flex items-end justify-start: aligns content to bottom-left.
            - text-left: align text to the left.
            - rounded-[30px]: 30px border radius.
            - overflow-hidden: hide content that overflows rounded edges.
          */}

          {/* Overlay layer */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-0" />
          {/*
            Tailwind:
            - absolute inset-0: fills entire parent.
            - bg-black/30: black overlay with 30% opacity.
            - backdrop-blur-md: apply a mild background blur.
            - z-0: push overlay behind content.
          */}

          {/* Tagline text content */}
          <header className="relative z-10 p-4 ml-[3%] mb-[2%]">
            {/*
              Tailwind:
              - relative: needed to layer above overlay.
              - z-10: ensures it's above overlay (z-0).
              - p-4: padding (16px).
              - ml-[3%] mb-[2%]: custom margins from left and bottom.
            */}
            <h1 className="text-white text-4xl font-bold leading-snug">
              SMART FARMING.
              <br />
              SMARTER FUTURE.
            </h1>
            {/*
              Tailwind:
              - text-white: white font color.
              - text-4xl: large heading size.
              - font-bold: bold font weight.
              - leading-snug: tighter line height for better spacing.
            */}
          </header>
        </div>

        {/* Right Panel - Outlet for child routes (forms, etc.) */}
        <div className="ml-4 w-[45%] h-[90%] bg-black/30 p-5 rounded-[10px] text-center flex flex-col items-center justify-center gap-4">
          {/*
            Tailwind:
            - ml-4: margin-left 1rem (16px) for spacing from left panel.
            - w-[45%]: 45% width of parent container.
            - h-[90%]: 90% height of parent container.
            - bg-black/30: semi-transparent black background.
            - p-5: padding inside the panel.
            - rounded-[10px]: 10px border radius.
            - text-center: center-aligns text horizontally.
            - flex flex-col: vertical flex layout.
            - items-center: center horizontally.
            - justify-center: center vertically.
            - gap-4: vertical spacing between children (1rem).
          */}
          <Outlet />
          {/* React Router: renders the nested route components (e.g., Login, Register forms) */}
        </div>
      </nav>
    </>
  );
};

export default AuthLayout;
