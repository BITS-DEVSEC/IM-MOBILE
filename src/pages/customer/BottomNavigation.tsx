import { Home, Car, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const tabs = [
    { id: "home", icon: <Home size={24} />, path: "/insurance" },
    { id: "motor", icon: <Car size={24} />, path: "/cars" },
    { id: "profile", icon: <User size={24} />, path: "/profile" },
  ];

  const handleTabChange = (path: string) => {
    navigate(path);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "white",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 0",
        borderTop: "1px solid #eaeaea",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.03)",
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => handleTabChange(tab.path)}
          style={{
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            color: activeTab === tab.id ? "#7E4005" : "#64748b",
          }}
        >
          {tab.icon}
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;
