import { Container, Box, Flex, Group, Title, Text } from "@mantine/core";
import { KeyRound, LockIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { ContainedInputs } from "../../components/inputs/text";
import CustomButton from "../../components/button/button";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container
      size={420}
      px={0}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Decorative elements */}
      <Box
        miw={"10%"}
        mih={"10vh"}
        bg="primary"
        style={{ position: "relative" }}
      ></Box>

      {/* Login form container */}
      <Container mt="lg" px="md" style={{ maxWidth: 420 }}>
        <Flex gap={20} direction="column">
          <Group justify="space-between" align="center" gap={20}>
            <Flex direction="column">
              <Title order={4}>Welcome Back, to Insurance Marketplace</Title>
              <Text size="xs" c="dimmed">
                LOGIN TO YOUR ACCOUNT
              </Text>
            </Flex>
            <Flex justify="flex-end">
              <LockIcon size={25} />
            </Flex>
          </Group>

          <ContainedInputs
            label="Phone Number"
            placeholder="Enter Your Phone Number"
          />

          <CustomButton
            action={() => navigate("/pin")}
            icon={<KeyRound size={18} />}
            ltr
            label="Login"
          />
        </Flex>
      </Container>
    </Container>
  );
}
