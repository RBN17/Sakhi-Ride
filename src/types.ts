export type RideType = 'solo' | 'express' | 'nightshield' | 'ev';

export interface LocationOption {
  id: string;
  name: string;
  area: string;
  type: 'metro' | 'techpark' | 'college' | 'residential' | 'mall' | 'transit';
  landmark: string;
}

export interface Captain {
  id: string;
  name: string;
  rating: number;
  ridesCompleted: number;
  vehicleModel: string;
  vehicleNumber: string;
  experienceYears: number;
  languages: string[];
  safetyBadges: string[];
  avatarUrl?: string;
  policeVerified: boolean;
  evVehicle: boolean;
}

export interface RideBooking {
  id: string;
  pickup: LocationOption;
  dropoff: LocationOption;
  rideType: RideType;
  basePrice: number;
  distanceKm: number;
  estimatedMinutes: number;
  otp: string;
  captain?: Captain;
  status: 'searching' | 'matched' | 'arriving' | 'in_transit' | 'completed' | 'cancelled';
  startedAt?: Date;
  isNightShield: boolean;
  routeDeviated: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface SafetyStat {
  label: string;
  value: string;
  detail: string;
}
