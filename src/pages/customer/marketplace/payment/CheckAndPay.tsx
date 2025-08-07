import {
  Card,
  Text,
  Title,
  Group,
  Box,
  Button,
  Avatar,
  Loader,
} from "@mantine/core";
import BackButton from "../../../../components/button/BackButton";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { CheckCircle } from "lucide-react";

interface Bank {
  id: number;
  name: string;
  logo: string;
}

interface Insurer {
  name: string;
}

interface SelectedProduct {
  id: number;
  estimated_price: string;
  insurer: Insurer;
  description: string;
}

interface CheckAndPayProps {
  onBack: () => void;
  selectedBank: Bank;
  selectedProduct: SelectedProduct;
  onPaymentComplete: () => void;
  onSubmitQuote: (
    isDraft: boolean,
    productId?: number
  ) => Promise<number | null>;
}

export default function CheckAndPay({
  onBack,
  selectedProduct,
  onPaymentComplete,
  onSubmitQuote,
}: CheckAndPayProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock account details
  const mockAccountDetails = {
    accountHolder: "ABEL ASNAKE MEKURIA",
    bankName: "Commercial Bank of Ethiopia",
    accountNumber: "1000401038578",
  };

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Submit the quote after successful payment
      const result = await onSubmitQuote(false, selectedProduct.id);

      if (result !== null) {
        notifications.show({
          message: "Payment successful! Your policy has been created.",
          color: "green",
          icon: <CheckCircle />,
        });
        onPaymentComplete();
      } else {
        throw new Error("Failed to create policy");
      }
    } catch {
      notifications.show({
        message: "Payment failed. Please try again.",
        color: "red",
      });
    } finally {
      setIsProcessing(false);
    }
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
          Transfer to Bank
        </Title>

        {/* Selected Account Card */}
        <Card
          padding="md"
          radius="md"
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#7e4005",
            color: "white",
            border: "none",
          }}
        >
          <Group>
            <Avatar
              size="md"
              radius="md"
              src="data:image/jpeg;base64,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"
              alt="Bank"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              CB
            </Avatar>
            <div>
              <Text style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                {mockAccountDetails.accountHolder}
              </Text>
              <Text size="sm" style={{ opacity: 0.9 }}>
                {mockAccountDetails.bankName} (
                {mockAccountDetails.accountNumber})
              </Text>
            </div>
          </Group>
        </Card>

        {/* Amount Section */}
        <Box style={{ marginTop: "1.5rem" }}>
          <Text
            style={{
              fontWeight: 500,
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Amount
          </Text>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem",
              border: "2px solid #10b981",
              borderRadius: "0.5rem",
              backgroundColor: "#f0fdf4",
            }}
          >
            <Text
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#065f46",
              }}
            >
              {selectedProduct?.estimated_price || "5,000"}
            </Text>
            <Text
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "#065f46",
              }}
            >
              ETB
            </Text>
          </div>
          <Text size="sm" style={{ color: "#6b7280", marginTop: "0.5rem" }}>
            Balance: 0.00(ETB)
          </Text>
        </Box>

        {/* Product Details */}
        {selectedProduct && (
          <Card
            padding="md"
            radius="md"
            withBorder
            style={{
              marginTop: "1rem",
              borderColor: "#e2e8f0",
              backgroundColor: "#f8fafc",
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                color: "#1e293b",
                marginBottom: "0.5rem",
              }}
            >
              Insurance Details
            </Text>
            <Group justify="space-between">
              <div>
                <Text style={{ fontWeight: 500, color: "#1e293b" }}>
                  {selectedProduct.insurer.name}
                </Text>
                <Text size="sm" style={{ color: "#64748b" }}>
                  {selectedProduct.description}
                </Text>
              </div>
            </Group>
          </Card>
        )}

        {/* Add Notes Section */}
        <Box style={{ marginTop: "1.5rem" }}>
          <Text
            style={{
              color: "#10b981",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Add notes(optional)
          </Text>
        </Box>

        {/* Pay Button */}
        <Button
          fullWidth
          size="lg"
          style={{
            marginTop: "2rem",
            backgroundColor: "#7e4005",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: 600,
          }}
          onClick={handlePay}
          disabled={isProcessing}
          leftSection={isProcessing ? <Loader size="sm" color="white" /> : null}
        >
          {isProcessing ? "Processing Payment..." : "Pay"}
        </Button>
      </div>
    </Box>
  );
}
