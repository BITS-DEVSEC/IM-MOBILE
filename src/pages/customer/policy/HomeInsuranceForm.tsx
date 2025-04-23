import { Title, TextInput, Stack, Box, Group } from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";

interface HomeInsuranceFormProps {
  onBack: () => void;
  onNext: () => void;
}

const HomeInsuranceForm = ({ onBack, onNext }: HomeInsuranceFormProps) => {
  return (
    <Box py="xl" px="md">
      <Title
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#2c3e50",
          fontWeight: 600,
        }}
        order={3}
      >
        Home Insurance Details
      </Title>

      <Stack>
        <TextInput
          label="Property Address"
          placeholder="Enter full address"
          radius="xl"
          size="md"
        />
        <TextInput
          label="Property Type"
          placeholder="House, Apartment, etc."
          radius="xl"
          size="md"
        />
        <TextInput
          label="Construction Year"
          placeholder="Year built"
          radius="xl"
          size="md"
        />
      </Stack>

      <Group grow mt="xl">
        <WizardButton variant="back" onClick={onBack} />
        <WizardButton variant="submit" onClick={onNext} />
      </Group>
    </Box>
  );
};

export default HomeInsuranceForm;
