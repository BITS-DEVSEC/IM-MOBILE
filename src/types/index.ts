// Form Data Types
export interface VehicleDetails {
  vehicle_type: string;
  vehicle_usage: string;
  number_of_passengers: number;
  goods: string;
}

export interface CurrentResidenceAddress {
  region: string;
  zone: string;
  woreda: string;
  kebele: string;
  house_number: string;
}

export interface VehicleAttributes {
  plate_number: string;
  chassis_number: string;
  engine_number: string;
  make: string;
  model: string;
  year_of_manufacture: number;
  estimated_value: number;
  color?: string;
  fuel_type?: string;
}

export interface CarPhotos {
  front: File | string | null;
  back: File | string | null;
  left: File | string | null;
  right: File | string | null;
  engine: File | string | null;
  chassis_number: File | string | null;
  libre: File | string | null;
}

export interface WizardFormData {
  insurance_type_id: number;
  coverage_type_id: number;
  vehicle_details: VehicleDetails;
  current_residence_address: CurrentResidenceAddress;
  vehicle_attributes: VehicleAttributes;
  car_photos: CarPhotos;
  additional_notes?: string;
}

// Insurance Types
export interface CoverageType {
  id: number;
  insurance_type_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface InsuranceType {
  id: number;
  name: string;
  description: string;
  coverage_types: CoverageType[];
}

export interface Insurer {
  id: number;
  name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  api_endpoint: string;
  api_key: string;
  logo_url: string | null;
}

export interface InsuranceProduct {
  id: number;
  name: string;
  description: string;
  estimated_price: string;
  customer_rating: number | null;
  status: string;
  coverage_type: CoverageType;
  insurer: Insurer;
}

// Bank Types
export interface Bank {
  id: number;
  name: string;
  logo: string;
}

// API Response Types
export interface QuotationRequest {
  error: string;
  id: number;
  form_data: {
    vehicle_details: VehicleDetails;
    current_residence_address: CurrentResidenceAddress;
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
  insurance_type: InsuranceType;
  coverage_type: CoverageType;
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
