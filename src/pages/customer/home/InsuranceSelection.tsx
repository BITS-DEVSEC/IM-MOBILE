import {
  Container,
  Stack,
  Title,
  Card,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { Home, Car, Heart } from "lucide-react";
import WizardButton from "../../../components/WizardButton"; // Adjust the path if necessary
import { useState } from "react";

interface InsuranceSelectionProps {
  selectedInsurance: string | null;
  onSelectInsurance: (id: string) => void;
  onMotorSelected: () => void;
  onOtherSelected: (type: string) => void;
}

const InsuranceSelection = ({
  selectedInsurance: initialSelectedInsurance,
  onSelectInsurance,
  onMotorSelected,
  onOtherSelected,
}: InsuranceSelectionProps) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.primary[8]; // Using shade 8 from your primary color tuple
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(
    initialSelectedInsurance
  );

  const insuranceOptions = [
    {
      id: "home",
      label: "Home Insurance",
      description: "Protect your home and belongings",
      icon: Home,
    },
    {
      id: "motor",
      label: "Motor Insurance",
      description: "Coverage for your vehicle",
      icon: Car,
    },
    {
      id: "life",
      label: "Life Insurance",
      description: "Secure your family's future",
      icon: Heart,
    },
  ];

  const handleCardClick = (id: string) => {
    setSelectedInsurance(id);
  };

  const handleContinue = () => {
    if (selectedInsurance) {
      onSelectInsurance(selectedInsurance);
      if (selectedInsurance === "motor") {
        onMotorSelected();
      } else {
        onOtherSelected(selectedInsurance);
      }
    }
  };

  return (
    <Container size="xs" py="md" style={{ height: "calc(100% - 72px)" }}>
      <div
        style={{
          background: `linear-gradient(to right, ${theme.colors.primary[5]}, ${theme.colors.primary[7]})`,
          padding: theme.spacing.md,
          color: "white",
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Title order={2} style={{ fontWeight: 700 }}>
          Insurance Marketplace
        </Title>
        <Text size="sm" style={{ opacity: 0.9, marginTop: theme.spacing.xs }}>
          Find the perfect coverage for you
        </Text>
      </div>

      <Title
        order={3}
        style={{
          color: theme.colors.dark[7],
          fontWeight: 600,
          marginBottom: theme.spacing.md,
        }}
      >
        Select Insurance Type
      </Title>

      <Stack gap="md">
        {insuranceOptions.map((option) => (
          <Card
            key={option.id}
            padding="md"
            radius="md"
            withBorder
            onClick={() => handleCardClick(option.id)}
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              border:
                selectedInsurance === option.id
                  ? `2px solid ${primaryColor}`
                  : `1px solid ${theme.colors.gray[2]}`,
              backgroundColor: "white",
              boxShadow:
                selectedInsurance === option.id
                  ? theme.shadows.md
                  : theme.shadows.sm,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.md,
              }}
            >
              <ThemeIcon
                size="xl"
                radius="xl"
                variant="light"
                color={selectedInsurance === option.id ? "primary" : "gray"}
                style={{
                  backgroundColor:
                    selectedInsurance === option.id
                      ? theme.colors.primary[0]
                      : theme.colors.gray[0],
                }}
              >
                <option.icon size={24} color={primaryColor} />
              </ThemeIcon>
              <div>
                <Text fw={500} c="dark.7">
                  {option.label}
                </Text>
                <Text size="sm" c="dimmed">
                  {option.description}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </Stack>

      <div style={{ marginTop: theme.spacing.xl }}>
        <WizardButton
          variant="continue"
          onClick={handleContinue}
          disabled={!selectedInsurance}
        />
      </div>
    </Container>
  );
};

export default InsuranceSelection;
