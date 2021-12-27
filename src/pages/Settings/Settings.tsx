import {
  Button,
  CreateUserForm,
  Header,
  Input,
  Lists,
  Modal,
  Notification,
} from "@app/components";
import React from "react";
import styled from "styled-components";
import { useAppContext } from "@app/store";
import { UsersService } from "@app/services";
interface SettingsProps {
  className?: string;
}

const Settings: React.FC<SettingsProps> = () => {
  const {
    UsersHook: {
      users,
      userSaved,
      setUserSaved,
      alreadyExist,
      setAlreadyExist,
      setUsers,
      userUpdated,
      setUserUpdated,
    },
    createUser,
    editUser,
    setEditUser,
    setCreateUser,
    selected,
    setSelected,
  } = useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const handleOpen = (e: any) => {
    e.preventDefault();
    setCreateUser(true);
  };
  const handleCloseNotif = (e: any) => {
    if (userSaved) {
      setUserSaved(false);
    }
    if (alreadyExist) {
      setAlreadyExist(false);
    }
    if (userUpdated) {
      setUserUpdated(false);
    }
  };

  const handleDeleteUser = (e: any) => {
    e.preventDefault();
    UsersService.deleteUser(selected).then((res) => {
      if (res.success) {
        const tempUsers = users.filter((user) => user.id !== selected);
        setUsers(tempUsers);
        setSelected("");
      } else {
        console.log("error");
      }
    });
  };

  const handleEditUser = (e: any) => {
    e.preventDefault();
    setEditUser(true);
  };

  const handleClose = (e: any) => {
    if (createUser) {
      setCreateUser(false);
    }
    if (editUser) {
      setEditUser(false);
      setSelected("");
    }
  };
  const head: string[] = ["nom", "prénom", "email", "téléphone", "role"];

  React.useEffect(() => {
    if (userSaved || userUpdated || alreadyExist) setOpen(true);
    else setOpen(false);
  }, [userSaved, userUpdated, alreadyExist]);
  React.useEffect(() => {
    if (userSaved) setMessage("Matériel enregistrer");
    if (alreadyExist) setMessage("Ajout non autorisé");
    if (userUpdated) setMessage("Information mise à jour");
  }, [alreadyExist, userSaved, userUpdated]);

  return (
    <PageWrapper className="wrapper">
      <Header
        title="Utilisateurs"
        onClick={handleOpen}
        btnName="Nouvel utilistateur"
      />
      <Lists
        handleDelete={handleDeleteUser}
        handleEdit={handleEditUser}
        type="user"
        content={users}
        header={head}
        queryPath="/users"
      />
      <Modal open={createUser ? createUser : editUser} onClose={handleClose}>
        <CreateUserForm />
      </Modal>
      <Notification
        open={open}
        message={message}
        onClose={handleCloseNotif}
        severity={`${
          userSaved ? "success" : alreadyExist ? "error" : "success"
        }`}
      />
    </PageWrapper>
  );
};

export const PageWrapper = styled.div`
  &.wrapper {
    width: 100%;
    height: 80%;
    margin: 5.25% 0;
    display: flex;
    flex-direction: column;
  }
`;

export default Settings;
