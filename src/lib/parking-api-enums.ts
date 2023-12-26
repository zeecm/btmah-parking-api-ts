export enum ThirdPartyParkingAPIProvider {
  LTA = "LTA",
  URA = "URA",
  DataGovSG = "DataGovSG",
}

type ThirdPartyParkingAPIStrings = keyof typeof ThirdPartyParkingAPIProvider;

export class ThirdPartyParkingAPI {
  static members = ThirdPartyParkingAPIProvider;

  private static _API_MAPPING = new Map<
    ThirdPartyParkingAPIStrings,
    ThirdPartyParkingAPIProvider
  >(
    Object.entries(ThirdPartyParkingAPIProvider).map(
      ([key, value]: [
        ThirdPartyParkingAPIStrings,
        ThirdPartyParkingAPIProvider,
      ]) => [key, value],
    ),
  );

  static get all(): Set<ThirdPartyParkingAPIProvider> {
    const keys = Object.values(ThirdPartyParkingAPIProvider);
    return new Set<ThirdPartyParkingAPIProvider>(keys);
  }

  static fromString(
    str: ThirdPartyParkingAPIStrings,
  ): ThirdPartyParkingAPIProvider {
    return this._API_MAPPING.get(str);
  }
}
