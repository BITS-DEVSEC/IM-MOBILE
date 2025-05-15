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
import { Home, AlertTriangle, ChevronDown, Info } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../context/AuthContext";

interface HomeInsuranceOptionsProps {
  coverageType: string; // e.g., "Fire Damage", "Theft"
  onBack: () => void;
  onNext: () => void;
}

export default function HomeInsuranceOptions({
  coverageType,
  onBack,
  onNext,
}: HomeInsuranceOptionsProps) {
  const { accessToken } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Define property type options for Home insurance
  const propertyOptions = [
    {
      value: "house",
      label: "House",
      description: "Single-family or detached home",
      icon: <Home size={20} />,
      details: [
        "Covers standalone residences",
        "Includes yard and attached structures",
        "Higher coverage limits available",
        "Ideal for homeowners",
      ],
    },
    {
      value: "apartment",
      label: "Apartment",
      description: "Condo or rental unit",
      icon: <Home size={20} />,
      details: [
        "Covers individual units",
        "Includes personal property",
        "May require landlord coordination",
        "Suitable for renters or condo owners",
      ],
    },
  ];

  const toggleDetails = (value: string) => {
    setExpandedCard(expandedCard === value ? null : value);
  };

  const handleSubmit = async () => {
    if (!selected) {
      setError("Please select a property type");
      notifications.show({
        message: "Please select a property type",
        color: "red",
        icon: <AlertTriangle />,
      });
      return;
    }

    if (!propertyAddress.trim()) {
      setError("Property Address is required");
      notifications.show({
        message: "Please enter a property address",
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
          insurance_type: "Home",
          coverage_type: coverageType,
          property_type: selected,
          property_address: propertyAddress,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      notifications.show({
        message: "Home insurance application submitted successfully",
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
          Home Insurance Options
        </Title>
        <Alert
          variant="light"
          color="primary"
          radius="md"
          mb="xl"
          icon={<Info size={18} />}
        >
          <Text size="sm">
            Select the type of property you want to insure and provide the
            address.
          </Text>
        </Alert>

        <Radio.Group value={selected} onChange={setSelected}>
          <Stack gap="sm">
            {propertyOptions.map((option) => (
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
          label="Property Address"
          placeholder="Enter full address"
          radius="xl"
          size="md"
          value={propertyAddress}
          onChange={(e) => setPropertyAddress(e.currentTarget.value)}
          error={error && !propertyAddress.trim() ? "Required" : null}
          required
          mt="md"
        />

        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton
            variant="next"
            onClick={handleSubmit}
            disabled={!selected || !propertyAddress.trim()}
          />
        </Group>
      </ScrollArea>
    </Box>
  );
}
