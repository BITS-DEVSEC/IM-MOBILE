import { Card, Text, Title, Stack, Group, Box } from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";

type StepSelectCompensationProps = {
  insuranceType: string | undefined;
  onNext: () => void;
  onBack: () => void;
};

export default function StepSelectCompensation({
  insuranceType,
  onNext,
  onBack,
}: StepSelectCompensationProps) {
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

      <Title
        order={2}
        fw={700}
        mb="xs"
        c="primary.8"
        style={{ textAlign: "center" }}
      >
        Coverage Details
      </Title>

      <Stack gap="md" px="md">
        {(insuranceType === "own-damage" ||
          insuranceType === "comprehensive") && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section p="md">
              <Title order={4} mb="sm">
                Own Damage Coverage
              </Title>
              <Text size="sm" c="dimmed" mb="md">
                Compensation for damages to your vehicle will be based on the
                car's estimated value (price).
              </Text>
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
    </Box>
  );
}
