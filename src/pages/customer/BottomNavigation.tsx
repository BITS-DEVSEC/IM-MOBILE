import { Home, Shield, User, ShoppingBag, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Text, Paper } from "@mantine/core";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "home", icon: Home, label: "Home", path: "/dashboard" },
    {
      id: "marketplace",
      icon: ShoppingBag,
      label: "Marketplace",
      path: "/insurance",
    },
    { id: "insurance", icon: Shield, label: "Policies", path: "/policies" },
    { id: "claims", icon: FileText, label: "Claims", path: "/claims" },
    { id: "account", icon: User, label: "Account", path: "/account" },
  ];

  const activeTab =
    tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || "home";

  const handleTabChange = (path: string) => {
    navigate(path);
  };

  return (
    <Paper
      radius={0}
      withBorder
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        borderTop: "1px solid #e2e8f0",
        backgroundColor: "white",
        height: "64px",
        zIndex: 100,
        width: "420px",
        maxWidth: "100%",
      }}
    >
      <Flex justify="space-around" align="center" h="100%">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <Flex
              key={tab.id}
              direction="column"
              align="center"
              justify="center"
              onClick={() => handleTabChange(tab.path)}
              style={{
                cursor: "pointer",
                flex: 1,
                padding: "0.5rem 0",
              }}
            >
              <Box>
                <Icon size={20} color={isActive ? "#7E4005" : "#64748b"} />
              </Box>
              <Text
                size="xs"
                mt={4}
                c={isActive ? "#7E4005" : "#64748b"}
                style={{
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {tab.label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Paper>
  );
};

export default BottomNavigation;
