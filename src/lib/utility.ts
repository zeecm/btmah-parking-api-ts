export type RetryableFunction<T extends unknown[], R> = (...args: T) => R;

export function wrapWithRetry<T extends unknown[], R>(
  func: RetryableFunction<T, R>,
  retries: number = 5,
): RetryableFunction<T, R> {
  return function (...args: T): R {
    let numRetries = 0;

    while (numRetries <= retries) {
      try {
        return func(...args);
      } catch (error) {
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
