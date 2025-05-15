import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface CoverageType {
  id: number;
  insurance_type_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface InsuranceType {
  id: number;
  name: string;
  description: string;
  coverage_types: CoverageType[];
}

interface InsuranceTypesResponse {
  error: string;
  success: boolean;
  data: InsuranceType[];
}

export const useInsuranceTypes = () => {
  const { accessToken } = useAuth();
  const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsuranceTypes = async () => {
      try {
        setLoading(true);
        console.log("Fetching insurance types from: /api/insurance_types");

        const response = await fetch("/api/insurance_types", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data: InsuranceTypesResponse = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to fetch insurance types");
        }

        setInsuranceTypes(data.data);
      } catch (err) {
        const message =
          (err as Error).message || "Failed to fetch insurance types";
        setError(message);
        notifications.show({
          message,
          color: "red",
          icon: <AlertCircle />,
        });
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchInsuranceTypes();
    } else {
      setLoading(false);
      setError("No access token available");
      notifications.show({
        message: "Please log in to view insurance types",
        color: "red",
        icon: <AlertCircle />,
      });
    }
  }, [accessToken]);

  return { insuranceTypes, loading, error };
};
