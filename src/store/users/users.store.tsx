import { AuthModels, StoreModels } from "@app/models";
import { UsersService } from "@app/services";
import { getFromLS } from "@app/utils";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [users, setUsers] = useState<AuthModels.IUser[] | null>([]);
  const [userSaved, setUserSaved] = useState<boolean>(false);

  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const [userUpdated, setUserUpdated] = useState<boolean>(false);

  useEffect(() => {
    const token = getFromLS("token");
    const getUsers = () => {
      UsersService.getAllUsers().then((res) => {
        if (res) {
          const tempUsers: AuthModels.IUser[] = [];
          res.map((item: any) => {
            const tempUser = { id: item._id, ...item };
            tempUsers.push(tempUser);
          });
          setUsers(tempUsers);
        }
      });
    };
    if (token) {
      getUsers();
    }
  }, []);

  return {
    users,
    setUsers,
    userSaved,
    setUserSaved,
    alreadyExist,
    setAlreadyExist,
    userUpdated,
    setUserUpdated,
  } as StoreModels.IUsersHook;
};
