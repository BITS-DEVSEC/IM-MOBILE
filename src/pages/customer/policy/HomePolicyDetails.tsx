import {
  Card,
  Text,
  Title,
  Container,
  Group,
  SimpleGrid,
  Box,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavigation from "../BottomNavigation";
import BackButton from "../../../components/button/BackButton";

const mockHomeDetails = {
  "1": {
    address: "123 Main St, Addis Ababa",
    type: "Apartment",
    coverageType: "Full Coverage",
    coverageLimit: "5,000,000 ETB",
    expiryDate: "2024-12-31",
    policyNumber: "HOM-2022-001",
    startDate: "2022-01-15",
    premiumAmount: "12,000 ETB/month",
  },
  "2": {
    address: "456 Bole Rd, Addis Ababa",
    type: "Villa",
    coverageType: "Basic Coverage",
    coverageLimit: "2,500,000 ETB",
    expiryDate: "2024-06-30",
    policyNumber: "HOM-2021-045",
    startDate: "2021-07-01",
    premiumAmount: "8,500 ETB/month",
  },
};

export default function HomePolicyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const policy = mockHomeDetails[id as keyof typeof mockHomeDetails];

  if (!policy) {
    return (
      <Box
        style={{
          maxWidth: 420,
          margin: "0 auto",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Container>
          <Text>Policy not found</Text>
        </Container>
        <BottomNavigation />
      </Box>
    );
  }

  return (
    <Box
      style={{
        maxWidth: 420,
        margin: "0 auto",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Container py="md" px="md" style={{ paddingBottom: 80 }}>
        <Group mb="md">
          <BackButton onClick={() => navigate("/policies")} />
        </Group>

        <Title order={3} mb="lg">
          {policy.type} Policy Details
        </Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <SimpleGrid cols={2}>
            <div>
              <Text size="sm" c="dimmed">
                Property Type
              </Text>
              <Text fw={500}>{policy.type}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Address
              </Text>
              <Text fw={500}>{policy.address}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Policy Number
              </Text>
              <Text fw={500}>{policy.policyNumber}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Start Date
              </Text>
              <Text fw={500}>{policy.startDate}</Text>
            </div>
          </SimpleGrid>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Coverage Details
          </Title>
          <SimpleGrid cols={2}>
            <div>
              <Text size="sm" c="dimmed">
                Coverage Type
              </Text>
              <Text fw={500}>{policy.coverageType}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Coverage Limit
              </Text>
              <Text fw={500}>{policy.coverageLimit}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Premium Amount
              </Text>
              <Text fw={500}>{policy.premiumAmount}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Expiry Date
              </Text>
              <Text fw={500}>{policy.expiryDate}</Text>
            </div>
          </SimpleGrid>
        </Card>
      </Container>

      <BottomNavigation />
    </Box>
  );
}
