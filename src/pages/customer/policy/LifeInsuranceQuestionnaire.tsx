import {
  Title,
  RadioGroup,
  Stack,
  Box,
  Radio,
  TextInput,
  Group,
} from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";
import { useState } from "react";

interface LifeInsuranceQuestionnaireProps {
  onBack: () => void;
  onNext: () => void;
}

const LifeInsuranceQuestionnaire = ({
  onBack,
  onNext,
}: LifeInsuranceQuestionnaireProps) => {
  const [coverage, setCoverage] = useState("basic");

  return (
    <Box py="xl" px="md">
      <Title
        order={3}
        style={{
          marginBottom: "1.5rem",
          color: "#2c3e50",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Life Insurance Questionnaire
      </Title>

      <Stack gap="lg">
        <RadioGroup
          label="Select Coverage Level"
          value={coverage}
          onChange={setCoverage}
        >
          <Radio value="basic" label="Basic Coverage ($100,000)" />
          <Radio value="standard" label="Standard Coverage ($250,000)" />
          <Radio value="premium" label="Premium Coverage ($500,000+)" />
        </RadioGroup>

        <TextInput
          label="Beneficiary Name"
          placeholder="Full name of beneficiary"
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

export default LifeInsuranceQuestionnaire;
