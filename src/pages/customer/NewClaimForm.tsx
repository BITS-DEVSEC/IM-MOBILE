import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Stack,
  TextInput,
  Textarea,
  Select,
  Alert,
  Group,
  Text,
  Box,
  Title,
  Radio,
  ActionIcon,
  Image,
  Badge,
  Stepper,
  FileInput,
  SimpleGrid,
  Checkbox,
  Switch,
  Divider,
  ScrollArea,
} from "@mantine/core";
import {
  Info,
  Upload,
  Calendar,
  Camera,
  X,
  File,
  MapPin,
  User,
  Shield,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { notifications } from "@mantine/notifications";
import AppContainer from "../../components/AppContainer";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

// Mock user data - in real app, this would come from authentication/profile
const mockUserProfile = {
  fullName: "Samuel Asmare Zerefa",
  address: {
    region: "Addis Ababa",
    city: "Addis Ababa",
    subcity: "Kirkos",
    woreda: "04",
    kebele: "12",
    houseNo: "1234",
  },
  phone: "0918350638",
  email: "samuel.asmare@email.com",
  drivingLicense: {
    number: "000260",
    issuingRegion: "Addis Ababa",
    issueDate: "2020-02-13",
    expiryDate: "2025-02-13",
    grade: "A",
  },
  occupation: "Engineer",
  age: "32",
};

// Mock policy data
const mockPolicies = [
  {
    id: "toyota-abc1234",
    label: "Toyota Corolla (ABC1234) - Comprehensive",
    policyNumber: "POL-2023-001234",
    policyType: "Comprehensive",
    policyHolder: "Samuel Asmare Zerefa",
  },
  {
    id: "honda-xyz5678",
    label: "Honda Civic (XYZ5678) - Third Party",
    policyNumber: "POL-2023-005678",
    policyType: "Third Party",
    policyHolder: "Samuel Asmare Zerefa",
  },
];

export function NewClaimForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPolicy, setSelectedPolicy] = useState<
    (typeof mockPolicies)[0] | null
  >(null);
  const [isDriverPolicyHolder, setIsDriverPolicyHolder] = useState(true);
  const [isThirdPartyInvolved, setIsThirdPartyInvolved] = useState(false);
  const [isPoliceNotified, setIsPoliceNotified] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const [formData, setFormData] = useState({
    // Policy Information
    policyId: "",
    policyNumber: "",
    policyType: "",

    // Policy Holder Information
    policyHolderName: "",
    policyHolderAddress: {
      region: "",
      city: "",
      subcity: "",
      woreda: "",
      kebele: "",
      houseNo: "",
    },
    policyHolderPhone: "",
    policyHolderEmail: "",

    // Driver Information
    driverName: "",
    driverLicenseNumber: "",
    driverLicenseIssuingRegion: "",
    driverLicenseIssueDate: "",
    driverLicenseExpiryDate: "",
    driverPhone: "",
    driverAddress: {
      region: "",
      city: "",
      subcity: "",
      woreda: "",
      kebele: "",
      houseNo: "",
    },
    relationshipToPolicyHolder: "Owner-Driver",
    occupation: "",
    age: "",
    licenseGrade: "",

    // Incident Details
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    incidentType: "collision",
    incidentDescription: "",
    damageDescription: "",
    vehicleSpeed: "",
    distanceFromRoadside: "",
    wasHornSounded: "no",
    wasInsideVehicle: "no",

    // Police Information
    policeNotified: false,
    policeStationName: "",
    policeReportNumber: "",

    // Third Party Information
    thirdPartyInvolved: false,
    thirdPartyVehiclePlate: "",
    thirdPartyDriverName: "",
    thirdPartyDriverPhone: "",
    thirdPartyInsuranceCompany: "",
    thirdPartyDamageDescription: "",

    // Documents
    accidentPhotos: [] as File[],
    policeReport: null as File | null,
    driverLicenseCopy: null as File | null,
    powerOfAttorney: null as File | null,
    otherDocuments: [] as File[],
  });

  // Auto-fill logic when policy is selected
  useEffect(() => {
    if (formData.policyId) {
      const policy = mockPolicies.find((p) => p.id === formData.policyId);
      if (policy) {
        setSelectedPolicy(policy);
        setFormData((prev) => ({
          ...prev,
          policyNumber: policy.policyNumber,
          policyType: policy.policyType,
          // Policy holder information
          policyHolderName: policy.policyHolder,
          policyHolderAddress: mockUserProfile.address,
          policyHolderPhone: mockUserProfile.phone,
          policyHolderEmail: mockUserProfile.email,
        }));

        // Auto-fill driver information if driver is policy holder
        if (isDriverPolicyHolder) {
          setFormData((prev) => ({
            ...prev,
            driverName: mockUserProfile.fullName,
            driverPhone: mockUserProfile.phone,
            driverAddress: {
              region: "",
              city: mockUserProfile.address.city,
              subcity: mockUserProfile.address.subcity,
              woreda: "",
              kebele: mockUserProfile.address.kebele,
              houseNo: mockUserProfile.address.houseNo,
            },
            age: mockUserProfile.age,
            relationshipToPolicyHolder: "Owner-Driver",
          }));
        }
      }
    }
  }, [formData.policyId, isDriverPolicyHolder]);

  // Handle driver/policy holder relationship change
  useEffect(() => {
    if (isDriverPolicyHolder && selectedPolicy) {
      setFormData((prev) => ({
        ...prev,
        driverName: mockUserProfile.fullName,
        driverPhone: mockUserProfile.phone,
        driverAddress: {
          region: "",
          city: mockUserProfile.address.city,
          subcity: mockUserProfile.address.subcity,
          woreda: "",
          kebele: mockUserProfile.address.kebele,
          houseNo: mockUserProfile.address.houseNo,
        },
        age: mockUserProfile.age,
        relationshipToPolicyHolder: "Owner-Driver",
      }));
    } else if (!isDriverPolicyHolder) {
      // Clear driver fields when not policy holder
      setFormData((prev) => ({
        ...prev,
        driverName: "",
        driverPhone: "",
        driverAddress: {
          region: "",
          city: "",
          subcity: "",
          woreda: "",
          kebele: "",
          houseNo: "",
        },
        age: "",
        relationshipToPolicyHolder: "",
      }));
    }
  }, [isDriverPolicyHolder, selectedPolicy]);

  const handleChange = (
    field: string,
    value: string | number | boolean | File | File[] | null
  ) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof typeof prev] as object) || {}),
          [child]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handlePhotoUpload = (files: File[]) => {
    if (formData.accidentPhotos.length + files.length > 10) {
      notifications.show({
        title: "Upload Limit",
        message: "Maximum 10 photos allowed",
        color: "red",
      });
      return;
    }
    setFormData({
      ...formData,
      accidentPhotos: [...formData.accidentPhotos, ...files],
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.accidentPhotos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      accidentPhotos: newPhotos,
    });
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            incidentLocation: `Lat: ${position.coords.latitude.toFixed(
              4
            )}, Lng: ${position.coords.longitude.toFixed(4)}`,
          });
          notifications.show({
            title: "Location Added",
            message: "Current location has been added",
            color: "green",
          });
        },
        () => {
          notifications.show({
            title: "Location Error",
            message: "Unable to get your location",
            color: "red",
          });
        }
      );
    }
  };

  return (
    <AppContainer>
      <Group mb="sm" mt="sm">
        <Button
          variant="subtle"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => navigate("/claims")}
        >
          Back
        </Button>
      </Group>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "72px",
          margin: "11px",
        }}
      >
        <ScrollArea style={{ height: "calc(100vh - 60px)" }}>
          <Stack gap="lg">
            {/* Important Information */}
            <Alert
              variant="light"
              color="blue"
              title="Important Information"
              icon={<Info size={16} />}
            >
              <Text size="sm">
                Please provide accurate information about the incident to help
                us process your claim faster.
              </Text>
            </Alert>

            {/* Progress Stepper */}
            <Card withBorder>
              <Stepper active={activeStep} size="sm" color="brown">
                <Stepper.Step />
                <Stepper.Step />
                <Stepper.Step />
              </Stepper>
            </Card>

            {/* Step 1: Comprehensive Claim Details */}
            {activeStep === 0 && (
              <Stack gap="md">
                {/* Policy Selection */}
                <Card withBorder>
                  <Stack gap="md">
                    <Group gap="xs">
                      <Shield size={20} color="#7e4005" />
                      <Title order={4}>Policy Information</Title>
                    </Group>

                    <Select
                      label="Select Policy"
                      placeholder="Choose your policy"
                      required
                      data={mockPolicies.map((policy) => ({
                        value: policy.id,
                        label: policy.label,
                      }))}
                      value={formData.policyId}
                      onChange={(value) =>
                        handleChange("policyId", value || "")
                      }
                    />

                    {selectedPolicy && (
                      <Box p="sm" bg="#F8FAFC" style={{ borderRadius: "8px" }}>
                        <Text size="sm" fw={500} mb="xs">
                          Policy Details
                        </Text>
                        <SimpleGrid cols={2} spacing="xs">
                          <Text size="xs" c="dimmed">
                            Policy Number: {selectedPolicy.policyNumber}
                          </Text>
                          <Text size="xs" c="dimmed">
                            Type: {selectedPolicy.policyType}
                          </Text>
                        </SimpleGrid>
                      </Box>
                    )}
                  </Stack>
                </Card>

                {/* Driver Information */}
                <Card withBorder>
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <User size={20} color="#7e4005" />
                        <Title order={4}>Driver Information</Title>
                      </Group>
                      <Group gap="sm">
                        <Switch
                          label="I was driving"
                          checked={isDriverPolicyHolder}
                          onChange={(event) =>
                            setIsDriverPolicyHolder(event.currentTarget.checked)
                          }
                          size="sm"
                        />
                        {isDriverPolicyHolder && (
                          <Badge variant="outline" color="green" size="sm">
                            Auto-filled
                          </Badge>
                        )}
                      </Group>
                    </Group>

                    <SimpleGrid cols={2} spacing="md">
                      <TextInput
                        label="Driver's Full Name"
                        required
                        value={formData.driverName}
                        onChange={(e) =>
                          handleChange("driverName", e.target.value)
                        }
                        readOnly={isDriverPolicyHolder}
                      />
                      <TextInput
                        label="Driver's Phone"
                        value={formData.driverPhone}
                        onChange={(e) =>
                          handleChange("driverPhone", e.target.value)
                        }
                        readOnly={isDriverPolicyHolder}
                      />
                      <TextInput
                        label="City"
                        value={formData.driverAddress.city}
                        onChange={(e) =>
                          handleChange("driverAddress.city", e.target.value)
                        }
                        readOnly={isDriverPolicyHolder}
                      />
                      <TextInput
                        label="Subcity"
                        value={formData.driverAddress.subcity}
                        onChange={(e) =>
                          handleChange("driverAddress.subcity", e.target.value)
                        }
                        readOnly={isDriverPolicyHolder}
                      />
                      <TextInput
                        label="Kebele"
                        value={formData.driverAddress.kebele}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange("driverAddress.kebele", e.target.value)
                        }
                        readOnly={isDriverPolicyHolder}
                      />
                      <TextInput
                        label="House Number"
                        value={formData.driverAddress.houseNo}
                        onChange={(e) =>
                          handleChange("driverAddress.houseNo", e.target.value)
                        }
                        readOnly={isDriverPolicyHolder}
                      />
                      <TextInput
                        label="Age"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        readOnly={isDriverPolicyHolder}
                      />
                    </SimpleGrid>

                    <Divider
                      label="Driving License Information"
                      labelPosition="center"
                    />

                    <SimpleGrid cols={2} spacing="md">
                      <TextInput
                        label="License Number"
                        required
                        value={formData.driverLicenseNumber}
                        onChange={(e) =>
                          handleChange("driverLicenseNumber", e.target.value)
                        }
                      />
                      <TextInput
                        label="Issuing Region"
                        value={formData.driverLicenseIssuingRegion}
                        onChange={(e) =>
                          handleChange(
                            "driverLicenseIssuingRegion",
                            e.target.value
                          )
                        }
                      />
                      <TextInput
                        type="date"
                        label="Issue Date"
                        value={formData.driverLicenseIssueDate}
                        onChange={(e) =>
                          handleChange("driverLicenseIssueDate", e.target.value)
                        }
                      />
                      <TextInput
                        type="date"
                        label="Expiry Date"
                        value={formData.driverLicenseExpiryDate}
                        onChange={(e) =>
                          handleChange(
                            "driverLicenseExpiryDate",
                            e.target.value
                          )
                        }
                      />
                    </SimpleGrid>

                    <SimpleGrid cols={2} spacing="md">
                      <TextInput
                        label="Occupation"
                        value={formData.occupation}
                        onChange={(e) =>
                          handleChange("occupation", e.target.value)
                        }
                      />
                      <TextInput
                        label="License Grade"
                        value={formData.licenseGrade}
                        onChange={(e) =>
                          handleChange("licenseGrade", e.target.value)
                        }
                      />
                    </SimpleGrid>

                    {!isDriverPolicyHolder && (
                      <Select
                        label="Relationship to Policy Holder"
                        placeholder="Select relationship"
                        data={[
                          { value: "family", label: "Family Member" },
                          { value: "employee", label: "Employee" },
                          { value: "friend", label: "Friend" },
                          { value: "other", label: "Other" },
                        ]}
                        value={formData.relationshipToPolicyHolder}
                        onChange={(value) =>
                          handleChange(
                            "relationshipToPolicyHolder",
                            value || ""
                          )
                        }
                      />
                    )}
                  </Stack>
                </Card>

                {/* Incident Details */}
                <Card withBorder>
                  <Stack gap="md">
                    <Group gap="xs">
                      <Calendar size={20} color="#7e4005" />
                      <Title order={4}>Incident Details</Title>
                    </Group>

                    <SimpleGrid cols={2} spacing="md">
                      <TextInput
                        type="date"
                        label="Date of Incident"
                        required
                        value={formData.incidentDate}
                        onChange={(e) =>
                          handleChange("incidentDate", e.target.value)
                        }
                      />
                      <TextInput
                        type="time"
                        label="Time of Incident"
                        required
                        value={formData.incidentTime}
                        onChange={(e) =>
                          handleChange("incidentTime", e.target.value)
                        }
                      />
                    </SimpleGrid>

                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Type of Incident
                      </Text>
                      <Radio.Group
                        value={formData.incidentType}
                        onChange={(value) =>
                          handleChange("incidentType", value)
                        }
                      >
                        <SimpleGrid cols={2} spacing="xs">
                          <Radio value="collision" label="Collision/Accident" />
                          <Radio value="theft" label="Theft" />
                          <Radio value="fire" label="Fire" />
                          <Radio value="vandalism" label="Vandalism" />
                          <Radio value="natural" label="Natural Disaster" />
                          <Radio value="other" label="Other" />
                        </SimpleGrid>
                      </Radio.Group>
                    </Box>

                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Location of Incident
                      </Text>
                      <Group gap="xs">
                        <TextInput
                          placeholder="Detailed location (street, landmarks, etc.)"
                          required
                          style={{ flex: 1 }}
                          value={formData.incidentLocation}
                          onChange={(e) =>
                            handleChange("incidentLocation", e.target.value)
                          }
                        />
                        <ActionIcon
                          variant="outline"
                          color="brown"
                          size="lg"
                          onClick={useCurrentLocation}
                        >
                          <MapPin size={18} />
                        </ActionIcon>
                      </Group>
                    </Box>

                    <Textarea
                      label="Description of Incident"
                      placeholder="Provide detailed description of how the incident occurred..."
                      required
                      minRows={3}
                      value={formData.incidentDescription}
                      onChange={(e) =>
                        handleChange("incidentDescription", e.target.value)
                      }
                    />

                    <Textarea
                      label="Damage Description"
                      placeholder="Describe the damage..."
                      minRows={2}
                      value={formData.damageDescription}
                      onChange={(e) =>
                        handleChange("damageDescription", e.target.value)
                      }
                    />

                    <SimpleGrid cols={2} spacing="md">
                      <TextInput
                        label="Vehicle Speed (km/h)"
                        value={formData.vehicleSpeed}
                        onChange={(e) =>
                          handleChange("vehicleSpeed", e.target.value)
                        }
                      />
                      <TextInput
                        label="Distance from Roadside"
                        value={formData.distanceFromRoadside}
                        onChange={(e) =>
                          handleChange("distanceFromRoadside", e.target.value)
                        }
                      />
                    </SimpleGrid>

                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Additional Details
                      </Text>
                      <Stack gap="xs">
                        <Box>
                          <Text size="sm" fw={500} mb="xs">
                            Was horn sounded?
                          </Text>
                          <Radio.Group
                            value={formData.wasHornSounded}
                            onChange={(value) =>
                              handleChange("wasHornSounded", value)
                            }
                          >
                            <Group>
                              <Radio value="yes" label="Yes" />
                              <Radio value="no" label="No" />
                            </Group>
                          </Radio.Group>
                        </Box>
                        <Box>
                          <Text size="sm" fw={500} mb="xs">
                            Were you inside the vehicle during the accident?
                          </Text>
                          <Radio.Group
                            value={formData.wasInsideVehicle}
                            onChange={(value) =>
                              handleChange("wasInsideVehicle", value)
                            }
                          >
                            <Group>
                              <Radio value="yes" label="Yes" />
                              <Radio value="no" label="No" />
                            </Group>
                          </Radio.Group>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Card>

                {/* Police Information */}
                <Card withBorder>
                  <Stack gap="md">
                    <Group gap="xs">
                      <AlertTriangle size={20} color="#7e4005" />
                      <Title order={4}>Police Information</Title>
                    </Group>

                    <Checkbox
                      label="Was the police notified?"
                      checked={formData.policeNotified}
                      onChange={(event) => {
                        const checked = event.currentTarget.checked;
                        setIsPoliceNotified(checked);
                        handleChange("policeNotified", checked);
                      }}
                    />

                    {isPoliceNotified && (
                      <SimpleGrid cols={2} spacing="md">
                        <TextInput
                          label="Police Station Name/Location"
                          value={formData.policeStationName}
                          onChange={(e) =>
                            handleChange("policeStationName", e.target.value)
                          }
                        />
                        <TextInput
                          label="Police Report Number (if available)"
                          value={formData.policeReportNumber}
                          onChange={(e) =>
                            handleChange("policeReportNumber", e.target.value)
                          }
                        />
                      </SimpleGrid>
                    )}
                  </Stack>
                </Card>

                {/* Third Party Information */}
                <Card withBorder>
                  <Stack gap="md">
                    <Title order={4}>Third Party Information</Title>

                    <Checkbox
                      label="Was another party involved in the incident?"
                      checked={formData.thirdPartyInvolved}
                      onChange={(event) => {
                        const checked = event.currentTarget.checked;
                        setIsThirdPartyInvolved(checked);
                        handleChange("thirdPartyInvolved", checked);
                      }}
                    />

                    {isThirdPartyInvolved && (
                      <Stack gap="md">
                        <SimpleGrid cols={2} spacing="md">
                          <TextInput
                            label="Other Party Vehicle Plate"
                            value={formData.thirdPartyVehiclePlate}
                            onChange={(e) =>
                              handleChange(
                                "thirdPartyVehiclePlate",
                                e.target.value
                              )
                            }
                          />
                          <TextInput
                            label="Other Party Driver Name"
                            value={formData.thirdPartyDriverName}
                            onChange={(e) =>
                              handleChange(
                                "thirdPartyDriverName",
                                e.target.value
                              )
                            }
                          />
                          <TextInput
                            label="Other Party Contact"
                            value={formData.thirdPartyDriverPhone}
                            onChange={(e) =>
                              handleChange(
                                "thirdPartyDriverPhone",
                                e.target.value
                              )
                            }
                          />
                        </SimpleGrid>
                        <TextInput
                          label="Other Party Insurance Company (if known)"
                          value={formData.thirdPartyInsuranceCompany}
                          onChange={(e) =>
                            handleChange(
                              "thirdPartyInsuranceCompany",
                              e.target.value
                            )
                          }
                        />
                        <Textarea
                          label="Damage to Other Party Vehicle/Property"
                          minRows={2}
                          value={formData.thirdPartyDamageDescription}
                          onChange={(e) =>
                            handleChange(
                              "thirdPartyDamageDescription",
                              e.target.value
                            )
                          }
                        />
                      </Stack>
                    )}
                  </Stack>
                </Card>

                <Checkbox
                  label="I/We declare the foregoing particulars to be true and correct in every respect, and undertake to render the company every assistance in my/our power in dealing with the matter."
                  checked={isAgreed}
                  onChange={(event) => setIsAgreed(event.currentTarget.checked)}
                  required
                />

                <Group justify="flex-end">
                  <Button color="brown" onClick={() => setActiveStep(1)}>
                    Next: Upload Documents
                  </Button>
                </Group>
              </Stack>
            )}

            {/* Step 2: Documents */}
            {activeStep === 1 && (
              <Stack gap="md">
                <Card withBorder>
                  <Stack gap="lg">
                    <Title order={4}>Supporting Documents</Title>

                    {/* Accident Photos */}
                    <Box>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={500}>
                          Accident Photos/Videos *
                        </Text>
                        <Badge variant="outline" size="sm">
                          {formData.accidentPhotos.length}/10 files
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" mb="sm">
                        Photos of damage, accident scene, and any third-party
                        damage
                      </Text>

                      <FileInput
                        placeholder="Add Photos/Videos"
                        multiple
                        accept="image/*,video/*"
                        leftSection={<Camera size={16} />}
                        onChange={(files) => files && handlePhotoUpload(files)}
                        mb="sm"
                      />

                      {formData.accidentPhotos.length > 0 && (
                        <SimpleGrid cols={3} spacing="xs">
                          {formData.accidentPhotos.map((file, index) => (
                            <Box key={index} style={{ position: "relative" }}>
                              <Image
                                src={
                                  URL.createObjectURL(file) ||
                                  "/placeholder.svg"
                                }
                                alt={`Accident photo ${index + 1}`}
                                height={80}
                                style={{ borderRadius: "8px" }}
                              />
                              <ActionIcon
                                size="sm"
                                color="red"
                                variant="filled"
                                style={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                }}
                                onClick={() => removePhoto(index)}
                              >
                                <X size={12} />
                              </ActionIcon>
                            </Box>
                          ))}
                        </SimpleGrid>
                      )}
                    </Box>

                    {/* Driver's License Copy */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Driver's License Copy *
                      </Text>
                      <Text size="xs" c="dimmed" mb="sm">
                        Copy of the driving license of the person who was
                        driving at the time of incident
                      </Text>
                      <FileInput
                        placeholder="Upload License Copy"
                        accept="application/pdf,image/*"
                        leftSection={<File size={16} />}
                        value={formData.driverLicenseCopy}
                        onChange={(file) =>
                          handleChange("driverLicenseCopy", file)
                        }
                      />
                    </Box>

                    {/* Police Report */}
                    {isPoliceNotified && (
                      <Box>
                        <Text size="sm" fw={500} mb="xs">
                          Police Report
                        </Text>
                        <Text size="xs" c="dimmed" mb="sm">
                          Official police report or police report request letter
                        </Text>
                        <FileInput
                          placeholder="Upload Police Report"
                          accept="application/pdf,image/*"
                          leftSection={<File size={16} />}
                          value={formData.policeReport}
                          onChange={(file) =>
                            handleChange("policeReport", file)
                          }
                        />
                      </Box>
                    )}

                    {/* Power of Attorney */}
                    {!isDriverPolicyHolder && (
                      <Box>
                        <Text size="sm" fw={500} mb="xs">
                          Power of Attorney
                        </Text>
                        <Text size="xs" c="dimmed" mb="sm">
                          Required when filing on behalf of the policy holder
                        </Text>
                        <FileInput
                          placeholder="Upload Power of Attorney"
                          accept="application/pdf,image/*"
                          leftSection={<File size={16} />}
                          value={formData.powerOfAttorney}
                          onChange={(file) =>
                            handleChange("powerOfAttorney", file)
                          }
                        />
                      </Box>
                    )}

                    {/* Other Documents */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Other Supporting Documents (Optional)
                      </Text>
                      <Text size="xs" c="dimmed" mb="sm">
                        Any additional documents that support your claim (PDF,
                        JPG, PNG)
                      </Text>
                      <FileInput
                        placeholder="Add Additional Documents"
                        multiple
                        accept="application/pdf,image/*"
                        leftSection={<Upload size={16} />}
                        onChange={(files) =>
                          files &&
                          handleChange("otherDocuments", [
                            ...formData.otherDocuments,
                            ...files,
                          ])
                        }
                      />
                    </Box>
                  </Stack>
                </Card>

                <Group justify="space-between">
                  <Button variant="outline" onClick={() => setActiveStep(0)}>
                    Back
                  </Button>
                  <Button color="brown" onClick={() => setActiveStep(2)}>
                    Next: Review
                  </Button>
                </Group>
              </Stack>
            )}

            {/* Step 3: Review & Submit */}
            {activeStep === 2 && (
              <Stack gap="md">
                <Card withBorder>
                  <Stack gap="lg">
                    <Title order={4}>Review Your Claim</Title>

                    {/* Policy Summary */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Policy
                      </Text>
                      <Text size="sm">
                        <Text span fw={500}>
                          Policy:
                        </Text>{" "}
                        {formData.policyNumber}
                      </Text>
                    </Box>

                    {/* Incident Summary */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Incident Summary
                      </Text>
                      <SimpleGrid cols={2} spacing="xs">
                        <Text size="sm">
                          <Text span fw={500}>
                            Date:
                          </Text>{" "}
                          {formData.incidentDate} at {formData.incidentTime}
                        </Text>
                        <Text size="sm">
                          <Text span fw={500}>
                            Type:
                          </Text>{" "}
                          {formData.incidentType}
                        </Text>
                        <Text size="sm" style={{ gridColumn: "1 / -1" }}>
                          <Text span fw={500}>
                            Location:
                          </Text>{" "}
                          {formData.incidentLocation}
                        </Text>
                        <Text size="sm">
                          <Text span fw={500}>
                            Speed:
                          </Text>{" "}
                          {formData.vehicleSpeed} km/h
                        </Text>
                        <Text size="sm">
                          <Text span fw={500}>
                            Distance from Roadside:
                          </Text>{" "}
                          {formData.distanceFromRoadside} m
                        </Text>
                        <Text size="sm">
                          <Text span fw={500}>
                            Horn Sounded:
                          </Text>{" "}
                          {formData.wasHornSounded}
                        </Text>
                        <Text size="sm">
                          <Text span fw={500}>
                            Inside Vehicle:
                          </Text>{" "}
                          {formData.wasInsideVehicle}
                        </Text>
                      </SimpleGrid>
                    </Box>

                    {/* Driver Information */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Driver Information
                      </Text>
                      <Text size="sm">
                        <Text span fw={500}>
                          Driver:
                        </Text>{" "}
                        {formData.driverName} (License:{" "}
                        {formData.driverLicenseNumber})
                      </Text>
                      <Text size="sm">
                        <Text span fw={500}>
                          Address:
                        </Text>{" "}
                        {formData.driverAddress.city},{" "}
                        {formData.driverAddress.subcity}, Kebele{" "}
                        {formData.driverAddress.kebele}, House{" "}
                        {formData.driverAddress.houseNo}
                      </Text>
                      <Text size="sm">
                        <Text span fw={500}>
                          Occupation:
                        </Text>{" "}
                        {formData.occupation}
                      </Text>
                      <Text size="sm">
                        <Text span fw={500}>
                          Age:
                        </Text>{" "}
                        {formData.age}
                      </Text>
                      <Text size="sm">
                        <Text span fw={500}>
                          License Grade:
                        </Text>{" "}
                        {formData.licenseGrade}
                      </Text>
                      <Text size="sm">
                        <Text span fw={500}>
                          Relationship:
                        </Text>{" "}
                        {isDriverPolicyHolder
                          ? "Policy Holder (Owner-Driver)"
                          : formData.relationshipToPolicyHolder}
                      </Text>
                    </Box>

                    {/* Documents Summary */}
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Uploaded Documents
                      </Text>
                      <Stack gap="xs">
                        <Text size="sm">
                          • {formData.accidentPhotos.length} accident
                          photos/videos
                        </Text>
                        {formData.driverLicenseCopy && (
                          <Text size="sm">• Driver's license copy</Text>
                        )}
                        {formData.policeReport && (
                          <Text size="sm">• Police report</Text>
                        )}
                        {formData.powerOfAttorney && (
                          <Text size="sm">• Power of attorney</Text>
                        )}
                        {formData.otherDocuments.length > 0 && (
                          <Text size="sm">
                            • {formData.otherDocuments.length} additional
                            documents
                          </Text>
                        )}
                      </Stack>
                    </Box>

                    {/* Third Party & Police */}
                    {(isThirdPartyInvolved || isPoliceNotified) && (
                      <Box>
                        <Text size="sm" fw={500} mb="xs">
                          Additional Information
                        </Text>
                        <Stack gap="xs">
                          {isThirdPartyInvolved && (
                            <Text size="sm">• Third party involved: Yes</Text>
                          )}
                          {isPoliceNotified && (
                            <Text size="sm">• Police notified: Yes</Text>
                          )}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                </Card>

                <Alert variant="light" color="blue" icon={<Info size={16} />}>
                  <Text size="sm">
                    Please review all information carefully. Once submitted, you
                    will receive a claim number and can track progress in the
                    Claims section.
                  </Text>
                </Alert>

                <Group justify="space-between">
                  <Button variant="outline" onClick={() => setActiveStep(1)}>
                    Back
                  </Button>
                  <Button color="brown" size="lg">
                    Submit Claim
                  </Button>
                </Group>
              </Stack>
            )}
          </Stack>
        </ScrollArea>
      </div>
      <BottomNavigation />
    </AppContainer>
  );
}

//   import { useState } from "react";
//   import { useNavigate } from "react-router-dom";
//   import {
//     Button,
//     Card,
//     Stack,
//     TextInput,
//     Textarea,
//     Select,
//     Alert,
//     Group,
//     Text,
//     Box,
//     Title,
//     Checkbox,
//   } from "@mantine/core";
//   import { Info, Upload, Car, CalendarDays, ArrowLeft, User } from "lucide-react";
//   import AppContainer from "../../components/AppContainer";
//   import BottomNavigation from "./BottomNavigation";

//   // Modular Component for Driver Details
//   const DriverDetailsForm = ({ formData, handleChange }) => (
//     <Card withBorder>
//       <Stack gap="md">
//         <Group gap="xs">
//           <User size={20} color="#7e4005" />
//           <Title order={4}>Driver Information</Title>
//         </Group>
//         <TextInput
//           label="Full Name"
//           placeholder="Enter full name"
//           value={formData.driverName}
//           onChange={(e) => handleChange("driverName", e.target.value)}
//         />
//         <TextInput
//           label="Age"
//           type="number"
//           placeholder="Enter age"
//           value={formData.driverAge}
//           onChange={(e) => handleChange("driverAge", e.target.value)}
//         />
//         <TextInput
//           label="Address"
//           placeholder="Enter address (Town, Kebele, House No.)"
//           value={formData.driverAddress}
//           onChange={(e) => handleChange("driverAddress", e.target.value)}
//         />
//         <TextInput
//           label="Phone Number"
//           placeholder="Enter phone number"
//           value={formData.driverPhone}
//           onChange={(e) => handleChange("driverPhone", e.target.value)}
//         />
//         <TextInput
//           label="Occupation"
//           placeholder="Enter occupation"
//           value={formData.driverOccupation}
//           onChange={(e) => handleChange("driverOccupation", e.target.value)}
//         />
//         <TextInput
//           label="License Number"
//           placeholder="Enter license number"
//           value={formData.driverLicense}
//           onChange={(e) => handleChange("driverLicense", e.target.value)}
//         />
//         <TextInput
//           label="License Grade"
//           placeholder="Enter license grade"
//           value={formData.driverLicenseGrade}
//           onChange={(e) => handleChange("driverLicenseGrade", e.target.value)}
//         />
//         <TextInput
//           label="License Expiry Date"
//           type="date"
//           value={formData.driverLicenseExpiry}
//           onChange={(e) => handleChange("driverLicenseExpiry", e.target.value)}
//         />
//       </Stack>
//     </Card>
//   );

//   // Modular Component for Accident Details
//   const AccidentDetailsForm = ({ formData, handleChange }) => (
//     <Card withBorder>
//       <Stack gap="md">
//         <Group gap="xs">
//           <CalendarDays size={20} color="#7e4005" />
//           <Title order={4}>Accident Details</Title>
//         </Group>
//         <TextInput
//           type="date"
//           label="Date of Accident"
//           value={formData.accidentDate}
//           onChange={(e) => handleChange("accidentDate", e.target.value)}
//         />
//         <TextInput
//           type="time"
//           label="Time of Accident"
//           value={formData.accidentTime}
//           onChange={(e) => handleChange("accidentTime", e.target.value)}
//         />
//         <TextInput
//           label="Place of Accident"
//           placeholder="Enter place"
//           value={formData.accidentPlace}
//           onChange={(e) => handleChange("accidentPlace", e.target.value)}
//         />
//         <TextInput
//           label="Vehicle Speed"
//           type="number"
//           placeholder="Enter speed (km/h)"
//           value={formData.vehicleSpeed}
//           onChange={(e) => handleChange("vehicleSpeed", e.target.value)}
//         />
//         <TextInput
//           label="Distance from Road Side"
//           type="number"
//           placeholder="Enter distance (meters)"
//           value={formData.distanceFromRoad}
//           onChange={(e) => handleChange("distanceFromRoad", e.target.value)}
//         />
//         <Checkbox
//           label="Was Horn Sounded?"
//           checked={formData.hornSounded}
//           onChange={(e) => handleChange("hornSounded", e.target.checked)}
//         />
//         <Checkbox
//           label="Were you inside the vehicle during the accident?"
//           checked={formData.insideVehicle}
//           onChange={(e) => handleChange("insideVehicle", e.target.checked)}
//         />
//         <Textarea
//           label="Description of Accident"
//           placeholder="Include conditions of road and visibility"
//           minRows={4}
//           value={formData.accidentDescription}
//           onChange={(e) => handleChange("accidentDescription", e.target.value)}
//         />
//       </Stack>
//     </Card>
//   );

//   // Modular Component for Another Driver Details
//   const AnotherDriverForm = ({ formData, handleChange }) => (
//     <Card withBorder>
//       <Stack gap="md">
//         <Group gap="xs">
//           <User size={20} color="#7e4005" />
//           <Title order={4}>Another Driver Information</Title>
//         </Group>
//         <TextInput
//           label="Full Name"
//           placeholder="Enter full name"
//           value={formData.anotherDriverName}
//           onChange={(e) => handleChange("anotherDriverName", e.target.value)}
//         />
//         <TextInput
//           label="Age"
//           type="number"
//           placeholder="Enter age"
//           value={formData.anotherDriverAge}
//           onChange={(e) => handleChange("anotherDriverAge", e.target.value)}
//         />
//         <TextInput
//           label="Address"
//           placeholder="Enter address (Town, Kebele, House No.)"
//           value={formData.anotherDriverAddress}
//           onChange={(e) => handleChange("anotherDriverAddress", e.target.value)}
//         />
//         <TextInput
//           label="Phone Number"
//           placeholder="Enter phone number"
//           value={formData.anotherDriverPhone}
//           onChange={(e) => handleChange("anotherDriverPhone", e.target.value)}
//         />
//         <TextInput
//           label="Occupation"
//           placeholder="Enter occupation"
//           value={formData.anotherDriverOccupation}
//           onChange={(e) => handleChange("anotherDriverOccupation", e.target.value)}
//         />
//         <TextInput
//           label="License Number"
//           placeholder="Enter license number"
//           value={formData.anotherDriverLicense}
//           onChange={(e) => handleChange("anotherDriverLicense", e.target.value)}
//         />
//         <TextInput
//           label="License Grade"
//           placeholder="Enter license grade"
//           value={formData.anotherDriverLicenseGrade}
//           onChange={(e) => handleChange("anotherDriverLicenseGrade", e.target.value)}
//         />
//         <TextInput
//           label="License Expiry Date"
//           type="date"
//           value={formData.anotherDriverLicenseExpiry}
//           onChange={(e) => handleChange("anotherDriverLicenseExpiry", e.target.value)}
//         />
//       </Stack>
//     </Card>
//   );

//   export function NewClaimForm() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//       policy: "",
//       incidentDate: "",
//       incidentType: "",
//       description: "",
//       location: "",
//       policeReport: false,
//       driverName: "",
//       driverAge: "",
//       driverAddress: "",
//       driverPhone: "",
//       driverOccupation: "",
//       driverLicense: "",
//       driverLicenseGrade: "",
//       driverLicenseExpiry: "",
//       accidentDate: "",
//       accidentTime: "",
//       accidentPlace: "",
//       vehicleSpeed: "",
//       distanceFromRoad: "",
//       hornSounded: false,
//       insideVehicle: false,
//       accidentDescription: "",
//       anotherDriverInvolved: false,
//       anotherDriverName: "",
//       anotherDriverAge: "",
//       anotherDriverAddress: "",
//       anotherDriverPhone: "",
//       anotherDriverOccupation: "",
//       anotherDriverLicense: "",
//       anotherDriverLicenseGrade: "",
//       anotherDriverLicenseExpiry: "",
//     });

//     const handleChange = (field, value) => {
//       setFormData({
//         ...formData,
//         [field]: value,
//       });
//     };

//     const handleSubmit = () => {
//       navigate("/claims");
//     };

//     return (
//       <AppContainer>
//         <Group mb="sm">
//           <Button
//             variant="subtle"
//             leftSection={<ArrowLeft size={16} />}
//             onClick={() => navigate("/claims")}
//           >
//             Back
//           </Button>
//         </Group>
//         <div
//           style={{
//             flex: 1,
//             overflowY: "auto",
//             paddingBottom: "72px",
//             margin: "11px",
//           }}
//         >
//           <Stack gap="lg">
//             <Alert
//               variant="light"
//               color="blue"
//               title="Important Information"
//               icon={<Info size={16} />}
//             >
//               Please provide accurate information about the incident to help us
//               process your claim faster.
//             </Alert>

//             <Card withBorder>
//               <Stack gap="md">
//                 <Group gap="xs">
//                   <Car size={20} color="#7e4005" />
//                   <Title order={4}>Policy Information</Title>
//                 </Group>
//                 <Select
//                   label="Select Policy"
//                   placeholder="Select your policy"
//                   data={[
//                     {
//                       value: "toyota",
//                       label: "Toyota Corolla (ABC1234) - Comprehensive",
//                     },
//                     {
//                       value: "honda",
//                       label: "Honda Civic (XYZ5678) - Third Party",
//                     },
//                   ]}
//                   value={formData.policy}
//                   onChange={(value) => handleChange("policy", value || "")}
//                 />
//               </Stack>
//             </Card>

//             <DriverDetailsForm formData={formData} handleChange={handleChange} />
//             <AccidentDetailsForm formData={formData} handleChange={handleChange} />

//             <Card withBorder>
//               <Stack gap="md">
//                 <Title order={4}>Additional Information</Title>
//                 <Checkbox
//                   label="Was another driver involved?"
//                   checked={formData.anotherDriverInvolved}
//                   onChange={(e) =>
//                     handleChange("anotherDriverInvolved", e.target.checked)
//                   }
//                 />
//                 {formData.anotherDriverInvolved && (
//                   <AnotherDriverForm formData={formData} handleChange={handleChange} />
//                 )}
//               </Stack>
//             </Card>

//             <Card withBorder>
//               <Stack gap="md">
//                 <Title order={4}>Supporting Documents</Title>
//                 <Box>
//                   <Text size="sm" fw={500} mb="xs">
//                     Photos of Damage
//                   </Text>
//                   <Button
//                     variant="outline"
//                     style={{
//                       height: "96px",
//                       width: "100%",
//                       borderStyle: "dashed",
//                     }}
//                     leftSection={<Upload size={20} color="#718096" />}
//                   >
//                     <Text size="xs" c="dimmed">
//                       Upload photos (max 5)
//                     </Text>
//                   </Button>
//                 </Box>
//                 <Box>
//                   <Text size="sm" fw={500} mb="xs">
//                     Police Report (if applicable)
//                   </Text>
//                   <Button
//                     variant="outline"
//                     style={{
//                       height: "64px",
//                       width: "100%",
//                       borderStyle: "dashed",
//                     }}
//                     leftSection={<Upload size={20} color="#718096" />}
//                   >
//                     <Text size="xs" c="dimmed">
//                       Upload police report
//                     </Text>
//                   </Button>
//                 </Box>
//                 <Box>
//                   <Text size="sm" fw={500} mb="xs">
//                     Other Supporting Documents
//                   </Text>
//                   <Button
//                     variant="outline"
//                     style={{
//                       height: "64px",
//                       width: "100%",
//                       borderStyle: "dashed",
//                     }}
//                     leftSection={<Upload size={20} color="#718096" />}
//                   >
//                     <Text size="xs" c="dimmed">
//                       Upload other documents
//                     </Text>
//                   </Button>
//                 </Box>
//               </Stack>
//             </Card>

//             <Group grow mt="md">
//               <Button onClick={() => navigate("/claims")} variant="outline">
//                 Cancel
//               </Button>
//               <Button onClick={handleSubmit} bg="7e4005">
//                 Submit Claim
//               </Button>
//             </Group>
//           </Stack>
//         </div>
//         <BottomNavigation />
//       </AppContainer>
//     );
//   }
