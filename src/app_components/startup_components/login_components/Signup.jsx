// SignUp.jsx

// Importing Libraries
import React, { useState, useEffect } from 'react';                       // Import React and its hooks
import { useNavigate } from "react-router-dom";                           // Import useNavigate for application navigation
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";  // Import Firebase method to create users with email & password
import { doc, setDoc } from "firebase/firestore";                         // Import Firestore methods to set document

// Importing Other Resources
import { authentication, db } from "../../../Firebase Database/FirebaseConfig";  // Import Firebase config (authentication and database instances)

// Define SignUp component
const SignUp = () => {
  // Initialize navigate function
  const navigate = useNavigate();

  // State variables for form inputs
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Sign Up | Verde";
  }, []);

  // Function to handle signup logic
  const handleSignUp = async () => {
    // Check if any field is empty
    if (!email || !password || !username || !company) {
      alert("Please fill in all the fields.");    // Show alert
      return;                                     // Stop execution
    }

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address."); // Show alert
      return;                                       // Stop execution
    }

    // Password validation pattern (min 8 chars, uppercase, lowercase, number, special char)
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^()\-_=+])[A-Za-z\d@$!%*#?&^()\-_=+]{8,}$/;

    // Check password against pattern
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return; // Stop execution
    }

    try {
      // Create user using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
      const user = userCredential.user;             // Get user object
      console.log("Registered with:", user.email);  // Log email

      // Save additional user info in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        company: company,
        username: username
      });

      await signOut(authentication); // Force logout
      navigate("/login"); // Navigate to login

    } catch (error) {
      // Log and show error
      console.log("Sign up error:", error);
      alert("Error during sign up: " + error.message);
    }
  };

  // Render UI
  return (
    <>
        {/* Signup title */}
        <h2 className="text-white text-2xl font-bold">Sign Up</h2>

        {/* Signup form */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleSignUp(); // Call sign up logic
          }}
          className="flex flex-col items-center gap-4 w-full"
        >
          {/* Company Name input */}
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded"
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded"
          />

          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="w-full max-w-sm text-center bg-black text-white text-lg py-2 px-4 rounded-[15px] hover:bg-[#064918] transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login redirect text */}
        <p className="text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")} // Redirect to login page
            className="text-blue-500 underline cursor-pointer"
          >
            Log In
          </span>
        </p>

        {/* Back to landing page button */}
        <button
          onClick={() => navigate("/")} // Redirect to home page
          className="w-full max-w-sm text-center bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
    </>
  );
};

// Export SignUp component for use in the app
export default SignUp;
