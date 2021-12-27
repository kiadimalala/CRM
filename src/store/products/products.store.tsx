import { BasicModels, StoreModels } from "@app/models";
import { ProductsService } from "@app/services";
import { useEffect, useState } from "react";

export const useProduct = () => {
  const [products, setProducts] = useState<BasicModels.IProduct[]>([]);
  const [productSaved, setProductSaved] = useState<boolean>(false);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<boolean>(false);
  const [productUpdated, setProductUpdated] = useState<boolean>(false);
  
  useEffect(() => {
    const getProducts = () => {
      ProductsService.getAllProducts().then((res) => {
        if (res) {
          if(res.success){
            const tempProducts: BasicModels.IProduct[] = [];
            res.map((item: any) => {
              const tempProduct = { id: item._id, ...item };
              tempProducts.push(tempProduct);
            });
            setProducts(tempProducts);
          }else{
            setProducts([])
          }
        }
      });
    };
    if (products.length === 0) {
      getProducts();
    }
  }, [products]);

  return {
    products,
    setProducts,
    productSaved,
    setProductSaved,
    setAlreadyExist,
    editProduct,
    setEditProduct,
    productUpdated,
    setProductUpdated,
  } as StoreModels.IProductsHook;
};

//mila asina props seleted lists > item
