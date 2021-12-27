import React from "react";

import { Wrapper } from "@app/pages";
import {
  Header,
  Lists,
  Modal,
  Notification,
  CreateClient,
} from "@app/components";
import { useAppContext } from "@app/store";
import { ClientsService } from "@app/services";

interface ClientsProps {
  className?: string;
}

const Clients: React.FC<ClientsProps> = () => {
  const {
    createClient,
    editClient,
    setCreateClient,
    setEditClient,
    selected,
    setSelected,
    ClientsHook: {
      clients,
      setClients,
      clientSaved,
      alreadyExist,
      setClientSaved,
      setAlreadyExist,
      clientUpdated,
      setClientUpdated,
    },
  } = useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const handleOpen = (e: any) => {
    e.preventDefault();
    setCreateClient(true);
  };

  const handleClose = (e: any) => {
    if (createClient) {
      setCreateClient(false);
    }
    if (editClient) {
      setEditClient(false);
      setSelected("");
    }
  };

  const handleDeleteClient = (e: any) => {
    e.preventDefault();
    ClientsService.deleteClient(selected).then((res) => {
      if (res.success) {
        const tempClients = clients.filter((client) => client.id !== selected);
        setClients(tempClients);
        setSelected("");
      } else {
        console.log("error");
      }
    });
  };

  const handleEditClient = (e: any) => {
    e.preventDefault();
    setEditClient(true);
  };

  const handleCloseNotif = () => {
    if (clientSaved) {
      setClientSaved(false);
    }
    if (alreadyExist) {
      setAlreadyExist(false);
    }
    if (clientUpdated) {
      setClientUpdated(false);
    }
  };

  const head: string[] = [
    "code client",
    "Nom",
    "contact",
    "email",
    "interlocuteur",
    "adresse",
  ];

  React.useEffect(() => {
    if (clientSaved || clientUpdated || alreadyExist) setOpen(true);
    else setOpen(false);
  }, [clientSaved, clientUpdated, alreadyExist]);
  React.useEffect(() => {
    if (clientSaved) setMessage("Matériel enregistrer");
    if (alreadyExist) setMessage("Ajout non autorisé");
    if (clientUpdated) setMessage("Information mise à jour");
  }, [alreadyExist, clientSaved, clientUpdated]);
  return (
    <Wrapper className="wrapper">
      <Header title="Client" onClick={handleOpen} btnName="nouveau client" />
      <Lists
        handleDelete={handleDeleteClient}
        handleEdit={handleEditClient}
        type="user"
        content={clients}
        header={head}
        queryPath="/clients"
      />
      <Modal
        open={createClient ? createClient : editClient}
        onClose={handleClose}
      >
        <CreateClient />
      </Modal>
      <Notification
        open={clientSaved ? clientSaved : clientUpdated}
        message={message}
        onClose={handleCloseNotif}
        severity={`${
          clientSaved ? "success" : alreadyExist ? "error" : "success"
        }`}
      />
    </Wrapper>
  );
};

export default Clients;
