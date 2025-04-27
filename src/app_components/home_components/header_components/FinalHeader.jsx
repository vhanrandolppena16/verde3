// FinalHeader.jsx

// Importing Libraries
  import React, { useRef, useState, useEffect } from "react";

// Importing Other Components
  import Logo from "./HeaderLogo";
  import NavigationDisplay from "./NavDisplay";
  import UserGreeting from "./HeaderUserGreeting";

const Header = ({ navigationText }) => {
  const navRef = useRef(null);                  // Reference to the navigation display element
  const [navWidth, setNavWidth] = useState(0);  // State to store navigation display width for dynamic background adjustment

  // This section sets the width of the navigation display which adds the current width and an offset to the left.
  useEffect(() => {
    if (navRef.current) {
      setNavWidth(navRef.current.offsetLeft + navRef.current.offsetWidth); 
    }
  }, [navigationText]);

  return (
    <>
      <Logo />
      <NavigationDisplay ref={navRef} text={navigationText} />
      <UserGreeting avoidWidth={navWidth} />
    </>
  );
};

export default Header;
