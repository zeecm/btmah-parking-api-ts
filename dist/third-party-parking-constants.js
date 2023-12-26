"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThirdPartyParkingAPI = exports.ThirdPartyParkingAPIProvider = void 0;
var ThirdPartyParkingAPIProvider;
(function (ThirdPartyParkingAPIProvider) {
    ThirdPartyParkingAPIProvider["LTA"] = "LTA";
    ThirdPartyParkingAPIProvider["URA"] = "URA";
    ThirdPartyParkingAPIProvider["DataGovSG"] = "DataGovSG";
})(ThirdPartyParkingAPIProvider || (exports.ThirdPartyParkingAPIProvider = ThirdPartyParkingAPIProvider = {}));
class ThirdPartyParkingAPI {
    static get all() {
        const keys = Object.values(ThirdPartyParkingAPIProvider);
        return new Set(keys);
    }
    static fromString(str) {
        return this._API_MAPPING.get(str);
    }
}
exports.ThirdPartyParkingAPI = ThirdPartyParkingAPI;
ThirdPartyParkingAPI.members = ThirdPartyParkingAPIProvider;
ThirdPartyParkingAPI._API_MAPPING = new Map(Object.entries(ThirdPartyParkingAPIProvider).map(([key, value]) => [key, value]));
//# sourceMappingURL=third-party-parking-constants.js.map