import { axiosConfig } from "@app/config";
import { AuthModels } from "@app/models";

const getAllUsers = async () => {
  try {
    const res = await axiosConfig.get("/users");
    const { data } = res;
    return data.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const getUser = async (id: string) => {
  try {
    const res = await axiosConfig.get(`/users/${id}`);
    const { data } = res;
    return data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const createUser = async ({
  name,
  lastname,
  email,
  password,
  role,
  phone,
}: AuthModels.IUser) => {
  try {
    const res = await axiosConfig.post("/users", {
      name,
      lastname,
      email,
      password,
      role,
      phone,
    });
    if (res) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const updateUser = async (id: string, data: AuthModels.IUser) => {
  try {
    const res = await axiosConfig.put(`users/${id}`, data);
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const deleteUser = async (id: string) => {
  try {
    const res = await axiosConfig.delete(`/users/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
