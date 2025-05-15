import {
  Box,
  Text,
  Title,
  Alert,
  Stack,
  Group,
  ScrollArea,
  Flex,
  Paper,
  Image,
  useMantineTheme,
  Button,
  Modal,
} from "@mantine/core";
import { Info, Camera } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import BackButton from "../../../components/button/BackButton";
import { useEffect, useRef, useState } from "react";

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
  left: "",
  right:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQajh-H3Zqcp_Ayd7QqfKvmPSHUFCw9-9C8kg&s",
  engine:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSazE_jx6s_K_qt738tvhkHibjGRrrgCxM7OQ&s",
  chassis_number: "",
  libre: "",
};

export default function StepUploadCarPhotos({
  carPhotos,
  setCarPhotos,
  onBack,
  onNext,
}: StepUploadCarPhotosProps) {
  const theme = useMantineTheme();
  const [activeAngle, setActiveAngle] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async (angle: string) => {
    setActiveAngle(angle);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && activeAngle) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `${activeAngle}-view.jpg`, {
                type: "image/jpeg",
              });
              setCarPhotos({
                ...carPhotos,
                [activeAngle]: file,
              });
            }
            stopCamera();
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setActiveAngle(null);
  };

  const removePhoto = (angle: string) => {
    setCarPhotos({
      ...carPhotos,
      [angle]: null,
    });
  };

  useEffect(() => {
    return () => {
      Object.values(carPhotos).forEach((photo) => {
        if (photo) {
          URL.revokeObjectURL(URL.createObjectURL(photo));
        }
      });
    };
  }, [carPhotos]);

  return (
    <Box style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {!activeAngle && (
        <Group mb="md">
          <BackButton onClick={onBack} />
        </Group>
      )}

      <ScrollArea style={{ flex: 1 }} px="md">
        <Title
          order={2}
          fw={700}
          mb="xs"
          c="primary.8"
          style={{ textAlign: "center" }}
        >
          Capture Vehicle Photos
        </Title>
        <Text size="sm" c="dimmed" mb="lg" ta="center">
          Please capture clear photos of your vehicle from all angles, including
          the chassis number and libre document.
        </Text>

        <Alert
          variant="light"
          color="primary"
          radius="md"
          mb="xl"
          icon={<Info size={18} />}
        >
          <Text size="sm">
            Capture clear photos from all angles. Ensure the entire vehicle,
            chassis number, and libre document are visible and well-lit.
          </Text>
        </Alert>

        <Stack gap="xl">
          {[
            "front",
            "back",
            "left",
            "right",
            "engine",
            "chassis_number",
            "libre",
          ].map((angle) => (
            <Box key={angle}>
              <Text size="sm" fw={600} tt="capitalize" mb="xs">
                {angle.replace("_", " ")} view
              </Text>
              <Flex gap="md" align="center">
                {carPhotos[angle] ? (
                  <Box style={{ position: "relative", flex: 1 }}>
                    <Image
                      src={URL.createObjectURL(carPhotos[angle]!)}
                      alt={`${angle} view`}
                      height={120}
                      width="100%"
                      style={{
                        objectFit: "cover",
                        borderRadius: theme.radius.sm,
                      }}
                    />
                    <Button
                      size="xs"
                      color="white"
                      bg="red"
                      variant="light"
                      onClick={() => removePhoto(angle)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                      }}
                    >
                      ×
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={() => startCamera(angle)}
                    leftSection={<Camera size={16} />}
                    variant="outline"
                    fullWidth
                    style={{
                      height: 120,
                      border: `2px dashed ${theme.colors.primary[5]}`,
                      backgroundColor: "white",
                    }}
                  >
                    Capture {angle.replace("_", " ")} view
                  </Button>
                )}

                <Paper
                  withBorder
                  shadow="sm"
                  radius="sm"
                  p="xs"
                  style={{
                    width: 120,
                    height: 120,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src={angleExamples[angle as keyof typeof angleExamples]}
                    alt={`${angle} angle example`}
                    height={80}
                    style={{ objectFit: "cover" }}
                    fallbackSrc="https://via.placeholder.com/80?text=No+Example"
                  />
                  <Text size="xs" c="dimmed" ta="center" mt={4}>
                    Example
                  </Text>
                </Paper>
              </Flex>
            </Box>
          ))}
        </Stack>
        <Group grow p="md" style={{ flexShrink: 0 }}>
          <WizardButton variant="next" onClick={onNext} />
        </Group>
      </ScrollArea>

      <Modal
        opened={activeAngle !== null}
        onClose={stopCamera}
        fullScreen
        withCloseButton={false}
        padding={0}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "black",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              flex: 1,
              objectFit: "contain",
              backgroundColor: "black",
            }}
          />
          <Group justify="center" p="md" bg="dark.8">
            <Button
              onClick={capturePhoto}
              size="lg"
              color="green"
              leftSection={<Camera size={20} />}
            >
              Capture
            </Button>
            <Button
              onClick={stopCamera}
              size="lg"
              variant="outline"
              color="gray"
            >
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
}
