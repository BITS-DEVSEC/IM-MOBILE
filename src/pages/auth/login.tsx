import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Group,
  Anchor,
} from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ET from "../../assets/image.png";

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isPhoneLogin, setIsPhoneLogin] = useState(true); // Default to phone number

  const form = useForm({
    initialValues: {
      email: "",
      phone_number: "",
      password: "",
    },
    validate: {
      email: (value) => (!isPhoneLogin && !value ? "Email is required" : null),
      phone_number: (value) =>
        isPhoneLogin && !value ? "Phone number is required" : null,
      password: (value) => (!value ? "Password is required" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const identifier = isPhoneLogin
      ? `+251${values.phone_number}`
      : values.email;

    await login({
      [isPhoneLogin ? "phone_number" : "email"]: identifier,
      password: values.password,
    });
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
        Login
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {isPhoneLogin ? (
          <TextInput
            label="Phone Number"
            placeholder="912345678"
            leftSection={
              <Group gap={5}>
                <img src={ET} alt="ET" style={{ width: 20, height: 20 }} />
                <Text size="sm" c="dimmed">
                  +251
                </Text>
              </Group>
            }
            leftSectionWidth={85}
            {...form.getInputProps("phone_number")}
            mb="md"
          />
        ) : (
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            mb="md"
          />
        )}
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
          mb="md"
        />
        <Group justify="space-between" mb="md">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => setIsPhoneLogin(!isPhoneLogin)}
            size="sm"
          >
            {isPhoneLogin ? "Use email instead" : "Use phone number instead"}
          </Anchor>
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            size="sm"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
      <Text
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mt="md"
      >
        Don't have an account?
        <Anchor onClick={() => navigate("/register")}>Register</Anchor>
      </Text>
    </Paper>
  );
};
