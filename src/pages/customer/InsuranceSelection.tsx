import { Container, Stack, Title, Card } from "@mantine/core";
import { Home, Car, HeartPulse } from "lucide-react";

interface InsuranceSelectionProps {
  selectedInsurance: string | null;
  onSelectInsurance: (id: string) => void;
  onMotorSelected: () => void; // New prop for motor-specific flow
  onOtherSelected: (type: string) => void; // New prop for other insurance types
}

const InsuranceSelection = ({
  selectedInsurance,
  onSelectInsurance,
  onMotorSelected,
  onOtherSelected,
}: InsuranceSelectionProps) => {
  const insuranceOptions = [
    {
      id: "home",
      label: "Home Insurance",
      icon: <Home size={40} color="#3b82f6" />,
    },
    {
      id: "motor",
      label: "Motor Insurance",
      icon: <Car size={40} color="#22c55e" />,
    },
    {
      id: "life",
      label: "Life Insurance",
      icon: <HeartPulse size={40} color="#a855f7" />,
    },
  ];

  const handleInsuranceSelect = (id: string) => {
    onSelectInsurance(id);
    if (id === "motor") {
      onMotorSelected(); // Special flow for motor insurance
    } else {
      onOtherSelected(id); // Different flow for other types
    }
  };

  return (
    <Container
      size="xs"
      py="md"
      style={{
        height: "calc(100% - 72px)",
        display: "flex",
        flexDirection: "column",
        padding: "84px",
      }}
    >
      <Title
        order={3}
        style={{
          marginBottom: "24px",
          color: "#2c3e50",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Select Insurance Type
      </Title>

      <Stack gap="md" mt="md">
        {insuranceOptions.map((option) => (
          <Card
            key={option.id}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            onClick={() => handleInsuranceSelect(option.id)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "all 0.2s ease",
              border:
                selectedInsurance === option.id
                  ? "2px solid #7E4005"
                  : "1px solid #e0e0e0",
              backgroundColor: "white",
            }}
          >
            {option.icon}
            <span
              style={{ fontSize: "16px", fontWeight: 500, color: "#2c3e50" }}
            >
              {option.label}
            </span>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default InsuranceSelection;
