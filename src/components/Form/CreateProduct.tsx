import { COLORS } from "@app/constants";
import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Input } from "@app/components";
import { AuthService, ProductsService, UsersService } from "@app/services";
import { useAppContext } from "@app/store";
import { AuthModels, BasicModels } from "@app/models";

const CreateProduct = () => {
  const {
    createProduct,
    setCreateProduct,
    editProduct,
    setEditProduct,
    selected,
    setSelected,
    AuthHook: { user },
    ProductsHook: {
      products,
      setProducts,
      setProductSaved,
      setProductUpdated,
      setAlreadyExist,
    },
  } = useAppContext();
  const [type, setType] = React.useState<string>("");
  const [lRef, setLRef] = React.useState<string>("");
  const [vRef, setVRef] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [rp, setRp] = React.useState<number>(0);
  const [sp, setSp] = React.useState<number>(0);
  const [error, setError] = React.useState<boolean>(false);
  const [isAlarm, setIsAlarm] = React.useState<boolean>(false);
  const [isVideo, setIsVideo] = React.useState<boolean>(false);

  const handleSave = (e: any) => {
    e.preventDefault();
    if (createProduct) {
      ProductsService.createProduct({ lRef, vRef, name, type, rp, sp }).then(
        (res) => {
          if (res.success) {
            const product: BasicModels.IProduct = res.data;
            const tempProducts = [product, ...products];
            setProducts(tempProducts);
            setCreateProduct(false);
            setError(false);
            setProductSaved(true);
            setProductUpdated(false);
          } else {
            setError(true);
            setAlreadyExist(true);
            setLRef("");
            setVRef("");
            setRp(0);
            setSp(0);
            if (isAlarm) {
              setIsAlarm(false);
            } else if (isVideo) {
              setIsVideo(false);
            }
          }
        }
      );
    }
    if (selected && editProduct) {
      ProductsService.updateProduct(selected, {
        lRef,
        vRef,
        name,
        type,
        rp,
        sp,
      }).then((res) => {
        if (res) {
          const tempProducts = [...products];
          const { _id } = res;
          const tempProduct = {
            id: _id,
            lRef,
            vRef,
            name,
            type,
            rp,
            sp,
          };
          const item = tempProducts.find((i) => {
            if (i.id === tempProduct.id) {
              i = tempProduct;
              const x = tempProducts.findIndex((d) => d.id === i.id);
              if (x > -1) {
                tempProducts[x] = i;
                setProducts(tempProducts);
                setSelected("");
              }
            }
          });
          setEditProduct(false);
          setCreateProduct(false);
          setProductUpdated(true);
        } else {
          setError(true);
        }
      });
    }
  };

  useEffect(() => {
    if (isAlarm) {
      setType("alarme");
    } else if (isVideo) {
      setType("video");
    } else {
      setType("");
    }
  }, [isAlarm, isVideo]);

  useEffect(() => {
    if (selected && editProduct) {
      ProductsService.getProduct(selected).then((res) => {
        if (res.success) {
          const { lRef, vRef, name, type, rp, sp } = res.data;
          setName(name);
          setLRef(lRef);
          setVRef(vRef);
          setRp(rp);
          setSp(sp);
          if (type === "alarme") {
            setIsAlarm(true);
          } else if (type === "video") {
            setIsVideo(true);
          }
        }
      });
    }
  }, [selected, editProduct]);

  return (
    <Wrapper>
      <div className="header">
        <h3>Ajouter un nouveau matériel</h3>
      </div>
      <hr className="divider" />
      <form className="form">
        <div className="form_content">
          <span>
            <label htmlFor="lRef">Ref location</label>
            <Input
              onChange={(e: any) => setLRef(e.target.value)}
              value={lRef}
              type="text"
              placeholder="Ref location"
            />
          </span>
          <span>
            <label htmlFor="vRef">Ref Vente</label>
            <Input
              onChange={(e: any) => setVRef(e.target.value)}
              value={vRef}
              type="text"
              placeholder="Ref vente"
            />
          </span>
          <span className="name_el">
            <label htmlFor="name">Désignation</label>
            <Input
              onChange={(e: any) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Désignation"
            />
          </span>
          <span>
            <label htmlFor="rp">P.U Location</label>
            <Input
              onChange={(e: any) => setRp(e.target.value)}
              value={rp}
              type="number"
              placeholder="Prix de location"
            />
          </span>
          <span>
            <label htmlFor="sp">P.U vente</label>
            <Input
              value={sp}
              type="number"
              placeholder="Prix de vente"
              onChange={(e: any) => setSp(e.target.value)}
            />
          </span>
        </div>
        <div className="chk_type">
          <h4 className="chk_title">Type de matériel</h4>
          <hr className="divider" />
          <div>
            <span className="chk_admin">
              <Checkbox
                checked={isAlarm}
                onChange={(e: any) => setIsAlarm(!isAlarm)}
                disabled={!isAlarm && isVideo ? true : false}
              />
              <label htmlFor="checkbox">Alarme</label>
            </span>
            <span className="chk_admin">
              <Checkbox
                checked={isVideo}
                onChange={(e: any) => setIsVideo(!isVideo)}
                disabled={!isVideo && isAlarm ? true : false}
              />
              <label htmlFor="checkbox">Video</label>
            </span>
          </div>
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

export default CreateProduct;
