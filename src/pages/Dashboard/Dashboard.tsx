import { AuthService } from "@app/services";
import React from "react";
import { Wrapper } from "@app/pages";
import {
  Header,
  Lists,
  Modal,
  Notification,
  QuotationForm,
} from "@app/components";
import { useAppContext } from "@app/store";

const Dashboard = () => {
  const {
    createQuotation,
    setCreateQuotation,
    selected,
    setSelected,
    editQuotation,
    setEditQuotation,
    QuotationsHook: {
      quotations,
      setQuotations,
      quotationSaved,
      setQuotationSaved,
      alreadyExist,
      setAlreadyExist,
      quotationUpdated,
      setQuotationUpdated,
    },
  } = useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const head: string[] = [""];

  const handleOpen = (e: any) => {
    e.preventDefault();
    setCreateQuotation(true);
  };

  const handleDeleteProduct = (e: any) => {};

  const hanldeEditProduct = (e: any) => {};

  const handleClose = (e: any) => {
    if (createQuotation) {
      setCreateQuotation(false);
    }
    if (editQuotation) {
      setEditQuotation(false);
      setSelected("");
    }
  };

  const handleCloseNotif = () => {
    if (quotationSaved) {
      setQuotationSaved(false);
    }
    if (alreadyExist) {
      setAlreadyExist(false);
    }
    if (quotationUpdated) {
      setQuotationUpdated(false);
    }
  };

  React.useEffect(() => {
    if (quotationSaved || quotationUpdated || alreadyExist) setOpen(true);
    else setOpen(false);
  }, [quotationSaved, quotationUpdated, alreadyExist]);
  React.useEffect(() => {
    if (quotationSaved) setMessage("Devis enregistrer");
    if (alreadyExist) setMessage("Ajout non autorisé");
    if (quotationUpdated) setMessage("Information mise à jour");
  }, [alreadyExist, quotationSaved, quotationUpdated]);

  return (
    <Wrapper className="wrapper">
      <Header onClick={handleOpen} title="Devis" btnName="éditer un devis" />
      <Lists
        header={head}
        type="user"
        queryPath="/quotations"
        content={quotations}
        handleDelete={handleDeleteProduct}
        handleEdit={hanldeEditProduct}
      />
      <Modal
        open={createQuotation ? createQuotation : editQuotation}
        onClose={handleClose}
        className="lg_modal"
      >
        <QuotationForm />
      </Modal>
      <Notification
        open={quotationSaved ? quotationSaved : quotationUpdated}
        message={message}
        onClose={handleCloseNotif}
        severity={`${
          quotationSaved ? "success" : alreadyExist ? "error" : "success"
        }`}
      />
    </Wrapper>
  );
};

export default Dashboard;
