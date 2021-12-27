import { AuthModels, StoreModels } from "@app/models";
import { AuthService } from "@app/services";
import { useEffect, useState } from "react";
import { getFromLS } from "@app/utils";

export const useAuth = () => {
  const [user, setUser] = useState<AuthModels.IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = getFromLS("token");
    const fetchUser = async () => {
      const res = await AuthService.AuthUser();
      if (res) {
        setUser(res);
      }
    };
    if (token) {
      fetchUser();
    }
  }, []);

  return { user, loading, setLoading, setUser } as StoreModels.IAuthHook;
};
