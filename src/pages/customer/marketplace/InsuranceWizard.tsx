import { useState } from "react";
import InsuranceSelection from "./InsuranceSelection";
import StepSelectInsurance from "./StepSelectInsurance";
import StepSelectCompensation from "./StepSelectCompensation";
import VehicleDetails from "./StepVehicleDetails";
import VehicleDetails2 from "./StepVehicleDetails2";
import StepUploadCarPhotos from "./StepUploadCarPhotos";
import HomeInsuranceOptions from "./HomeInsuranceOptions";
import LifeInsuranceOptions from "./LifeInsuranceOptions";
import BottomNavigation from "../BottomNavigation";
import StepCompareQuotes from "./StepCompareQuotes";
import AppContainer from "../../../components/AppContainer";
import { useInsuranceTypes } from "../../../hooks/useInsuranceTypes";
import { useAuth } from "../../../context/AuthContext";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type WizardStep =
  | "insurance-category"
  | "motor-insurance-type"
  | "select-compensation"
  | "vehicle-details"
  | "vehicle-details-2"
  | "car-photos"
  | "compare-quotes"
  | "home-insurance-type"
  | "home-insurance-options"
  | "life-insurance-type"
  | "life-insurance-options";

const InsuranceWizard = () => {
  const { user, accessToken } = useAuth();
  const { insuranceTypes } = useInsuranceTypes();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] =
    useState<WizardStep>("insurance-category");
  const [formData, setFormData] = useState({
    insurance_type_id: 0,
    coverage_type_id: 0,
    coverage_amount: 0,
    vehicle_details: {
      vehicle_type: "",
      vehicle_usage: "",
      number_of_passengers: 0,
      car_price: 0,
      goods: "",
    },
    current_residence_address: {
      region: "",
      zone: "",
      woreda: "",
      kebele: "",
      house_number: "",
    },
    vehicle_attributes: {
      plate_number: "",
      chassis_number: "",
      engine_number: "",
      make: "",
      model: "",
      year_of_manufacture: 0,
      estimated_value: 0,
    },
    car_photos: {
      front: null as File | null,
      back: null as File | null,
      left: null as File | null,
      right: null as File | null,
      engine: null as File | null,
      chassis_number: null as File | null,
      libre: null as File | null,
    },
  });

  const handleMotorSelected = () => {
    console.log("Motor selected, moving to motor-insurance-type");
    setCurrentStep("motor-insurance-type");
  };

  const handleOtherInsuranceSelected = (type: string) => {
    console.log(`Other insurance selected: ${type}`);
    const insuranceType = insuranceTypes.find(
      (t) => t.name.toLowerCase() === type
    );
    if (insuranceType) {
      setFormData((prev) => ({
        ...prev,
        insurance_type_id: insuranceType.id,
      }));
      if (type === "home") setCurrentStep("home-insurance-type");
      else if (type === "life") setCurrentStep("life-insurance-type");
    } else {
      console.error(`Insurance type ${type} not found`);
    }
  };

  const submitQuotationRequest = async () => {
    console.log("submitQuotationRequest called");

    if (!user || !accessToken) {
      console.error("User or accessToken missing", { user, accessToken });
      notifications.show({
        message: "You must be logged in to submit a quotation request",
        color: "red",
        icon: <AlertCircle />,
      });
      return;
    }

    // Validate required fields
    const isValid = () => {
      const missingFields = [];
      if (formData.insurance_type_id <= 0)
        missingFields.push("insurance_type_id");
      if (formData.coverage_type_id <= 0)
        missingFields.push("coverage_type_id");
      if (!formData.vehicle_details.vehicle_type)
        missingFields.push("vehicle_type");
      if (!formData.vehicle_details.vehicle_usage)
        missingFields.push("vehicle_usage");
      if (formData.vehicle_details.number_of_passengers <= 0)
        missingFields.push("number_of_passengers");
      if (formData.vehicle_details.car_price <= 0)
        missingFields.push("car_price");
      if (!formData.current_residence_address.region)
        missingFields.push("region");
      if (!formData.current_residence_address.zone) missingFields.push("zone");
      if (!formData.current_residence_address.woreda)
        missingFields.push("woreda");
      if (!formData.current_residence_address.kebele)
        missingFields.push("kebele");
      if (!formData.vehicle_attributes.plate_number)
        missingFields.push("plate_number");
      if (!formData.vehicle_attributes.chassis_number)
        missingFields.push("chassis_number");
      if (!formData.vehicle_attributes.engine_number)
        missingFields.push("engine_number");
      if (!formData.vehicle_attributes.make) missingFields.push("make");
      if (!formData.vehicle_attributes.model) missingFields.push("model");
      if (formData.vehicle_attributes.year_of_manufacture <= 0)
        missingFields.push("year_of_manufacture");
      if (formData.vehicle_attributes.estimated_value <= 0)
        missingFields.push("estimated_value");
      // Require at least one critical photo (e.g., front, chassis_number, or libre)
      if (
        !formData.car_photos.front &&
        !formData.car_photos.chassis_number &&
        !formData.car_photos.libre
      ) {
        missingFields.push(
          "at least one of front, chassis number, or libre photo"
        );
      }

      if (missingFields.length > 0) {
        console.error("Validation failed, missing fields:", missingFields);
        return false;
      }
      return true;
    };

    if (!isValid()) {
      notifications.show({
        message:
          "Please complete all required fields and upload at least one of front, chassis number, or libre photo",
        color: "red",
        icon: <AlertCircle />,
      });
      return;
    }

    const payload = {
      user_id: user.id,
      insurance_type_id: formData.insurance_type_id,
      coverage_type_id: formData.coverage_type_id,
      status: "draft",
      form_data: {
        coverage_amount: formData.coverage_amount,
        vehicle_details: {
          ...formData.vehicle_details,
          number_of_passengers: Number(
            formData.vehicle_details.number_of_passengers
          ),
          car_price: Number(formData.vehicle_details.car_price),
        },
        current_residence_address: formData.current_residence_address,
      },
      vehicle_attributes: {
        ...formData.vehicle_attributes,
        year_of_manufacture: Number(
          formData.vehicle_attributes.year_of_manufacture
        ),
        estimated_value: Number(formData.vehicle_attributes.estimated_value),
      },
    };

    console.log("Payload prepared:", payload);

    const formDataToSend = new FormData();
    formDataToSend.append("payload", JSON.stringify(payload));

    const photoFieldMap: { [key: string]: string } = {
      front: "front_view_photo",
      back: "back_view_photo",
      left: "left_view_photo",
      right: "right_view_photo",
      engine: "engine_photo",
      chassis_number: "chassis_number_photo",
      libre: "libre_photo",
    };

    Object.entries(formData.car_photos).forEach(([key, file]) => {
      if (file) {
        const fieldName = `vehicle_attributes[${photoFieldMap[key]}]`;
        console.log(
          `Appending photo: ${fieldName}, file: ${file.name}, size: ${file.size} bytes`
        );
        formDataToSend.append(fieldName, file, file.name);
      } else {
        console.log(`No photo for ${key}`);
      }
    });

    // Debug FormData contents
    for (const [key, value] of formDataToSend.entries()) {
      console.log(
        `FormData entry: ${key} =`,
        value instanceof File ? `File: ${value.name}` : value
      );
    }

    try {
      console.log("Sending fetch request to /api/quotation_requests/");
      const response = await fetch("/api/quotation_requests/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataToSend,
      });

      console.log(
        "Fetch response received:",
        response.status,
        response.statusText
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Response error:", data);
        throw new Error(
          data.errors
            ? data.errors.join(", ")
            : data.error || "Failed to submit quotation request"
        );
      }

      console.log("Quotation request successful:", data);
      notifications.show({
        message: "Quotation request submitted successfully",
        color: "green",
      });
      navigate("/policies");
    } catch (error) {
      console.error("Fetch error:", error);
      notifications.show({
        message:
          (error as Error).message || "Failed to submit quotation request",
        color: "red",
        icon: <AlertCircle />,
      });
    }
  };

  const renderStep = () => {
    console.log(`Rendering step: ${currentStep}`);
    switch (currentStep) {
      case "insurance-category":
        return (
          <InsuranceSelection
            selectedInsurance={formData.insurance_type_id.toString()}
            onSelectInsurance={(id) => {
              console.log(`Insurance selected: ${id}`);
              setFormData((prev) => ({
                ...prev,
                insurance_type_id: parseInt(id),
              }));
            }}
            onMotorSelected={handleMotorSelected}
            onOtherSelected={handleOtherInsuranceSelected}
          />
        );
      case "motor-insurance-type":
        return (
          <StepSelectInsurance
            insuranceCategory={formData.insurance_type_id.toString()}
            setInsuranceType={(type) => {
              console.log(`Coverage type selected: ${type}`);
              const coverage = insuranceTypes
                .find((t) => t.id === formData.insurance_type_id)
                ?.coverage_types.find(
                  (c) => c.name.toLowerCase().replace(/\s+/g, "-") === type
                );
              if (coverage) {
                setFormData((prev) => ({
                  ...prev,
                  coverage_type_id: coverage.id,
                }));
                setCurrentStep("select-compensation");
              } else {
                console.error(`Coverage type ${type} not found`);
              }
            }}
            onBack={() => setCurrentStep("insurance-category")}
          />
        );
      case "select-compensation":
        return (
          <StepSelectCompensation
            insuranceType={insuranceTypes
              .find((t) => t.id === formData.insurance_type_id)
              ?.coverage_types.find((c) => c.id === formData.coverage_type_id)
              ?.name.toLowerCase()
              .replace(/\s+/g, "-")}
            compensationLimits={{ ownDamage: formData.coverage_amount }}
            setCompensationLimits={({ ownDamage }) => {
              console.log(`Compensation set: ${ownDamage}`);
              setFormData((prev) => ({
                ...prev,
                coverage_amount: ownDamage,
              }));
            }}
            onNext={() => setCurrentStep("vehicle-details")}
            onBack={() => setCurrentStep("motor-insurance-type")}
          />
        );
      case "vehicle-details":
        return (
          <VehicleDetails
            onBack={() => setCurrentStep("select-compensation")}
            onNext={(details) => {
              console.log("Vehicle details submitted:", details);
              setFormData((prev) => ({
                ...prev,
                vehicle_details: {
                  ...prev.vehicle_details,
                  ...details.vehicle_details,
                },
                current_residence_address: {
                  ...prev.current_residence_address,
                  ...details.current_residence_address,
                },
              }));
              setCurrentStep("vehicle-details-2");
            }}
            initialVehicleDetails={formData.vehicle_details}
            initialResidenceAddress={formData.current_residence_address}
          />
        );
      case "vehicle-details-2":
        return (
          <VehicleDetails2
            onBack={() => setCurrentStep("vehicle-details")}
            onNext={(attributes) => {
              console.log("Vehicle attributes submitted:", attributes);
              setFormData((prev) => ({
                ...prev,
                vehicle_attributes: {
                  ...prev.vehicle_attributes,
                  ...attributes,
                },
              }));
              setCurrentStep("car-photos");
            }}
            initialVehicleAttributes={formData.vehicle_attributes}
          />
        );
      case "car-photos":
        return (
          <StepUploadCarPhotos
            carPhotos={formData.car_photos}
            setCarPhotos={(photos) => {
              console.log("Car photos updated:", photos);
              setFormData((prev) => ({
                ...prev,
                car_photos: {
                  ...prev.car_photos,
                  ...photos,
                },
              }));
            }}
            onBack={() => setCurrentStep("vehicle-details-2")}
            onNext={() => {
              console.log("Moving to compare-quotes and submitting request");
              setCurrentStep("compare-quotes");
              submitQuotationRequest();
            }}
          />
        );
      case "compare-quotes":
        return (
          <StepCompareQuotes onBack={() => setCurrentStep("car-photos")} />
        );
      case "home-insurance-type":
        return (
          <StepSelectInsurance
            insuranceCategory="2"
            setInsuranceType={(type) => {
              console.log(`Home coverage type selected: ${type}`);
              const coverage = insuranceTypes
                .find((t) => t.id === 2)
                ?.coverage_types.find(
                  (c) => c.name.toLowerCase().replace(/\s+/g, "-") === type
                );
              if (coverage) {
                setFormData((prev) => ({
                  ...prev,
                  coverage_type_id: coverage.id,
                }));
                setCurrentStep("home-insurance-options");
              }
            }}
            onBack={() => setCurrentStep("insurance-category")}
          />
        );
      case "home-insurance-options":
        return (
          <HomeInsuranceOptions
            coverageType={
              insuranceTypes
                .find((t) => t.id === 2)
                ?.coverage_types.find((c) => c.id === formData.coverage_type_id)
                ?.name.toLowerCase()
                .replace(/\s+/g, "-") || ""
            }
            onBack={() => setCurrentStep("home-insurance-type")}
            onNext={() => {
              console.log("Submitting home insurance request");
              setCurrentStep("compare-quotes");
              submitQuotationRequest();
            }}
          />
        );
      case "life-insurance-type":
        return (
          <StepSelectInsurance
            insuranceCategory="3"
            setInsuranceType={(type) => {
              console.log(`Life coverage type selected: ${type}`);
              const coverage = insuranceTypes
                .find((t) => t.id === 3)
                ?.coverage_types.find(
                  (c) => c.name.toLowerCase().replace(/\s+/g, "-") === type
                );
              if (coverage) {
                setFormData((prev) => ({
                  ...prev,
                  coverage_type_id: coverage.id,
                }));
                setCurrentStep("life-insurance-options");
              }
            }}
            onBack={() => setCurrentStep("insurance-category")}
          />
        );
      case "life-insurance-options":
        return (
          <LifeInsuranceOptions
            coverageType={
              insuranceTypes
                .find((t) => t.id === 3)
                ?.coverage_types.find((c) => c.id === formData.coverage_type_id)
                ?.name.toLowerCase()
                .replace(/\s+/g, "-") || ""
            }
            onBack={() => setCurrentStep("life-insurance-type")}
            onNext={() => {
              console.log("Submitting life insurance request");
              setCurrentStep("compare-quotes");
              submitQuotationRequest();
            }}
          />
        );
      default:
        console.error(`Unknown step: ${currentStep}`);
        return null;
    }
  };

  return (
    <AppContainer>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "72px",
          paddingTop: "16px",
        }}
      >
        {renderStep()}
      </div>
      <BottomNavigation />
    </AppContainer>
  );
};

export default InsuranceWizard;
