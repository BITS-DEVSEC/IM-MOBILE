import { useState } from "react";
import { Progress } from "@mantine/core";
import InsuranceSelection from "./InsuranceSelection";
import StepSelectInsurance from "./StepSelectInsurance";
import StepSelectCompensation from "./StepSelectCompensation";
import VehicleDetails from "./StepVehicleDetails";
import VehicleDetails2 from "./StepVehicleDetails2";
import StepUploadCarPhotos from "./StepUploadCarPhotos";
import HomeInsuranceForm from "./HomeInsuranceForm";
import LifeInsuranceQuestionnaire from "./LifeInsuranceQuestionnaire";
import BottomNavigation from "./BottomNavigation";

export type WizardStep =
  | "insurance-category"
  | "motor-insurance-type"
  | "select-compensation"
  | "vehicle-details"
  | "vehicle-details-2"
  | "car-photos"
  | "home-insurance-form"
  | "life-insurance-questionnaire";

const InsuranceWizard = () => {
  const [currentStep, setCurrentStep] =
    useState<WizardStep>("insurance-category");
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");
  const [selectedInsuranceType, setSelectedInsuranceType] =
    useState<string>("");
  const [activeTab, setActiveTab] = useState("motor"); // Updated to allow state change
  const [carPhotos, setCarPhotos] = useState<{ [key: string]: File | null }>({
    front: null,
    back: null,
    left: null,
    right: null,
  });
  const [compensationLimits, setCompensationLimits] = useState({
    ownDamage: 100000,
    bodilyInjury: 250000,
  });

  const getProgressValue = () => {
    switch (currentStep) {
      case "insurance-category":
        return 10;
      case "motor-insurance-type":
        return 20;
      case "select-compensation":
        return 30;
      case "vehicle-details":
        return 50;
      case "vehicle-details-2":
        return 70;
      case "car-photos":
        return 90;
      case "home-insurance-form":
        return 50;
      case "life-insurance-questionnaire":
        return 30;
      default:
        return 0;
    }
  };

  const handleMotorSelected = () => {
    setCurrentStep("motor-insurance-type");
  };

  const handleOtherInsuranceSelected = (type: string) => {
    if (type === "home") setCurrentStep("home-insurance-form");
    else if (type === "life") setCurrentStep("life-insurance-questionnaire");
  };

  const renderStep = () => {
    switch (currentStep) {
      case "insurance-category":
        return (
          <InsuranceSelection
            selectedInsurance={selectedInsurance}
            onSelectInsurance={setSelectedInsurance}
            onMotorSelected={handleMotorSelected}
            onOtherSelected={handleOtherInsuranceSelected}
          />
        );
      case "motor-insurance-type":
        return (
          <StepSelectInsurance
            insuranceCategory={selectedInsurance}
            setInsuranceType={(type) => {
              setSelectedInsuranceType(type);
              setCurrentStep("select-compensation");
            }}
            onBack={() => setCurrentStep("insurance-category")}
          />
        );
      case "select-compensation":
        return (
          <StepSelectCompensation
            insuranceType={selectedInsuranceType}
            compensationLimits={compensationLimits}
            setCompensationLimits={setCompensationLimits}
            onNext={() => setCurrentStep("vehicle-details")}
            onBack={() => setCurrentStep("motor-insurance-type")}
          />
        );
      case "vehicle-details":
        return (
          <VehicleDetails
            onBack={() => setCurrentStep("select-compensation")}
            onNext={() => setCurrentStep("vehicle-details-2")}
          />
        );
      case "vehicle-details-2":
        return (
          <VehicleDetails2
            onBack={() => setCurrentStep("vehicle-details")}
            onNext={() => setCurrentStep("car-photos")}
          />
        );
      case "car-photos":
        return (
          <StepUploadCarPhotos
            carPhotos={carPhotos}
            setCarPhotos={setCarPhotos}
            onBack={() => setCurrentStep("vehicle-details-2")}
            onNext={() => {
              console.log("Application submitted", {
                insuranceType: selectedInsuranceType,
                compensationLimits,
                vehicleDetails: {}, // Add your vehicle details state here
                carPhotos,
              });
            }}
          />
        );
      case "home-insurance-form":
        return (
          <HomeInsuranceForm
            onBack={() => setCurrentStep("insurance-category")}
            onNext={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
      case "life-insurance-questionnaire":
        return (
          <LifeInsuranceQuestionnaire
            onBack={() => setCurrentStep("insurance-category")}
            onNext={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #eaeaea",
        backgroundColor: "#fff",
      }}
    >
      <Progress
        value={getProgressValue()}
        size="sm"
        color="#7E4005"
        styles={{
          root: {
            position: "sticky",
            top: 0,
            zIndex: 10,
            borderBottom: "1px solid #f0f0f0",
          },
        }}
      />

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

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />
    </div>
  );
};

export default InsuranceWizard;
