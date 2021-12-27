export interface IReqResponse {
  status: boolean;
  message?: string;
  err?: string;
  error?: {
    code?: string;
  };
}

export interface IClient {
  id?: string;
  code: string;
  name: string;
  contact: string;
  email?: string;
  interlocuteur?: string;
  address: string;
  stat?: string;
  nif?: string;
  rcs?: string;
}

export interface IProduct {
  id?: string;
  lRef: string;
  vRef: string;
  type: string;
  name: string;
  rp: number;
  sp: number;
}

export interface IQuotation {
  id?: string;
  ref: string;
  clientId: string;
  type: string;
  site: string;
  content: IProduct[];
  pht: number;
  pttc: number;
  editorId: string;
}
