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
  Checkbox,
} from "@mantine/core";
import { Info, Camera } from "lucide-react";
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
  left: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhAWExUVFhUWFRcSFhsbFhAWFhUWFhgSGhUdHykgGBolHxYWITEiMSkrLjAuFx8zODMtPiguLi0BCgoKDQ0NFQ8NDysZFRktKys3NzctKzcrNzczLjg3KzMrNy0uNyswKzErLTcrMzcrLDIrKzc3MC4tNysrOCsuLv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCAQj/xABNEAACAQIDAwYKBQgHCAMAAAABAgADEQQFEiExQQYHEyJRYRcyVHGBkZKhsdEUQlNywRUjM1KCk6LSRGJjc4Oy4RYkVZSjwsPTJYSz/8QAGAEBAQADAAAAAAAAAAAAAAAAAAECAwT/xAAeEQEAAwABBQEAAAAAAAAAAAAAAQIRAyEycYHBE//aAAwDAQACEQMRAD8AvCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiCZqVMzpDZ0ik9inUfULwNuJF8w5TYgEjD5bUq23NUqU6aN5tpcelYwWZ450vVpU6DXPUVTWsOBLaqe3u98CURI8uIxnFx6MNb44gzxia+L0NpqqHsdOumoUNbYW65NrwJJEhuX4nMAx+kYvDFbbBRQKdV+JdyLWvN/6bV8qT/pfzQJHEjf06vwxNL000PwrCekx+J+2ot5qNvf9JPwgSKJwxmGJG6nSf0uv+VXnoZxVXx8Lf8Aun/GqtMQO1E4WG5W4VqnRPUNGpfTprApqbsRz1an7JM7gN90D7ERAREQEREBERAREQEREBERAREQI5y+x7UsG6U06SvXIo0E/Wqtubu02LX4aZuZDgHo0KaV6vTVgqipU0quthwCqAAoubbO87SZq4an0+LfEN4mHDUaF9xc/p6vrAT9hu2QLnN501w18PhbPVI2nggI2M3cd4XjvNhseiW8sOXeEy8AVHBc7Aq7TvsTYbSAb3OwbCL32SA4jnUWsbLjFpdgVHBX9sqAR5xeUrjcY9Z2qVXLuxuzNvPAegAAAbgBaYQIF0f7TpU8bMKRPaWRSfTsnupmZVWdcUzhVJstY2J4LsbibD0yltIm5gjopvU4nqL6d5+HvlRb+WvWWmoNV3Y9ZjrJuWNzx7508DmFRVbUWPXPjbbbF2bZ+fhOp+UKyadFaonVB6rsNu3bsMC8WzYz5+VyeLDzEj4GUrh+UuLXdiqn7Tav815u0eWuNXfVD9z00+IAPvgWTg8yqB1Lu7L1LhmJ2XIJ2ns+EkX5XC+KxT7uw+vfKfPLWuA96VFtLBfFYEqQ224bf1R65vUeXI6UK+G+sRdamw77GxU/GBav+0BI0l9SneKg137utcD1ToZZylRdgIpebbT7hpJ2ecFOGw7pWI5U4c+NSdfMqn/uBn1s4wzeLWKH+srW+H4xgvjBZor2DWUnYCDdHPYG2WbaOqQD550JQOV8r2w7aekSojbNBYEOP1QD6dluJ2A7ZaXJzlGKqKV1EHfTcEVaezcoba4/qkk77FgJMVLImOhWV1DKwYHiPh3HumSQIiICIiAiIgIiICIiAnI5RZqtFRT6VKdSrcKXYLoH1qm0jdfZ3kTrykuejlClHGrTeizgUqZutVUtqaps0tScnjtkmZiOjZxVra0Recjxq0sJicMaYoJUp1BpK6RUVi4IsbgG5vc+uRzNubjLa7l3wPXYklkd11Em5JCsATfjKsyPL6+NcMtI4bD7LvXOqo1vswFS/DbYAdptaXXgMxKIlMMWCKF1OdTtYWuzcT2mSs2nurjPnpw0z8eWb+s+or4J8s8kqfvan808Dmvynydv31T+aT5K7uCN1wRccL8Z9fFVFHiL6CfhaZudAxzU5WRf6M9u3pqlv80+NzV5Zou9Coqi561ZwEB7STsk1GKcqVI8bVcjhqufxnjEYnpqRVrrqG3SbFT3HtBkVBcNzVZRV/Ran/u8SGt6iZlq8zOAbhiRYWFqq/ipnfTLaClSdbMhB1MV1EjtIUe606zZz3E+a3zlRADzIYHhVxf7yl/6pjbmQwnCtivS1I/+OWF+Wv7N/wCH+aPy2fsan8H80Ct63MpQ4YmuNdlN1Q2ttB2AbbqB6Zq1+Y25DJj3BGnxsNfxQAN1Qdks3E54dJ/3erss31PqkN+v3TkZ3SXEVVqNh63VFrGlRY9xD69S+/0QIZW5oavDFofvUWX4MZoV+arFjxa2HbztUU//AJ/jLKyjM2w+oGlinUkaQUB0d36VvdYd03m5XUxvo4gf4LfheNkVBS5H5hgnXEJQp4goTZaVWzXZSgYGwII1XuN1hNyvy3xtJxTxOCqIzgqmp1qXa1lN+j1XBIN9fDjLHxnK7ClStQ1kB2E9BVv7k985uX5nk1M6i2p/18RTqMw8xddkDocksyq1heqlTD17bdaMEq2HHV457DfUACL7NTSRca4JVkUkbQVbxx2gEe6/Z2yO1+U+VsptiqAI2gF9N7bbbbb7W9M20xmW1di4qg33cQt/VqgdZs2Ub6bj2T8Gnn8u0eJZfOjfgJrJlFFx1Krkf1KlxMNbk2p3Vqg89jCurSzeg26snpNvjabdOoGF1II7jeQzE8mezEn9pZqjk9iVN6ddG90YJ/Er+tneKwt+mbUFtcKGqsL7rogZhvHCdfLOWNOoQjMms7k1hajDtFJ7MfVIJTExYfEq99J2jeCCCvnBmWAiIgJD87w9OtXciuiuulNJYAkqCSbHb9a3oMmBn5nw/KV8XUqVCdNbUzOF3VF1bKijhbYCO4HjsCz8Tycrg6lbV+My4R2oi9VTwAC7Wck2CqOJJkLy7PKo+sQe4kH3TNm/KR6NF8Q7lmRSKQYnY7DTq7b2Nr8NZPCVHY5VcvKOF6leq5fyfCPp0d1SuOszeYqu8XNpC6vOlhybLlaOP7VndvSS5vK9VNZNauxJY373Pbs3DsE7+Gy/S6UqtWnhncqq0tLPVBYgDWi2FM7dzMGHZCpLR5z8MP0mVhP7h6lM+ghxJhyb5V0cXsweIbpN/wBGxbXFTtWnXsGVvvXBJlYV8tJKpSr0q7ugdaRDU6lQEkDRqujsbeLq1HgDOHVoFGFWjdHQ7txVhvUjgeBEC/sVmOtdSgqQSrqws1NxvRhwIM4dXN3HHjNHLOUQxFGniiLswFLEAb2ZQdFT71gyk8bDunQTMcCfHFUH7gP4wjEM9e527v8AXb8IHKKp2++baY7K+LuPPTb8JlGMyk765HnpVfwWBoNylq2t2gj8PxmelysqbO//AEm3ryog2xK7jvVx8VhcJlpAtjKQNhve3DvgfKfLFrbRNunyuHEcLzTbJ8E3i46h+9T5zyeTFM+JiqTeaop+BgdZeVSHeO+ZByhoHeq9u0CcFuSFX6rBvMQZr1OSeJH1TAkOIx2EdWvSTcfqjs3z0KGAc7MNTJ+6JEMRyfxCqbo1gDf1T1h9dK4Js56q34E7NXo3+iBKsVjMLh1Z0p0KFNDZ6zoD1hvpU02a3Gy5JCrxvukLzDnZwoOlVxdcfrGu1NT/AIdMoB75DuXOati64w9NtOHw4CjsHax7WJv33LcN3My/BFgWo01VENnr1mVUUnh0jbNX9VdtuEKnSc7uHH9ExA+7iq1/fUMkOR86WDqsB09bDsdwrhaqek2VvUxlZnBPoDjF4YqdOks1RQxZqyhbvSUKb0Km1rDdt2zk4/L7N0dWn0FWwKnZocHcwIurKeDDZ54H6JzTLlxYD0q3Q4gglalOowpYtQNOlitjcebUpAuGFwYNm+Kx+HJXG0GfCMyLUFdVqimh1Bqy1xfUB1TZr94G8R7mx5QVF14GoxFuvRLH9FUXYLHsOxe8N3CXNlOfU2otUrOEFNSzMfqi22EYub7FUlUYemhFqYJJqPU0lbAoC7EhbkkAbBt7ZNJT/JTNsPWzelVwdTpKVQVUenp0Gi2gnpQo2MmwAjhqBtxFwSKREQPhE/L3OTyMr5ZiXrUEqDDlyadQA/mr/U1DhtsO7Ye/9RTSznLExVF6FW+ioLEqbMLEEMDwIIB9ED8lYPldiE3lX++v4raZs95RnGJTo9GE64LFSTfgNhHefdLxbmRywggtiCT9bpFDDvsE039Ejeacw2g9JhMaTp2inXQXYjbbpFIG3d4sCssrZRUNQsE0dWndghViDZlZgVDKAbXsLkG4IBnXyvIFo1UqMSzCor/nQVcWIa1gSrse0Mb34ThUsA1ejVCePSHSlD4zKuxwO8A6rdimTjIGpjDGriiopuUZNfW+j7C2tQp1NUfULKCDtBI2SjhZxkYq9FuphaRS7EhgysdI6LaSNvAcd80s01hleo5qOwtUZ10s+zqMUJ13sCNTAXsN+2TDlHl/5lPoJYlyhugPS1qNrBLmzF1ZrFQASHFryB16DKhdxpNVy4B3hVuqk+freq/GEbvJnM1oPWpMbI4Dr3EW952eozs1s3w5P6ZR6R85AMa9381pPcr5uMa1MM+VYjrAMvR16C9UgEXWoCwPq80Kz4Wth3/pVFfvVFH4zdShhT/T8N6ayzCObPFf8Nxg/wDs4T5Ce15r8Txy/Gd/+8YP5xozNhMLY/8AyGF/fp856OAw3/EMJ/zNP5zB4KsV5Di/3+C/nn3wU4ryPF/vsF6/0sDI2XYfy/Cf81R/mnj8lUz4uKwzebE0T/3zIvNLifJ8SO385hNv/U2T14IMT+piB5zhjs/ewjAcjPB6LearSPwafFy+svitb7jj8DNhuZvE7bdMOy64fZ5/z+33QeZnEf2vpXD39P5+BrtjaybDiKi/4jC/vnmtmVg1R6pfSrHa1zuPxF5snmcxCi+is1huX6OCT3HppF845BZmmrTgcV0YvvYPdRxKITt9JjRHwSVVdXWqtqYntY7z3W2+kzu1MvWuKd6mmlTGikgYGlqO/TVG5mO1tSq17bdwnCwrgmmx4Bb92k2Pwki5P0GpVmouSgo1AapuNLIzCyDbZ+kBsO9gdlrwrZxmVKaJoqPFFPYCRbSazEhm6p21jxO+cVMBU6I0mqCoqhnpBbuaTbzZwCiK20EarE2NrgSw6uCwQ1kV6d6Q1PS1OVwm1lQ202YAsoqDUdJvfba9d12q1cRoqM1qAZ3H1U0cAo6u/SBbeWgYsrr2xGHqcekFNvM/VB89i3qEmfK7MymF0BlAd1Vuk1aSACSDpF+Hxld1K5TTYjUrqw7tPbLdyHLuUZOoYLDItQAnpxS02O0AoGLg+cXgSfmsyVKOHwlXoKa1q3S1GcLYmmbhbEjUAUCG3aZZsjXJrKMYgV8bXoll8WnhKZVEvvBZiSw7gF3SSyBERAREQE8lx2z0RMbUQeECj+c/kfUwmIbMcCC6O2utTp+PRc+NUUcUbaSNtrm4sdnByHlTT0MqVlQVARVp4iglelVJNy5DMrKSeAJWwGwWn6HqZejbxI7mXNvltdi1XCIWO0svVJPaStrwKJxWYYShrIqCqWfpFp06Yp0qT6SjFUFRyQykqynSCLb7CRyti3xVUsXRO+owVRwHD3AbhbZP0cnNNlQ3YX1sx+JnvwV5Z5N/EYFScgsqyjC1VxGOzCnXqIQyUqaOaSsDcMzFQX4bLAXHGW54VMq8sHsN8p58FWV+T/xGfPBTlfk/8Rge/CplXlg9hvlHhUyrywey3ynjwU5X5P8AxGPBRlnk59owPfhUyrywey3yn3wp5V5YPZb5TF4J8s8nPtGfPBPlf2B9owM3hTyrywey3yjwp5V5YPZb5TD4Jsr+wPtGfPBLlf2B9owM/hTyrywey3yjwp5V5YPZb5TB4Jcr+wb2zPngkyv7BvbMDY8KeVeWD2W+UeFPKvLB7LfKa/gkyv7BvbMeCPK/sW9swKq5wcJlVZnxWXY5EqEl2oMrBKrHeabWshP6p2E/qzgZVnNOqq06lU0XRdNKoFBFI7gxW66iqkhSSSl+qDwvPwR5X9i3tma2N5mMsqKQEq0zwZH2j0EEH1QKVwORmi4qDMqOhb/VrtqUggoabIFIIJBBYCx3zzjMern6LhANLsoNR9jFF2ItRwTdUGwdwHjEC1q0eYTBhrti8Qy33DQL919MlGD5rctpCy0D6XJJ854wNLkbg8qoYSlhtdGuVIqO9RBepVuGNTaNliqgdgVZOKWPpN4tRT5iJy8NyPwdPxaA9JM6NHLKSeLTAgbkQBEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQhERCvsRED/2Q==",
  right:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQajh-H3Zqcp_Ayd7QqfKvmPSHUFCw9-9C8kg&s",
  engine:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSazE_jx6s_K_qt738tvhkHibjGRrrgCxM7OQ&s",
  chassis_number:
    "data:image/jpeg;base64,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",
  libre:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQov4JmtHH7ZZU5ohBT3JPmsr7jHpu7LgcOmg&s",
};

export default function StepUploadCarPhotos({
  carPhotos,
  setCarPhotos,
  onBack,
  onNext,
}: StepUploadCarPhotosProps) {
  const theme = useMantineTheme();
  const [activeAngle, setActiveAngle] = useState<string | null>(null);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
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
                {angle.replace("_", " ")} view photo
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
          <Checkbox
            checked={termsAgreed}
            onChange={(event) => setTermsAgreed(event.currentTarget.checked)}
            label={
              <Text size="sm">
                I agree to the{" "}
                <Text
                  span
                  c="blue"
                  style={{ cursor: "pointer" }}
                  onClick={() => setTermsModalOpen(true)}
                >
                  Terms and Conditions
                </Text>
              </Text>
            }
          />
          <Button onClick={onNext} disabled={!termsAgreed}>
            Save Draft
          </Button>
        </Group>
      </ScrollArea>

      {/* Camera Modal */}
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

      {/* Terms and Conditions Modal */}
      <Modal
        opened={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms and Conditions"
        size="lg"
        centered
        overlayProps={{
          color: theme.colors.dark[9],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <ScrollArea style={{ height: "60vh" }}>
          <Stack gap="md">
            <Text size="sm">
              <Text fw={600}>1. Introduction</Text>
              <Text>
                These Terms and Conditions govern your use of our insurance
                services for vehicle coverage. By agreeing to these terms, you
                acknowledge your understanding and acceptance of the policies
                outlined below.
              </Text>
            </Text>
            <Text size="sm">
              <Text fw={600}>2. Insurance Coverage</Text>
              <Text>
                The insurance policy provides coverage for the vehicle as
                specified in the application, including but not limited to
                damages, theft, and third-party liabilities, subject to the
                selected coverage type (e.g., Comprehensive, Third Party).
              </Text>
            </Text>
            <Text size="sm">
              <Text fw={600}>3. Photo Requirements</Text>
              <Text>
                You are required to provide clear and accurate photos of the
                vehicle from all specified angles (front, back, left, right,
                engine, chassis number, and libre document). Failure to provide
                acceptable photos may result in delays or rejection of your
                insurance application.
              </Text>
            </Text>
            <Text size="sm">
              <Text fw={600}>4. Premium Payments</Text>
              <Text>
                Premiums must be paid as per the agreed schedule. Non-payment
                may result in the cancellation of your policy. All payments are
                non-refundable unless otherwise stated.
              </Text>
            </Text>
            <Text size="sm">
              <Text fw={600}>5. Claims Process</Text>
              <Text>
                In the event of an incident, you must notify us within 48 hours
                and provide all necessary documentation, including photos,
                police reports, and witness statements. Claims are subject to
                review and approval by the insurer.
              </Text>
            </Text>
            <Text size="sm">
              <Text fw={600}>6. Policy Cancellation</Text>
              <Text>
                You may cancel your policy by providing written notice. Refunds,
                if applicable, will be processed according to the policy terms.
                The insurer reserves the right to cancel the policy for
                non-compliance with these terms.
              </Text>
            </Text>
            <Text size="sm">
              <Text fw={600}>7. Liability</Text>
              <Text>
                The insurer is not liable for damages arising from misuse of the
                vehicle, intentional acts, or failure to comply with legal
                requirements. Coverage is limited to the terms specified in the
                policy document.
              </Text>
            </Text>
            <Text size="sm">
              <Text fw={600}>8. Governing Law</Text>
              <Text>
                These terms are governed by the laws of the jurisdiction in
                which the insurance policy is issued. Any disputes will be
                resolved in the courts of that jurisdiction.
              </Text>
            </Text>
          </Stack>
        </ScrollArea>
        <Button
          fullWidth
          onClick={() => setTermsModalOpen(false)}
          mt="md"
          variant="outline"
        >
          Close
        </Button>
      </Modal>
    </Box>
  );
}
