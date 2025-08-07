import {
  Card,
  Text,
  Title,
  SimpleGrid,
  Container,
  Box,
  Badge,
  Loader,
} from "@mantine/core";
import { Car, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { notifications } from "@mantine/notifications";

interface Policy {
  id: number;
  status: string;
  request_summary: {
    entity_summary: string;
    request_type: string;
  };
  insurance_product: {
    name: string;
    coverage_type: {
      name: string;
    };
  };
  coverage_type: {
    name: string;
  };
}

interface PolicyResponse {
  success: boolean;
  data: Policy[];
}

export default function MotorPolicies() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [policiesLoading, setPoliciesLoading] = useState(false);

  // Fetch policies
  useEffect(() => {
    const fetchPolicies = async () => {
      if (!accessToken) {
        console.log("No accessToken, skipping policy fetch");
        return;
      }

      setPoliciesLoading(true);
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

        const responseData: PolicyResponse = await response.json();
        console.log("Fetched policies response:", responseData);

        if (!response.ok || !responseData.success) {
          throw new Error("Failed to fetch policies");
        }

        console.log("Setting policies:", responseData.data);
        setPolicies(responseData.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
        notifications.show({
          message: (error as Error).message || "Failed to load policies",
          color: "red",
          icon: <AlertCircle />,
        });
      } finally {
        setPoliciesLoading(false);
      }
    };

    fetchPolicies();
  }, [accessToken]);

  const handlePolicyClick = (policyId: number) => {
    navigate(`/policies/motor/${policyId}`);
  };

  // Function to determine badge color based on status
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

  if (policiesLoading) {
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
          {/* Policy Cards */}
          {policies.length === 0 ? (
            <Text c="dimmed" ta="center">
              No policies available
            </Text>
          ) : (
            policies.map((policy) => (
              <Card
                key={`policy-${policy.id}`}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                onClick={() => handlePolicyClick(policy.id)}
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
                      <Text fw={500} size="sm">
                        {policy.request_summary.entity_summary}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {policy.coverage_type.name}
                      </Text>
                      <Text size="sm" c="teal.6" fw={500}>
                        {policy.insurance_product.name}
                      </Text>
                    </div>
                  </div>
                  <Badge
                    color={getStatusBadgeColor(policy.status)}
                    variant="light"
                  >
                    {policy.status.charAt(0).toUpperCase() +
                      policy.status.slice(1)}
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
