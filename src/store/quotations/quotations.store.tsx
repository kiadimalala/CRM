import { BasicModels, StoreModels } from "@app/models";
import { useState } from "react";

export const useQuotation = () => {
  const [quotations, setQuotations] = useState<BasicModels.IQuotation[]>([]);
  const [quotationSaved, setQuotationSaved] = useState<boolean>(false);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  
  const [quotationUpdated, setQuotationUpdated] = useState<boolean>(false);

  return {
    quotations,
    setQuotations,
    quotationSaved,
    setQuotationSaved,
    alreadyExist,
    setAlreadyExist,
  
    quotationUpdated,
    setQuotationUpdated,
  } as StoreModels.IQuotationsHook;
};
