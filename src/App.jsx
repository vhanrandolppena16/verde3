// App.jsx

// Importing the Routes and Route components from react-router to handle routing in the app
import { Routes, Route } from "react-router";

// Importing custom components used in the app
  // Importing components for user authentication
    import AuthLayout from "./app_components/startup_components/AuthLayout";                         // Serves as the base for the Welcome Screen
    import WelcomeScreen from "./app_components/startup_components/login_components/WelcomeScreen";  // Choose between Login or SignUp
    import Login from "./app_components/startup_components/login_components/Login";                  // Login form component
    import SignUp from "./app_components/startup_components/login_components/Signup";                // Sign-up/registration form component

  // Importing components for the project content such as environmental parameter monitoring, prediction, and control.
    import Home from "./app_components/home_components/Home";                           
    import Dashboard from "./app_components/home_components/content_components/Dashboard/Dashboard";
    import SensorGraph from "./app_components/home_components/content_components/Data Analytics/Analytics";
    import Dataset from "./app_components/home_components/content_components/Data/Dataset";
    import LiveStreamPage from "./app_components/home_components/content_components/LiveStream/LiveStream";
    import Logs from "./app_components/home_components/content_components/SensorLogs/SensorLogs";
    import Control from "./app_components/home_components/content_components/Env Parameter Control/Control";
    import AlertModal from "./app_components/home_components/content_components/SensorLogs/AlertModal";

// Main App component
function App() {
  return (
    <>
      {/* Rendering the AppBackground component to set the background visuals */}
      <Routes>
        <Route path="/" element={<AuthLayout />}>                          
          <Route path="/" element={<WelcomeScreen />} />  {/* Welcome screen route (root path) */}
          <Route path="/login" element={<Login />} />     {/* Login screen route */}
          <Route path="/signup" element={<SignUp />} />   {/* Sign Up screen route */}
        </Route>

      {/* 
        Rendering the component for the dashboard and contents of the Application
        which includes the header, sidebar, and content area.
      */}
      <Route path='/' element={<Home/>}>                            {/* Base route (Header, Sidebar, and Content Area) */}
          <Route path="/dashboard" element={<Dashboard/>}/>         {/* Presents real-time current environmental parameters*/}
          <Route path='/analysis' element={<SensorGraph />}/>       {/* Displays the trends of the environmental Parameters and Prediction */}
          <Route path='/dataset' element={<Dataset />}/>            {/* Displays the data in table format which includes environmental parameter, true day, and prediction */}
          <Route path='/control'element={<Control />}/>             {/* Displays the interface for the manual control system */}
          <Route path='/logs' element={<Logs />}/>                  {/* Displays the occurence of alerts, higher or lower than threshold */}
          <Route path='/livestream' element={<LiveStreamPage />}/>  {/* Displays the real-time monitoring of the plants*/}
          <Route path='/logout'/>                                   {/* Allows the user to logout */}
        </Route>
      </Routes>

      <AlertModal/> {/* Allows overlaying the alerts in all routes */}
    </>
  )
}

// Exporting the App component as default
export default App;
