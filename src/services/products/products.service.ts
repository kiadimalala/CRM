import { axiosConfig } from "@app/config";
import { BasicModels } from "@app/models";

const getAllProducts = async () => {
  try {
    const res = await axiosConfig.get("/products");
    if (res) {
      return res.data.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const getProduct = async (id: string) => {
  try {
    const res = await axiosConfig.get(`/products/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const createProduct = async ({
  lRef,
  vRef,
  name,
  type,
  rp,
  sp,
}: BasicModels.IProduct) => {
  try {
    const res = await axiosConfig.post("/products", {
      lRef,
      vRef,
      name,
      type,
      rp,
      sp,
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

const updateProduct = async (
  id: string,
  { lRef, vRef, name, type, rp, sp }: BasicModels.IProduct
) => {
  try {
    const res = await axiosConfig.put(`/products/${id}`, {
      lRef,
      vRef,
      name,
      type,
      rp,
      sp,
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

const deleteProduct = async (id: string) => {
  try {
    const res = await axiosConfig.delete(`/products/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
