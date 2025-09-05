export interface FetchError extends Error {
    code?: number;
    info?: {
        message: string
    };
  }