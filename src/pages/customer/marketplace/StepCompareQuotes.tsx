import {
  Card,
  Text,
  Title,
  Group,
  Avatar,
  // Badge,
  Stack,
  Box,
  Loader,
} from "@mantine/core";
import { Star } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface InsuranceProduct {
  id: number;
  name: string;
  description: string;
  estimated_price: string;
  customer_rating: number | null;
  status: string;
  coverage_type: {
    id: number;
    insurance_type_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  insurer: {
    id: number;
    name: string;
    description: string;
    contact_email: string;
    contact_phone: string;
    api_endpoint: string;
    api_key: string;
    logo_url: string | null;
  };
}

interface StepCompareQuotesProps {
  onBack: () => void;
  onGetQuote: (isDraft: boolean, productId?: number) => Promise<number | null>;
  formData: any;
}

export default function StepCompareQuotes({
  onBack,
  onGetQuote,
  formData,
}: StepCompareQuotesProps) {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [insuranceProducts, setInsuranceProducts] = useState<
    InsuranceProduct[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quoteLoading, setQuoteLoading] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Fetch insurance products filtered by coverage_type_id
  useEffect(() => {
    const fetchInsuranceProducts = async () => {
      try {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const coverageTypeId = formData.coverage_type_id || 0;
        if (coverageTypeId <= 0) {
          throw new Error("Invalid coverage type ID");
        }
        const response = await fetch(
          `${baseUrl}/insurance_products?filter[coverage_type_id]=${coverageTypeId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch insurance products");
        }

        setInsuranceProducts(data.data || []);
        setLoading(false);
      } catch (err) {
        setError(
          (err as Error).message || "Failed to fetch insurance products"
        );
        setLoading(false);
        notifications.show({
          message:
            (err as Error).message || "Failed to fetch insurance products",
          color: "red",
          icon: <AlertCircle />,
        });
      }
    };

    fetchInsuranceProducts();
  }, [accessToken, formData.coverage_type_id]);

  const renderStars = (rating: number | null) => {
    const stars = [];
    const effectiveRating = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= Math.floor(effectiveRating) ? "#f59e0b" : "#e2e8f0"}
          color={i <= Math.floor(effectiveRating) ? "#f59e0b" : "#e2e8f0"}
        />
      );
    }
    return stars;
  };

  // const getTag = (index: number) => {
  //   if (index === 0) return { label: "Best Value", color: "teal" };
  //   if (index === 1) return { label: "Popular", color: "blue" };
  //   return null;
  // };

  const handleGetQuote = async (productId: number) => {
    setQuoteLoading((prev) => ({ ...prev, [productId]: true }));
    try {
      const result = await onGetQuote(false, productId);
      if (result !== null) {
        navigate("/policies");
      } else {
        notifications.show({
          message: "Failed to retrieve quote",
          color: "red",
          icon: <AlertCircle />,
        });
      }
    } catch (err) {
      notifications.show({
        message: (err as Error).message || "Failed to retrieve quote",
        color: "red",
        icon: <AlertCircle />,
      });
    } finally {
      setQuoteLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (loading) {
    return (
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text color="red">{error}</Text>
      </Box>
    );
  }

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
          {insuranceProducts.map((product) => {
            // const tag = getTag(index);
            return (
              <Card
                key={product.id}
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
                  {" "}
                  <Avatar
                    src={product.insurer.logo_url}
                    alt={`${product.insurer.name} logo`}
                    size={56}
                    radius="xl"
                    style={{
                      border: "1px solid #e2e8f0",
                      backgroundColor: "white",
                      padding: "0.25rem",
                      overflow: "hidden",
                    }}
                    styles={{
                      image: {
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      },
                    }}
                  >
                    {product.insurer.name.charAt(0)}
                  </Avatar>
                  <div>
                    <Text style={{ fontWeight: 500, color: "#1e293b" }}>
                      {product.insurer.name}
                    </Text>
                    <Text size="sm" style={{ color: "#64748b" }}>
                      {product.description}
                    </Text>
                  </div>
                </div>

                <Group justify="space-between" style={{ marginTop: "0.75rem" }}>
                  <Group gap={4}>
                    {renderStars(product.customer_rating)}
                    <Text
                      size="sm"
                      style={{
                        fontWeight: 500,
                        color: "#1e293b",
                        marginLeft: "0.25rem",
                      }}
                    >
                      Rating {product.customer_rating || "N/A"}/5
                    </Text>
                  </Group>
                  {/* {tag && (
                    <Badge color={tag.color} variant="light">
                      {tag.label}
                    </Badge>
                  )} */}
                </Group>
                <Text
                  size="sm"
                  style={{
                    fontWeight: 500,
                    color: "green",
                    marginLeft: "0.25rem",
                  }}
                >
                  Price {product.estimated_price} ETB
                </Text>
                <Group gap="sm" style={{ marginTop: "1rem" }}>
                  <WizardButton
                    variant="quote"
                    onClick={() => handleGetQuote(product.id)}
                    disabled={quoteLoading[product.id]}
                    leftSection={
                      quoteLoading[product.id] && <Loader size="sm" />
                    }
                  >
                    Get Quote
                  </WizardButton>
                </Group>
              </Card>
            );
          })}
        </Stack>
      </div>
    </Box>
  );
}
