import { useState } from "react";
import {
  Card,
  Text,
  Title,
  Button,
  Group,
  Stack,
  Box,
  Radio,
  Collapse,
  Divider,
  ScrollArea,
  Alert,
  TextInput,
} from "@mantine/core";
import { Heart, AlertTriangle, ChevronDown, Info } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../context/AuthContext";

interface LifeInsuranceOptionsProps {
  coverageType: string; // e.g., "Term Plan", "Whole Life"
  onBack: () => void;
  onNext: () => void;
}

export default function LifeInsuranceOptions({
  coverageType,
  onBack,
  onNext,
}: LifeInsuranceOptionsProps) {
  const { accessToken } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Define coverage level options for Life insurance
  const coverageOptions = [
    {
      value: "basic",
      label: "Basic Coverage",
      description: "$100,000 coverage",
      icon: <Heart size={20} />,
      details: [
        "Affordable option",
        "Covers essential needs",
        "Fixed payout for beneficiaries",
        "Short-term protection",
      ],
    },
    {
      value: "standard",
      label: "Standard Coverage",
      description: "$250,000 coverage",
      icon: <Heart size={20} />,
      details: [
        "Balanced coverage",
        "Supports family needs",
        "Flexible beneficiary options",
        "Medium-term security",
      ],
    },
    {
      value: "premium",
      label: "Premium Coverage",
      description: "$500,000+ coverage",
      icon: <Heart size={20} />,
      details: [
        "Comprehensive protection",
        "High payout for beneficiaries",
        "Long-term financial security",
        "Includes additional benefits",
      ],
    },
  ];

  const toggleDetails = (value: string) => {
    setExpandedCard(expandedCard === value ? null : value);
  };

  const handleSubmit = async () => {
    if (!selected) {
      setError("Please select a coverage level");
      notifications.show({
        message: "Please select a coverage level",
        color: "red",
        icon: <AlertTriangle />,
      });
      return;
    }

    if (!beneficiaryName.trim()) {
      setError("Beneficiary Name is required");
      notifications.show({
        message: "Please enter a beneficiary name",
        color: "red",
        icon: <AlertTriangle />,
      });
      return;
    }

    try {
      const response = await fetch("/api/insurance_applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          insurance_type: "Life",
          coverage_type: coverageType,
          coverage_level: selected,
          beneficiary_name: beneficiaryName,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      notifications.show({
        message: "Life insurance application submitted successfully",
        color: "green",
      });
      onNext();
    } catch (err) {
      const message = (err as Error).message || "Failed to submit application";
      setError(message);
      notifications.show({
        message,
        color: "red",
        icon: <AlertTriangle />,
      });
    }
  };

  return (
    <Box style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Group mb="md">
        <BackButton onClick={onBack} />
      </Group>

      <ScrollArea style={{ flex: 1 }} px="md">
        <Title
          order={2}
          fw={700}
          mb="xs"
          c="primary.8"
          style={{ textAlign: "center" }}
        >
          Life Insurance Options
        </Title>
        <Alert
          variant="light"
          color="primary"
          radius="md"
          mb="xl"
          icon={<Info size={18} />}
        >
          <Text size="sm">
            Select your coverage level and provide a beneficiary name.
          </Text>
        </Alert>

        <Radio.Group value={selected} onChange={setSelected}>
          <Stack gap="sm">
            {coverageOptions.map((option) => (
              <Card
                key={option.value}
                withBorder
                shadow="sm"
                radius="md"
                px="lg"
                py="sm"
                style={{ cursor: "pointer" }}
              >
                <Box onClick={() => setSelected(option.value)}>
                  <Group justify="space-between">
                    <Group gap="sm">
                      <Radio value={option.value} />
                      <Box>
                        <Group gap="xs">
                          {option.icon}
                          <Text fw={500}>{option.label}</Text>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {option.description}
                        </Text>
                      </Box>
                    </Group>
                    <Button
                      variant="subtle"
                      size="compact-sm"
                      rightSection={
                        <ChevronDown
                          size={14}
                          style={{
                            transform:
                              expandedCard === option.value
                                ? "rotate(180deg)"
                                : "none",
                            transition: "transform 200ms ease",
                          }}
                        />
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDetails(option.value);
                      }}
                    >
                      Details
                    </Button>
                  </Group>
                </Box>

                <Collapse in={expandedCard === option.value}>
                  <Divider my="sm" />
                  <Stack gap="xs" pl={36}>
                    {option.details.map((detail, index) => (
                      <Group gap="sm" key={index}>
                        <Box
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "var(--mantine-color-blue-6)",
                          }}
                        />
                        <Text size="sm">{detail}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Collapse>
              </Card>
            ))}
          </Stack>
        </Radio.Group>

        <TextInput
          label="Beneficiary Name"
          placeholder="Full name of beneficiary"
          radius="xl"
          size="md"
          value={beneficiaryName}
          onChange={(e) => setBeneficiaryName(e.currentTarget.value)}
          error={error && !beneficiaryName.trim() ? "Required" : null}
          required
          mt="md"
        />

        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton
            variant="next"
            onClick={handleSubmit}
            disabled={!selected || !beneficiaryName.trim()}
          />
        </Group>
      </ScrollArea>
    </Box>
  );
}
