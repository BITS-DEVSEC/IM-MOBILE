import {
  Card,
  Text,
  Title,
  Slider,
  Stack,
  Group,
  Badge,
  Box,
  ScrollArea,
} from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";

type StepSelectCompensationProps = {
  insuranceType: string;
  compensationLimits: {
    ownDamage: number;
    bodilyInjury: number;
  };
  setCompensationLimits: (limits: {
    ownDamage: number;
    bodilyInjury: number;
  }) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepSelectCompensation({
  insuranceType,
  compensationLimits,
  setCompensationLimits,
  onNext,
  onBack,
}: StepSelectCompensationProps) {
  const handleOwnDamageChange = (value: number) => {
    setCompensationLimits({ ...compensationLimits, ownDamage: value });
  };

  const emojiColorMapping = {
    "🧑": { bg: "blue.1", text: "blue.6" },
    "⚰️": { bg: "red.1", text: "red.6" },
    "🏠": { bg: "yellow.1", text: "yellow.6" },
    "🚑": { bg: "green.1", text: "green.6" },
  } as const;

  const renderCompensationCard = (
    icon: keyof typeof emojiColorMapping,
    title: string,
    description: string
  ) => {
    const colors = emojiColorMapping[icon] || { bg: "gray.1", text: "gray.6" };

    return (
      <Card radius="md" p="sm" bg="gray.0">
        <Group gap="sm">
          <Box
            bg={colors.bg}
            c={colors.text}
            p={4}
            style={{
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Text size="xs">{icon}</Text>
          </Box>
          <div>
            <Text size="sm" fw={600} c="dark.7">
              {title}
            </Text>
            <Text size="sm" c="gray.7">
              {description}
            </Text>
          </div>
        </Group>
      </Card>
    );
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
          Set Your Coverage Limits
        </Title>

        <Stack gap="md">
          {(insuranceType === "own-damage" ||
            insuranceType === "comprehensive") && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section p="md">
                <Title order={4} mb="sm">
                  Own Damage Coverage
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  How much should we cover for damages to your vehicle?
                </Text>
                <Slider
                  value={compensationLimits.ownDamage}
                  onChange={handleOwnDamageChange}
                  min={0}
                  max={200000}
                  step={15000}
                  mb="md"
                  marks={[
                    { value: 0, label: "0" },
                    { value: 50000, label: "50K" },
                    { value: 100000, label: "100K" },
                    { value: 150000, label: "150K" },
                    { value: 200000, label: "200K" },
                  ]}
                />
                <Badge color="blue" variant="filled" size="lg">
                  Selected: ${compensationLimits.ownDamage.toLocaleString()}
                </Badge>
              </Card.Section>
            </Card>
          )}

          {(insuranceType === "third-party" ||
            insuranceType === "comprehensive") && (
            <Card padding="lg" radius="md" withBorder>
              <Card.Section p="md">
                <Title order={4} mb="sm">
                  Third-Party Liability
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  Coverage for injuries and property damage to others is fixed.
                </Text>

                <Stack gap="sm">
                  {renderCompensationCard(
                    "🧑",
                    "Bodily Injury:",
                    "Up to 250,000 ETB per person"
                  )}
                  {renderCompensationCard(
                    "⚰️",
                    "Death:",
                    "Up to 250,000 ETB (minimum 30,000 ETB)"
                  )}
                  {renderCompensationCard(
                    "🏠",
                    "Property Damage:",
                    "Up to 200,000 ETB"
                  )}
                  {renderCompensationCard(
                    "🚑",
                    "Emergency Medical:",
                    "Up to 15,000 ETB"
                  )}
                </Stack>
              </Card.Section>
            </Card>
          )}
        </Stack>
        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton variant="next" onClick={onNext} />
        </Group>
      </ScrollArea>
    </Box>
  );
}
