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
  Loader,
} from "@mantine/core";
import { Shield, Car, RefreshCw, ChevronDown, Info } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";
import { useInsuranceTypes } from "../../../hooks/useInsuranceTypes";

type StepSelectInsuranceProps = {
  insuranceCategory: string;
  setInsuranceType: (type: string) => void;
  onBack: () => void;
};

export default function StepSelectInsurance({
  insuranceCategory,
  setInsuranceType,
  onBack,
}: StepSelectInsuranceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { insuranceTypes, loading, error } = useInsuranceTypes();

  const coverageTypes =
    insuranceTypes.find((type) => type.id.toString() === insuranceCategory)
      ?.coverage_types || [];

  const dummyDetails: { [key: string]: string[] } = {
    "third-party": [
      "Mandatory minimum coverage",
      "Covers damage to others' property",
      "Includes injury liability",
      "Most affordable option",
    ],
    "own-damage": [
      "Covers repairs for your vehicle",
      "Includes accident damage",
      "Theft protection",
      "Does not cover third-party liabilities",
    ],
    comprehensive: [
      "Full coverage for your vehicle",
      "Third-party liability protection",
      "Theft and natural disaster coverage",
      "24/7 roadside assistance",
    ],
  };

  const insuranceOptions = coverageTypes.map((coverage) => ({
    value: coverage.name.toLowerCase().replace(/\s+/g, "-"),
    label: coverage.name,
    description: coverage.description,
    icon:
      coverage.name === "Third Party" ? (
        <RefreshCw size={20} />
      ) : coverage.name === "Own Damage" ? (
        <Car size={20} />
      ) : (
        <Shield size={20} />
      ),
    details:
      dummyDetails[coverage.name.toLowerCase().replace(/\s+/g, "-")] || [],
  }));

  const handleContinue = () => {
    if (selected) {
      setInsuranceType(selected);
    }
  };

  const toggleDetails = (value: string) => {
    setExpandedCard(expandedCard === value ? null : value);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Box
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text c="red">Failed to load coverage types</Text>
      </Box>
    );
  }

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
          {insuranceTypes.find(
            (type) => type.id.toString() === insuranceCategory
          )?.name || "Insurance"}{" "}
          Options
        </Title>
        <Alert
          variant="light"
          color="primary"
          radius="md"
          mb="xl"
          icon={<Info size={18} />}
        >
          <Text size="sm">
            The type of coverage you choose determines what your insurance will
            pay for in case of an accident or damage.
          </Text>
        </Alert>
        <Radio.Group value={selected} onChange={setSelected}>
          <Stack gap="sm">
            {insuranceOptions.map((option) => (
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
                  <Group justify="space-between" wrap="nowrap">
                    <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
                      <Radio value={option.value} />
                      <Box style={{ flex: 1, maxWidth: "85%" }}>
                        <Group gap="xs">
                          <Text fw={500}>{option.label}</Text>
                        </Group>
                        <Text
                          size="sm"
                          c="dimmed"
                          style={{
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                            overflowJIT: "break-word",
                          }}
                        >
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
        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton
            variant="next"
            onClick={handleContinue}
            disabled={!selected}
          />
        </Group>
      </ScrollArea>
    </Box>
  );
}
