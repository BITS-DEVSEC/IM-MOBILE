import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  Title,
  Button,
  Modal,
  Group,
  Loader,
  ScrollArea,
  Table,
  Badge,
  Paper,
  Image,
  Stack,
  Grid,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AlertCircle, Car, User, MapPin, Shield, Calendar } from "lucide-react";

interface QuotationRequest {
  id: number;
  status: string;
  form_data: {
    vehicle_details: {
      goods: string;
      car_price: number;
      vehicle_type: string;
      vehicle_usage: string;
      number_of_passengers: number;
    };
    current_residence_address: {
      zone: string;
      kebele: string;
      region: string;
      woreda: string;
      house_number: string;
    };
  };
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    email: string | null;
    phone_number: string;
    fin: string;
    verified: boolean;
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

const AdminDashboard: React.FC = () => {
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuotation, setSelectedQuotation] =
    useState<QuotationRequest | null>(null);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [imageModalOpened, setImageModalOpened] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    const storedToken = localStorage.getItem("admin_access_token");
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      const isAdmin = parsedUser.roles?.includes("admin") ?? true;
      if (isAdmin) {
        setUser(parsedUser);
        setAccessToken(storedToken);
      } else {
        localStorage.removeItem("admin_user");
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
        window.location.href = "/admin-login";
      }
    } else {
      setLoading(false);
      window.location.href = "/admin-login";
    }
  }, []);

  const fetchQuotations = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/quotation_requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setQuotations(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch quotations");
      }
    } catch (error) {
      notifications.show({
        message: (error as Error).message,
        color: "red",
        icon: <AlertCircle size={20} />,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && accessToken) {
      fetchQuotations();
    }
  }, [user, accessToken]);

  const openModal = (quotation: QuotationRequest) => {
    setSelectedQuotation(quotation);
    setModalOpened(true);
  };

  const openImageModal = (url: string) => {
    setSelectedImage(url);
    setImageModalOpened(true);
  };

  if (loading) {
    return (
      <Loader
        size="xl"
        style={{ display: "flex", margin: "auto", marginTop: "20vh" }}
      />
    );
  }

  if (!user) {
    return (
      <Paper p="lg" radius="md" withBorder>
        <Text c="red" size="lg" ta="center">
          You do not have permission to view this page.
        </Text>
      </Paper>
    );
  }

  return (
    <Stack p="xl" gap="lg">
      <Title order={2} c="#7e4005">
        Admin Dashboard - Quotation Requests
      </Title>
      {quotations.length === 0 ? (
        <Paper p="md" radius="md" withBorder>
          <Text c="dimmed" ta="center">
            No quotation requests found.
          </Text>
        </Paper>
      ) : (
        <Grid gutter="md">
          {quotations.map((quotation) => (
            <Grid.Col key={quotation.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card
                shadow="md"
                padding="lg"
                radius="md"
                withBorder
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => openModal(quotation)}
                className="hover:scale-105"
              >
                <Stack gap="xs">
                  <Group>
                    <User size={20} />
                    <Text fw={600}>
                      {quotation.user.phone_number || quotation.user.email}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Quotation ID: {quotation.id}
                  </Text>
                  <Badge
                    color={quotation.status === "draft" ? "blue" : "green"}
                    variant="light"
                  >
                    {quotation.status}
                  </Badge>
                  <Group gap="xs"></Group>
                  <Group gap="xs">
                    <Car size={16} />
                    <Text size="sm">
                      Vehicle: {quotation.vehicle.plate_number}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <Calendar size={16} />
                    <Text size="sm">
                      Created:{" "}
                      {new Date(quotation.created_at).toLocaleDateString()}
                    </Text>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={
          <Title order={3} c="#7e4005">
            Quotation Request Details
          </Title>
        }
        size="lg"
        scrollAreaComponent={ScrollArea.Autosize}
        radius="md"
      >
        {selectedQuotation && (
          <Stack gap="md">
            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <User size={20} />
                <Title order={4}>User Information</Title>
              </Group>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{selectedQuotation.user.id}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{selectedQuotation.user.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{selectedQuotation.user.phone_number}</td>
                  </tr>
                  <tr>
                    <td>FIN</td>
                    <td>{selectedQuotation.user.fin}</td>
                  </tr>
                  <tr>
                    <td>Verified</td>
                    <td>{selectedQuotation.user.verified ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>Created</td>
                    <td>
                      {new Date(
                        selectedQuotation.user.created_at
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <Shield size={20} />
                <Title order={4}>Quotation Details</Title>
              </Group>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{selectedQuotation.id}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{selectedQuotation.status}</td>
                  </tr>

                  <tr>
                    <td>Created</td>
                    <td>
                      {new Date(selectedQuotation.created_at).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <Car size={20} />
                <Title order={4}>Vehicle Details</Title>
              </Group>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>Plate Number</td>
                    <td>{selectedQuotation.vehicle.plate_number}</td>
                  </tr>
                  <tr>
                    <td>Chassis Number</td>
                    <td>{selectedQuotation.vehicle.chassis_number}</td>
                  </tr>
                  <tr>
                    <td>Engine Number</td>
                    <td>{selectedQuotation.vehicle.engine_number}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{selectedQuotation.vehicle.year_of_manufacture}</td>
                  </tr>
                  <tr>
                    <td>Make</td>
                    <td>{selectedQuotation.vehicle.make}</td>
                  </tr>
                  <tr>
                    <td>Model</td>
                    <td>{selectedQuotation.vehicle.model}</td>
                  </tr>
                  <tr>
                    <td>Estimated Value</td>
                    <td>{selectedQuotation.vehicle.estimated_value}</td>
                  </tr>
                  {[
                    {
                      label: "Front View Photo",
                      url: selectedQuotation.vehicle.front_view_photo_url,
                    },
                    {
                      label: "Back View Photo",
                      url: selectedQuotation.vehicle.back_view_photo_url,
                    },
                    {
                      label: "Left View Photo",
                      url: selectedQuotation.vehicle.left_view_photo_url,
                    },
                    {
                      label: "Right View Photo",
                      url: selectedQuotation.vehicle.right_view_photo_url,
                    },
                    {
                      label: "Engine Photo",
                      url: selectedQuotation.vehicle.engine_photo_url,
                    },
                    {
                      label: "Chassis Number Photo",
                      url: selectedQuotation.vehicle.chassis_number_photo_url,
                    },
                    {
                      label: "Libre Photo",
                      url: selectedQuotation.vehicle.libre_photo_url,
                    },
                  ].map((item) => (
                    <tr key={item.label}>
                      <td>{item.label}</td>
                      <td>
                        {item.url ? (
                          <Button
                            variant="subtle"
                            size="xs"
                            onClick={() => openImageModal(item.url as string)}
                          >
                            View Image
                          </Button>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <MapPin size={20} />
                <Title order={4}>Residence Address</Title>
              </Group>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>Region</td>
                    <td>
                      {
                        selectedQuotation.form_data.current_residence_address
                          .region
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Zone</td>
                    <td>
                      {
                        selectedQuotation.form_data.current_residence_address
                          .zone
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Woreda</td>
                    <td>
                      {
                        selectedQuotation.form_data.current_residence_address
                          .woreda
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Kebele</td>
                    <td>
                      {
                        selectedQuotation.form_data.current_residence_address
                          .kebele
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>House Number</td>
                    <td>
                      {
                        selectedQuotation.form_data.current_residence_address
                          .house_number
                      }
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Group mb="sm">
                <Shield size={20} />
                <Title order={4}>Insurance Details</Title>
              </Group>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>Insurance Type</td>
                    <td>{selectedQuotation.insurance_type.name}</td>
                  </tr>

                  <tr>
                    <td>Coverage Description</td>
                    <td>{selectedQuotation.coverage_type.description}</td>
                  </tr>
                </tbody>
              </Table>
            </Paper>

            <Button
              variant="filled"
              color="#7e4005"
              onClick={() => setModalOpened(false)}
              mt="md"
            >
              Close
            </Button>
          </Stack>
        )}
      </Modal>

      <Modal
        opened={imageModalOpened}
        onClose={() => setImageModalOpened(false)}
        title="Vehicle Image"
        size="md"
        centered
      >
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Vehicle Image"
            radius="md"
            fit="contain"
            style={{ maxHeight: "60vh", width: "100%" }}
          />
        )}
        <Button
          variant="filled"
          color="#7e4005"
          onClick={() => setImageModalOpened(false)}
          mt="md"
          fullWidth
        >
          Close
        </Button>
      </Modal>
    </Stack>
  );
};

export default AdminDashboard;
