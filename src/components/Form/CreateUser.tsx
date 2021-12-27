import { COLORS } from "@app/constants";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Input } from "@app/components";
import { AuthService, UsersService } from "@app/services";
import { useAppContext } from "@app/store";
import { AuthModels } from "@app/models";

const CreateUser = () => {
  const {
    createUser,
    setCreateUser,
    editUser,
    setEditUser,
    selected,
    setSelected,
    UsersHook: {
      users,
      setUsers,
      setUserSaved,
      setAlreadyExist,
      setUserUpdated,
    },
    AuthHook: { user },
  } = useAppContext();
  const [admin, setAdmin] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("ccl");
  const [phone, setPhone] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const handleSave = (e: any) => {
    e.preventDefault();
    if (createUser) {
      UsersService.createUser({
        name,
        lastname,
        email,
        password,
        role,
        phone,
      }).then((res) => {
        if (res.success) {
          const user: AuthModels.IUser = res.data;
          const tempUsers = [user, ...users];
          setUsers(tempUsers);
          setCreateUser(false);
          setError(false);
          setUserSaved(true);
        } else {
          setError(true);
          setAdmin(false);
          setAlreadyExist(true);
          setName("");
          setEmail("");
          setLastname("");
          setPhone("");
        }
      });
    }
    if (selected && editUser) {
      UsersService.updateUser(selected, {
        name,
        lastname,
        email,
        phone,
        role,
      }).then((res) => {
        if (res) {
          const tempUsers = [...users];
          const { _id } = res;
          const tempUser = {
            id: _id,
            name,
            lastname,
            email,
            phone,
            role,
          };
          const item = tempUsers.find((i) => {
            if (i.id === tempUser.id) {
              i = tempUser;
              const x = tempUsers.findIndex((d) => d.id === i.id);
              if (x > -1) {
                tempUsers[x] = i;
                setUsers(tempUsers);
                setSelected("");
              }
            }
          });
          setEditUser(false);
          setUserUpdated(true);
        } else {
          setError(true);
        }
      });
    }
  };

  useEffect(() => {
    if (admin) {
      setRole("adm");
    } else {
      setRole("ccl");
    }
  }, [admin]);

  useEffect(() => {
    if (selected && editUser) {
      UsersService.getUser(selected).then((res) => {
        if (res.success) {
          const { name, lastname, phone, email, role } = res.data;
          setName(name);
          setLastname(lastname);
          setEmail(email);
          setPhone(phone);
          if (role === "adm") {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        }
      });
    }
  }, [selected, editUser]);

  return (
    <Wrapper>
      <div className="header">
        <h3>Ajouter un nouvel utilisateur</h3>
      </div>
      <hr className="divider" />
      <form className="form">
        <div className="form_content">
          <span>
            <label htmlFor="name">Nom</label>
            <Input
              onChange={(e: any) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Nom"
            />
          </span>
          <span>
            <label htmlFor="lastname">Prénom</label>
            <Input
              onChange={(e: any) => setLastname(e.target.value)}
              value={lastname}
              type="text"
              placeholder="Prénom"
            />
          </span>
          <span>
            <label htmlFor="email">Mobile</label>
            <Input
              onChange={(e: any) => setPhone(e.target.value)}
              value={phone}
              type="text"
              placeholder="Téléphone"
              maxLength={10}
            />
          </span>
          <span>
            <label htmlFor="email">Email</label>
            <Input
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
            />
          </span>
          {createUser && (
            <span>
              <label htmlFor="password">Mot de passe</label>
              <Input
                value={password}
                type="password"
                placeholder="Mot de passe"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </span>
          )}
        </div>
        {selected !== user?._id && (
          <span className="chk_admin">
            <Checkbox checked={admin} onChange={(e: any) => setAdmin(!admin)} />
            <label htmlFor="checkbox">Administrateur</label>
          </span>
        )}
        <Button
          className="btn_save_user"
          label="Enregister"
          onClick={handleSave}
        />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${COLORS.davysGrey};
  .header {
    width: 100%;
    height: 10%;
  }
  .form {
    width: 100%;
    height: 90%;
    color: ${COLORS.davysGrey};
    .form_content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      span {
        flex-grow: 1;
        width: 40%;
        margin: 0 0.5rem 1rem;
        justify-content: space-between;
        label {
          font-size: small;
          font-weight: 500;
        }
        input {
          width: 100%;
          height: 2rem;
          border: 1px solid ${COLORS.Blue50};
        }
        input:focus {
          outline: none;
        }
      }
    }
    .chk_admin {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.5rem 0;
    }
  }
  .divider {
    width: 100%;
    border: 0.5px solid ${COLORS.Blue50};
  }
`;

export default CreateUser;
