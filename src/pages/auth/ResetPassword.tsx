import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useSearchParams } from "react-router-dom";

export const ResetPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const form = useForm({
    initialValues: {
      email,
      reset_token: token,
      password: "",
      password_confirmation: "",
    },
    validate: {
      email: (value) => (!value ? "Email is required" : null),
      reset_token: (value) => (!value ? "Reset token is required" : null),
      password: (value) => (!value ? "Password is required" : null),
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await resetPassword(values);
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}
    >
      <Title
        order={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mb="md"
      >
        Reset Password
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          disabled
          {...form.getInputProps("email")}
          mb="md"
        />
        <TextInput
          label="Reset Token"
          disabled
          {...form.getInputProps("reset_token")}
          mb="md"
        />
        <PasswordInput
          label="New Password"
          placeholder="New password"
          {...form.getInputProps("password")}
          mb="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm new password"
          {...form.getInputProps("password_confirmation")}
          mb="md"
        />
        <Button type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
    </Paper>
  );
};
