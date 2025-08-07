import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Paper, Title, Stack } from "@mantine/core";
import { Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (!value ? "Email is required" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await forgotPassword(values.email);
    // Optional: redirect to login after successful request
    // navigate("/login");
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}
    >
      <Stack>
        {/* Back Button */}
        <Button
          variant="subtle"
          size="xs"
          onClick={() => navigate("/login")}
          ta="center"
        >
          Back to Login
        </Button>

        {/* Title */}
        <Title order={2} ta="center" mb="md">
          Forgot Password
        </Title>

        {/* Form */}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            mb="md"
          />
          <Button type="submit" fullWidth leftSection={<Mail />}>
            Send Reset Instructions
          </Button>
        </form>
      </Stack>
    </Paper>
  );
};
