// FinalHeaderUserGreeting.jsx

// Import required libraries and modules
  import React, { useEffect, useState } from "react";                                 // React + Hooks
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";                  // MUI icon for user avatar
  import { authentication, db } from "../../../Firebase Database/FirebaseConfig";     // Firebase Auth and Firestore config
  import { doc, getDoc } from "firebase/firestore";                                   // Firestore methods to fetch user data

// Define the UserGreeting component
const UserGreeting = ({ avoidWidth = 0 }) => {
  const [username, setUsername] = useState("");        // State to store username

  // Fetch user info based on userCredentials
  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = authentication.currentUser;         // Get the currently logged-in user

      if (user) {
        const docRef = doc(db, "Users", user.uid);     // Reference to Firestore document using UID
        const docSnap = await getDoc(docRef);          // Fetch document snapshot

        if (docSnap.exists()) {
          const data = docSnap.data();                 // Extract data from document
          setUsername(data.username);                  // Store username in state
        }
      }
    };

    fetchUserInfo();    // Call the function
  }, []);               // Empty dependency array = run once on mount

  const buffer = 8;       // ensure margin space
  const marginRight = 8;  // 1rem right spacing (same as mr-4)

  return (
    <div
      onClick={() => navigate("/account")} // Navigate to /profile on click
      style={{
        maxWidth: `calc(100% - ${avoidWidth + buffer + marginRight}px)`,    // Prevents overflow and account for navigationdisplay
        whiteSpace: "nowrap",                                               // prevent text wrapping
        overflow: "hidden",                                                 // hide overflowed text
        textOverflow: "ellipsis"                                            // show ... when text overflows
      }}
      className="
        ml-auto mr-4
        flex items-center gap-4                       // Flex layout with spacing between icon and text
        bg-blue-800 text-white                        // Blue background, white text
        px-6 py-3                                     // Internal padding
        rounded-md                                    // Rounded corners
        max-w-[300px]                                 // Limit maximum width
        transition-all duration-300 ease-in-out       // Smooth animation on hover
        cursor-pointer hover:bg-blue-700              // Pointer cursor + darker background on hover
      "
    >
      <AccountCircleIcon className="!text-white !text-4xl" /> {/* User icon */}
      
      <div className="flex flex-col text-left leading-tight">
        {/* Greeting message */}
        <span className="text-sm font-semibold">
          Hello{username ? `, ${username}` : ""}       {/* Show username if available */}
        </span>
        {/* User subtitle/role */}
        <span className="text-xs font-light">User</span>
      </div>
    </div>
  );
};

export default UserGreeting;
