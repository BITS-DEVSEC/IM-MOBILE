import {
  Title,
  Group,
  Box,
  Stack,
  ScrollArea,
  Alert,
  Text,
} from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";
import { Info } from "lucide-react";
import { TextInputs } from "../../../components/inputs/textinput";
import BackButton from "../../../components/button/BackButton";

interface VehicleDetails2Props {
  onBack: () => void;
  onNext: () => void;
}

const VehicleDetails2 = ({ onBack, onNext }: VehicleDetails2Props) => {
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
          Additional Vehicle Details
        </Title>

        <Alert
          variant="light"
          color="primary"
          radius="md"
          mb="xl"
          icon={<Info size={18} />}
        >
          <Text size="sm">
            You can find all these details on your car's registration document
            (Libre) visible.
          </Text>
        </Alert>

        <Stack gap="lg" pb="xl">
          <TextInputs label="Plate Number" placeholder="Enter plate number" />
          <TextInputs
            label="Chassis Number"
            placeholder="Enter chassis number"
          />
          <TextInputs label="Engine Number" placeholder="Enter engine number" />
          <TextInputs label="Make (Company)" placeholder="Enter vehicle make" />
          <TextInputs label="Model" placeholder="Enter vehicle model" />
          <TextInputs
            label="Engine Capacity (CC)"
            placeholder="Enter engine capacity"
          />
          <TextInputs
            label="Year of Manufacture"
            placeholder="Enter year of manufacture"
          />
        </Stack>
        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton variant="next" onClick={onNext} />
        </Group>
      </ScrollArea>
    </Box>
  );
};

export default VehicleDetails2;
