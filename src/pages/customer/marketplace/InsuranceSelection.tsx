import {
  Container,
  Stack,
  Title,
  Card,
  Text,
  ThemeIcon,
  useMantineTheme,
  Modal,
  Button,
  Tabs,
  List,
  Box,
  Divider,
} from "@mantine/core";
import { Home, Car, Heart, Info, AlertCircle, Shield } from "lucide-react";
import WizardButton from "../../../components/button/WizardButton";
import { useState } from "react";

interface InsuranceSelectionProps {
  selectedInsurance: string | null;
  onSelectInsurance: (id: string) => void;
  onMotorSelected: () => void;
  onOtherSelected: (type: string) => void;
}

const InsuranceSelection = ({
  selectedInsurance: initialSelectedInsurance,
  onSelectInsurance,
  onMotorSelected,
  onOtherSelected,
}: InsuranceSelectionProps) => {
  const theme = useMantineTheme();
  const primaryColor = theme.colors.primary[8]; // Using shade 8 from your primary color tuple
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(
    initialSelectedInsurance
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [motorModalOpen, setMotorModalOpen] = useState(false); // State for Motor Insurance Modal

  const insuranceOptions = [
    {
      id: "home",
      label: "Home Insurance",
      description: "Protect your home and belongings",
      icon: Home,
      details:
        "Home Insurance provides coverage for your house and personal belongings against risks like fire, theft, and natural disasters. It also includes liability protection in case someone gets injured on your property.",
    },
    {
      id: "motor",
      label: "Motor Insurance",
      description: "Coverage for your vehicle",
      icon: Car,
      details:
        "Motor Insurance covers damages to your vehicle caused by accidents, theft, or natural disasters. It also includes third-party liability coverage for injuries or damages caused to others.",
    },
    {
      id: "life",
      label: "Life Insurance",
      description: "Secure your family's future",
      icon: Heart,
      details:
        "Life Insurance ensures financial security for your loved ones in case of your untimely demise. It can also serve as an investment or savings tool depending on the policy type.",
    },
  ];

  const handleCardClick = (id: string) => {
    setSelectedInsurance(id);
  };

  const handleInfoClick = (option: (typeof insuranceOptions)[0]) => {
    if (option.id === "motor") {
      setMotorModalOpen(true); // Open Motor Insurance Modal
    } else {
      setModalContent({ title: option.label, description: option.details });
      setModalOpen(true);
    }
  };

  const handleContinue = () => {
    if (selectedInsurance) {
      onSelectInsurance(selectedInsurance);
      if (selectedInsurance === "motor") {
        onMotorSelected();
      } else {
        onOtherSelected(selectedInsurance);
      }
    }
  };

  function setOpened(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Container size="xs" py="md" style={{ height: "calc(100% - 72px)" }}>
      <div
        style={{
          background: `linear-gradient(to right, ${theme.colors.primary[5]}, ${theme.colors.primary[7]})`,
          padding: theme.spacing.md,
          color: "white",
          borderRadius: theme.radius.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Title order={2} style={{ fontWeight: 700 }}>
          Insurance Marketplace
        </Title>
        <Text size="sm" style={{ opacity: 0.9, marginTop: theme.spacing.xs }}>
          Find the perfect coverage for you
        </Text>
      </div>

      <Title
        order={3}
        style={{
          color: theme.colors.dark[7],
          fontWeight: 600,
          marginBottom: theme.spacing.md,
        }}
      >
        Select Insurance Type
      </Title>

      <Stack gap="md">
        {insuranceOptions.map((option) => (
          <Card
            key={option.id}
            padding="md"
            radius="md"
            withBorder
            onClick={() => handleCardClick(option.id)}
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              border:
                selectedInsurance === option.id
                  ? `2px solid ${primaryColor}`
                  : `1px solid ${theme.colors.gray[2]}`,
              backgroundColor: "white",
              boxShadow:
                selectedInsurance === option.id
                  ? theme.shadows.md
                  : theme.shadows.sm,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.md,
                }}
              >
                <ThemeIcon
                  size="xl"
                  radius="xl"
                  variant="light"
                  color={selectedInsurance === option.id ? "primary" : "gray"}
                  style={{
                    backgroundColor:
                      selectedInsurance === option.id
                        ? theme.colors.primary[0]
                        : theme.colors.gray[0],
                  }}
                >
                  <option.icon size={24} color={primaryColor} />
                </ThemeIcon>
                <div>
                  <Text fw={500} c="dark.7">
                    {option.label}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {option.description}
                  </Text>
                </div>
              </div>
              <ThemeIcon
                size="lg"
                radius="xl"
                variant="light"
                color="blue"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering card click
                  handleInfoClick(option);
                }}
              >
                <Info size={20} />
              </ThemeIcon>
            </div>
          </Card>
        ))}
      </Stack>

      <div
        style={{
          display: "flex",
          marginTop: theme.spacing.xl,
        }}
      >
        <WizardButton
          variant="continue"
          onClick={handleContinue}
          disabled={!selectedInsurance}
        />
      </div>

      {/* Modal for non-Motor Insurance */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent?.title}
        centered
        size={"sm"}
        overlayProps={{
          color: theme.colors.dark[9],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Text size="sm" style={{ lineHeight: 1.6 }}>
          {modalContent?.description}
        </Text>
      </Modal>

      {/* Modal for Motor Insurance */}
      <Modal
        opened={motorModalOpen}
        onClose={() => setMotorModalOpen(false)}
        title="Motor Insurance"
        centered
        size={"sm"}
        overlayProps={{
          color: theme.colors.dark[9],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Text size="sm" color="dimmed" mb="md">
          Learn about insurance concepts and coverage options
        </Text>

        <Tabs defaultValue="basics">
          <Tabs.List grow>
            <Tabs.Tab value="basics">Basics</Tabs.Tab>
            <Tabs.Tab value="types">Types</Tabs.Tab>
            <Tabs.Tab value="coverage">Coverage</Tabs.Tab>
          </Tabs.List>

          {/* Basics Tab */}
          <Tabs.Panel value="basics" pt="md">
            <Box mb="md">
              <Title
                order={4}
                mb="sm"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Car size="1.2rem" />
                What is Motor Insurance?
              </Title>
              <Text size="sm">
                Motor insurance is a contract between you (the policyholder) and
                an insurance company. In exchange for a premium (the amount you
                pay), the insurer provides financial protection against risks
                associated with driving and owning a vehicle.
              </Text>
            </Box>

            <Box>
              <Title order={4} mb="sm">
                Why Do You Need Motor Insurance?
              </Title>
              <List spacing="sm" size="sm">
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  <Text fw={600}>Legal Requirement:</Text> In most places, it's
                  mandatory to have at least a basic level of motor insurance
                  (usually third-party liability).
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  <Text fw={600}>Financial Protection:</Text> It helps protect
                  you from large out-of-pocket expenses in case of accidents,
                  theft, or other damage to your car.
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  <Text fw={600}>Peace of Mind:</Text> Having insurance ensures
                  that you don't face unexpected financial burdens if something
                  happens to your vehicle or you cause damage to someone else's
                  property.
                </List.Item>
              </List>
            </Box>
          </Tabs.Panel>

          {/* Other Tabs (Types and Coverage) */}
          <Tabs.Panel value="types" pt="md">
            <Box mb="md">
              <Title order={4} mb="sm">
                Types of Motor Insurance
              </Title>
              <Text size="sm">
                There are several types of motor insurance coverage, each
                offering varying levels of protection.
              </Text>
            </Box>

            <Box mb="md" pl="md" style={{ borderLeft: "2px solid #228be6" }}>
              <Title order={5} mb="sm">
                1. Third-Party Liability Insurance
              </Title>
              <Text size="sm" mb="sm">
                This is the minimum legal requirement in many countries
                including Ethiopia. It covers only the damage or injury you
                cause to other people or their property in an accident. It does
                not cover any damage to your own car.
              </Text>
              <Text size="sm" fs="italic">
                <Text span fw={600}>
                  Example:
                </Text>{" "}
                If you cause an accident and damage someone else's car or injure
                someone, your insurer will cover their expenses. But if your car
                is damaged, you won't be covered under this policy.
              </Text>
            </Box>

            <Box mb="md" pl="md" style={{ borderLeft: "2px solid #228be6" }}>
              <Title order={5} mb="sm">
                2. Own Damage Insurance
              </Title>
              <Text size="sm" mb="sm">
                This type of insurance specifically covers damage to your own
                vehicle caused by accidents, even if you are at fault. It can
                also include additional coverage for damage caused by incidents
                such as fire, theft, vandalism, or natural disasters (depending
                on the policy).
              </Text>
              <Text size="sm" fs="italic">
                <Text span fw={600}>
                  Example:
                </Text>{" "}
                If you crash into a wall or another vehicle, your insurer will
                cover the repairs to your own car. Additionally, it may also
                cover damages caused by theft, fire, or vandalism.
              </Text>
            </Box>

            <Box mb="md" pl="md" style={{ borderLeft: "2px solid #228be6" }}>
              <Title order={5} mb="sm">
                3. Comprehensive Insurance
              </Title>
              <Text size="sm" mb="sm">
                This is the most extensive coverage. It covers:
              </Text>
              <List size="sm" spacing="xs" mb="sm">
                <List.Item>
                  Third-party damage (like liability insurance)
                </List.Item>
                <List.Item>
                  Damage to your own car, even if you're at fault
                </List.Item>
                <List.Item>
                  Theft, fire, and other types of accidental damage
                </List.Item>
                <List.Item>Vandalism or malicious damage</List.Item>
                <List.Item>
                  Natural disasters (e.g., flooding, earthquakes)
                </List.Item>
                <List.Item>
                  Personal injury coverage may be included in some comprehensive
                  policies
                </List.Item>
              </List>
              <Text size="sm" fs="italic">
                <Text span fw={600}>
                  Example:
                </Text>{" "}
                If you crash into another vehicle and your car is damaged, or
                your car is stolen, this insurance will cover repairs or
                replacement, as well as third-party claims.
              </Text>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="coverage" pt="md">
            <Box mb="md">
              <Title
                order={4}
                mb="sm"
                display="flex"
                style={{ alignItems: "center", gap: "0.5rem" }}
              >
                <Shield size="1.2rem" />
                What is Coverage Amount in Insurance?
              </Title>
              <Text size="sm">
                The coverage amount is the maximum amount of money that the
                insurance company will pay out in the event of a claim. The
                higher the coverage amount, the more the insurance company will
                pay if something goes wrong (and the higher the premium you pay
                for the insurance).
              </Text>
            </Box>

            <Box mb="md">
              <Title order={4} mb="sm">
                Why Does the User Choose the Coverage Amount?
              </Title>
              <Text size="sm">
                In most insurance policies, you get to choose the coverage
                limits based on your needs and how much protection you want.
              </Text>
            </Box>

            <Box mb="md" pl="md" style={{ borderLeft: "2px solid #228be6" }}>
              <Title order={5} mb="sm">
                Example: Death/Bodily Injury Liability
              </Title>
              <Text size="sm" mb="sm">
                <Text span fw={600}>
                  Scenario:
                </Text>{" "}
                Let's say you're involved in an accident where the other person
                gets injured or killed. You're responsible for the damages
                because you caused the accident. The insurance company will pay
                for the medical expenses, legal fees, or compensation to the
                injured person or their family.
              </Text>
              <List size="sm" spacing="sm" mb="sm">
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  If your insurance coverage amount for bodily injury is 50,000
                  Birr, the insurance will pay a maximum of 50,000 Birr towards
                  the injury expenses or compensation.
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  If the medical costs or compensation exceed this amount, you
                  would have to pay the difference.
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  However, if you choose a higher coverage, like 100,000 Birr,
                  your insurance will cover up to that amount, so you're better
                  protected if the costs are higher. But, you'll likely pay a
                  higher premium for the higher coverage.
                </List.Item>
              </List>
            </Box>

            <Box mb="md" pl="md" style={{ borderLeft: "2px solid #228be6" }}>
              <Title order={5} mb="sm">
                Example: Property Damage Liability
              </Title>
              <Text size="sm" mb="sm">
                <Text span fw={600}>
                  Scenario:
                </Text>{" "}
                You accidentally crash into someone's car, and it gets badly
                damaged. Your insurance will cover the damage costs to the other
                person's car.
              </Text>
              <List size="sm" spacing="sm">
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  If your property damage coverage is 50,000 Birr, that's the
                  maximum the insurance will pay for fixing the other person's
                  vehicle.
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <AlertCircle size="1rem" />
                    </ThemeIcon>
                  }
                >
                  If the damage is greater than 50,000 Birr, you'll need to pay
                  the remaining amount.
                </List.Item>
              </List>
            </Box>
          </Tabs.Panel>
        </Tabs>

        <Divider my="md" />

        <Button fullWidth onClick={() => setOpened()}>
          Close
        </Button>
      </Modal>
    </Container>
  );
};

export default InsuranceSelection;
