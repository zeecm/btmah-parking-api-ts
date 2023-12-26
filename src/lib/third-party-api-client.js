"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URAParkingAPIClient = void 0;
var utility_1 = require("./utility");
/* eslint-disable @typescript-eslint/no-unused-vars */
var ThirdPartyParkingAPIClient = /** @class */ (function () {
    function ThirdPartyParkingAPIClient(apiKey) {
    }
    ThirdPartyParkingAPIClient.prototype._makeAPICallWithRetry = function (endpoint, custom_headers, params, retries) {
        if (retries === void 0) { retries = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var makeAPICall;
            return __generator(this, function (_a) {
                makeAPICall = (0, utility_1.wrapWithRetry)(this._makeAPICall.bind(this), retries);
                return [2 /*return*/, makeAPICall(endpoint, custom_headers, params)];
            });
        });
    };
    ThirdPartyParkingAPIClient.prototype._makeAPICall = function (endpoint, custom_headers, params) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, urlParams, final_endpoint, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = this._createCustomHeader(custom_headers);
                        urlParams = this._createCustomParams(params);
                        final_endpoint = "".concat(endpoint).concat(urlParams !== '' ? "?".concat(urlParams) : '');
                        console.log("making 1 api call to", final_endpoint);
                        return [4 /*yield*/, fetch(final_endpoint, {
                                method: "GET",
                                headers: headers,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Error! status: ".concat(response.status));
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ThirdPartyParkingAPIClient.prototype._createCustomHeader = function (custom_headers) {
        var headers = new Headers();
        if (typeof custom_headers != "undefined") {
            custom_headers.forEach(function (value, key) { return headers.append(key, value); });
        }
        return headers;
    };
    ThirdPartyParkingAPIClient.prototype._createCustomParams = function (params) {
        var urlParams = new URLSearchParams();
        if (typeof params != "undefined") {
            params.forEach(function (value, key) { return urlParams.append(key, value); });
        }
        return urlParams.toString();
    };
    return ThirdPartyParkingAPIClient;
}());
var URAParkingAPIClient = /** @class */ (function (_super) {
    __extends(URAParkingAPIClient, _super);
    function URAParkingAPIClient(apiKey) {
        var _this = _super.call(this, apiKey) || this;
        _this._PARKING_AVAILABILITY_ENDPOINT = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
        _this._PARKING_RATES_ENDPOINT = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details";
        _this._TOKEN_ENDPOINT = "https://www.ura.gov.sg/uraDataService/insertNewToken.action";
        _this.authHeaders = new Map([
            ["AccessKey", apiKey],
            [
                "user-agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
            ],
            ["x-requested-with", "XMLHttpRequest"],
        ]);
        return _this;
    }
    URAParkingAPIClient.prototype._getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._makeAPICallToGetToken()
                        .then(function (response) { return response.json(); })
                        .then(function (data) { return data["Result"]; })];
            });
        });
    };
    URAParkingAPIClient.prototype._makeAPICallToGetToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._makeAPICallWithRetry(this._TOKEN_ENDPOINT, this.authHeaders)];
            });
        });
    };
    URAParkingAPIClient.prototype._augmentHeaderWithToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getToken()];
                    case 1:
                        token = _a.sent();
                        this.authHeaders.set("Token", token);
                        return [2 /*return*/];
                }
            });
        });
    };
    URAParkingAPIClient.prototype._makeAPICallWithToken = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._augmentHeaderWithToken()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._makeAPICallWithRetry(endpoint, this.authHeaders)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        console.log(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    URAParkingAPIClient.prototype.getParkingLots = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._makeAPICallWithToken(this._PARKING_AVAILABILITY_ENDPOINT);
                return [2 /*return*/];
            });
        });
    };
    URAParkingAPIClient.prototype.getParkingRates = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._makeAPICallWithToken(this._PARKING_RATES_ENDPOINT);
                return [2 /*return*/];
            });
        });
    };
    return URAParkingAPIClient;
}(ThirdPartyParkingAPIClient));
exports.URAParkingAPIClient = URAParkingAPIClient;
var client = new URAParkingAPIClient("fac5e96d-4f43-490f-8d07-874627bc4f15");
client.getParkingRates();
