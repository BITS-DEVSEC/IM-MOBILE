import { useState } from "react";
import { Tabs, rem, Flex, Title, ScrollArea } from "@mantine/core";
import { Car, Home, HeartPulse } from "lucide-react";
import MotorPolicies from "./MotorPolicies";
import HomePolicies from "./HomePolicies";
import LifePolicies from "./LifePolicies";
import BottomNavigation from "../BottomNavigation";
import AppContainer from "../../../components/AppContainer";

export default function PoliciesTabs() {
  const [activeTab, setActiveTab] = useState("motor");

  return (
    <AppContainer>
      <ScrollArea
        style={{
          paddingBottom: "72px",
        }}
      >
        <Flex align="center" justify="center" gap="md">
          <Title order={1} size="h2" c="gray.8" fw={600}>
            Policies
          </Title>
        </Flex>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(value) => {
            if (value !== null) {
              setActiveTab(value);
            }
          }}
        >
          <Tabs.List grow mb="md">
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

          {/* Tab Panels */}
          <Tabs.Panel value="home">
            <HomePolicies />
          </Tabs.Panel>

          <Tabs.Panel value="motor">
            <MotorPolicies />
          </Tabs.Panel>

          <Tabs.Panel value="life">
            <LifePolicies />
          </Tabs.Panel>
        </Tabs>
      </ScrollArea>

      <BottomNavigation />
    </AppContainer>
  );
}
