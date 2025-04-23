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

const mockLifeDetails = {
  "1": {
    planName: "Gold Life Plan",
    policyNumber: "LIF-2023-001",
    coverageAmount: "500,000 ETB",
    beneficiary: "Family (Spouse & Children)",
    premiumAmount: "1,500 ETB/month",
    startDate: "2023-01-10",
    expiryDate: "2043-01-10",
    medicalCoverage: "Included",
    accidentalDeath: "Double Coverage",
  },
  "2": {
    planName: "Basic Life Cover",
    policyNumber: "LIF-2022-078",
    coverageAmount: "200,000 ETB",
    beneficiary: "Spouse Only",
    premiumAmount: "800 ETB/month",
    startDate: "2022-05-15",
    expiryDate: "2042-05-15",
    medicalCoverage: "Not Included",
    accidentalDeath: "Standard Coverage",
  },
};

export default function LifePolicyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const policy = mockLifeDetails[id as keyof typeof mockLifeDetails];

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
          {policy.planName} Details
        </Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <SimpleGrid cols={2}>
            <div>
              <Text size="sm" c="dimmed">
                Policy Number
              </Text>
              <Text fw={500}>{policy.policyNumber}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Plan Name
              </Text>
              <Text fw={500}>{policy.planName}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Start Date
              </Text>
              <Text fw={500}>{policy.startDate}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Expiry Date
              </Text>
              <Text fw={500}>{policy.expiryDate}</Text>
            </div>
          </SimpleGrid>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <Title order={4} mb="md">
            Beneficiary Details
          </Title>
          <SimpleGrid cols={1}>
            <div>
              <Text size="sm" c="dimmed">
                Beneficiary
              </Text>
              <Text fw={500}>{policy.beneficiary}</Text>
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
                Coverage Amount
              </Text>
              <Text fw={500}>{policy.coverageAmount}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Premium Amount
              </Text>
              <Text fw={500}>{policy.premiumAmount}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Medical Coverage
              </Text>
              <Text fw={500}>{policy.medicalCoverage}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Accidental Death
              </Text>
              <Text fw={500}>{policy.accidentalDeath}</Text>
            </div>
          </SimpleGrid>
        </Card>
      </Container>

      <BottomNavigation />
    </Box>
  );
}
