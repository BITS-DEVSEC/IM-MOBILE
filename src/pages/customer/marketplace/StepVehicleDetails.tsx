import { Title, Select, Group, Box, Stack, ScrollArea } from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";
import { TextInputs } from "../../../components/inputs/textinput";
import BackButton from "../../../components/button/BackButton";

interface VehicleDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const VehicleDetails = ({ onBack, onNext }: VehicleDetailsProps) => {
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
            radius="sm"
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
            radius="sm"
            size="md"
            styles={{ label: { marginBottom: 4 } }}
          />
          <TextInputs
            label="Number of Passengers (including driver)"
            placeholder="Enter number of passengers"
          />
          <TextInputs
            label="Car Price (including accessories)"
            placeholder="Enter car price"
          />
          <TextInputs label="Goods" placeholder="Enter goods details" />
          <Title order={4} fw={600} mt="md">
            Current Residence Address
          </Title>
          <Select
            label="Region"
            placeholder="Select region"
            data={[
              "Addis Ababa",
              "Afar",
              "Amhara",
              "Benishangul-Gumuz",
              "Dire Dawa",
              "Gambela",
              "Harari",
              "Oromia",
              "Sidama",
              "Somali",
              "Southern Nations, Nationalities, and Peoples' (SNNP)",
              "Tigray",
            ]}
            radius="sm"
            size="md"
          />
          <TextInputs label="Zone" placeholder="Enter zone (if applicable)" />
          <TextInputs label="Woreda" placeholder="Enter woreda" />
          <TextInputs label="Kebele" placeholder="Enter kebele" />
          <TextInputs
            label="House Number / Street"
            placeholder="Enter house number or street name"
          />
        </Stack>
        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton variant="next" onClick={onNext} />
        </Group>
      </ScrollArea>
    </Box>
  );
};

export default VehicleDetails;
