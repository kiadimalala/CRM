import { axiosConfig } from "@app/config";

import { getFromLS, writeToLS } from "@app/utils";

const Login = async (email: string, password: string) => {
  try {
    const res = await axiosConfig.post("/auth/login", {
      email,
      password,
    });
    if (res) {
      const { token } = res.data;
      writeToLS("token", JSON.stringify(token));
      return res;
    }
  } catch (error: any) {
    if (error.response) {
      const e = error.response;
      return e;
    }
    return error;
  }
};

const AuthUser = async () => {
  const token = getFromLS("token");
  try {
    if (token) {
      const res = await axiosConfig.get("/auth/me");
      const { data } = res;
      return data.data;
    }
  } catch (error: any) {
    return error;
  }
};

const Logout = async () => {
  await axiosConfig.get("/auth/logout");
};

export { Login, AuthUser, Logout };
