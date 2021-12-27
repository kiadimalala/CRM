import React from "react";

import { Wrapper } from "@app/pages";
import {
  CreateProduct,
  Header,
  Lists,
  Modal,
  Notification,
} from "@app/components";
import { useAppContext } from "@app/store";
import { ProductsService } from "@app/services";

interface ProductsProps {
  className?: string;
}

const Products: React.FC<ProductsProps> = () => {
  const {
    createProduct,
    editProduct,
    setCreateProduct,
    setEditProduct,
    selected,
    setSelected,
    ProductsHook: {
      products,
      setProducts,
      productSaved,
      alreadyExist,
      setProductSaved,
      setAlreadyExist,
      productUpdated,
      setProductUpdated,
    },
  } = useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const handleOpen = (e: any) => {
    e.preventDefault();
    setCreateProduct(true);
  };

  const handleClose = (e: any) => {
    if (createProduct) {
      setCreateProduct(false);
    }
    if (editProduct) {
      setEditProduct(false);
      setSelected("");
    }
  };

  const handleDeleteProduct = (e: any) => {
    e.preventDefault();
    ProductsService.deleteProduct(selected).then((res) => {
      if (res.success) {
        const tempProducts = products.filter(
          (product) => product.id !== selected
        );
        setProducts(tempProducts);
        setSelected("");
      } else {
        console.log("error");
      }
    });
  };

  const handleEditProduct = (e: any) => {
    e.preventDefault();
    setEditProduct(true);
  };

  const handleCloseNotif = () => {
    if (productSaved) {
      setProductSaved(false);
    }
    if (alreadyExist) {
      setAlreadyExist(false);
    }
    if (productUpdated) {
      setProductUpdated(false);
    }
  };

  const head: string[] = [
    "ref loc",
    "ref vte",
    "type",
    "désignation",
    "P.U loc",
    "P.U vte",
  ];

  React.useEffect(() => {
    if (productSaved || productUpdated || alreadyExist) setOpen(true);
    else setOpen(false);
  }, [productSaved, productUpdated, alreadyExist]);
  React.useEffect(() => {
    if (productSaved) setMessage("Matériel enregistrer");
    if (alreadyExist) setMessage("Ajout non autorisé");
    if (productUpdated) setMessage("Information mise à jour");
  }, [alreadyExist, productSaved, productUpdated]);
  return (
    <Wrapper className="wrapper">
      <Header
        title="Matériels"
        onClick={handleOpen}
        btnName="nouveau matériel"
      />
      <Lists
        handleDelete={handleDeleteProduct}
        handleEdit={handleEditProduct}
        type="user"
        content={products}
        header={head}
        queryPath="/products"
      />
      <Modal
        open={createProduct ? createProduct : editProduct}
        onClose={handleClose}
      >
        <CreateProduct />
      </Modal>
      <Notification
        open={productSaved ? productSaved : productUpdated}
        message={message}
        onClose={handleCloseNotif}
        severity={`${
          productSaved ? "success" : alreadyExist ? "error" : "success"
        }`}
      />
    </Wrapper>
  );
};

export default Products;
