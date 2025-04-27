// Login.jsx

// Importing necessary hooks and modules
import React, { useState, useEffect } from 'react';   // React core and state/effect hooks
import { useNavigate } from "react-router-dom";       // Necessary for route navigations

// Importing Firebase authentication methods
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../../Firebase Database/FirebaseConfig"; // Firebase config and auth instance

// Login component
const Login = () => {
  const navigate = useNavigate();                   // Used for redirecting user after login

  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login logic
  const handleLogIn = async () => {
    // Check for empty input fields
    if (!email || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    // Simple regex to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Firebase authentication: sign in with email and password
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;                       // Extract user info
        // Log basic user info (will be removed in production)
        console.log("Logged in successfully");
      })
      .catch((error) => {
        alert("❌ Login failed:\n" + error.message);              // Log error
      });                    
  };

  // Effect to check if user is already authenticated and redirect them
  useEffect(() => {
    // Changes tab name display
    document.title = "Login | Verde";
  
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");     // Redirect to dashboard if user is logged in
      }
    });

    // Cleanup function to remove listener on component unmount
    return () => unsubscribe();
  }, []);

  // JSX returned by the Login component
  return (
    <>
        {/* Form title */}
        <h2 className = "text-white text-2xl font-bold">
          Log In
        </h2>

        {/* Email input */}
        <input
          type = "email"
          placeholder = "Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)} // Update state on input
          className = "w-full max-w-sm px-4 py-2 border border-gray-300 rounded"
        />

        {/* Password input */}
        <input
          type = "password"
          placeholder = "Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} // Update state on input
          className = "w-full max-w-sm px-4 py-2 border border-gray-300 rounded"
        />

        {/* Login button */}
        <button
          onClick={() => handleLogIn()}
          className = "w-full max-w-sm text-center bg-black text-white text-lg py-2 px-4 rounded-[15px] hover:bg-[#064918] transition"
        >
          Login
        </button>

        {/* Redirect to sign-up */}
        <p className = "text-sm">
          Haven't registered yet?{" "}
          <span
            onClick={() => navigate("/signup")} // Redirect to sign-up page
            className = "text-blue-500 underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>

        {/* Back to welcome screen button */}
        <button
          onClick={() => navigate("/")} // Redirect to welcome screen
          className = "w-full max-w-sm text-center bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
    </>
  );
};

export default Login;
