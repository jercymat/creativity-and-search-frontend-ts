import { BaseAPIPayload, BaseAPIResponse } from "../common";

export interface AuthLoginAPIPayload extends BaseAPIPayload {
  name: string,
  password: string,
}

export interface AuthLogoutAPIPayload extends BaseAPIPayload {}

export interface AuthLoginResponse extends BaseAPIResponse {
  usermsg: number,
}

export interface AuthLogoutResponse extends BaseAPIResponse {}