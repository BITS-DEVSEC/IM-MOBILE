import {
  Card,
  Text,
  Title,
  SimpleGrid,
  Container,
  Box,
  Modal,
  Button,
  Stack,
  List,
  Badge,
  Loader,
} from "@mantine/core";
import { Car, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { notifications } from "@mantine/notifications";

interface Draft {
  id: number;
  status: string;
  form_data: {
    vehicle_details: {
      vehicle_type: string;
      vehicle_usage: string;
      number_of_passengers: number;
      goods: string;
    };
    current_residence_address: {
      region: string;
      zone: string;
      woreda: string;
      kebele: string;
      house_number: string;
    };
  };
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    email: string | null;
    verified: boolean;
    phone_number: string;
    fin: string;
    created_at: string;
    updated_at: string;
  };
  insurance_type: {
    id: number;
    name: string;
    description: string;
  };
  coverage_type: {
    id: number;
    insurance_type_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  vehicle: {
    id: number;
    plate_number: string;
    chassis_number: string;
    engine_number: string;
    year_of_manufacture: number;
    make: string;
    model: string;
    estimated_value: string;
    front_view_photo_url: string | null;
    back_view_photo_url: string | null;
    left_view_photo_url: string | null;
    right_view_photo_url: string | null;
    engine_photo_url: string | null;
    chassis_number_photo_url: string | null;
    libre_photo_url: string | null;
  };
}

interface DraftResponse {
  success: boolean;
  data: Draft[];
}

export default function MotorPolicies() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftsLoading, setDraftsLoading] = useState(false);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);

  // Fetch drafts
  useEffect(() => {
    const fetchDrafts = async () => {
      if (!accessToken) {
        console.log("No accessToken, skipping draft fetch");
        return;
      }

      setDraftsLoading(true);
      try {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/quotation_requests/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseData: DraftResponse = await response.json();
        console.log("Fetched drafts response:", responseData);

        if (!response.ok || !responseData.success) {
          throw new Error("Failed to fetch drafts");
        }

        console.log("Setting drafts:", responseData.data);
        setDrafts(responseData.data);
      } catch (error) {
        console.error("Error fetching drafts:", error);
        notifications.show({
          message: (error as Error).message || "Failed to load drafts",
          color: "red",
          icon: <AlertCircle />,
        });
      } finally {
        setDraftsLoading(false);
      }
    };

    fetchDrafts();
  }, [accessToken]);

  const handleDraftClick = (draft: Draft) => {
    setSelectedDraft(draft);
    setDraftModalOpen(true);
  };

  const handleEditDraft = () => {
    if (selectedDraft) {
      navigate(`/insurance-wizard?draftId=${selectedDraft.id}`);
      setDraftModalOpen(false);
    }
  };

  if (draftsLoading) {
    return (
      <Box
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="lg" />
      </Box>
    );
  }

  return (
    <Box style={{ maxWidth: 420, margin: "0 auto" }}>
      <Container py="md" px="md" style={{ paddingBottom: 80 }}>
        <Title order={3} mb="lg" ta="center">
          Your Motor Policies
        </Title>

        <SimpleGrid cols={1} spacing="md">
          {/* Draft Cards */}
          {drafts.length === 0 ? (
            <Text c="dimmed" ta="center">
              No drafts available
            </Text>
          ) : (
            drafts.map((draft) => (
              <Card
                key={`draft-${draft.id}`}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                onClick={() => handleDraftClick(draft)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <Car size={32} color="#7E4005" />
                    <div>
                      <Text fw={500} size="lg">
                        {draft.vehicle.make} {draft.vehicle.model} (
                        {draft.vehicle.year_of_manufacture})
                      </Text>
                      <Text size="sm" c="dimmed">
                        {draft.vehicle.plate_number} •{" "}
                        {draft.coverage_type.name}
                      </Text>
                    </div>
                  </div>
                  <Badge color="gray.4">Draft</Badge>
                </div>
              </Card>
            ))
          )}
        </SimpleGrid>
      </Container>

      {/* Modal for Draft Details */}
      <Modal
        opened={draftModalOpen}
        onClose={() => setDraftModalOpen(false)}
        title={`Draft #${selectedDraft?.id}`}
        centered
        size="lg"
        overlayProps={{
          color: "#000",
          opacity: 0.55,
          blur: 3,
        }}
      >
        {selectedDraft && (
          <Stack gap="md">
            <Box>
              <Text fw={600}>Insurance Type:</Text>
              <Text>{selectedDraft.insurance_type.name}</Text>
            </Box>
            <Box>
              <Text fw={600}>Coverage Type:</Text>
              <Text>{selectedDraft.coverage_type.name}</Text>
            </Box>
            <Box>
              <Text fw={600}>Vehicle Details:</Text>
              <List size="sm">
                <List.Item>
                  Type: {selectedDraft.form_data.vehicle_details.vehicle_type}
                </List.Item>
                <List.Item>
                  Usage: {selectedDraft.form_data.vehicle_details.vehicle_usage}
                </List.Item>
                <List.Item>
                  Passengers:{" "}
                  {selectedDraft.form_data.vehicle_details.number_of_passengers}
                </List.Item>

                <List.Item>
                  Goods: {selectedDraft.form_data.vehicle_details.goods}
                </List.Item>
              </List>
            </Box>
            <Box>
              <Text fw={600}>Residence Address:</Text>
              <List size="sm">
                <List.Item>
                  Region:{" "}
                  {selectedDraft.form_data.current_residence_address.region}
                </List.Item>
                <List.Item>
                  Zone: {selectedDraft.form_data.current_residence_address.zone}
                </List.Item>
                <List.Item>
                  Woreda:{" "}
                  {selectedDraft.form_data.current_residence_address.woreda}
                </List.Item>
                <List.Item>
                  Kebele:{" "}
                  {selectedDraft.form_data.current_residence_address.kebele}
                </List.Item>
                <List.Item>
                  House Number:{" "}
                  {
                    selectedDraft.form_data.current_residence_address
                      .house_number
                  }
                </List.Item>
              </List>
            </Box>
            <Box>
              <Text fw={600}>Vehicle Attributes:</Text>
              <List size="sm">
                <List.Item>
                  Plate Number: {selectedDraft.vehicle.plate_number}
                </List.Item>
                <List.Item>
                  Chassis Number: {selectedDraft.vehicle.chassis_number}
                </List.Item>
                <List.Item>
                  Engine Number: {selectedDraft.vehicle.engine_number}
                </List.Item>
                <List.Item>Make: {selectedDraft.vehicle.make}</List.Item>
                <List.Item>Model: {selectedDraft.vehicle.model}</List.Item>
                <List.Item>
                  Year: {selectedDraft.vehicle.year_of_manufacture}
                </List.Item>
                <List.Item>
                  Estimated Value: {selectedDraft.vehicle.estimated_value} Birr
                </List.Item>
              </List>
            </Box>
            <Button fullWidth onClick={handleEditDraft}>
              Edit Draft
            </Button>
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
