"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URAParkingAPIClient = void 0;
const utility_1 = require("./utility");
/* eslint-disable @typescript-eslint/no-unused-vars */
class ThirdPartyParkingAPIClient {
    constructor(apiKey) { }
    makeAPICallWithRetry(endpoint, custom_headers, params, retries = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            const makeAPICall = (0, utility_1.wrapWithRetry)(this.makeAPICall.bind(this), retries);
            return makeAPICall(endpoint, custom_headers, params);
        });
    }
    makeAPICall(endpoint, custom_headers, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = this._createCustomHeader(custom_headers);
            const urlParams = this._createCustomParams(params);
            const final_endpoint = `${endpoint}?${urlParams}`;
            console.log("making 1 api call to", endpoint);
            const response = yield fetch(final_endpoint, {
                method: "GET",
                headers: headers,
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            return response;
        });
    }
    _createCustomHeader(custom_headers) {
        const headers = new Headers();
        if (typeof custom_headers != "undefined") {
            custom_headers.forEach((value, key) => headers.append(key, value));
        }
        return headers;
    }
    _createCustomParams(params) {
        const urlParams = new URLSearchParams();
        if (typeof params != "undefined") {
            params.forEach((value, key) => urlParams.append(key, value));
        }
        return urlParams;
    }
}
class URAParkingAPIClient extends ThirdPartyParkingAPIClient {
    constructor(apiKey) {
        super(apiKey);
        this._PARKING_AVAILABILITY_ENDPOINT = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
        this._PARKING_RATES_ENDPOINT = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details";
        this._TOKEN_ENDPOINT = "https://www.ura.gov.sg/uraDataService/insertNewToken.action";
        this._defaultHeaders = new Map([
            ["AccessKey", apiKey],
        ]);
    }
    _getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._makeAPICallToGetToken().then((response) => response.json()).then((data) => data["Result"]);
        });
    }
    _makeAPICallToGetToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeAPICallWithRetry(this._TOKEN_ENDPOINT, this._defaultHeaders);
        });
    }
    _augmentHeaderWithToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this._getToken();
            this._defaultHeaders.set("Token", token);
        });
    }
    _makeAPICallWithToken(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._augmentHeaderWithToken();
            const response = yield this.makeAPICallWithRetry(endpoint, this._defaultHeaders);
            const data = yield response.json();
            console.log(this._defaultHeaders);
            console.log(data);
        });
    }
    getParkingLots() {
        return __awaiter(this, void 0, void 0, function* () {
            this._makeAPICallWithToken(this._PARKING_AVAILABILITY_ENDPOINT);
        });
    }
    getParkingRates() {
        return __awaiter(this, void 0, void 0, function* () {
            this._makeAPICallWithToken(this._PARKING_RATES_ENDPOINT);
        });
    }
}
exports.URAParkingAPIClient = URAParkingAPIClient;
//# sourceMappingURL=third-party-api-client.js.map