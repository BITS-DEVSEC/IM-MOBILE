import { Box } from "@mantine/core";
import BottomNavigation from "../BottomNavigation";
import AccountSettings from "./AccountSettings";

export default function AccountSettingsPage() {
  return (
    <Box
      style={{
        maxWidth: 420,
        margin: "0 auto",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <AccountSettings />
      <BottomNavigation />
    </Box>
  );
}
