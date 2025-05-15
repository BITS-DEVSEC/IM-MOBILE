import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Paper,
  Title,
  SimpleGrid,
  UnstyledButton,
  Card,
  Text,
  Center,
  Container,
  PinInput,
} from "@mantine/core";
import { Delete, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSearchParams } from "react-router-dom";

export const VerifyOtp: React.FC = () => {
  const { verifyOtp } = useAuth();
  const [searchParams] = useSearchParams();
  // Decode the phone number to restore special characters like "+"
  const phone = decodeURIComponent(searchParams.get("phone") || "");
  const [clickedKey, setClickedKey] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      phone_number: phone,
      otp: "",
    },
    validate: {
      phone_number: (value) => (!value ? "Phone number is required" : null),
      otp: (value) =>
        !value
          ? "OTP is required"
          : value.length !== 4
          ? "OTP must be 4 digits"
          : null,
    },
  });

  const handleNumberClick = (value: string) => {
    if (form.values.otp.length < 4) {
      setClickedKey(value);
      form.setFieldValue("otp", form.values.otp + value);
      setTimeout(() => setClickedKey(null), 200); // Reset feedback after 200ms
    }
  };

  const handleDelete = () => {
    setClickedKey("delete");
    form.setFieldValue("otp", form.values.otp.slice(0, -1));
    setTimeout(() => setClickedKey(null), 200);
  };

  const handleClear = () => {
    setClickedKey("clear");
    form.setFieldValue("otp", "");
    setTimeout(() => setClickedKey(null), 200);
  };

  const handleSubmit = async (values: typeof form.values) => {
    await verifyOtp(values);
  };

  return (
    <Container size="sm" pt="xl">
      <Paper
        radius="md"
        p="xl"
        withBorder
        style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}
      >
        <Title
          order={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          mb="lg"
        >
          Verify OTP
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Phone Number"
            disabled
            {...form.getInputProps("phone_number")}
            mb="md"
          />
          <PinInput
            length={4}
            value={form.values.otp}
            onChange={(value) => form.setFieldValue("otp", value)}
            error={!!form.errors.otp}
            size="md"
            readOnly
            mb="lg"
            styles={{
              root: {
                display: "flex",
                justifyContent: "center",
                gap: 10,
              },
            }}
          />
          {form.errors.otp && (
            <Text c="red" size="sm" mb="md">
              {form.errors.otp}
            </Text>
          )}
          <Button
            type="submit"
            fullWidth
            disabled={form.values.otp.length !== 4}
          >
            Verify
          </Button>
        </form>
      </Paper>

      <SimpleGrid
        cols={{ base: 3, sm: 3 }}
        spacing="xs"
        mt="lg"
        style={{ maxWidth: 400, margin: "auto" }}
      >
        {[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "clear",
          "0",
          "delete",
        ].map((opt, index) => (
          <UnstyledButton
            key={index}
            disabled={
              form.values.otp.length >= 4 && opt !== "clear" && opt !== "delete"
            }
            onClick={() => {
              if (opt === "clear") handleClear();
              else if (opt === "delete") handleDelete();
              else handleNumberClick(opt);
            }}
            style={{
              transition: "transform 0.1s ease, box-shadow 0.2s ease",
            }}
          >
            <Card
              withBorder
              padding="md"
              radius="md"
              style={{
                cursor:
                  form.values.otp.length >= 4 &&
                  opt !== "clear" &&
                  opt !== "delete"
                    ? "not-allowed"
                    : "pointer",
                backgroundColor:
                  clickedKey === opt
                    ? "#e9ecef" // Light gray on click
                    : form.values.otp.length >= 4 &&
                      opt !== "clear" &&
                      opt !== "delete"
                    ? "#f5f5f5" // Grey when disabled
                    : "#fff",
                boxShadow:
                  clickedKey === opt
                    ? "0 0 8px rgba(233, 236, 239, 0.6)" // Subtle gray glow
                    : "none",
                ":hover": {
                  backgroundColor:
                    form.values.otp.length >= 4 &&
                    opt !== "clear" &&
                    opt !== "delete"
                      ? "#f5f5f5"
                      : "#dee2e6", // Slightly darker gray on hover
                },
                ":active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              <Center style={{ height: 40 }}>
                {opt === "delete" ? (
                  <Delete
                    size={20}
                    color={clickedKey === "delete" ? "#343a40" : "#666"}
                  />
                ) : opt === "clear" ? (
                  <Trash2
                    size={20}
                    color={clickedKey === "clear" ? "#343a40" : "#ff4d4f"}
                  />
                ) : (
                  <Text
                    size="xl"
                    fw={500}
                    c={clickedKey === opt ? "gray.9" : "gray.8"}
                  >
                    {opt}
                  </Text>
                )}
              </Center>
            </Card>
          </UnstyledButton>
        ))}
      </SimpleGrid>
    </Container>
  );
};
