import {
  Title,
  Group,
  Box,
  Stack,
  ScrollArea,
  Alert,
  Text,
  TextInput,
  Select,
} from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";
import { Info } from "lucide-react";
import BackButton from "../../../components/button/BackButton";
import { useState } from "react";

interface VehicleDetails2Props {
  onBack: () => void;
  onNext: (attributes: {
    plate_number: string;
    chassis_number: string;
    engine_number: string;
    make: string;
    model: string;
    year_of_manufacture: number;
    estimated_value: number;
  }) => void;
  initialVehicleAttributes: {
    plate_number: string;
    chassis_number: string;
    engine_number: string;
    make: string;
    model: string;
    year_of_manufacture: number;
    estimated_value: number;
  };
}

const VehicleDetails2 = ({
  onBack,
  onNext,
  initialVehicleAttributes,
}: VehicleDetails2Props) => {
  const [vehicleAttributes, setVehicleAttributes] = useState({
    plate_number: initialVehicleAttributes.plate_number || "",
    chassis_number: initialVehicleAttributes.chassis_number || "",
    engine_number: initialVehicleAttributes.engine_number || "",
    make: initialVehicleAttributes.make || "",
    model: initialVehicleAttributes.model || "",
    year_of_manufacture:
      initialVehicleAttributes.year_of_manufacture || undefined,
    estimated_value: initialVehicleAttributes.estimated_value || 0,
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1950 + 1 }, (_, i) =>
    (1950 + i).toString()
  );

  const isFormValid =
    vehicleAttributes.plate_number.trim() !== "" &&
    vehicleAttributes.chassis_number.trim() !== "" &&
    vehicleAttributes.engine_number.trim() !== "" &&
    vehicleAttributes.make.trim() !== "" &&
    vehicleAttributes.model.trim() !== "" &&
    vehicleAttributes.year_of_manufacture &&
    vehicleAttributes.year_of_manufacture >= 1950 &&
    vehicleAttributes.year_of_manufacture <= currentYear &&
    vehicleAttributes.estimated_value > 0;

  const handleNext = () => {
    if (!isFormValid) return;
    onNext({
      ...vehicleAttributes,
      year_of_manufacture: Number(vehicleAttributes.year_of_manufacture),
      estimated_value: Number(vehicleAttributes.estimated_value),
    });
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
            (Libre).
          </Text>
        </Alert>

        <Stack gap="lg" pb="xl">
          <TextInput
            label="Plate Number"
            placeholder="Enter plate number"
            value={vehicleAttributes.plate_number}
            onChange={(e) =>
              setVehicleAttributes((prev) => ({
                ...prev,
                plate_number: e.target.value,
              }))
            }
          />

          <TextInput
            label="Chassis Number"
            placeholder="Enter chassis number"
            value={vehicleAttributes.chassis_number}
            onChange={(e) =>
              setVehicleAttributes((prev) => ({
                ...prev,
                chassis_number: e.target.value,
              }))
            }
          />

          <TextInput
            label="Engine Number"
            placeholder="Enter engine number"
            value={vehicleAttributes.engine_number}
            onChange={(e) =>
              setVehicleAttributes((prev) => ({
                ...prev,
                engine_number: e.target.value,
              }))
            }
          />

          <TextInput
            label="Make (Company)"
            placeholder="Enter vehicle make"
            value={vehicleAttributes.make}
            onChange={(e) =>
              setVehicleAttributes((prev) => ({
                ...prev,
                make: e.target.value,
              }))
            }
          />

          <TextInput
            label="Model"
            placeholder="Enter vehicle model"
            value={vehicleAttributes.model}
            onChange={(e) =>
              setVehicleAttributes((prev) => ({
                ...prev,
                model: e.target.value,
              }))
            }
          />

          <Select
            label="Year of Manufacture"
            placeholder="Select or enter year"
            data={yearOptions}
            searchable
            value={
              vehicleAttributes.year_of_manufacture
                ? vehicleAttributes.year_of_manufacture.toString()
                : ""
            }
            onChange={(value) => {
              const year = Number(value);
              if (!isNaN(year) && year >= 1950 && year <= currentYear) {
                setVehicleAttributes((prev) => ({
                  ...prev,
                  year_of_manufacture: year,
                }));
              } else {
                setVehicleAttributes((prev) => ({
                  ...prev,
                  year_of_manufacture: 0,
                }));
              }
            }}
          />

          <TextInput
            label="Estimated Value"
            placeholder="Enter estimated value"
            type="number"
            value={vehicleAttributes.estimated_value || ""}
            onChange={(e) =>
              setVehicleAttributes((prev) => ({
                ...prev,
                estimated_value: Number(e.target.value),
              }))
            }
          />
        </Stack>

        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton
            variant="next"
            onClick={handleNext}
            disabled={!isFormValid}
          />
        </Group>
      </ScrollArea>
    </Box>
  );
};

export default VehicleDetails2;
