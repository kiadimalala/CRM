import { BasicModels, StoreModels } from "@app/models";
import { ClientsService } from "@app/services";
import { useEffect, useState } from "react";

export const useClient = () => {
  const [clients, setClients] = useState<BasicModels.IClient[]>([]);
  const [clientSaved, setClientSaved] = useState<boolean>(false);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const [editclient, setEditClient] = useState<boolean>(false);
  const [clientUpdated, setClientUpdated] = useState<boolean>(false);

  useEffect(() => {
    const getClients = () => {
      ClientsService.getAllClients().then((res) => {
        if (res.success) {
          const tempClients: BasicModels.IClient[] = [];
          res.map((item: any) => {
            const tempClient = { id: item._id, ...item };
            tempClients.push(tempClient);
          });
          setClients(tempClients);
        }
      });
    };
    if (clients.length === 0) {
      getClients();
    }
  }, [clients]);

  return {
    clients,
    setClients,
    alreadyExist,
    setAlreadyExist,
    editclient,
    setEditClient,
    clientUpdated,
    setClientUpdated,
    clientSaved,
    setClientSaved,
  } as StoreModels.IClientsHook;
};
