import {
  Card,
  Text,
  Title,
  Group,
  Avatar,
  Badge,
  Stack,
  Box,
} from "@mantine/core";
import { Star } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";

interface StepCompareQuotesProps {
  onBack: () => void;
}

export default function StepCompareQuotes({ onBack }: StepCompareQuotesProps) {
  // Sample insurance companies data
  const sampleInsuranceCompanies = [
    {
      id: 1,
      name: "Bunna Insurance",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqYqeN8vxmbBs178T01hbSEQtGXuGhmWCKWNFOlVWlxyA8iVjCb9ltLoNpQ&s",
      description: "Comprehensive coverage with excellent benefits",
      rating: 4.8,
      tag: "Best Value",
      tagColor: "teal",
      price: "2000 ETB",
    },
    {
      id: 2,
      name: "Awash Insurance",
      logo: "data:image/jpeg;base64,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",
      description: "Trusted provider with a wide range of coverage options",
      rating: 4.7,
      tag: "Popular",
      tagColor: "blue",
      price: "2150 ETB",
    },
    {
      id: 3,
      name: "Nyala Insurance",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpQvjq28TGt_bnv4GzCZte6ZqCcfvTOabg7znmMPBy&s",
      description: "Reliable coverage with excellent customer service",
      rating: 4.6,
      price: "2050 ETB",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= Math.floor(rating) ? "#f59e0b" : "#e2e8f0"}
          color={i <= Math.floor(rating) ? "#f59e0b" : "#e2e8f0"}
        />
      );
    }
    return stars;
  };

  return (
    <Box>
      <Group
        mb="md"
        style={{
          position: "fixed",
          backgroundColor: "white",
          zIndex: 1000,
          width: "420px",
          top: 0,
          paddingTop: "1rem",
        }}
      >
        <BackButton onClick={onBack} />
      </Group>
      <div
        style={{
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          marginTop: "3rem",
        }}
      >
        <Title
          order={1}
          style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}
        >
          Compare Insurance Quotes
        </Title>
        <Text size="sm" style={{ color: "#64748b", marginTop: "0.25rem" }}>
          Select your preferred insurance provider
        </Text>

        <Stack gap="md" style={{ marginTop: "1.5rem" }}>
          {sampleInsuranceCompanies.map((company) => (
            <Card
              key={company.id}
              padding="md"
              radius="md"
              withBorder
              style={{
                overflow: "hidden",
                borderColor: "#e2e8f0",
                backgroundColor: "white",
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                transition: "all 0.2s",
                ":hover": {
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Avatar
                  src={company.logo}
                  alt={`${company.name} logo`}
                  size={56}
                  radius="xl"
                  style={{
                    border: "1px solid #e2e8f0",
                    backgroundColor: "white",
                    padding: "0.5rem",
                    overflow: "hidden",
                  }}
                >
                  {company.name.charAt(0)}
                </Avatar>
                <div>
                  <Text style={{ fontWeight: 500, color: "#1e293b" }}>
                    {company.name}
                  </Text>
                  <Text size="sm" style={{ color: "#64748b" }}>
                    {company.description}
                  </Text>
                </div>
              </div>

              <Group justify="space-between" style={{ marginTop: "0.75rem" }}>
                <Group gap={4}>
                  {renderStars(company.rating)}
                  <Text
                    size="sm"
                    style={{
                      fontWeight: 500,
                      color: "#1e293b",
                      marginLeft: "0.25rem",
                    }}
                  >
                    Rating {company.rating}/5
                  </Text>
                </Group>
                {company.tag && (
                  <Badge color={company.tagColor} variant="light">
                    {company.tag}
                  </Badge>
                )}
              </Group>
              <Text
                size="sm"
                style={{
                  fontWeight: 500,
                  color: "green",
                  marginLeft: "0.25rem",
                }}
              >
                Price {company.price}
              </Text>
              <WizardButton
                variant="quote"
                onClick={() => {
                  console.log(`Get Quote clicked for ${company.name}`);
                }}
                style={{
                  marginTop: "1rem",
                }}
              />
            </Card>
          ))}
        </Stack>
      </div>
    </Box>
  );
}
