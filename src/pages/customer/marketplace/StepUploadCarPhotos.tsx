import {
  Box,
  Text,
  Title,
  Alert,
  Stack,
  Group,
  ScrollArea,
  FileInput,
  Flex,
  Paper,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { Info, Upload } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";
import AppContainer from "../../../components/AppContainer";

interface StepUploadCarPhotosProps {
  carPhotos: { [key: string]: File | null };
  setCarPhotos: (photos: { [key: string]: File | null }) => void;
  onBack: () => void;
  onNext: () => void;
}

const angleExamples = {
  front:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRY_uZD_8hKZDf2bd4A2EDuR6Rykt-iVv4A&s",
  back: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8o3i2XemyxL-xJCZqaQkUWbZW_SgMIrUJzA&s",
  left: "data:image/jpeg;base64,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a/gkyv7BvbMeCPK/sW9swKq5wcJlVZnxWXY5EqEl2oMrBKrHeabWshP6p2E/qzgZVnNOqq06lU0XRdNKoFBFI7gxW66iqkhSSSl+qDwvPwR5X9i3tma2N5mMsqKQEq0zwZH2j0EEH1QKVwORmi4qDMqOhb/VrtqUggoabIFIIJBBYCx3zzjMern6LhANLsoNR9jFF2ItRwTdUGwdwHjEC1q0eYTBhrti8Qy33DQL919MlGD5rctpCy0D6XJJ854wNLkbg8qoYSlhtdGuVIqO9RBepVuGNTaNliqgdgVZOKWPpN4tRT5iJy8NyPwdPxaA9JM6NHLKSeLTAgbkQBEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQhERCvsRED/2Q==",
  right:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQajh-H3Zqcp_Ayd7QqfKvmPSHUFCw9-9C8kg&s",
};

export default function StepUploadCarPhotos({
  carPhotos,
  setCarPhotos,
  onBack,
  onNext,
}: StepUploadCarPhotosProps) {
  const theme = useMantineTheme();

  const handleFileChange = (angle: string, file: File | null) => {
    setCarPhotos({
      ...carPhotos,
      [angle]: file,
    });
  };

  return (
    <AppContainer>
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
      <ScrollArea style={{ flex: 1 }} px="md">
        <div style={{ flex: 1, paddingTop: "4rem" }}>
          <Title
            order={2}
            fw={700}
            mb="xs"
            c="primary.8"
            style={{ textAlign: "center" }}
          >
            Upload Vehicle Photos
          </Title>
          <Text size="sm" c="dimmed" mb="lg">
            Please upload clear photos of your vehicle
          </Text>

          <Alert
            variant="light"
            color="primary"
            radius="md"
            mb="xl"
            icon={<Info size={18} />}
          >
            <Text size="sm">
              Upload clear photos from all angles. Ensure the entire vehicle is
              visible.
            </Text>
          </Alert>

          <Stack gap="xl">
            {["front", "back", "left", "right"].map((angle) => (
              <Box key={angle}>
                <Text size="sm" fw={600} tt="capitalize" mb="xs">
                  {angle} view
                </Text>
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap="md"
                  align={{ sm: "center" }}
                >
                  <Box
                    style={{ flex: 1, display: "flex", flexDirection: "row" }}
                  >
                    <FileInput
                      accept="image/*"
                      value={carPhotos[angle]}
                      onChange={(file) => handleFileChange(angle, file)}
                      placeholder={`Upload ${angle} view `}
                      clearable
                      leftSection={<Upload size={16} />}
                      styles={{
                        input: {
                          height: 80,
                          border: `2px dashed ${theme.colors.primary[5]}`,
                          backgroundColor: "white",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          ":hover": {
                            borderColor: theme.colors.primary[8],
                            backgroundColor: theme.colors.gray[0],
                          },
                        },
                        section: {
                          marginRight: 0,
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                        },
                        placeholder: {
                          marginLeft: theme.spacing.xss,
                          textAlign: "center",
                        },
                      }}
                    />
                    {carPhotos[angle] && (
                      <Text size="xs" c="green.6" mt="xs">
                        {carPhotos[angle]?.name} uploaded
                      </Text>
                    )}
                    <Paper
                      withBorder
                      shadow="sm"
                      radius="sm"
                      p="xs"
                      style={{
                        width: 150,
                        height: 120,
                        marginLeft: theme.spacing.xl,
                      }}
                    >
                      <Image
                        src={angleExamples[angle as keyof typeof angleExamples]}
                        alt={`${angle} angle example`}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                      <Text size="xs" c="dimmed" ta="center" mt={4}>
                        Example
                      </Text>
                    </Paper>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
          <Group grow p="md" style={{ flexShrink: 0 }}>
            <WizardButton variant="next" onClick={onNext} />
          </Group>
        </div>
      </ScrollArea>
    </AppContainer>
  );
}
