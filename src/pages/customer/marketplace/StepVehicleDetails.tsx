import { useState } from "react";
import {
  Title,
  Select,
  Group,
  Box,
  Stack,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";

interface VehicleDetailsProps {
  onBack: () => void;
  onNext: (details: {
    vehicle_details: {
      vehicle_type: string;
      vehicle_usage: string;
      number_of_passengers: number;
      car_price: number;
      goods: string;
    };
    current_residence_address: {
      region: string;
      zone: string;
      woreda: string;
      kebele: string;
      house_number: string;
    };
  }) => void;
  initialVehicleDetails: {
    vehicle_type: string;
    vehicle_usage: string;
    number_of_passengers: number;
    car_price: number;
    goods: string;
  };
  initialResidenceAddress: {
    region: string;
    zone: string;
    woreda: string;
    kebele: string;
    house_number: string;
  };
}

const VehicleDetails = ({
  onBack,
  onNext,
  initialVehicleDetails,
  initialResidenceAddress,
}: VehicleDetailsProps) => {
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicle_type: initialVehicleDetails.vehicle_type || "",
    vehicle_usage: initialVehicleDetails.vehicle_usage || "",
    number_of_passengers: initialVehicleDetails.number_of_passengers || 0,
    car_price: initialVehicleDetails.car_price || 0,
    goods: initialVehicleDetails.goods || "",
  });

  const [residenceAddress, setResidenceAddress] = useState({
    region: initialResidenceAddress.region || "",
    zone: initialResidenceAddress.zone || "",
    woreda: initialResidenceAddress.woreda || "",
    kebele: initialResidenceAddress.kebele || "",
    house_number: initialResidenceAddress.house_number || "",
  });

  const isFormValid =
    vehicleDetails.vehicle_type &&
    vehicleDetails.vehicle_usage &&
    vehicleDetails.number_of_passengers > 0 &&
    vehicleDetails.car_price > 0 &&
    vehicleDetails.goods &&
    residenceAddress.region &&
    residenceAddress.zone &&
    residenceAddress.woreda &&
    residenceAddress.kebele &&
    residenceAddress.house_number;

  const handleNext = () => {
    onNext({
      vehicle_details: {
        ...vehicleDetails,
        number_of_passengers: Number(vehicleDetails.number_of_passengers),
        car_price: Number(vehicleDetails.car_price),
      },
      current_residence_address: residenceAddress,
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
            value={vehicleDetails.vehicle_type}
            onChange={(value) =>
              setVehicleDetails((prev) => ({
                ...prev,
                vehicle_type: value || "",
              }))
            }
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
            value={vehicleDetails.vehicle_usage}
            onChange={(value) =>
              setVehicleDetails((prev) => ({
                ...prev,
                vehicle_usage: value || "",
              }))
            }
          />

          <Select
            label="Number of Passengers (including driver)"
            placeholder="Enter or select number"
            data={Array.from({ length: 50 }, (_, i) => (i + 1).toString())}
            value={
              vehicleDetails.number_of_passengers
                ? vehicleDetails.number_of_passengers.toString()
                : ""
            }
            onChange={(value) =>
              setVehicleDetails((prev) => ({
                ...prev,
                number_of_passengers: Number(value),
              }))
            }
            searchable
            radius="sm"
            size="md"
            styles={{ label: { marginBottom: 4 } }}
            allowDeselect={false}
          />

          <TextInput
            label="Car Price (including accessories)"
            placeholder="Enter car price"
            type="number"
            value={vehicleDetails.car_price || ""}
            onChange={(e) =>
              setVehicleDetails((prev) => ({
                ...prev,
                car_price: Number(e.target.value),
              }))
            }
          />

          <TextInput
            label="Goods"
            placeholder="Enter goods details"
            value={vehicleDetails.goods}
            onChange={(e) =>
              setVehicleDetails((prev) => ({
                ...prev,
                goods: e.target.value,
              }))
            }
          />

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
            value={residenceAddress.region}
            onChange={(value) =>
              setResidenceAddress((prev) => ({
                ...prev,
                region: value || "",
              }))
            }
          />

          <TextInput
            label="Zone"
            placeholder="Enter zone (if applicable)"
            value={residenceAddress.zone}
            onChange={(e) =>
              setResidenceAddress((prev) => ({
                ...prev,
                zone: e.target.value,
              }))
            }
          />

          <TextInput
            label="Woreda"
            placeholder="Enter woreda"
            value={residenceAddress.woreda}
            onChange={(e) =>
              setResidenceAddress((prev) => ({
                ...prev,
                woreda: e.target.value,
              }))
            }
          />

          <TextInput
            label="Kebele"
            placeholder="Enter kebele"
            value={residenceAddress.kebele}
            onChange={(e) =>
              setResidenceAddress((prev) => ({
                ...prev,
                kebele: e.target.value,
              }))
            }
          />

          <TextInput
            label="House Number / Street"
            placeholder="Enter house number or street name"
            value={residenceAddress.house_number}
            onChange={(e) =>
              setResidenceAddress((prev) => ({
                ...prev,
                house_number: e.target.value,
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

export default VehicleDetails;
