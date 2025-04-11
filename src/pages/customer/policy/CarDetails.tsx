import {
  Card,
  Text,
  Title,
  Container,
  Group,
  Button,
  SimpleGrid,
  Box,
  Badge,
} from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavigation from "../BottomNavigation";

const mockCarDetails = {
  "1": {
    make: "Toyota",
    model: "Corolla",
    year: "2022",
    plateNumber: "ABC1234",
    chassisNumber: "JTDKARFU123456789",
    engineNumber: "2ZR1234567",
    insuranceType: "Comprehensive",
    coverageLimit: "200,000 ETB",
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0], // Active (1 year from now)
  },
  "2": {
    make: "Honda",
    model: "Civic",
    year: "2021",
    plateNumber: "XYZ5678",
    chassisNumber: "19XFC2F58LE123456",
    engineNumber: "R18A1234567",
    insuranceType: "Third Party",
    coverageLimit: "250,000 ETB",
    expiryDate: "2023-06-30", // Expired (past date)
  },
};

export default function CarDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const car = mockCarDetails[id as keyof typeof mockCarDetails];

  // Function to check if insurance is active
  const isInsuranceActive = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today <= expiry;
  };

  if (!car) {
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
          <Text>Car not found</Text>
        </Container>
        <BottomNavigation />
      </Box>
    );
  }

  const insuranceStatus = isInsuranceActive(car.expiryDate)
    ? "Active"
    : "Expired";
  const statusColor = insuranceStatus === "Active" ? "green" : "red";

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
          <Button
            variant="subtle"
            leftSection={<ArrowLeft size={16} />}
            onClick={() => navigate("/policies")}
          >
            Back to Vehicles
          </Button>
        </Group>

        <Title order={3} mb="lg">
          {car.make} {car.model} Details
        </Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <SimpleGrid cols={2}>
            <div>
              <Text size="sm" c="dimmed">
                Make
              </Text>
              <Text fw={500}>{car.make}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Model
              </Text>
              <Text fw={500}>{car.model}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Year
              </Text>
              <Text fw={500}>{car.year}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Plate Number
              </Text>
              <Text fw={500}>{car.plateNumber}</Text>
            </div>
          </SimpleGrid>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Insurance Details
          </Title>
          <SimpleGrid cols={2}>
            <div>
              <Text size="sm" c="dimmed">
                Insurance Type
              </Text>
              <Text fw={500}>{car.insuranceType}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Coverage Limit
              </Text>
              <Text fw={500}>{car.coverageLimit}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Expiry Date
              </Text>
              <Group gap="xs">
                <Text fw={500}>{car.expiryDate}</Text>
                <Badge color={statusColor} variant="light">
                  {insuranceStatus}
                </Badge>
              </Group>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Chassis Number
              </Text>
              <Text fw={500}>{car.chassisNumber}</Text>
            </div>
          </SimpleGrid>

          {!isInsuranceActive(car.expiryDate) && (
            <Button
              fullWidth
              mt="md"
              variant="light"
              color="white"
              bg={"primary"}
              onClick={() => {
                // Add renew logic here
                console.log("Renew insurance for", car.plateNumber);
              }}
            >
              Renew Insurance
            </Button>
          )}
        </Card>
      </Container>

      <BottomNavigation />
    </Box>
  );
}
