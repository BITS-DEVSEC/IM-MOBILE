import {
  Title,
  Select,
  TextInput,
  Group,
  Box,
  Stack,
  Button,
  ScrollArea,
} from "@mantine/core";
import WizardButton from "../../../components/WizardButton";
import { ArrowLeft } from "lucide-react";

interface VehicleDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const VehicleDetails = ({ onBack, onNext }: VehicleDetailsProps) => {
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
        <Title
          order={2}
          fw={700}
          mb="xs"
          c="primary.8"
          style={{ textAlign: "center" }}
        >
          Basic Vehicle Details
        </Title>

        <Stack gap="lg" pb="xl">
          <Select
            label="Vehicle Type"
            placeholder="Select vehicle type"
            data={[
              "Private Vehicle",
              "Minibus",
              "Bus",
              "Truck/Trailer",
              "Tanker",
              "Taxi",
              "Motorcycle",
              "Three-Wheeled Vehicle",
              "Special Vehicle",
            ]}
            radius="xl"
            size="md"
            styles={{ label: { marginBottom: 4 } }}
          />
          <Select
            label="Vehicle Usage"
            placeholder="Select vehicle usage"
            data={[
              "Private Own Use",
              "Private Business Use",
              "Public Service (With Fare)",
              "Commercial Use (With Hire/Payment)",
            ]}
            radius="xl"
            size="md"
            styles={{ label: { marginBottom: 4 } }}
          />
          <TextInput
            label="Number of Passengers (including driver)"
            placeholder="Enter number of passengers"
            radius="xl"
            size="md"
            styles={{ label: { marginBottom: 4 } }}
          />
          <TextInput
            label="Car Price (including accessories)"
            placeholder="Enter car price"
            radius="xl"
            size="md"
            styles={{ label: { marginBottom: 4 } }}
          />
          <TextInput
            label="Goods"
            placeholder="Enter goods details"
            radius="xl"
            size="md"
            styles={{ label: { marginBottom: 4 } }}
          />
        </Stack>
      </ScrollArea>

      <Group grow p="md" style={{ flexShrink: 0 }}>
        <WizardButton variant="back" onClick={onBack} />
        <WizardButton variant="next" onClick={onNext} />
      </Group>
    </Box>
  );
};

export default VehicleDetails;
