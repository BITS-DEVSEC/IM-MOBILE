import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Stack,
  TextInput,
  Textarea,
  Select,
  Alert,
  Group,
  Text,
  Box,
  Title,
} from "@mantine/core";
import { Info, Upload, Car, CalendarDays, ArrowLeft } from "lucide-react";
import AppContainer from "../../components/AppContainer";
import BottomNavigation from "./BottomNavigation";

export function NewClaimForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    policy: "",
    incidentDate: "",
    incidentType: "",
    description: "",
    location: "",
    policeReport: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <AppContainer>
      <Group mb="sm">
        <Button
          variant="subtle"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => navigate("/claims")}
        >
          Back
        </Button>
      </Group>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "72px",
          margin: "11px",
        }}
      >
        <Stack gap="lg">
          <Alert
            variant="light"
            color="blue"
            title="Important Information"
            icon={<Info size={16} />}
          >
            Please provide accurate information about the incident to help us
            process your claim faster.
          </Alert>

          <Card withBorder>
            <Stack gap="md">
              <Group gap="xs">
                <Car size={20} color="#7e4005" />
                <Title order={4}>Policy Information</Title>
              </Group>

              <Select
                label="Select Policy"
                placeholder="Select your policy"
                data={[
                  {
                    value: "toyota",
                    label: "Toyota Corolla (ABC1234) - Comprehensive",
                  },
                  {
                    value: "honda",
                    label: "Honda Civic (XYZ5678) - Third Party",
                  },
                ]}
                value={formData.policy}
                onChange={(value) => handleChange("policy", value || "")}
              />
            </Stack>
          </Card>

          <Card withBorder>
            <Stack gap="md">
              <Group gap="xs">
                <CalendarDays size={20} color="#7e4005" />
                <Title order={4}>Incident Details</Title>
              </Group>

              <TextInput
                type="date"
                label="Date of Incident"
                value={formData.incidentDate}
                onChange={(e) => handleChange("incidentDate", e.target.value)}
              />

              <Select
                label="Type of Incident"
                placeholder="Select incident type"
                data={[
                  { value: "accident", label: "Accident" },
                  { value: "theft", label: "Theft" },
                  { value: "vandalism", label: "Vandalism" },
                  { value: "natural", label: "Natural Disaster" },
                  { value: "fire", label: "Fire" },
                  { value: "other", label: "Other" },
                ]}
                value={formData.incidentType}
                onChange={(value) => handleChange("incidentType", value || "")}
              />

              <TextInput
                label="Location of Incident"
                placeholder="Enter the location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />

              <Textarea
                label="Description of Incident"
                placeholder="Provide details about what happened"
                minRows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Stack>
          </Card>

          <Card withBorder>
            <Stack gap="md">
              <Title order={4}>Supporting Documents</Title>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Photos of Damage
                </Text>
                <Button
                  variant="outline"
                  style={{
                    height: "96px",
                    width: "100%",
                    borderStyle: "dashed",
                  }}
                  leftSection={<Upload size={20} color="#718096" />}
                >
                  <Text size="xs" c="dimmed">
                    Upload photos (max 5)
                  </Text>
                </Button>
              </Box>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Police Report (if applicable)
                </Text>
                <Button
                  variant="outline"
                  style={{
                    height: "64px",
                    width: "100%",
                    borderStyle: "dashed",
                  }}
                  leftSection={<Upload size={20} color="#718096" />}
                >
                  <Text size="xs" c="dimmed">
                    Upload police report
                  </Text>
                </Button>
              </Box>

              <Box>
                <Text size="sm" fw={500} mb="xs">
                  Other Supporting Documents
                </Text>
                <Button
                  variant="outline"
                  style={{
                    height: "64px",
                    width: "100%",
                    borderStyle: "dashed",
                  }}
                  leftSection={<Upload size={20} color="#718096" />}
                >
                  <Text size="xs" c="dimmed">
                    Upload other documents
                  </Text>
                </Button>
              </Box>
            </Stack>
          </Card>

          <Group grow mt="md">
            <Button onClick={() => navigate("/claims")} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => navigate("/claims")} bg="7e4005">
              Submit Claim
            </Button>
          </Group>
        </Stack>
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </AppContainer>
  );
}
