import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Group,
  Stack,
  Tabs,
  Badge,
  Text,
  Box,
  Title,
} from "@mantine/core";
import { Car, Plus, Clock, CircleCheck, CircleX } from "lucide-react";
import AppContainer from "../../components/AppContainer";
import BottomNavigation from "./BottomNavigation";

interface TimelineItem {
  date: string;
  status: string;
  description: string;
}

interface Claim {
  id: string;
  title: string;
  claimNumber: string;
  status: string;
  submissionDate: string;
  estimatedCompletion: string;
  vehicle: string;
  incidentDate: string;
  incidentType: string;
  description: string;
  location: string;
  claimAmount: string;
  documents: string[];
  timeline: TimelineItem[];
}

export const claimsData: Claim[] = [
  // Active Claims
  {
    id: "1",
    title: "Toyota Corolla - Minor Accident",
    claimNumber: "CL-2023-0042",
    status: "In Review",
    submissionDate: "May 2, 2023",
    estimatedCompletion: "May 15, 2023",
    vehicle: "Toyota Corolla (ABC1234)",
    incidentDate: "April 30, 2023",
    incidentType: "Accident",
    description:
      "Minor collision with another vehicle at an intersection. Front bumper damaged.",
    location: "Bole Road, Addis Ababa",
    claimAmount: "15,000 ETB",
    documents: ["Damage photos", "Incident report"],
    timeline: [
      {
        date: "May 2, 2023",
        status: "Claim Submitted",
        description: "Your claim has been received and is being reviewed.",
      },
      {
        date: "May 3, 2023",
        status: "Documents Verified",
        description: "Your submitted documents have been verified.",
      },
      {
        date: "May 5, 2023",
        status: "In Review",
        description: "Your claim is being reviewed by our claims adjuster.",
      },
    ],
  },
  {
    id: "2",
    title: "Honda Civic - Windshield Damage",
    claimNumber: "CL-2023-0039",
    status: "Processing",
    submissionDate: "April 28, 2023",
    estimatedCompletion: "May 10, 2023",
    vehicle: "Honda Civic (XYZ5678)",
    incidentDate: "April 25, 2023",
    incidentType: "Windshield Damage",
    description:
      "Rock hit the windshield while driving on the highway, causing a crack.",
    location: "Mekelle Highway",
    claimAmount: "8,500 ETB",
    documents: ["Damage photos", "Incident report"],
    timeline: [
      {
        date: "April 28, 2023",
        status: "Claim Submitted",
        description: "Your claim has been received and is being reviewed.",
      },
      {
        date: "April 30, 2023",
        status: "Documents Verified",
        description: "Your submitted documents have been verified.",
      },
      {
        date: "May 2, 2023",
        status: "Processing",
        description: "Your claim is being processed for payment.",
      },
    ],
  },

  // Completed Claims
  {
    id: "3",
    title: "Toyota Corolla - Bumper Repair",
    claimNumber: "CL-2023-0028",
    status: "Completed",
    submissionDate: "April 10, 2023",
    estimatedCompletion: "April 15, 2023",
    vehicle: "Toyota Corolla (ABC1234)",
    incidentDate: "April 5, 2023",
    incidentType: "Accident",
    description: "Rear bumper damage from parking incident.",
    location: "Bole Road, Addis Ababa",
    claimAmount: "12,500 ETB",
    documents: ["Damage photos", "Incident report"],
    timeline: [
      {
        date: "April 10, 2023",
        status: "Claim Submitted",
        description: "Your claim has been received and is being reviewed.",
      },
      {
        date: "April 12, 2023",
        status: "Documents Verified",
        description: "Your submitted documents have been verified.",
      },
      {
        date: "April 14, 2023",
        status: "Processing",
        description: "Your claim is being processed for payment.",
      },
      {
        date: "April 15, 2023",
        status: "Completed",
        description: "Your claim has been settled.",
      },
    ],
  },

  // Rejected Claims
  {
    id: "4",
    title: "Honda Civic - Engine Repair",
    claimNumber: "CL-2023-0015",
    status: "Rejected",
    submissionDate: "March 15, 2023",
    estimatedCompletion: "March 20, 2023",
    vehicle: "Honda Civic (XYZ5678)",
    incidentDate: "March 10, 2023",
    incidentType: "Mechanical Failure",
    description: "Engine failure while driving.",
    location: "Mekelle Highway",
    claimAmount: "25,000 ETB",
    documents: ["Diagnostic report", "Incident report"],
    timeline: [
      {
        date: "March 15, 2023",
        status: "Claim Submitted",
        description: "Your claim has been received and is being reviewed.",
      },
      {
        date: "March 18, 2023",
        status: "Under Review",
        description: "Your claim is being reviewed by our claims adjuster.",
      },
      {
        date: "March 20, 2023",
        status: "Rejected",
        description:
          "Your claim has been rejected as it's not covered by your policy.",
      },
    ],
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "In Review":
      return <Badge color="yellow">In Review</Badge>;
    case "Processing":
      return <Badge color="blue">Processing</Badge>;
    case "Completed":
      return <Badge color="green">Completed</Badge>;
    case "Rejected":
      return <Badge color="red">Rejected</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export function ClaimsList() {
  const [activeTab, setActiveTab] = useState<string | null>("active");
  const navigate = useNavigate();

  const filteredClaims = claimsData.filter((claim) => {
    if (activeTab === "active")
      return ["In Review", "Processing"].includes(claim.status);
    if (activeTab === "completed") return claim.status === "Completed";
    if (activeTab === "rejected") return claim.status === "Rejected";
    return true;
  });

  return (
    <AppContainer>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "72px",
          paddingTop: "16px",
          margin: "16px",
        }}
      >
        <Stack gap="md">
          <Group justify="space-between" mb="xs">
            <Title order={3}>Your Claims</Title>
            <Button
              onClick={() => navigate("/claims/new")}
              size="sm"
              color="#7e4005"
              leftSection={<Plus size={16} />}
            >
              New Claim
            </Button>
          </Group>

          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List grow mb="md">
              <Tabs.Tab value="active">Active</Tabs.Tab>
              <Tabs.Tab value="completed">Completed</Tabs.Tab>
              <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="active">
              <Stack gap="md">
                {filteredClaims.map((claim) => (
                  <Card
                    key={claim.id}
                    withBorder
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Group align="flex-start" gap="sm">
                        <Car
                          size={20}
                          color="#7e4005"
                          style={{ marginTop: "4px", flexShrink: 0 }}
                        />
                        <Box>
                          <Text fw={500}>{claim.title}</Text>
                          <Text size="sm" c="dimmed">
                            Claim #{claim.claimNumber}
                          </Text>
                          <Text size="xs" c="dimmed" mt={4}>
                            Submitted on {claim.submissionDate}
                          </Text>
                        </Box>
                      </Group>
                      {getStatusBadge(claim.status)}
                    </Group>
                    <Box
                      mt="md"
                      pt="md"
                      style={{ borderTop: "1px solid #f1f1f1" }}
                    >
                      <Group
                        justify="space-between"
                        style={{ fontSize: "14px" }}
                      >
                        <Text c="dimmed">
                          {claim.status === "Completed"
                            ? "Settlement amount:"
                            : claim.status === "Rejected"
                            ? "Reason:"
                            : "Estimated completion:"}
                        </Text>
                        <Text fw={500}>
                          {claim.status === "Completed"
                            ? claim.claimAmount
                            : claim.status === "Rejected"
                            ? "Not covered by policy"
                            : claim.estimatedCompletion}
                        </Text>
                      </Group>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="completed">
              <Stack gap="md">
                {filteredClaims.map((claim) => (
                  <Card
                    key={claim.id}
                    withBorder
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Group align="flex-start" gap="sm">
                        <Car
                          size={20}
                          color="#7e4005"
                          style={{ marginTop: "4px", flexShrink: 0 }}
                        />
                        <Box>
                          <Text fw={500}>{claim.title}</Text>
                          <Text size="sm" c="dimmed">
                            Claim #{claim.claimNumber}
                          </Text>
                          <Text size="xs" c="dimmed" mt={4}>
                            Submitted on {claim.submissionDate}
                          </Text>
                        </Box>
                      </Group>
                      {getStatusBadge(claim.status)}
                    </Group>
                    <Box
                      mt="md"
                      pt="md"
                      style={{ borderTop: "1px solid #f1f1f1" }}
                    >
                      <Group
                        justify="space-between"
                        style={{ fontSize: "14px" }}
                      >
                        <Text c="dimmed">Settlement amount:</Text>
                        <Text fw={500}>{claim.claimAmount}</Text>
                      </Group>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="rejected">
              <Stack gap="md">
                {filteredClaims.map((claim) => (
                  <Card
                    key={claim.id}
                    withBorder
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Group align="flex-start" gap="sm">
                        <Car
                          size={20}
                          color="#7e4005"
                          style={{ marginTop: "4px", flexShrink: 0 }}
                        />
                        <Box>
                          <Text fw={500}>{claim.title}</Text>
                          <Text size="sm" c="dimmed">
                            Claim #{claim.claimNumber}
                          </Text>
                          <Text size="xs" c="dimmed" mt={4}>
                            Submitted on {claim.submissionDate}
                          </Text>
                        </Box>
                      </Group>
                      {getStatusBadge(claim.status)}
                    </Group>
                    <Box
                      mt="md"
                      pt="md"
                      style={{ borderTop: "1px solid #f1f1f1" }}
                    >
                      <Group
                        justify="space-between"
                        style={{ fontSize: "14px" }}
                      >
                        <Text c="dimmed">Reason:</Text>
                        <Text fw={500}>Not covered by policy</Text>
                      </Group>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>
          </Tabs>

          {activeTab === "active" && (
            <Card mt="md" bg="#EFF6FF" style={{ borderColor: "#DBEAFE" }}>
              <Group align="flex-start" gap="sm">
                <Clock
                  size={20}
                  color="#3B82F6"
                  style={{ flexShrink: 0, marginTop: "4px" }}
                />
                <Text size="sm" c="#1E40AF">
                  Active claims are currently being processed. You can check
                  their status and updates here.
                </Text>
              </Group>
            </Card>
          )}

          {activeTab === "completed" && (
            <Card mt="md" bg="#F0FDF4" style={{ borderColor: "#DCFCE7" }}>
              <Group align="flex-start" gap="sm">
                <CircleCheck
                  size={20}
                  color="#22C55E"
                  style={{ flexShrink: 0, marginTop: "4px" }}
                />
                <Text size="sm" c="#166534">
                  Completed claims have been processed and settled. You can view
                  the details and settlement information.
                </Text>
              </Group>
            </Card>
          )}

          {activeTab === "rejected" && (
            <Card mt="md" bg="#FEF2F2" style={{ borderColor: "#FEE2E2" }}>
              <Group align="flex-start" gap="sm">
                <CircleX
                  size={20}
                  color="#EF4444"
                  style={{ flexShrink: 0, marginTop: "4px" }}
                />
                <Text size="sm" c="#B91C1C">
                  Rejected claims were not approved. You can view the reason for
                  rejection and contact support for more information.
                </Text>
              </Group>
            </Card>
          )}
        </Stack>
      </div>
      <BottomNavigation />
    </AppContainer>
  );
}
