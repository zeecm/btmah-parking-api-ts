import {
  URAParkingAPIResponse,
  URAParkingLotAvailabilityResponse,
  URAParkingRateResponse,
  URATokenResponse,
} from "../schema/third-party-schema";
import { RetryableFunction, wrapWithRetry } from "./utility";

/* eslint-disable @typescript-eslint/no-unused-vars */

abstract class ThirdPartyParkingAPIClient {
  constructor(apiKey?: string) {}

  protected async _makeAPICallWithRetry(
    endpoint: string,
    custom_headers?: Map<string, string>,
    params?: Map<string, string>,
    retries: number = 5,
  ): Promise<Response> {
    const makeAPICall = wrapWithRetry(
      this._makeAPICall.bind(this),
      retries,
    ) as RetryableFunction<
      [string, Map<string, string>?, Map<string, string>?],
      Response
    >;
    return makeAPICall(endpoint, custom_headers, params);
  }

  protected async _makeAPICall(
    endpoint: string,
    custom_headers?: Map<string, string>,
    params?: Map<string, string>,
  ): Promise<Response> {
    const headers = this._createCustomHeader(custom_headers);
    const urlParams = this._createCustomParams(params);
    const final_endpoint = `${endpoint}${
      urlParams !== "" ? `?${urlParams}` : ""
    }`;

    console.log("making 1 api call to", final_endpoint);

    const response: Response = await fetch(final_endpoint, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    return response;
  }

  private _createCustomHeader(custom_headers?: Map<string, string>): Headers {
    const headers = new Headers();
    if (typeof custom_headers != "undefined") {
      custom_headers.forEach((value, key) => headers.append(key, value));
    }
    return headers;
  }

  private _createCustomParams(params?: Map<string, string>): string {
    const urlParams = new URLSearchParams();
    if (typeof params != "undefined") {
      params.forEach((value, key) => urlParams.append(key, value));
    }
    return urlParams.toString();
  }

  abstract getParkingLots();

  abstract getParkingRates();
}

export class URAParkingAPIClient extends ThirdPartyParkingAPIClient {
  private _authHeaders: Map<string, string>;
  private _tokenLastUpdated: Date;

  private _PARKING_AVAILABILITY_ENDPOINT: string =
    "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
  private _PARKING_RATES_ENDPOINT: string =
    "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details";
  private _TOKEN_ENDPOINT: string =
    "https://www.ura.gov.sg/uraDataService/insertNewToken.action";

  constructor(apiKey: string) {
    super(apiKey);
    this._authHeaders = new Map<string, string>([
      ["AccessKey", apiKey],
      [
        "user-agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
      ],
      ["x-requested-with", "XMLHttpRequest"],
    ]);
    this._tokenLastUpdated = new Date(0);
  }

  async _getToken(): Promise<URATokenResponse> {
    return this._makeAPICallToGetToken()
      .then((response) => response.json())
      .then((data) => {
        const mappedData: URATokenResponse = {
          status: data["Status"],
          message: data["Message"],
          result: data["Result"] as string,
        };
        return mappedData;
      });
  }

  private async _makeAPICallToGetToken(): Promise<Response> {
    return this._makeAPICallWithRetry(this._TOKEN_ENDPOINT, this._authHeaders);
  }

  private async _updateHeaderWithToken(): Promise<void> {
    const tokenResponse: URATokenResponse = await this._getToken();
    if (tokenResponse.status == "Success") {
      this._tokenLastUpdated = new Date();
      this._authHeaders.set("Token", tokenResponse.result);
    } else {
      console.error(`failed to get token with error: ${tokenResponse.message}`);
    }
  }

  private async _makeAPICallWithToken<T extends URAParkingAPIResponse>(
    endpoint: string,
  ): Promise<T> {
    const tokenValid: boolean = this._checkTokenValid();
    console.log("token valid: ", tokenValid);
    if (!tokenValid) {
      await this._updateHeaderWithToken();
    }
    const response = await this._makeAPICallWithRetry(
      endpoint,
      this._authHeaders,
    );
    const data = await response.json();
    const mappedData: URAParkingAPIResponse = {
      status: data["Status"],
      message: data["Message"],
      result: data["Result"],
    };
    return mappedData as T;
  }

  private _checkTokenValid(): boolean {
    console.log(this._tokenLastUpdated);
    if (this._tokenLastUpdated == null) {
      return false;
    }
    const maxAgeMilliseconds: number = 1 * 24 * 60 * 60 * 1000;
    const currentDate: Date = new Date();
    return (
      currentDate.getTime() - this._tokenLastUpdated.getTime() <
      maxAgeMilliseconds
    );
  }

  async getParkingLots(): Promise<URAParkingLotAvailabilityResponse> {
    return await this._makeAPICallWithToken<URAParkingLotAvailabilityResponse>(
      this._PARKING_AVAILABILITY_ENDPOINT,
    );
  }

  async getParkingRates(): Promise<URAParkingRateResponse> {
    return await this._makeAPICallWithToken<URAParkingRateResponse>(
      this._PARKING_RATES_ENDPOINT,
    );
  }
}
