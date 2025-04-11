import { Card, Text, Title, SimpleGrid, Container, Box } from "@mantine/core";
import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockInsuredCars = [
  {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: "2022",
    plateNumber: "ABC1234",
    insuranceType: "Comprehensive",
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: "2021",
    plateNumber: "XYZ5678",
    insuranceType: "Third Party",
  },
];

export default function MotorPolicies() {
  const navigate = useNavigate();

  return (
    <Box style={{ maxWidth: 420, margin: "0 auto" }}>
      <Container py="md" px="md" style={{ paddingBottom: 80 }}>
        <Title order={3} mb="lg" ta="center">
          Your Motor Policies
        </Title>

        <SimpleGrid cols={1} spacing="md">
          {mockInsuredCars.map((car) => (
            <Card
              key={car.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              onClick={() => navigate(`/policies/motor/${car.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Car size={32} color="#7E4005" />
                <div>
                  <Text fw={500} size="lg">
                    {car.make} {car.model} ({car.year})
                  </Text>
                  <Text size="sm" c="dimmed">
                    {car.plateNumber} • {car.insuranceType}
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
