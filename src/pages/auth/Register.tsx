import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Select,
  Text,
  Anchor,
} from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  const { registerCustomer, registerUser } = useAuth();
  const [isCustomer, setIsCustomer] = useState(true);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      phone_number: "",
      fin: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "agent",
    },
    validate: {
      phone_number: (value) =>
        isCustomer && !value ? "Phone number is required" : null,
      fin: (value) => (isCustomer && !value ? "FIN is required" : null),
      email: (value) => (!isCustomer && !value ? "Email is required" : null),
      password: (value) => (!value ? "Password is required" : null),
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (isCustomer) {
      await registerCustomer({
        phone_number: values.phone_number,
        fin: values.fin,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
    } else {
      await registerUser({
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        role: values.role,
      });
    }
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
        Register
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {isCustomer ? (
          <>
            <TextInput
              label="Phone Number"
              placeholder="+251912345678"
              {...form.getInputProps("phone_number")}
              mb="md"
            />
            <TextInput
              label="FIN (Fayda ID)"
              placeholder="12345678901234"
              {...form.getInputProps("fin")}
              mb="md"
            />
          </>
        ) : (
          <>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
              mb="md"
            />
            <Select
              label="Role"
              placeholder="Select role"
              data={["agent", "insurer", "admin"]}
              {...form.getInputProps("role")}
              mb="md"
            />
          </>
        )}
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
          mb="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          {...form.getInputProps("password_confirmation")}
          mb="md"
        />
        <Button
          type="button"
          variant="subtle"
          onClick={() => setIsCustomer(!isCustomer)}
          mb="md"
        >
          {isCustomer ? "Register as agent/admin" : "Register as customer"}
        </Button>
        <Button type="submit" fullWidth>
          Register
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
        Have an account?
        <Anchor onClick={() => navigate("/login")}>Login</Anchor>
      </Text>
    </Paper>
  );
};
