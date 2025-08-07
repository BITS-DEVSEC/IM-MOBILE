import { Card, Text, Title, Group, Stack, Box } from "@mantine/core";
import { CreditCard, Building } from "lucide-react";
import BackButton from "../../../../components/button/BackButton";

interface Insurer {
  name: string;
}

interface SelectedProduct {
  id: number;
  estimated_price: string;
  insurer: Insurer;
  description: string;
}

interface ChoosePaymentMethodsProps {
  onBack: () => void;
  onBankSelected: () => void;
  onOtherMethodsSelected: () => void;
  selectedProduct: SelectedProduct;
}

export default function ChoosePaymentMethods({
  onBack,
  onBankSelected,
  onOtherMethodsSelected,
  selectedProduct,
}: ChoosePaymentMethodsProps) {
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
          Choose Payment Method
        </Title>
        <Text size="sm" style={{ color: "#64748b", marginTop: "0.25rem" }}>
          Select how you'd like to pay for your insurance
        </Text>

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
            <Group justify="space-between">
              <div>
                <Text style={{ fontWeight: 500, color: "#1e293b" }}>
                  {selectedProduct.insurer.name}
                </Text>
                <Text size="sm" style={{ color: "#64748b" }}>
                  {selectedProduct.description}
                </Text>
              </div>
              <Text
                style={{
                  fontWeight: 600,
                  color: "#059669",
                  fontSize: "1.125rem",
                }}
              >
                {selectedProduct.estimated_price} ETB
              </Text>
            </Group>
          </Card>
        )}

        <Stack gap="md" style={{ marginTop: "2rem" }}>
          <Card
            padding="lg"
            radius="md"
            withBorder
            style={{
              borderColor: "#e2e8f0",
              backgroundColor: "white",
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={onBankSelected}
          >
            <Group>
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#dbeafe",
                }}
              >
                <Building size={24} color="#2563eb" />
              </div>
              <div style={{ flex: 1 }}>
                <Text style={{ fontWeight: 600, color: "#1e293b" }}>
                  Pay from Bank
                </Text>
                <Text size="sm" style={{ color: "#64748b" }}>
                  Transfer directly from your bank account
                </Text>
              </div>
            </Group>
          </Card>

          <Card
            padding="lg"
            radius="md"
            withBorder
            style={{
              borderColor: "#e2e8f0",
              backgroundColor: "white",
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={onOtherMethodsSelected}
          >
            <Group>
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#dcfce7",
                }}
              >
                <CreditCard size={24} color="#059669" />
              </div>
              <div style={{ flex: 1 }}>
                <Text style={{ fontWeight: 600, color: "#1e293b" }}>
                  Other Payment Methods
                </Text>
                <Text size="sm" style={{ color: "#64748b" }}>
                  Credit card, mobile money, and more
                </Text>
              </div>
            </Group>
          </Card>
        </Stack>
      </div>
    </Box>
  );
}
