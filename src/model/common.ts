export interface BaseAPIPayload {
  action: string,
}

export interface BaseAPIResponse {
  ret: number, 
}

export interface ErrorActionPayload {
  error: string,
}