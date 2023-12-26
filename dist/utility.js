"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapWithRetry = void 0;
function wrapWithRetry(func, retries = 5) {
    return function (...args) {
        let numRetries = 0;
        while (numRetries <= retries) {
            try {
                return func(...args);
            }
            catch (error) {
                console.error(`Error (Retry ${numRetries}/${retries}):`, error);
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
//# sourceMappingURL=utility.js.map