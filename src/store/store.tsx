import { StoreModels } from "@app/models";
import React, { createContext, useContext, useEffect } from "react";
import {
  authHook,
  usersHook,
  productsHook,
  clientsHook,
  quotationsHook,
} from "@app/store";

const AppContext = createContext({} as StoreModels.IAppContext);

interface ContextProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<ContextProps> = ({ children }) => {
  const AuthHook = authHook.useAuth();
  const UsersHook = usersHook.useUser();
  const ProductsHook = productsHook.useProduct();
  const ClientsHook = clientsHook.useClient();
  const QuotationsHook = quotationsHook.useQuotation();
  //settings hook
  const [query, setQuery] = React.useState<string>("");
  //open modal user form
  const [createUser, setCreateUser] = React.useState<boolean>(false);
  const [editUser, setEditUser] = React.useState<boolean>(false);
  //open modal product form
  const [createProduct, setCreateProduct] = React.useState<boolean>(false);
  const [editProduct, setEditProduct] = React.useState<boolean>(false);

  const [selected, setSelected] = React.useState<string>("");

  const [createClient, setCreateClient] = React.useState<boolean>(false);
  const [editClient, setEditClient] = React.useState<boolean>(false);

  const [createQuotation, setCreateQuotation] = React.useState<boolean>(false);
  const [editQuotation, setEditQuotation] = React.useState<boolean>(false);

  const value: StoreModels.IAppContext = {
    AuthHook,
    UsersHook,
    ProductsHook,
    ClientsHook,
    QuotationsHook,
    query,
    setQuery,
    createUser,
    setCreateUser,
    editUser,
    setEditUser,
    createProduct,
    setCreateProduct,
    editProduct,
    setEditProduct,
    selected,
    setSelected,
    createClient,
    setCreateClient,
    editClient,
    setEditClient,
    createQuotation,
    setCreateQuotation,
    editQuotation,
    setEditQuotation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const value = useContext(AppContext);
  return value;
};
