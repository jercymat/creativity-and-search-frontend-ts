import { AuthLoginAPIPayload, AuthLoginResponse, AuthLogoutAPIPayload, AuthLogoutResponse } from "../../model/api/auth";
import client from '../apis/client'

const URL = '/users';

const authAPI = {
  login: (data: AuthLoginAPIPayload): Promise<AuthLoginResponse> =>
    client.post(URL, data)
    .then(response => response.data),
  logout: (data: AuthLogoutAPIPayload): Promise<AuthLogoutResponse> =>
    client.post(URL, data)
    .then(response => response.data),
}

export default authAPI;