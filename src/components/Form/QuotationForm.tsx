import { BasicModels } from "@app/models";
import { useAppContext } from "@app/store";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import styled from "styled-components";

import { Button, Input } from "@app/components";
import { COLORS } from "@app/constants";

const QuotationForm = () => {
  const {
    ClientsHook: { clients },
    AuthHook: { user },
    ProductsHook: { products, setProducts },
  } = useAppContext();

  const [tempProducts, setTempProducts] = React.useState<
    BasicModels.IProduct[] | null
  >(null);

  const [query, setQuery] = React.useState("");

  const [productType, setProductType] = React.useState<string>("");
  const [quotationType, setQuotationType] = React.useState<string>("");

  const [queryResult, setQueryResult] = React.useState<
    BasicModels.IClient[] | null
  >(null);

  const [client, setClient] = React.useState<BasicModels.IClient | null>(null);
  const [clientId, setClientId] = React.useState<string>("");
  const [selectedProduct, setSelectedProduct] =
    React.useState<BasicModels.IProduct | null>(null);

  const [selectedProducts, setSelectedProducts] = React.useState<
    BasicModels.IProduct[] | null
  >(null);

  const handleSelectClient = (e: any, client: BasicModels.IClient) => {
    e.preventDefault();
    setClient(client);
    setQuery("");
    setQueryResult(null);
  };

  const handleAddProduct = (e: any) => {
    if (selectedProduct) {
      console.log(selectedProduct);
    }
  };

  React.useEffect(() => {
    if (products) {
      setTempProducts(products);
    }
  }, [products]);

  React.useEffect(() => {
    if (query) {
      const results = clients.filter((client) =>
        client.name.toLowerCase().includes(query)
      );
      if (results.length > 0) {
        setQueryResult(results);
      } else {
        setQueryResult(null);
      }
    } else {
      setQueryResult(null);
    }
  }, [query, clients]);

  React.useEffect(() => {
    if (client) {
      setClientId(client.id!);
    } else {
      setClientId("");
    }
  }, [client]);

  React.useEffect(() => {
    if (tempProducts && productType === "alarm") {
      const temp = tempProducts.filter((product) => product.type === "alarme");
      setTempProducts(temp);
    } else if (tempProducts && productType === "video") {
      const temp = tempProducts.filter((product) => product.type === "video");
      if (temp.length > 0) {
        setTempProducts(temp);
      } else {
        setTempProducts(null);
      }
    } else {
      setTempProducts(products);
    }
  }, [productType, tempProducts]);

  // React.useEffect(() => {
  //   if (tempProducts && productType === "video") {
  //     const temp = tempProducts.filter((product) => {if(product.type === "video"){

  //     }});
  //     setTempProducts(temp);
  //   } else {
  //     setTempProducts(products);
  //   }
  // }, [productType, tempProducts]);

  return (
    <Wrapper>
      <div className="client_form">
        {!client && (
          <span>
            <label htmlFor="client">Client</label>
            <Input
              value={query}
              type="text"
              placeholder="Taper le nom d'un client"
              onChange={(e: any) => setQuery(e.target.value)}
              className="input_wrapper query_input"
            />
          </span>
        )}

        {query && (
          <div className={`result ${query ? "show" : ""}`}>
            <div>
              {queryResult &&
                queryResult.map((client) => (
                  <span
                    key={client.id}
                    onClick={(e: any) => handleSelectClient(e, client)}
                  >
                    {client.name}
                  </span>
                ))}
              {!queryResult && (
                <span style={{ color: COLORS.fleryRose }}>Aucun resultat</span>
              )}
            </div>
          </div>
        )}

        {client && (
          <div className="client_info">
            <span>Client</span>
            <Divider />
            <span className="info">
              <span>Nom : {client.name}</span>
              <span>Contact : {client.contact}</span>
              <span>Adresse : {client.address.toUpperCase()}</span>
            </span>
          </div>
        )}
      </div>
      <div className="types">
        <div>
          <label htmlFor="product_type">Type de Matériel</label>
          <select
            name="types"
            id="product_type"
            onChange={(e: any) => setProductType(e.target.value)}
          >
            <option value=""> Selectionner un référence.. </option>
            <option value="alarm"> Alarme</option>
            <option value="video"> Video </option>
          </select>
        </div>
        <div>
          <label htmlFor="quotation_type">Type de devis</label>
          <select
            name="types"
            id="quotation_type"
            disabled={!productType ? true : false}
            onChange={(e: any) => setQuotationType(e.target.value)}
          >
            <option value=""> Selectionner un référence.. </option>
            <option value="location">
              Location {productType === "alarm" ? "Alarme" : productType}
            </option>
            <option value="vente">
              Vente {productType === "alarm" ? "Alarme" : productType}
            </option>
          </select>
        </div>
      </div>
      <div className="product_form">
        <label htmlFor="product_select">Matériels</label>
        <select
          className="select_product"
          name="products"
          id="product_select"
          onChange={(e: any) => setSelectedProduct(e.target.value)}
        >
          <option value="">Selectionner un matériel...</option>
          {tempProducts &&
            tempProducts.map((product, index) => (
              <option key={index} value={JSON.stringify(product)}>
                {product.name}
              </option>
            ))}
        </select>

        <Button
          label="Ajouter"
          className="add_product_btn"
          onClick={handleAddProduct}
        />
      </div>
      <div className="products_lists">3</div>
      <div className="total">4</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${COLORS.davysGrey};
  .client_form,
  .product_form,
  .total {
    position: relative;
  }
  .products_lists {
  }
  .client_form,
  .product_form {
    span {
      display: flex;
      flex-direction: column;
    }
    .result {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 20px;
      width: 100%;
      border: 1px solid ${COLORS.cyan};
      border-radius: 5px;
      background-color: ${COLORS.white};
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 0px 0 rgba(0, 0, 0, 0.06);
      -webkit-box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1),
        0 1px 0px 0 rgba(180, 176, 176, 0.06);
      -moz-box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1),
        0 1px 0px 0 rgba(0, 0, 0, 0.06);
      transition: all 1s ease-in-out;
      z-index: 1600;
      div {
        margin: 0.5rem;
        span {
          display: flex;
          justify-content: center;
          width: 100%;
          cursor: pointer;
          height: 2rem;
          transition: all 0.5s ease-in-out;
        }
        span:hover {
          background-color: ${COLORS.Blue50};
        }
      }
    }
  }
  .client_info {
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;
    .info {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-evenly;
      align-items: center;
      margin: 0.5rem 0;
      span {
        width: 100%;
      }
    }
  }
  .product_form {
    display: flex;
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;

    .select_product {
      width: 100%;
      height: 30px;
      margin: 0.5rem 0;
    }
  }
  .types {
    width: 100%;
    padding: 0.5rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    div {
      #quotation_type,
      #product_type {
        width: 100%;
        height: 30px;
        margin: 0.5rem 0;
      }
    }
  }
`;

export default QuotationForm;
