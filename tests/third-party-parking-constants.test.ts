import {
  ThirdPartyParkingAPI,
  ThirdPartyParkingAPIProvider,
} from "../src/lib/third-party-parking-constants";

describe("testing custom third party parking api declarations", () => {
  test("able to access enum members using wrapper class", () => {
    expect(ThirdPartyParkingAPI.members.LTA).toBe(
      ThirdPartyParkingAPIProvider.LTA,
    );
    expect(ThirdPartyParkingAPI.members.URA).toBe(
      ThirdPartyParkingAPIProvider.URA,
    );
    expect(ThirdPartyParkingAPI.members.DataGovSG).toBe(
      ThirdPartyParkingAPIProvider.DataGovSG,
    );
  });
  test("wrapper class all enum getter", () => {
    const expectedAll = new Set<ThirdPartyParkingAPIProvider>([
      ThirdPartyParkingAPIProvider.LTA,
      ThirdPartyParkingAPIProvider.URA,
      ThirdPartyParkingAPIProvider.DataGovSG,
    ]);
    expect(ThirdPartyParkingAPI.all).toEqual(expectedAll);
  });
  test("get enum member using string", () => {
    expect(ThirdPartyParkingAPI.fromString("LTA")).toBe(
      ThirdPartyParkingAPIProvider.LTA,
    );
    expect(ThirdPartyParkingAPI.fromString("URA")).toBe(
      ThirdPartyParkingAPIProvider.URA,
    );
    expect(ThirdPartyParkingAPI.fromString("DataGovSG")).toBe(
      ThirdPartyParkingAPIProvider.DataGovSG,
    );
  });
});
