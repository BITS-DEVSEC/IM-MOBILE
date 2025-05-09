import { useNavigate, useParams } from "react-router-dom";
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
import {
  Car,
  CalendarDays,
  MapPin,
  DollarSign,
  FileText,
  Phone,
} from "lucide-react";
import { claimsData } from "./ClaimLists";
import AppContainer from "../../components/AppContainer";
import BottomNavigation from "./BottomNavigation";
import BackButton from "../../components/button/BackButton";

interface TimelineItem {
  date: string;
  status: string;
  description: string;
}

interface ClaimDetailsProps {
  claim: {
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
  };
}

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

export function ClaimDetails({ claim }: ClaimDetailsProps) {
  const navigate = useNavigate();

  return (
    <AppContainer>
      <Group mb="md">
        <BackButton onClick={() => navigate("/claims")} />
      </Group>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "72px",
          margin: "0 16px",
        }}
      >
        <Stack gap="lg">
          <Card withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={3}>{claim.title}</Title>
                <Text size="sm" c="dimmed">
                  Claim #{claim.claimNumber}
                </Text>
              </Box>
              {getStatusBadge(claim.status)}
            </Group>

            <Box
              mt="md"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: "8px",
                fontSize: "14px",
              }}
            >
              <Text c="dimmed">Submission Date:</Text>
              <Text fw={500}>{claim.submissionDate}</Text>

              <Text c="dimmed">Estimated Completion:</Text>
              <Text fw={500}>{claim.estimatedCompletion}</Text>
            </Box>
          </Card>

          <Tabs defaultValue="details">
            <Tabs.List grow mb="md">
              <Tabs.Tab value="details">Details</Tabs.Tab>
              <Tabs.Tab value="timeline">Timeline</Tabs.Tab>
              <Tabs.Tab value="documents">Documents</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="details">
              <Stack gap="md">
                <Card withBorder>
                  <Stack gap="md">
                    <Group gap="xs">
                      <Car size={20} color="#7e4005" />
                      <Title order={4}>Vehicle Information</Title>
                    </Group>
                    <Text>{claim.vehicle}</Text>
                  </Stack>
                </Card>

                <Card withBorder>
                  <Stack gap="md">
                    <Group gap="xs">
                      <CalendarDays size={20} color="#7e4005" />
                      <Title order={4}>Incident Details</Title>
                    </Group>

                    <Stack gap="sm">
                      <Box>
                        <Text size="sm" c="dimmed">
                          Date of Incident
                        </Text>
                        <Text fw={500}>{claim.incidentDate}</Text>
                      </Box>

                      <Box>
                        <Text size="sm" c="dimmed">
                          Type of Incident
                        </Text>
                        <Text fw={500}>{claim.incidentType}</Text>
                      </Box>

                      <Box>
                        <Text size="sm" c="dimmed">
                          Description
                        </Text>
                        <Text fw={500}>{claim.description}</Text>
                      </Box>

                      <Box>
                        <Group gap="xs">
                          <MapPin size={16} />
                          <Text size="sm" c="dimmed">
                            Location
                          </Text>
                        </Group>
                        <Text fw={500}>{claim.location}</Text>
                      </Box>

                      <Box>
                        <Group gap="xs">
                          <DollarSign size={16} />
                          <Text size="sm" c="dimmed">
                            Estimated Claim Amount
                          </Text>
                        </Group>
                        <Text fw={500}>{claim.claimAmount}</Text>
                      </Box>
                    </Stack>
                  </Stack>
                </Card>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="timeline">
              <Card withBorder>
                <Title order={4} mb="lg">
                  Claim Progress
                </Title>

                <Stack gap="xl">
                  {claim.timeline.map((item, index) => (
                    <Box
                      key={index}
                      style={{
                        position: "relative",
                        paddingLeft: "24px",
                        paddingBottom: "24px",
                      }}
                    >
                      {index !== claim.timeline.length - 1 && (
                        <Box
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "7px",
                            bottom: "0",
                            width: "2px",
                            backgroundColor: "#E2E8F0",
                          }}
                        />
                      )}
                      <Box
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          backgroundColor: "#7e4005",
                        }}
                      />
                      <Box>
                        <Text size="xs" c="dimmed">
                          {item.date}
                        </Text>
                        <Text fw={500}>{item.status}</Text>
                        <Text size="sm" c="dimmed" mt="xs">
                          {item.description}
                        </Text>
                      </Box>
                    </Box>
                  ))}

                  <Box style={{ position: "relative", paddingLeft: "24px" }}>
                    <Box
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        border: "2px dashed #CBD5E0",
                      }}
                    />
                    <Box>
                      <Text size="xs" c="dimmed">
                        Estimated: {claim.estimatedCompletion}
                      </Text>
                      <Text fw={500}>Claim Settlement</Text>
                      <Text size="sm" c="dimmed" mt="xs">
                        Your claim will be settled and payment processed.
                      </Text>
                    </Box>
                  </Box>
                </Stack>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="documents">
              <Card withBorder>
                <Stack gap="md">
                  <Group gap="xs">
                    <FileText size={20} color="#7e4005" />
                    <Title order={4}>Submitted Documents</Title>
                  </Group>

                  <Stack gap="sm">
                    {claim.documents.map((doc, index) => (
                      <Group
                        key={index}
                        p="sm"
                        bg="#F8FAFC"
                        style={{ borderRadius: "8px" }}
                        justify="space-between"
                      >
                        <Text>{doc}</Text>
                        <Button variant="subtle" size="xs">
                          View
                        </Button>
                      </Group>
                    ))}
                  </Stack>

                  <Button variant="outline" fullWidth mt="sm">
                    Upload Additional Documents
                  </Button>
                </Stack>
              </Card>
            </Tabs.Panel>
          </Tabs>

          <Group grow mt="md">
            <Button bg="7e4005" leftSection={<Phone size={16} />}>
              Contact Agent
            </Button>
          </Group>
        </Stack>
      </div>
      <BottomNavigation />
    </AppContainer>
  );
}
export function ClaimDetailsWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const claim = claimsData.find((c) => c.id === id);

  if (!claim) {
    return (
      <Box style={{ maxWidth: 420, margin: "0 auto", padding: "16px" }}>
        <Text>Claim not found</Text>
        <Button onClick={() => navigate("/claims")} mt="md">
          Back to Claims
        </Button>
      </Box>
    );
  }

  return <ClaimDetails claim={claim} />;
}
