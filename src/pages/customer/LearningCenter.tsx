import { useState } from "react";
import {
  Card,
  Title,
  Text,
  Tabs,
  Accordion,
  List,
  ThemeIcon,
  Flex,
} from "@mantine/core";
import { Car, Shield, AlertCircle, Heart, Home, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "@mantine/core/styles.css";
import BottomNavigation from "./BottomNavigation";
import AppContainer from "../../components/AppContainer";
import BackButton from "../../components/button/BackButton";

export function LearningCenter() {
  const [activeTab, setActiveTab] = useState("basics");
  const navigate = useNavigate();

  return (
    <AppContainer>
      <div
        style={{
          marginBottom: "16px",
          paddingLeft: "16px",
          paddingTop: "16px",
        }}
      >
        <BackButton onClick={() => navigate("/dashboard")} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          gap: "16px",
          paddingBottom: "80px",
          margin: "0 auto",
        }}
      >
        <Title order={1} size="h2" c="gray.8" fw={600} ml="lg">
          About Insurance
        </Title>
        <Flex align="center" gap="md" mb="md"></Flex>

        <Tabs
          value={activeTab}
          onChange={(value) => {
            if (value !== null) {
              setActiveTab(value);
            }
          }}
        >
          <Tabs.List grow mb="md">
            <Tabs.Tab value="basics">Basics</Tabs.Tab>
            <Tabs.Tab value="types">Types</Tabs.Tab>
            <Tabs.Tab value="coverage">Coverage</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="basics">
            <Card withBorder shadow="sm" mb="md">
              <Flex gap="sm" align="center" mb="sm">
                <Car size={24} color="#7E4005" />
                <Title order={2} size="h3" fw={600}>
                  What is Motor Insurance?
                </Title>
              </Flex>
              <Text c="gray.7">
                Motor insurance is a contract between you (the policyholder) and
                an insurance company. In exchange for a premium (the amount you
                pay), the insurer provides financial protection against risks
                associated with driving and owning a vehicle.
              </Text>
            </Card>

            <Accordion variant="contained">
              <Accordion.Item value="why-needed">
                <Accordion.Control>
                  <Text fw={500}>Why Do You Need Motor Insurance?</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <List spacing="sm" center>
                    <List.Item
                      icon={
                        <ThemeIcon color="primary" size={24} radius="xl">
                          <AlertCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      <Text fw={500}>Legal Requirement</Text>
                      <Text size="sm" c="gray.6">
                        In most places, it's mandatory to have at least a basic
                        level of motor insurance (usually third-party
                        liability).
                      </Text>
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="primary" size={24} radius="xl">
                          <AlertCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      <Text fw={500}>Financial Protection</Text>
                      <Text size="sm" c="gray.6">
                        It helps protect you from large out-of-pocket expenses
                        in case of accidents, theft, or other damage to your
                        car.
                      </Text>
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="primary" size={24} radius="xl">
                          <AlertCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      <Text fw={500}>Peace of Mind</Text>
                      <Text size="sm" c="gray.6">
                        Having insurance ensures that you don't face unexpected
                        financial burdens if something happens to your vehicle
                        or you cause damage to someone else's property.
                      </Text>
                    </List.Item>
                  </List>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="key-terms">
                <Accordion.Control>
                  <Text fw={500}>Key Insurance Terms</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <Text fw={500}>Premium</Text>
                      <Text size="sm" c="gray.6">
                        The amount you pay to the insurance company for your
                        coverage, typically on a monthly or annual basis.
                      </Text>
                    </div>
                    <div>
                      <Text fw={500}>Deductible</Text>
                      <Text size="sm" c="gray.6">
                        The amount you pay out of pocket before your insurance
                        coverage kicks in.
                      </Text>
                    </div>
                    <div>
                      <Text fw={500}>Coverage Limit</Text>
                      <Text size="sm" c="gray.6">
                        The maximum amount your insurance will pay for a covered
                        loss.
                      </Text>
                    </div>
                    <div>
                      <Text fw={500}>Claim</Text>
                      <Text size="sm" c="gray.6">
                        A formal request to your insurance company for coverage
                        or compensation for a covered loss.
                      </Text>
                    </div>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Tabs.Panel>

          <Tabs.Panel value="types">
            <Card withBorder shadow="sm">
              <Flex gap="sm" align="center" mb="md">
                <FileText size={24} color="#7E4005" />
                <Title order={2} size="h3" fw={600}>
                  Types of Motor Insurance
                </Title>
              </Flex>
              <Text c="gray.7" mb="md">
                There are several types of motor insurance coverage, each
                offering varying levels of protection.
              </Text>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Card
                  withBorder
                  p="md"
                  style={{
                    borderLeft: "4px solid #7E4005",
                    backgroundColor: "#F5F0E6",
                  }}
                >
                  <Flex gap="sm" align="center">
                    <Shield size={20} color="#7E4005" />
                    <Title order={3} size="h4" fw={600}>
                      Third-Party Liability Insurance
                    </Title>
                  </Flex>
                  <Text c="gray.7" mt="sm">
                    This is the minimum legal requirement in many countries
                    including Ethiopia. It covers only the damage or injury you
                    cause to other people or their property in an accident. It
                    does not cover any damage to your own car.
                  </Text>
                  <Card withBorder mt="sm" p="sm">
                    <Text fw={500} size="sm">
                      Example:
                    </Text>
                    <Text size="sm" c="gray.7">
                      If you cause an accident and damage someone else's car or
                      injure someone, your insurer will cover their expenses.
                      But if your car is damaged, you won't be covered under
                      this policy.
                    </Text>
                  </Card>
                </Card>

                <Card
                  withBorder
                  p="md"
                  style={{
                    borderLeft: "4px solid #7E4005",
                    backgroundColor: "#F5F0E6",
                  }}
                >
                  <Flex gap="sm" align="center">
                    <Car size={20} color="#7E4005" />
                    <Title order={3} size="h4" fw={600}>
                      Own Damage Insurance
                    </Title>
                  </Flex>
                  <Text c="gray.7" mt="sm">
                    This type of insurance specifically covers damage to your
                    own vehicle caused by accidents, even if you are at fault.
                    It can also include additional coverage for damage caused by
                    incidents such as fire, theft, vandalism, or natural
                    disasters (depending on the policy).
                  </Text>
                  <Card withBorder mt="sm" p="sm">
                    <Text fw={500} size="sm">
                      Example:
                    </Text>
                    <Text size="sm" c="gray.7">
                      If you crash into a wall or another vehicle, your insurer
                      will cover the repairs to your own car. Additionally, it
                      may also cover damages caused by theft, fire, or
                      vandalism.
                    </Text>
                  </Card>
                </Card>

                <Card
                  withBorder
                  p="md"
                  style={{
                    borderLeft: "4px solid #7E4005",
                    backgroundColor: "#F5F0E6",
                  }}
                >
                  <Flex gap="sm" align="center">
                    <Shield size={20} color="#7E4005" />
                    <Title order={3} size="h4" fw={600}>
                      Comprehensive Insurance
                    </Title>
                  </Flex>
                  <Text c="gray.7" mt="sm">
                    This is the most extensive coverage. It covers:
                  </Text>
                  <List size="sm" c="gray.7" mt="sm">
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
                      Personal injury coverage may be included in some
                      comprehensive policies
                    </List.Item>
                  </List>
                  <Card withBorder mt="sm" p="sm">
                    <Text fw={500} size="sm">
                      Example:
                    </Text>
                    <Text size="sm" c="gray.7">
                      If you crash into another vehicle and your car is damaged,
                      or your car is stolen, this insurance will cover repairs
                      or replacement, as well as third-party claims.
                    </Text>
                  </Card>
                </Card>
              </div>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="coverage">
            <Card withBorder shadow="sm">
              <Flex gap="sm" align="center" mb="md">
                <Shield size={24} color="#7E4005" />
                <Title order={2} size="h3" fw={600}>
                  Understanding Coverage Amounts
                </Title>
              </Flex>
              <Text c="gray.7" mb="md">
                The coverage amount is the maximum amount of money that the
                insurance company will pay out in the event of a claim. In motor
                insurance, this is usually the amount that the insurance policy
                will cover in case of various incidents.
              </Text>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <Title order={3} size="h4" fw={600} mb="sm">
                    Why Does the Coverage Amount Matter?
                  </Title>
                  <List spacing="sm">
                    <List.Item
                      icon={
                        <ThemeIcon color="primary" size={24} radius="xl">
                          <AlertCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      <Text fw={500}>Higher coverage = More protection</Text>
                      <Text size="sm" c="gray.6">
                        The higher the coverage amount, the more the insurance
                        company will pay if something goes wrong.
                      </Text>
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="primary" size={24} radius="xl">
                          <AlertCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      <Text fw={500}>Higher coverage = Higher premium</Text>
                      <Text size="sm" c="gray.6">
                        More protection typically means you'll pay more for your
                        insurance.
                      </Text>
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="primary" size={24} radius="xl">
                          <AlertCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      <Text fw={500}>Lower coverage = Lower protection</Text>
                      <Text size="sm" c="gray.6">
                        The less the company will pay out in case of an
                        accident.
                      </Text>
                    </List.Item>
                    <List.Item
                      icon={
                        <ThemeIcon color="primary" size={24} radius="xl">
                          <AlertCircle size={16} />
                        </ThemeIcon>
                      }
                    >
                      <Text fw={500}>Lower coverage = Lower premium</Text>
                      <Text size="sm" c="gray.6">
                        Your insurance will be cheaper.
                      </Text>
                    </List.Item>
                  </List>
                </div>

                <Card
                  withBorder
                  p="md"
                  style={{
                    borderLeft: "4px solid red",
                    backgroundColor: "#FFF5F5",
                  }}
                >
                  <Flex gap="sm" align="center">
                    <Heart size={20} color="red" />
                    <Title order={3} size="h4" fw={600}>
                      Death/Bodily Injury Liability Example
                    </Title>
                  </Flex>
                  <Text c="gray.7" mt="sm">
                    Let's say you're involved in an accident where the other
                    person gets injured or killed. You're responsible for the
                    damages because you caused the accident.
                  </Text>
                  <List
                    spacing="sm"
                    mt="sm"
                    icon={
                      <ThemeIcon color="red" size={20} radius="xl">
                        <AlertCircle size={14} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>
                      <Text size="sm" c="gray.7">
                        If your insurance coverage amount for bodily injury is
                        50,000 Birr, the insurance will pay a maximum of 50,000
                        Birr towards the injury expenses or compensation.
                      </Text>
                    </List.Item>
                    <List.Item>
                      <Text size="sm" c="gray.7">
                        If the medical costs or compensation exceed this amount,
                        you would have to pay the difference.
                      </Text>
                    </List.Item>
                    <List.Item>
                      <Text size="sm" c="gray.7">
                        However, if you choose a higher coverage, like 100,000
                        Birr, your insurance will cover up to that amount, so
                        you're better protected if the costs are higher.
                      </Text>
                    </List.Item>
                  </List>
                </Card>

                <Card
                  withBorder
                  p="md"
                  style={{
                    borderLeft: "4px solid #228BE6",
                    backgroundColor: "#F0F9FF",
                  }}
                >
                  <Flex gap="sm" align="center">
                    <Home size={20} color="#228BE6" />
                    <Title order={3} size="h4" fw={600}>
                      Property Damage Liability Example
                    </Title>
                  </Flex>
                  <Text c="gray.7" mt="sm">
                    You accidentally crash into someone's car, and it gets badly
                    damaged. Your insurance will cover the damage costs to the
                    other person's car.
                  </Text>
                  <List
                    spacing="sm"
                    mt="sm"
                    icon={
                      <ThemeIcon color="blue" size={20} radius="xl">
                        <AlertCircle size={14} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>
                      <Text size="sm" c="gray.7">
                        If your property damage coverage is 50,000 Birr, that's
                        the maximum the insurance will pay for fixing the other
                        person's vehicle.
                      </Text>
                    </List.Item>
                    <List.Item>
                      <Text size="sm" c="gray.7">
                        If the damage is greater than 50,000 Birr, you'll need
                        to pay the remaining amount.
                      </Text>
                    </List.Item>
                  </List>
                </Card>
              </div>
            </Card>
          </Tabs.Panel>
        </Tabs>
        <BottomNavigation />
      </div>
    </AppContainer>
  );
}
