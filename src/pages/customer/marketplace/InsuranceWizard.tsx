import { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";

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

interface QuotationRequest {
  error: string;
  id: number;
  form_data: {
    vehicle_details: {
      vehicle_type: string;
      vehicle_usage: string;
      number_of_passengers: number;
      goods: string;
    };
    current_residence_address: {
      region: string;
      zone: string;
      woreda: string;
      kebele: string;
      house_number: string;
    };
  };
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    email: string | null;
    verified: boolean;
    phone_number: string;
    fin: string;
    created_at: string;
    updated_at: string;
  };
  insurance_type: {
    id: number;
    name: string;
    description: string;
  };
  coverage_type: {
    id: number;
    insurance_type_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  vehicle: {
    id: number;
    plate_number: string;
    chassis_number: string;
    engine_number: string;
    year_of_manufacture: number;
    make: string;
    model: string;
    estimated_value: string;
    front_view_photo_url: string | null;
    back_view_photo_url: string | null;
    left_view_photo_url: string | null;
    right_view_photo_url: string | null;
    engine_photo_url: string | null;
    chassis_number_photo_url: string | null;
    libre_photo_url: string | null;
  };
}

const InsuranceWizard = () => {
  const { user, accessToken } = useAuth();
  const { insuranceTypes, loading, error } = useInsuranceTypes();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize currentStep from URL query parameter
  const [currentStep, setCurrentStep] = useState<WizardStep>(() => {
    const params = new URLSearchParams(location.search);
    const step = params.get("step");
    return step &&
      Object.values<WizardStep>([
        "insurance-category",
        "motor-insurance-type",
        "select-compensation",
        "vehicle-details",
        "vehicle-details-2",
        "car-photos",
        "compare-quotes",
        "home-insurance-type",
        "home-insurance-options",
        "life-insurance-type",
        "life-insurance-options",
      ]).includes(step as WizardStep)
      ? (step as WizardStep)
      : "insurance-category";
  });

  // Initialize formData from localStorage or default
  const defaultFormData = {
    insurance_type_id: 0,
    coverage_type_id: 0,
    vehicle_details: {
      vehicle_type: "",
      vehicle_usage: "",
      number_of_passengers: 0,
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
      front: null,
      back: null,
      left: null,
      right: null,
      engine: null,
      chassis_number: null,
      libre: null,
    },
  };

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("insuranceWizardFormData");
    return savedFormData
      ? {
          ...defaultFormData,
          ...JSON.parse(savedFormData),
          car_photos: defaultFormData.car_photos,
        }
      : defaultFormData;
  });

  const [draftId, setDraftId] = useState<number | null>(null);

  // Reset formData when navigating to insurance-category
  useEffect(() => {
    if (currentStep === "insurance-category") {
      setFormData(defaultFormData);
      setDraftId(null);
      localStorage.removeItem("insuranceWizardFormData");
    }
  }, [currentStep]);

  // Update URL with currentStep and draftId
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("step", currentStep);
    if (draftId) params.set("draftId", draftId.toString());
    else params.delete("draftId");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [currentStep, draftId, navigate, location.pathname]);

  // Persist formData to localStorage, excluding car_photos
  useEffect(() => {
    if (currentStep !== "insurance-category") {
      const { car_photos, ...dataToSave } = formData;
      localStorage.setItem(
        "insuranceWizardFormData",
        JSON.stringify(dataToSave)
      );
    }
  }, [formData, currentStep]);

  // Load draftId from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const draftIdParam = params.get("draftId");
    if (draftIdParam) {
      setDraftId(Number(draftIdParam));
    } else {
      setDraftId(null);
    }
  }, [location]);

  // Fetch draft data
  useEffect(() => {
    const fetchDraftData = async () => {
      if (!draftId || !accessToken) return;

      try {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(
          `${baseUrl}/quotation_requests/${draftId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data: QuotationRequest = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch draft data");
        }

        if (data.user.id !== user?.id) {
          throw new Error("Unauthorized access to this draft");
        }

        const updatedFormData = {
          insurance_type_id: data.insurance_type.id,
          coverage_type_id: data.coverage_type.id,
          vehicle_details: {
            vehicle_type: data.form_data.vehicle_details.vehicle_type,
            vehicle_usage: data.form_data.vehicle_details.vehicle_usage,
            number_of_passengers:
              data.form_data.vehicle_details.number_of_passengers,
            goods: data.form_data.vehicle_details.goods,
          },
          current_residence_address: {
            region: data.form_data.current_residence_address.region,
            zone: data.form_data.current_residence_address.zone,
            woreda: data.form_data.current_residence_address.woreda,
            kebele: data.form_data.current_residence_address.kebele,
            house_number: data.form_data.current_residence_address.house_number,
          },
          vehicle_attributes: {
            plate_number: data.vehicle.plate_number,
            chassis_number: data.vehicle.chassis_number,
            engine_number: data.vehicle.engine_number,
            make: data.vehicle.make,
            model: data.vehicle.model,
            year_of_manufacture: data.vehicle.year_of_manufacture,
            estimated_value: Number(data.vehicle.estimated_value),
          },
          car_photos: {
            front: data.vehicle.front_view_photo_url
              ? data.vehicle.front_view_photo_url
              : null,
            back: data.vehicle.back_view_photo_url
              ? data.vehicle.back_view_photo_url
              : null,
            left: data.vehicle.left_view_photo_url
              ? data.vehicle.left_view_photo_url
              : null,
            right: data.vehicle.right_view_photo_url
              ? data.vehicle.right_view_photo_url
              : null,
            engine: data.vehicle.engine_photo_url
              ? data.vehicle.engine_photo_url
              : null,
            chassis_number: data.vehicle.chassis_number_photo_url
              ? data.vehicle.chassis_number_photo_url
              : null,
            libre: data.vehicle.libre_photo_url
              ? data.vehicle.libre_photo_url
              : null,
          },
        };

        setFormData(updatedFormData);
        const { car_photos, ...dataToSave } = updatedFormData;
        localStorage.setItem(
          "insuranceWizardFormData",
          JSON.stringify(dataToSave)
        );
      } catch (error) {
        notifications.show({
          message: (error as Error).message || "Failed to load draft data",
          color: "red",
          icon: <AlertCircle />,
        });
      }
    };

    fetchDraftData();
  }, [draftId, accessToken, user?.id]);

  const handleMotorSelected = () => {
    setCurrentStep("motor-insurance-type");
  };

  const handleOtherInsuranceSelected = (type: string) => {
    const insuranceType = insuranceTypes.find(
      (t) => t.name.toLowerCase() === type
    );
    if (insuranceType) {
      setFormData((prev: any) => ({
        ...prev,
        insurance_type_id: insuranceType.id,
      }));
      if (type === "home") setCurrentStep("home-insurance-type");
      else if (type === "life") setCurrentStep("life-insurance-type");
    }
  };

  const submitQuotationRequest = async (isDraft: boolean = false) => {
    if (!user || !accessToken) {
      notifications.show({
        message: "You must be logged in to submit a quotation request",
        color: "red",
        icon: <AlertCircle />,
      });
      return null;
    }

    // Validation only for final submission, not for draft
    const isValid = () => {
      if (isDraft) return true; // Skip validation for drafts
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
        return false;
      }
      return true;
    };

    if (!isDraft && !isValid()) {
      notifications.show({
        message:
          "Please complete all required fields and upload at least one of front, chassis number, or libre photo",
        color: "red",
        icon: <AlertCircle />,
      });
      return null;
    }

    const payload = {
      user_id: user.id,
      insurance_type_id: formData.insurance_type_id,
      coverage_type_id: formData.coverage_type_id,
      form_data: {
        vehicle_details: {
          ...formData.vehicle_details,
          number_of_passengers: Number(
            formData.vehicle_details.number_of_passengers
          ),
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

    Object.entries(formData.car_photos).forEach(([key, value]) => {
      if (value instanceof File) {
        const fieldName = `vehicle_attributes[${photoFieldMap[key]}]`;
        formDataToSend.append(fieldName, value, value.name);
      }
    });

    try {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const url = draftId
        ? `${baseUrl}/quotation_requests/${draftId}`
        : `${baseUrl}/quotation_requests/`;
      const method = draftId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.errors
            ? data.errors.join(", ")
            : data.error || "Failed to submit quotation request"
        );
      }

      const quotationId = data.id;
      setDraftId(quotationId);
      notifications.show({
        message: isDraft
          ? `Draft #${quotationId} saved successfully!`
          : draftId
          ? `Quotation request #${quotationId} updated successfully!`
          : `Quotation request #${quotationId} submitted successfully!`,
        color: "green",
      });

      if (!isDraft) {
        localStorage.removeItem("insuranceWizardFormData");
        navigate("/policies");
      }
      return quotationId;
    } catch (error) {
      notifications.show({
        message:
          (error as Error).message || "Failed to submit quotation request",
        color: "red",
        icon: <AlertCircle />,
      });
      return null;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "insurance-category":
        return (
          <InsuranceSelection
            selectedInsurance={formData.insurance_type_id.toString()}
            onSelectInsurance={(id) => {
              setFormData((prev: any) => ({
                ...prev,
                insurance_type_id: parseInt(id),
              }));
            }}
            onMotorSelected={handleMotorSelected}
            onOtherSelected={handleOtherInsuranceSelected}
            insuranceTypes={insuranceTypes}
            loading={loading}
            error={error}
          />
        );
      case "motor-insurance-type":
        return (
          <StepSelectInsurance
            insuranceCategory={formData.insurance_type_id.toString()}
            setInsuranceType={(type) => {
              const coverage = insuranceTypes
                .find((t) => t.id === formData.insurance_type_id)
                ?.coverage_types.find(
                  (c) => c.name.toLowerCase().replace(/\s+/g, "-") === type
                );
              if (coverage) {
                setFormData((prev: any) => ({
                  ...prev,
                  coverage_type_id: coverage.id,
                }));
                setCurrentStep("select-compensation");
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
            onNext={() => setCurrentStep("vehicle-details")}
            onBack={() => setCurrentStep("motor-insurance-type")}
          />
        );
      case "vehicle-details":
        return (
          <VehicleDetails
            onBack={() => setCurrentStep("select-compensation")}
            onNext={(details) => {
              setFormData(
                (prev: {
                  vehicle_details: any;
                  current_residence_address: any;
                }) => ({
                  ...prev,
                  vehicle_details: {
                    ...prev.vehicle_details,
                    ...details.vehicle_details,
                  },
                  current_residence_address: {
                    ...prev.current_residence_address,
                    ...details.current_residence_address,
                  },
                })
              );
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
              setFormData((prev: { vehicle_attributes: any }) => ({
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
              setFormData((prev: { car_photos: any }) => ({
                ...prev,
                car_photos: {
                  ...prev.car_photos,
                  ...photos,
                },
              }));
            }}
            onBack={() => setCurrentStep("vehicle-details-2")}
            onNext={() => submitQuotationRequest(true)} // Save draft
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
              const coverage = insuranceTypes
                .find((t) => t.id === 2)
                ?.coverage_types.find(
                  (c) => c.name.toLowerCase().replace(/\s+/g, "-") === type
                );
              if (coverage) {
                setFormData((prev: any) => ({
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
              const coverage = insuranceTypes
                .find((t) => t.id === 3)
                ?.coverage_types.find(
                  (c) => c.name.toLowerCase().replace(/\s+/g, "-") === type
                );
              if (coverage) {
                setFormData((prev: any) => ({
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
              setCurrentStep("compare-quotes");
              submitQuotationRequest();
            }}
          />
        );
      default:
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
