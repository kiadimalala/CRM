import { axiosConfig } from "@app/config";
import { BasicModels } from "@app/models";

const getAllQuotations = async () => {
  try {
    const res = await axiosConfig.get("/quotations");
    if (res) {
      return res.data.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const getQuotation = async (id: string) => {
  try {
    const res = await axiosConfig.get(`/quotations/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};

const createQuotation = async ({
  ref,
  clientId,
  type,
  site,
  content,
  pht,
  pttc,
  editorId,
}: BasicModels.IQuotation) => {
  try {
    const res = await axiosConfig.post("/quotations", {
      ref,
      clientId,
      type,
      site,
      content,
      pht,
      pttc,
      editorId,
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

const updateQuotation = async (
  id: string,
  {
    ref,
    clientId,
    type,
    site,
    content,
    pht,
    pttc,
    editorId,
  }: BasicModels.IQuotation
) => {
  try {
    const res = await axiosConfig.put(`/quotations/${id}`, {
      ref,
      clientId,
      type,
      site,
      content,
      pht,
      pttc,
      editorId,
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

const deleteQuotation = async (id: string) => {
  try {
    const res = await axiosConfig.delete(`/quotations/${id}`);
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
  getAllQuotations,
  getQuotation,
  createQuotation,
  updateQuotation,
  deleteQuotation,
};
