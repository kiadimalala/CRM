import { axiosConfig } from "@app/config";
import { BasicModels } from "@app/models";

const getAllClients = async () => {
  try {
    const res = await axiosConfig.get("/clients");
    if (res) {
      return res.data.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const getClient = async (id: string) => {
  try {
    const res = await axiosConfig.get(`/clients/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const createClient = async ({
  code,
  name,
  contact,
  email,
  interlocuteur,
  address,
  stat,
  nif,
  rcs,
}: BasicModels.IClient) => {
  try {
    const res = await axiosConfig.post("/clients", {
      code,
      name,
      contact,
      email,
      interlocuteur,
      address,
      stat,
      nif,
      rcs,
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

const updateClient = async (
  id: string,
  {
    name,
    contact,
    email,
    interlocuteur,
    address,
    stat,
    nif,
    rcs,
  }: BasicModels.IClient
) => {
  try {
    const res = await axiosConfig.put(`/clients/${id}`, {
      name,
      contact,
      email,
      interlocuteur,
      address,
      stat,
      nif,
      rcs,
    });
    if (res) {
      return res.data.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const deleteClient = async (id: string) => {
  try {
    const res = await axiosConfig.delete(`/clients/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export { getAllClients, getClient, createClient, updateClient, deleteClient };
