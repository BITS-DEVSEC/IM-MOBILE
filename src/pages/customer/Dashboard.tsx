import {
  Card,
  Text,
  Button,
  Flex,
  Grid,
  Paper,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { FileText, Plus, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import "@mantine/core/styles.css";
import BottomNavigation from "./BottomNavigation";
import AppContainer from "../../components/AppContainer";

export function Dashboard() {
  const theme = useMantineTheme();

  return (
    <AppContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "420px",
          background: "white",
          fontSize: "21px",
          borderBottom: "1px solid #eaeaea",
          paddingBottom: "8px",
          paddingTop: "8px",
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: "62px",
          margin: "16px",
        }}
      >
        <Flex justify="space-between" align="center" mb="lg">
          <Title order={1} size="h2" c="gray.8" fw={600}>
            Welcome, Abel
          </Title>
        </Flex>

        {/* Insurance Summary Section */}
        <div
          style={{
            background: `linear-gradient(to right, ${theme.colors.primary[5]}, ${theme.colors.primary[7]})`,
            padding: theme.spacing.md,
            color: "white",
            marginBottom: theme.spacing.xl,
            textAlign: "center",
            borderRadius: theme.radius.md,
          }}
        >
          <Flex justify="space-between" align="center" mb="md">
            <Text size="lg" fw={500}>
              Your Insurance Summary
            </Text>
            <Shield size={24} />
          </Flex>

          <Flex justify="space-between" mb="sm">
            <Text>Active Policies</Text>
            <Text fw={600}>2</Text>
          </Flex>
          <Flex justify="space-between" mb="sm">
            <Text>Pending Claims</Text>
            <Text fw={600}>0</Text>
          </Flex>
          <Flex justify="space-between" mb="sm">
            <Text>Next Payment</Text>
            <Text fw={600}>May 15, 2025</Text>
          </Flex>
          <Button
            component={Link}
            to="/policies"
            fullWidth
            mt="md"
            bg="white"
            c="primary.8"
            styles={{ root: { "&:hover": { backgroundColor: "gray.1" } } }}
          >
            View All Policies
          </Button>
        </div>

        {/* Cards Section */}
        <Grid gutter="md" mb="lg">
          <Grid.Col span={6}>
            <Card withBorder radius="md">
              <Flex direction="column" align="center" gap="sm" p="md">
                <Shield size={32} color="#7E4005" />
                <Text fw={500}>Add Insurance</Text>
                <Text size="xs" c="gray.6">
                  Buy a new policy
                </Text>
                <Button
                  component={Link}
                  to="/insurance"
                  variant="outline"
                  size="sm"
                  fullWidth
                  leftSection={<Plus size={16} />}
                >
                  Add
                </Button>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder radius="md">
              <Flex direction="column" align="center" gap="sm" p="md">
                <FileText size={32} color="#7E4005" />
                <Text fw={500}>File Claim</Text>
                <Text size="xs" c="gray.6">
                  Report an incident
                </Text>
                <Button
                  component={Link}
                  to="/claims/new"
                  variant="outline"
                  size="sm"
                  fullWidth
                  leftSection={<Plus size={16} />}
                >
                  New
                </Button>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Alerts Section */}
        <Title order={2} size="h3" c="gray.8" fw={600} mt="lg" mb="sm">
          Alerts
        </Title>
        <Paper
          radius="md"
          bg="red.0"
          style={{ border: "1px solid var(--mantine-color-red-2)" }}
          p="md"
          mb="lg"
        >
          <Flex gap="sm" align="flex-start">
            <AlertTriangle
              size={20}
              color="var(--mantine-color-red-6)"
              style={{ flexShrink: 0 }}
            />
            <div>
              <Text fw={500} c="gray.8">
                Policy Expiring Soon
              </Text>
              <Text size="sm" c="gray.6">
                Your Honda Civic policy expires on June 30, 2023.
              </Text>
              <Button
                component={Link}
                to="/policies/motor/2"
                variant="subtle"
                p={0}
                h="auto"
                mt={4}
                c="primary.8"
              >
                Renew Now
              </Button>
            </div>
          </Flex>
        </Paper>

        {/* Learn About Insurance Section */}
        <Title order={2} size="h3" c="gray.8" fw={600} mt="lg" mb="sm">
          Learn About Insurance
        </Title>
        <Paper
          radius="md"
          bg="blue.0"
          style={{ border: "1px solid var(--mantine-color-blue-2)" }}
          p="md"
          mb="lg"
        >
          <Flex gap="sm" align="flex-start">
            <Shield
              size={20}
              color="var(--mantine-color-blue-6)"
              style={{ flexShrink: 0 }}
            />
            <div>
              <Text fw={500} c="gray.8">
                Insurance Basics
              </Text>
              <Text size="sm" c="gray.6">
                Learn about different types of insurance and coverage options.
              </Text>
              <Button
                component={Link}
                to="/learn"
                variant="subtle"
                p={0}
                h="auto"
                mt={4}
                c="primary.8"
              >
                Learn More
              </Button>
            </div>
          </Flex>
        </Paper>
      </div>
      <BottomNavigation />
    </AppContainer>
  );
}
