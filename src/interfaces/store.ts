import { AuthModels, BasicModels } from ".";

export interface IAuthHook {
  user: AuthModels.IUser | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<AuthModels.IUser | null>>;
}

export interface IUsersHook {
  users: AuthModels.IUser[];
  setUsers: React.Dispatch<React.SetStateAction<AuthModels.IUser[]>>;
  userSaved: boolean;
  setUserSaved: React.Dispatch<React.SetStateAction<boolean>>;
  alreadyExist: boolean;
  setAlreadyExist: React.Dispatch<React.SetStateAction<boolean>>;
  userUpdated: boolean;
  setUserUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProductsHook {
  products: BasicModels.IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<BasicModels.IProduct[]>>;
  productSaved: boolean;
  setProductSaved: React.Dispatch<React.SetStateAction<boolean>>;
  alreadyExist: boolean;
  setAlreadyExist: React.Dispatch<React.SetStateAction<boolean>>;
  editProduct: boolean;
  setEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
  productUpdated: boolean;
  setProductUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IClientsHook {
  clients: BasicModels.IClient[];
  setClients: React.Dispatch<React.SetStateAction<BasicModels.IClient[]>>;
  alreadyExist: boolean;
  setAlreadyExist: React.Dispatch<React.SetStateAction<boolean>>;
  editclient: boolean;
  setEditClient: React.Dispatch<React.SetStateAction<boolean>>;
  clientUpdated: boolean;
  setClientUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  clientSaved: boolean;
  setClientSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IQuotationsHook {
  quotations: BasicModels.IQuotation[];
  setQuotations: React.Dispatch<React.SetStateAction<BasicModels.IQuotation[]>>;
  quotationSaved: boolean;
  setQuotationSaved: React.Dispatch<React.SetStateAction<boolean>>;
  alreadyExist: boolean;
  setAlreadyExist: React.Dispatch<React.SetStateAction<boolean>>;
  quotationUpdated: boolean;
  setQuotationUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAppContext {
  AuthHook: IAuthHook;
  UsersHook: IUsersHook;
  ProductsHook: IProductsHook;
  ClientsHook: IClientsHook;
  QuotationsHook: IQuotationsHook;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  createUser: boolean;
  setCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
  editUser: boolean;
  setEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  createProduct: boolean;
  setCreateProduct: React.Dispatch<React.SetStateAction<boolean>>;
  editProduct: boolean;
  setEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  editClient: boolean;
  setEditClient: React.Dispatch<React.SetStateAction<boolean>>;
  createClient: boolean;
  setCreateClient: React.Dispatch<React.SetStateAction<boolean>>;
  createQuotation: boolean;
  setCreateQuotation: React.Dispatch<React.SetStateAction<boolean>>;
  editQuotation: boolean;
  setEditQuotation: React.Dispatch<React.SetStateAction<boolean>>;
}
