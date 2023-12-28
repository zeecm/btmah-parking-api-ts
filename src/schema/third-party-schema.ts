export interface URAParkingAPIResponse {
  status: string;
  message: string;
  result: unknown[] | string;
}

export interface URATokenResponse extends URAParkingAPIResponse {
  result: string;
}

export interface URAParkingLotAvailabilityResponse
  extends URAParkingAPIResponse {
  result: URAParkingLotAvailabilityData[];
}

export interface URAParkingLotAvailabilityData {
  lotsAvailable: string;
  lotType: string;
  carparkNo: string;
  geometries: URACoordinates[];
}

export interface URACoordinates {
  coordinates: string;
}

export interface URAParkingRateResponse extends URAParkingAPIResponse {
  result: URAParkingRateData[];
}

export interface URAParkingRateData {
  weekdayMin: string;
  ppName: string;
  endTime: string;
  weekdayRate: string;
  startTime: string;
  ppCode: string;
  sunPHRate: string;
  satdayMin: string;
  sunPHMin: string;
  parkingSystem: string;
  parkCapacity: number;
  vehCat: string;
  satdayRate: string;
  geometries: URACoordinates[];
}
