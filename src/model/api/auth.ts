import { BaseAPIPayload, BaseAPIResponse } from "../common";

export interface AuthLoginAPIPayload extends BaseAPIPayload {
  name: string,
  password: string,
}

export interface AuthLogoutAPIPayload extends BaseAPIPayload {}

export interface AuthLoginAPIResponse extends BaseAPIResponse {
  usermsg: number,
}

export interface AuthLogoutAPIResponse extends BaseAPIResponse {}