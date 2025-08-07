import {
  Card,
  Text,
  Title,
  Container,
  Group,
  SimpleGrid,
  Box,
  Loader,
  Badge,
  Image,
  Modal,
  Button,
  List,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import BackButton from "../../../components/button/BackButton";
import ButtomNavigation from "../BottomNavigation";

// Interfaces based on the new API response structure
interface PolicyDetails {
  id: number;
  status: string;
  request_summary: {
    request_type: string;
    entity_summary: string;
    estimated_value: string;
  };
  insurance_product: {
    name: string;
    description: string;
    estimated_price: string;
    coverage_type: {
      name: string;
      description: string;
    };
  };
  coverage_type: {
    name: string;
    description: string;
  };
  insured_entity: {
    entity: {
      type: string;
      vehicle: {
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
    };
  };
  user: {
    customer: {
      full_name: string;
      current_address: {
        region: string;
        subcity: string;
        woreda: string;
        zone: string;
        house_number: string;
      };
    };
  };
}

interface PolicyDetailsResponse {
  success: boolean;
  data: PolicyDetails;
}

export default function MotorPolicyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [policy, setPolicy] = useState<PolicyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleViewImage = (imageUrl: string | null) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setModalOpened(true);
    } else {
      notifications.show({
        message: "Image not available",
        color: "yellow",
      });
    }
  };

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      if (!accessToken) {
        notifications.show({
          message: "Authentication token not found.",
          color: "red",
          icon: <AlertCircle />,
        });
        setLoading(false);
        return;
      }

      try {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/quotation_requests/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseData: PolicyDetailsResponse = await response.json();

        if (!response.ok || !responseData.success) {
          throw new Error("Failed to fetch policy details");
        }

        setPolicy(responseData.data);
      } catch (error) {
        console.error("Error fetching policy details:", error);
        notifications.show({
          message: (error as Error).message || "An error occurred",
          color: "red",
          icon: <AlertCircle />,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyDetails();
  }, [id, accessToken]);

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
      case "pending":
        return "yellow";
      case "submitted":
        return "blue";
      case "expired":
        return "red";
      case "active":
        return "green";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (!policy) {
    return (
      <Container>
        <Text>Policy not found.</Text>
      </Container>
    );
  }

  return (
    <Box style={{ maxWidth: 420, margin: "0 auto" }}>
      <Container py="md" px="md" style={{ paddingBottom: 80 }} mb={"60px"}>
        <Group mb="md">
          <BackButton onClick={() => navigate("/policies")} />
        </Group>
        <Title order={3} mb="lg">
          {policy.request_summary.entity_summary}
        </Title>
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <SimpleGrid cols={2}>
            <div>
              <Text size="sm" c="dimmed">
                Policy ID
              </Text>
              <Text fw={500}>#{policy.id}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Status
              </Text>
              <Badge color={getStatusBadgeColor(policy.status)} variant="light">
                {policy.status}
              </Badge>
            </div>
          </SimpleGrid>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <Title order={4} mb="md">
            Insurance Details
          </Title>
          <Text size="sm" c="dimmed">
            Product
          </Text>
          <Text fw={500}>{policy.insurance_product.name}</Text>
          <Text size="sm" c="dimmed" mt="sm">
            Coverage Type
          </Text>
          <Text fw={500}>{policy.coverage_type.name}</Text>
          <Text size="sm" c="dimmed" mt="sm">
            Estimated Price
          </Text>
          <Text fw={500}>{policy.insurance_product.estimated_price} Birr</Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <Title order={4} mb="md">
            Vehicle Details
          </Title>
          <SimpleGrid cols={2}>
            <Box>
              <Text size="sm" c="dimmed">
                Make & Model
              </Text>
              <Text fw={500}>
                {policy.insured_entity.entity.vehicle.make}{" "}
                {policy.insured_entity.entity.vehicle.model}
              </Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">
                Year
              </Text>
              <Text fw={500}>
                {policy.insured_entity.entity.vehicle.year_of_manufacture}
              </Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">
                Plate Number
              </Text>
              <Text fw={500}>{policy.insured_entity.entity.vehicle.plate_number}</Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">
                Chassis Number
              </Text>
              <Text fw={500}>
                {policy.insured_entity.entity.vehicle.chassis_number}
              </Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">
                Engine Number
              </Text>
              <Text fw={500}>{policy.insured_entity.entity.vehicle.engine_number}</Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">
                Estimated Value
              </Text>
              <Text fw={500}>
                {policy.insured_entity.entity.vehicle.estimated_value} Birr
              </Text>
            </Box>
          </SimpleGrid>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
          <Title order={4} mb="md">
            Vehicle Images
          </Title>
          <List spacing="xs" size="sm">
            <List.Item>
              <Group justify="space-between">
                <Text>Front View</Text>
                {policy.insured_entity.entity.vehicle.front_view_photo_url ? (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleViewImage(
                        policy.insured_entity.entity.vehicle.front_view_photo_url
                      )
                    }
                  >
                    View
                  </Button>
                ) : (
                  <Text size="xs" c="dimmed">
                    Not Available
                  </Text>
                )}
              </Group>
            </List.Item>
            <List.Item>
              <Group justify="space-between">
                <Text>Back View</Text>
                {policy.insured_entity.entity.vehicle.back_view_photo_url ? (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleViewImage(
                        policy.insured_entity.entity.vehicle.back_view_photo_url
                      )
                    }
                  >
                    View
                  </Button>
                ) : (
                  <Text size="xs" c="dimmed">
                    Not Available
                  </Text>
                )}
              </Group>
            </List.Item>
            <List.Item>
              <Group justify="space-between">
                <Text>Left View</Text>
                {policy.insured_entity.entity.vehicle.left_view_photo_url ? (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleViewImage(
                        policy.insured_entity.entity.vehicle.left_view_photo_url
                      )
                    }
                  >
                    View
                  </Button>
                ) : (
                  <Text size="xs" c="dimmed">
                    Not Available
                  </Text>
                )}
              </Group>
            </List.Item>
            <List.Item>
              <Group justify="space-between">
                <Text>Right View</Text>
                {policy.insured_entity.entity.vehicle.right_view_photo_url ? (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleViewImage(
                        policy.insured_entity.entity.vehicle.right_view_photo_url
                      )
                    }
                  >
                    View
                  </Button>
                ) : (
                  <Text size="xs" c="dimmed">
                    Not Available
                  </Text>
                )}
              </Group>
            </List.Item>
            <List.Item>
              <Group justify="space-between">
                <Text>Engine</Text>
                {policy.insured_entity.entity.vehicle.engine_photo_url ? (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleViewImage(
                        policy.insured_entity.entity.vehicle.engine_photo_url
                      )
                    }
                  >
                    View
                  </Button>
                ) : (
                  <Text size="xs" c="dimmed">
                    Not Available
                  </Text>
                )}
              </Group>
            </List.Item>
            <List.Item>
              <Group justify="space-between">
                <Text>Chassis Number</Text>
                {policy.insured_entity.entity.vehicle.chassis_number_photo_url ? (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleViewImage(
                        policy.insured_entity.entity.vehicle.chassis_number_photo_url
                      )
                    }
                  >
                    View
                  </Button>
                ) : (
                  <Text size="xs" c="dimmed">
                    Not Available
                  </Text>
                )}
              </Group>
            </List.Item>
            <List.Item>
              <Group justify="space-between">
                <Text>Libre</Text>
                {policy.insured_entity.entity.vehicle.libre_photo_url ? (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() =>
                      handleViewImage(
                        policy.insured_entity.entity.vehicle.libre_photo_url
                      )
                    }
                  >
                    View
                  </Button>
                ) : (
                  <Text size="xs" c="dimmed">
                    Not Available
                  </Text>
                )}
              </Group>
            </List.Item>
          </List>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">
            Owner Details
          </Title>
          <Text size="sm" c="dimmed">
            Full Name
          </Text>
          <Text fw={500}>{policy.user.customer.full_name}</Text>
          <Text size="sm" c="dimmed" mt="sm">
            Address
          </Text>
          <Text fw={500}>
            {policy.user.customer.current_address.region},{" "}
            {policy.user.customer.current_address.subcity}, Woreda{" "}
            {policy.user.customer.current_address.woreda}, Kebele{" "}
            {policy.user.customer.current_address.zone}, House no.{" "}
            {policy.user.customer.current_address.house_number}
          </Text>
        </Card>
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Vehicle Image"
          centered
        >
          {selectedImage && <Image src={selectedImage} alt="Vehicle image" />}
        </Modal>
      </Container>
      <ButtomNavigation />
    </Box>
  );
}
