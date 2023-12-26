import { RetryableFunction, wrapWithRetry } from "./utility";

/* eslint-disable @typescript-eslint/no-unused-vars */

abstract class ThirdPartyParkingAPIClient {
  constructor(apiKey?: string) {}

  async makeAPICallWithRetry(
    endpoint: string,
    custom_headers?: Map<string, string>,
    params?: Map<string, string>,
    retries: number = 5,
  ): Promise<Response> {
    const makeAPICall = wrapWithRetry(
      this.makeAPICall.bind(this),
      retries,
    ) as RetryableFunction<
      [string, Map<string, string>?, Map<string, string>?],
      Response
    >;
    return makeAPICall(endpoint, custom_headers, params);
  }

  async makeAPICall(
    endpoint: string,
    custom_headers?: Map<string, string>,
    params?: Map<string, string>,
  ): Promise<Response> {
    const headers = this._createCustomHeader(custom_headers);
    const urlParams = this._createCustomParams(params);
    const final_endpoint = `${endpoint}?${urlParams}`;

    console.log("making 1 api call to", endpoint);

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

  private _createCustomParams(params?: Map<string, string>): URLSearchParams {
    const urlParams = new URLSearchParams();
    if (typeof params != "undefined") {
      params.forEach((value, key) => urlParams.append(key, value));
    }
    return urlParams;
  }

  abstract getParkingLots();

  abstract getParkingRates();
}

export class URAParkingAPIClient extends ThirdPartyParkingAPIClient {
  private _defaultHeaders: Map<string, string>;

  private _PARKING_AVAILABILITY_ENDPOINT: string =
    "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
  private _PARKING_RATES_ENDPOINT: string =
    "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details";
  private _TOKEN_ENDPOINT: string =
    "https://www.ura.gov.sg/uraDataService/insertNewToken.action";

  constructor(apiKey: string) {
    super(apiKey);
    this._defaultHeaders = new Map<string, string>([["AccessKey", apiKey]]);
  }

  async _getToken(): Promise<string> {
    return this._makeAPICallToGetToken()
      .then((response) => response.json())
      .then((data) => data["Result"]);
  }

  private async _makeAPICallToGetToken(): Promise<Response> {
    return this.makeAPICallWithRetry(
      this._TOKEN_ENDPOINT,
      this._defaultHeaders,
    );
  }

  private async _augmentHeaderWithToken(): Promise<void> {
    const token: string = await this._getToken();
    this._defaultHeaders.set("Token", token);
  }

  private async _makeAPICallWithToken(endpoint: string) {
    await this._augmentHeaderWithToken();
    const response = await this.makeAPICallWithRetry(
      endpoint,
      this._defaultHeaders,
    );
    const data = await response.json();
    console.log(this._defaultHeaders);
    console.log(data);
  }

  async getParkingLots() {
    this._makeAPICallWithToken(this._PARKING_AVAILABILITY_ENDPOINT);
  }

  async getParkingRates() {
    this._makeAPICallWithToken(this._PARKING_RATES_ENDPOINT);
  }
}
