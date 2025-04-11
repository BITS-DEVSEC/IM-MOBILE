import { Tabs, rem, Box } from "@mantine/core";
import { Car, Home, HeartPulse } from "lucide-react";
import MotorPolicies from "./MotorPolicies";
import HomePolicies from "./HomePolicies";
import LifePolicies from "./LifePolicies";
import BottomNavigation from "../BottomNavigation";

export default function PoliciesTabs() {
  return (
    <Box maw={420} mx="auto">
      <Tabs defaultValue="motor" variant="pills" radius="md">
        <Tabs.List grow>
          <Tabs.Tab
            value="home"
            leftSection={<Home style={{ width: rem(16), height: rem(16) }} />}
          >
            Home
          </Tabs.Tab>
          <Tabs.Tab
            value="motor"
            leftSection={<Car style={{ width: rem(16), height: rem(16) }} />}
          >
            Motor
          </Tabs.Tab>
          <Tabs.Tab
            value="life"
            leftSection={
              <HeartPulse style={{ width: rem(16), height: rem(16) }} />
            }
          >
            Life
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="home" pt="md">
          <HomePolicies />
        </Tabs.Panel>

        <Tabs.Panel value="motor" pt="md">
          <MotorPolicies />
        </Tabs.Panel>

        <Tabs.Panel value="life" pt="md">
          <LifePolicies />
        </Tabs.Panel>

        <BottomNavigation />
      </Tabs>
    </Box>
  );
}
