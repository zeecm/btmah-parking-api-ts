abstract class ThirdPartyParkingAPIClient {
  constructor(apiKey?: string) {
  }

  async makeAPICall(
    endpoint: string,
    custom_headers?: Map<string, string>,
    params?: Map<string, string>,
  ): Promise<Response> {
    const headers = this._createCustomHeader(custom_headers);
    const urlParams = this._createCustomParams(params);
    const final_endpoint = `${endpoint}?${urlParams}`;

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
}

export class URAParkingAPIClient extends ThirdPartyParkingAPIClient {
  private _defaultHeaders: Map<string, string>;

  private _PARKING_AVAILABILITY_ENDPOINT: string = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability"
  private _PARKING_RATES_ENDPOINT: string = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details"
  private _TOKEN_ENDPOINT: string = "https://www.ura.gov.sg/uraDataService/insertNewToken.action"

  constructor(apiKey: string) {
    super(apiKey)
    this._defaultHeaders = new Map<string, string>([
      ["AccessKey", apiKey],
      ["user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"],
      ["x-requested-with", "XMLHttpRequest"]
    ])
  }

  async _getToken() {
    const response = this._makeAPICallToGetToken().then((response) => console.log(response))
  }

  private async _makeAPICallToGetToken(): Promise<Response> {
    return this.makeAPICall(this._TOKEN_ENDPOINT, this._defaultHeaders)
  }

}
