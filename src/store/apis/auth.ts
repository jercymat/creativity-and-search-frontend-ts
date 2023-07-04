import {
  AuthLoginAPIPayload,
  AuthLoginAPIResponse,
  AuthLogoutAPIPayload,
  AuthLogoutAPIResponse
} from "../../model/api/auth"
import client from '../apis/client'

const URL = '/users';

const authAPI = {
  login: (data: AuthLoginAPIPayload): Promise<AuthLoginAPIResponse> =>
    client.post(URL, data)
    .then(response => response.data),
  logout: (data: AuthLogoutAPIPayload): Promise<AuthLogoutAPIResponse> =>
    client.post(URL, data)
    .then(response => response.data),
}

export default authAPI;