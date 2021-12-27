import { COLORS } from "@app/constants";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Input } from "@app/components";
import { ClientsService } from "@app/services";
import { useAppContext } from "@app/store";
import { BasicModels } from "@app/models";

const CreateClient = () => {
  const {
    createClient,
    setCreateClient,
    editClient,
    setEditClient,
    selected,
    setSelected,
    ClientsHook: {
      clients,
      setClients,
      setClientSaved,
      setClientUpdated,
      setAlreadyExist,
    },
  } = useAppContext();
  const [code, setCode] = React.useState<string>("");
  const [contact, setContact] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [interlocuteur, setInterlocuteur] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [stat, setStat] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [nif, setNif] = React.useState<string>("");
  const [rcs, setRcs] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const handleSave = (e: any) => {
    e.preventDefault();
    if (createClient) {
      ClientsService.createClient({
        code,
        name,
        contact,
        email,
        interlocuteur,
        address,
        stat,
        nif,
        rcs,
      }).then((res) => {
        if (res.success) {
          const client: BasicModels.IClient = res.data;
          const tempClients = [client, ...clients];
          setClients(tempClients);
          setCreateClient(false);
          setError(false);
          setClientSaved(true);
          setClientUpdated(false);
        } else {
          setError(true);
          setAlreadyExist(true);
          setCode("");
          setContact("");
          setStat("");
          setName("");
          setNif("");
          setRcs("");
        }
      });
    }
    if (selected && editClient) {
      ClientsService.updateClient(selected, {
        code,
        name,
        contact,
        email,
        interlocuteur,
        address,
        stat,
        nif,
        rcs,
      }).then((res) => {
        if (res) {
          const tempClients = [...clients];
          const { _id } = res;
          const tempClient = {
            id: _id,
            code,
            name,
            contact,
            email,
            interlocuteur,
            address,
            stat,
            nif,
            rcs,
          };
          const item = tempClients.find((i) => {
            if (i.id === tempClient.id) {
              i = tempClient;
              const x = tempClients.findIndex((d) => d.id === i.id);
              if (x > -1) {
                tempClients[x] = i;
                setClients(tempClients);
                setSelected("");
              }
            }
          });
          setEditClient(false);
          setCreateClient(false);
          setClientUpdated(true);
        } else {
          setError(true);
        }
      });
    }
  };

  useEffect(() => {
    if (selected && editClient) {
      ClientsService.getClient(selected).then((res) => {
        if (res.success) {
          const {
            code,
            name,
            contact,
            email,
            address,
            interlocuteur,
            stat,
            nif,
            rcs,
          } = res.data;
          setCode(code);
          setContact(contact);
          setAddress(address);
          setEmail(email);
          setInterlocuteur(interlocuteur);
          setStat(stat);
          setName(name);
          setNif(nif);
          setRcs(rcs);
        }
      });
    }
  }, [selected, editClient]);

  useEffect(() => {
    if (name && !editClient) {
      const prefix = "CP";
      const initial = name.charAt(0).toLocaleUpperCase();
      const tempCode = prefix + initial;
      const codeArray = clients.filter((item) => item.code.includes(tempCode));
      const cd = codeArray.length + 1;
      setCode(cd.toString());
    }
  }, [name, editClient]);
  return (
    <Wrapper>
      <div className="header">
        <h3>Ajouter un nouveau client</h3>
      </div>
      <hr className="divider" />
      <form className="form">
        <div className="form_content">
          <span>
            <label htmlFor="name">Name</label>
            <Input
              onChange={(e: any) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Nom du client"
            />
          </span>
          <span>
            <label htmlFor="contact">Contact</label>
            <Input
              onChange={(e: any) => setContact(e.target.value)}
              value={contact}
              type="text"
              placeholder="Contact"
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
          <span>
            <label htmlFor="address">Addresse</label>
            <Input
              onChange={(e: any) => setAddress(e.target.value)}
              value={address}
              type="text"
              placeholder="Addresse"
            />
          </span>
          <span>
            <label htmlFor="interlocuteur">Interlocuteur</label>
            <Input
              onChange={(e: any) => setInterlocuteur(e.target.value)}
              value={interlocuteur}
              type="text"
              placeholder="Interlocuteur"
            />
          </span>
          <span>
            <label htmlFor="stat">Numéro statistique</label>
            <Input
              onChange={(e: any) => setStat(e.target.value)}
              value={stat}
              type="text"
              placeholder="Numéro statistique"
            />
          </span>
          <span>
            <label htmlFor="nif">N.I.F</label>
            <Input
              onChange={(e: any) => setNif(e.target.value)}
              value={nif}
              type="number"
              placeholder="NIF"
            />
          </span>
          <span>
            <label htmlFor="rcs">RCS</label>
            <Input
              value={rcs}
              type="number"
              placeholder="RCS"
              onChange={(e: any) => setRcs(e.target.value)}
            />
          </span>
        </div>
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
      .name_el {
        flex-grow: 1;
        width: 100%;
      }
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
    .chk_type {
      width: 100%;
      display: flex;
      flex-direction: column;
      h4 {
        margin: 0;
      }
      div {
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
  .divider {
    width: 100%;
    border: 0.5px solid ${COLORS.Blue50};
  }
`;

export default CreateClient;
