import AppContainer from "../../../components/AppContainer";
import BottomNavigation from "../BottomNavigation";
import AccountSettings from "./AccountSettings";

export default function AccountSettingsPage() {
  return (
    <AppContainer>
      <div>
        <AccountSettings />
      </div>

      <BottomNavigation />
    </AppContainer>
  );
}
