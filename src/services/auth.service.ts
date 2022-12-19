import { Response } from "~/interfaces/response";
import { axios } from "~/utils/axios-client";

interface LoginResponse {
  message: string;
  token: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

const login = async (payload: LoginValues) => {
  const { data } = await axios.post<Response<LoginResponse>>("/login", payload);

  return data;
};

const authService = {
  login,
};

export default authService;
