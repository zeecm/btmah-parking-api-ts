"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapWithRetry = void 0;
function wrapWithRetry(func, retries) {
    if (retries === void 0) { retries = 5; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var numRetries = 0;
        while (numRetries <= retries) {
            try {
                return func.apply(void 0, args);
            }
            catch (error) {
                console.error("Error (Retry ".concat(numRetries, "/").concat(retries, "):"), error);
                if (numRetries === retries) {
                    throw error;
                }
                numRetries += 1;
            }
        }
        throw new Error("Unexpected flow: Should not reach here.");
    };
}
exports.wrapWithRetry = wrapWithRetry;
