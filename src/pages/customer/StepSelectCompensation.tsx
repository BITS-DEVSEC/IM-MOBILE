import { useState } from "react";
import {
  Card,
  Text,
  Title,
  Slider,
  List,
  Stack,
  Group,
  Button,
  Badge,
  Box,
  ScrollArea,
} from "@mantine/core";
import WizardButton from "../../components/WizardButton";
import { ArrowLeft } from "lucide-react";

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
  const [ownDamageLimit, setOwnDamageLimit] = useState(
    compensationLimits.ownDamage
  );

  const handleOwnDamageChange = (value: number) => {
    setOwnDamageLimit(value);
    setCompensationLimits({ ...compensationLimits, ownDamage: value });
  };

  return (
    <Box style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Group mb="md">
        <Button
          variant="subtle"
          leftSection={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Back
        </Button>
      </Group>

      <ScrollArea style={{ flex: 1 }} px="md">
        <Title order={3} ta="center" mb="lg" c="dark">
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
                  value={ownDamageLimit}
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
                  Selected: ${ownDamageLimit.toLocaleString()}
                </Badge>
              </Card.Section>
            </Card>
          )}

          {(insuranceType === "third-party" ||
            insuranceType === "comprehensive") && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section p="md">
                <Title order={4} mb="sm">
                  Third-Party Liability
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  Standard coverage for injuries and property damage to others
                </Text>

                <List size="sm" spacing="xs" center>
                  <List.Item icon="🚑">
                    <Text span fw={600}>
                      Bodily Injury:
                    </Text>{" "}
                    Up to 250,000 ETB per person
                  </List.Item>
                  <List.Item icon="💀">
                    <Text span fw={600}>
                      Death:
                    </Text>{" "}
                    Up to 250,000 ETB (minimum 30,000 ETB)
                  </List.Item>
                  <List.Item icon="🏠">
                    <Text span fw={600}>
                      Property Damage:
                    </Text>{" "}
                    Up to 200,000 ETB
                  </List.Item>
                  <List.Item icon="🏥">
                    <Text span fw={600}>
                      Emergency Medical:
                    </Text>{" "}
                    Up to 15,000 ETB
                  </List.Item>
                </List>
              </Card.Section>
            </Card>
          )}
        </Stack>
      </ScrollArea>

      <Group grow p="md" style={{ flexShrink: 0 }}>
        <WizardButton variant="back" onClick={onBack} />
        <WizardButton variant="next" onClick={onNext} />
      </Group>
    </Box>
  );
}
