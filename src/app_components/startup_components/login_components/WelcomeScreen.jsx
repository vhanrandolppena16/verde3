// WelcomeScreen.jsx
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
      document.title = "Welcome | Verde";
    }, []);
  
    return (
      <>
          <h2 className="text-white text-2xl font-bold">Getting Started</h2>
          <button
            onClick={() => navigate("/login")}
            className="w-full text-center bg-black text-white text-lg py-2 px-4 rounded-[15px] hover:bg-[#064918] transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full text-center bg-black text-white text-lg py-2 px-4 rounded-[15px] hover:bg-[#064918] transition"
          >
            Sign Up
          </button>
      </>
    );
  };
  
  export default WelcomeScreen;
  