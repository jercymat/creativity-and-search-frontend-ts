export interface BaseAPIPayload {
  action: string;
}

export interface BaseAPIResponse {
  ret: number;
}

export interface ErrorActionPayload {
  error: string;
}

export interface BaseResult {
  id: string;
  title: string;
  url: string;
  description: string;
}
