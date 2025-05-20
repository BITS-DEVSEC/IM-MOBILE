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
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";

interface QuotationRequest {
  id: number;
  status: string;
  form_data: {
    coverage_amount: number;
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
  const [user, setUser] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    const storedToken = localStorage.getItem("admin_access_token");
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      // Assume admin role if user exists, as roles may not be present
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
        icon: <AlertCircle />,
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

  if (loading) {
    return (
      <Loader style={{ display: "flex", margin: "auto", marginTop: 100 }} />
    );
  }

  if (!user) {
    return <Text>You do not have permission to view this page.</Text>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Title order={2} mb="lg">
        Admin Dashboard - Quotation Requests
      </Title>
      {quotations.length === 0 ? (
        <Text>No quotation requests found.</Text>
      ) : (
        <Group>
          {quotations.map((quotation) => (
            <Card
              key={quotation.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ width: 300, cursor: "pointer" }}
              onClick={() => openModal(quotation)}
            >
              <Text fw={500}>
                User: {quotation.user.phone_number || quotation.user.email}
              </Text>
              <Text size="sm" c="dimmed">
                Quotation ID: {quotation.id}
              </Text>
              <Badge
                color={quotation.status === "draft" ? "blue" : "green"}
                mt="sm"
              >
                {quotation.status}
              </Badge>
              <Text size="sm" mt="xs">
                Coverage: {quotation.form_data.coverage_amount}
              </Text>
              <Text size="sm">Vehicle: {quotation.vehicle.plate_number}</Text>
              <Text size="sm">
                Created: {new Date(quotation.created_at).toLocaleDateString()}
              </Text>
            </Card>
          ))}
        </Group>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Quotation Request Details"
        size="lg"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {selectedQuotation && (
          <div>
            <Title order={3}>User Information</Title>
            <Table>
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

            <Title order={3} mt="md">
              Quotation Details
            </Title>
            <Table>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{selectedQuotation.id}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{selectedQuotation.id}</td>
                </tr>
                <tr>
                  <td>Coverage Amount</td>
                  <td>{selectedQuotation.form_data.coverage_amount}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>
                    {new Date(selectedQuotation.created_at).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </Table>

            <Title order={3} mt="md">
              Vehicle Details
            </Title>
            <Table>
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
                <tr>
                  <td>Front View Photo</td>
                  <td>
                    {selectedQuotation.vehicle.front_view_photo_url ? (
                      <a
                        href={selectedQuotation.vehicle.front_view_photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Back View Photo</td>
                  <td>
                    {selectedQuotation.vehicle.back_view_photo_url ? (
                      <a
                        href={selectedQuotation.vehicle.back_view_photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Left View Photo</td>
                  <td>
                    {selectedQuotation.vehicle.left_view_photo_url ? (
                      <a
                        href={selectedQuotation.vehicle.left_view_photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Right View Photo</td>
                  <td>
                    {selectedQuotation.vehicle.right_view_photo_url ? (
                      <a
                        href={selectedQuotation.vehicle.right_view_photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Engine Photo</td>
                  <td>
                    {selectedQuotation.vehicle.engine_photo_url ? (
                      <a
                        href={selectedQuotation.vehicle.engine_photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Chassis Number Photo</td>
                  <td>
                    {selectedQuotation.vehicle.chassis_number_photo_url ? (
                      <a
                        href={
                          selectedQuotation.vehicle.chassis_number_photo_url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Libre Photo</td>
                  <td>
                    {selectedQuotation.vehicle.libre_photo_url ? (
                      <a
                        href={selectedQuotation.vehicle.libre_photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>

            <Title order={3} mt="md">
              Residence Address
            </Title>
            <Table>
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
                    {selectedQuotation.form_data.current_residence_address.zone}
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

            <Title order={3} mt="md">
              Insurance Details
            </Title>
            <Table>
              <tbody>
                <tr>
                  <td>Insurance Type</td>
                  <td>{selectedQuotation.insurance_type.name}</td>
                </tr>
                <tr>
                  <td>Coverage Type</td>
                  <td>{selectedQuotation.coverage_type.name}</td>
                </tr>
                <tr>
                  <td>Coverage Description</td>
                  <td>{selectedQuotation.coverage_type.description}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
        <Button onClick={() => setModalOpened(false)} mt="md">
          Close
        </Button>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
