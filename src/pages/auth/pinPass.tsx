import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
  LoadingOverlay,
} from "@mantine/core";
import { LockKeyhole, Trash2, Delete } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function PinPass() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberClick = (value: string | number) => {
    if (pin.length < 6 && typeof value === "number") {
      const newPin = pin + value;
      setPin(newPin);

      // Navigate when 6 digits are entered
      if (newPin.length === 6) {
        setIsLoading(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleWipe = () => {
    setPin("");
  };

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
      <LoadingOverlay visible={isLoading} />

      {/* Header Section */}
      <Box miw={"100%"} mih={"30vh"} bg="primary" pos="relative">
        <Box
          bg="primary.8"
          style={{
            height: "30vh",
            width: 30,
            position: "absolute",
            top: 0,
            right: 20,
          }}
        />
        <Box
          bg="primary.8"
          style={{
            height: "30vh",
            width: 30,
            position: "absolute",
            top: 0,
            left: 20,
          }}
        />
        <Container pt="xl" size="sm">
          <Flex align="center" justify="center" direction="column" pt="xl">
            <LockKeyhole size={32} color="white" />
            <Title c="white" mt="xs" order={4}>
              Security Check
            </Title>
          </Flex>
        </Container>
      </Box>

      {/* PIN Input Section */}
      <Container size="sm" px="md">
        <Flex mb="xl" direction="column" align="center" mt="lg">
          <Text fw={700} mb="xs" c="dimmed" size="sm">
            PLEASE ENTER YOUR PIN
          </Text>
          <Flex gap="xs" mb="xl">
            {[...Array(6)].map((_, i) => (
              <Center
                key={i}
                w={40}
                h={40}
                bg="gray.1"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                {i < pin.length ? (
                  <Text size="xl" fw={700}>
                    {pin[i]}
                  </Text>
                ) : null}
              </Center>
            ))}
          </Flex>
        </Flex>

        {/* Keypad */}
        <SimpleGrid
          cols={3}
          spacing="xs"
          style={{ position: "absolute", bottom: 25, left: "5%", width: "90%" }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "delete", 0, "back"].map(
            (opt, index) => (
              <UnstyledButton
                key={index}
                onClick={() => {
                  if (opt === "back") handleDelete();
                  else if (opt === "delete") handleWipe();
                  else if (typeof opt === "number") handleNumberClick(opt);
                }}
              >
                <Card
                  withBorder
                  padding="md"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.1s",
                    ":active": { transform: "scale(0.95)" },
                  }}
                >
                  <Center style={{ height: 40 }}>
                    {opt === "back" ? (
                      <Delete size={20} />
                    ) : opt === "delete" ? (
                      <Trash2 color="red" size={20} />
                    ) : (
                      <Text c="gray.8" size="xl" fw={500}>
                        {opt}
                      </Text>
                    )}
                  </Center>
                </Card>
              </UnstyledButton>
            )
          )}
        </SimpleGrid>
      </Container>
    </Container>
  );
}
