import { Card, Text, Title, SimpleGrid, Container, Box } from "@mantine/core";
import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockLifePolicies = [
  {
    id: "1",
    name: "Gold Life Plan",
    beneficiary: "Family",
    coverage: "500,000 ETB",
    expiryDate: "2030-12-31",
  },
  {
    id: "2",
    name: "Basic Life Cover",
    beneficiary: "Spouse",
    coverage: "200,000 ETB",
    expiryDate: "2028-06-30",
  },
];

export default function LifePolicies() {
  const navigate = useNavigate();

  return (
    <Box style={{ maxWidth: 420, margin: "0 auto" }}>
      <Container py="md" px="md" style={{ paddingBottom: 80 }}>
        <Title order={3} mb="lg" ta="center">
          Your Life Policies
        </Title>

        <SimpleGrid cols={1} spacing="md">
          {mockLifePolicies.map((policy) => (
            <Card
              key={policy.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              onClick={() => navigate(`/policies/life/${policy.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <HeartPulse size={32} color="#7E4005" />
                <div>
                  <Text fw={500} size="lg">
                    {policy.name}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Beneficiary: {policy.beneficiary}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {policy.coverage} • Expires {policy.expiryDate}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
