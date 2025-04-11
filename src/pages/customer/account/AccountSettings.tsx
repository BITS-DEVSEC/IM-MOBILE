import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  User,
  Lock,
  Shield,
  FileText,
  CreditCard,
  HandCoins,
  CalendarCheck,
  ShieldCheck,
  MessageCircle,
  PhoneCall,
  Info,
  Share2,
  Bell,
  LogOut,
} from "lucide-react";

const options = [
  { icon: User, label: "Personal Information", value: "" },
  { icon: Lock, label: "Change Password", value: "" },
  { icon: Shield, label: "My Policies", value: "" },
  { icon: FileText, label: "Policy Documents", value: "" },
  { icon: CreditCard, label: "Payment Methods", value: "" },
  { icon: HandCoins, label: "Claims History", value: "" },
  { icon: CalendarCheck, label: "Renewal Dates", value: "" },
  { icon: ShieldCheck, label: "Coverage Details", value: "" },
  { icon: Bell, label: "Notifications", value: "" },
  { icon: MessageCircle, label: "Support Center", value: "" },
  { icon: PhoneCall, label: "Contact Agent", value: "" },
  { icon: Info, label: "About Our Services", value: "" },
  { icon: Share2, label: "Refer a Friend", value: "" },
];
export default function AccountSettings() {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        maxWidth: 420,
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Fixed Header */}
      <div
        style={{
          background: `linear-gradient(to right, ${theme.colors.primary[5]}, ${theme.colors.primary[7]})`,
          padding: theme.spacing.md,
          color: "white",
          marginBottom: theme.spacing.xl,
          textAlign: "center",
        }}
      >
        <Title order={2} style={{ fontWeight: 700 }}>
          My Insurance Account
        </Title>
      </div>

      {/* Scrollable Content */}
      <ScrollArea style={{ flex: 1 }} pb={60}>
        <Card shadow="sm" p="md" radius="md" withBorder m="md">
          <Group justify="space-between">
            <Group>
              <Avatar radius="xl" color="primary">
                A
              </Avatar>
              <Box>
                <Text fw={600}>Abel T.</Text>
                <Badge color="green" size="sm">
                  Gold Member
                </Badge>
                <Text size="xs" color="dimmed">
                  Member since 2022
                </Text>
              </Box>
            </Group>
            <Box>
              <Text size="sm" fw={500}>
                Policy Holder
              </Text>
              <Text size="xs" color="dimmed">
                3 Active Policies
              </Text>
            </Box>
          </Group>
        </Card>

        <Stack mt="md" px="md">
          {options.map(({ icon: Icon, label, value }) => (
            <Group key={label} p="sm">
              <Icon size={20} color="var(--mantine-color-primary-filled)" />
              <Group>
                <Text>{label}</Text>
                {value && (
                  <Text size="xs" color="dimmed">
                    {value}
                  </Text>
                )}
              </Group>
            </Group>
          ))}
        </Stack>

        <Button
          fullWidth
          mt="lg"
          color="primary"
          mb="md"
          leftSection={<LogOut size={18} />}
          size="md"
          radius="md"
          style={{ fontWeight: 600 }}
        >
          Sign Out
        </Button>
      </ScrollArea>
    </Box>
  );
}
