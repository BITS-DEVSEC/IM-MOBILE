import { Card, Text, Title, SimpleGrid, Container, Box } from "@mantine/core";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockHomePolicies = [
  {
    id: "1",
    address: "123 Main St, Addis Ababa",
    type: "Apartment",
    coverage: "Full Coverage",
    expiryDate: "2024-12-31",
  },
  {
    id: "2",
    address: "456 Bole Rd, Addis Ababa",
    type: "Villa",
    coverage: "Basic Coverage",
    expiryDate: "2024-06-30",
  },
];

export default function HomePolicies() {
  const navigate = useNavigate();

  return (
    <Box style={{ maxWidth: 420, margin: "0 auto" }}>
      <Container py="md" px="md" style={{ paddingBottom: 80 }}>
        <Title order={3} mb="lg" ta="center">
          Your Home Policies
        </Title>

        <SimpleGrid cols={1} spacing="md">
          {mockHomePolicies.map((policy) => (
            <Card
              key={policy.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              onClick={() => navigate(`/policies/home/${policy.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Home size={32} color="#7E4005" />
                <div>
                  <Text fw={500} size="lg">
                    {policy.type}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {policy.address}
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
