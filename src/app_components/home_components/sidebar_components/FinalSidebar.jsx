// FinalSidebar.jsx

// Importing Libraries
  import React from "react";
  import { useNavigate } from "react-router-dom";
  // Importing MUI Icons
    import {
      ChevronRight,
      ChevronLeft,
      Dashboard as DashboardIcon,
      Assessment as AssessmentIcon,
      Dataset as DatasetIcon,
      Settings as SettingsIcon,
      AccountCircle as AccountCircleIcon,
      Info as InfoIcon,
      Logout as LogoutIcon,
      LiveTv as LiveTvIcon,
    } from "@mui/icons-material";

// Importing Authentication for the Logout Button    
  import { authentication } from "../../../Firebase Database/FirebaseConfig";

const Sidebar = ({ setNavigationText, collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");  
    if (confirmed) {
      authentication
        .signOut()
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };
  
  // Declaration of Navigation Buttons
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { text: "Analysis", icon: <AssessmentIcon />, route: "/analysis" },
    { text: "Dataset", icon: <DatasetIcon />, route: "/dataset" },
    { text: "Control", icon: <SettingsIcon />, route: "/control" },
    { text: "Logs", icon: <SettingsIcon />, route: "/logs" },
    { text: "Live Stream", icon: <LiveTvIcon />, route: "/livestream" },
  ];

  // Function which stores an item and passes the text and route to the setNav and navigate functions respectively 
  const handleItemClick = (item) => {
    setNavigationText(item.text);
    navigate(item.route);
  };

  return (
    // Sidebar Container which has a condition based if the button is toggled for expansion or collapse of sidebar
    <div
      className={`${
        collapsed ? "w-[105px]" : "w-[250px]"
      } h-[calc(100vh-80px)]
      flex flex-col justify-between
      bg-pink-100 shadow-md
      transition-all duration-500 ease-in-out       
      fixed top-20 left-0 z-50 p-2`}
    >
      {/* Top section (toggle + menu items) */}
      <div>
        {/* Toggle Button */}
        <div
            className={`flex ${
                collapsed ? "justify-start" : "justify-end"
            } w-full mb-4`}
            >
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="
                text-black w-12 h-12
                flex items-center justify-center
                rounded-full
                transition-all duration-300
                hover:bg-green-200 hover:scale-110
                shadow
                "
            >
                {collapsed ? (
                <ChevronRight fontSize="large" />
                ) : (
                <ChevronLeft fontSize="large" />
                )}
            </button>
        </div>

        {/* Main Navigation Buttons */}
        <div
          className={`flex flex-col ${
            collapsed ? "items-start ml-4" : "items-end"
          } w-full pr-5 `}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className="flex items-center gap-4 bg-gradient-to-b from-green-400 to-green-700 text-white font-semibold py-2 px-4 rounded-full mb-3 transition-all duration-300 hover:from-green-500 hover:to-green-800 w-[90%] max-w-[220px]"
            >
              <span className="text-black min-w-[30px] flex justify-center">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-outfit text-black text-[16px] font-semibold transition-all duration-300">
                  {item.text}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button at Bottom */}
      <div
        className={`flex ${
          collapsed ? "justify-start" : "justify-end"
        } w-full pr-2 mb-2`}
      >
        <button
            onClick={handleLogout}
            className="flex items-center gap-4 bg-white border border-red-500 text-red-600 font-semibold py-2 px-4 rounded-full w-[90%] max-w-[220px] transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
            <span className="min-w-[30px] flex justify-center">
                <LogoutIcon />
            </span>
            {!collapsed && (
                <span className="font-outfit text-[16px] font-semibold">
                Log Out
                </span>
            )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
