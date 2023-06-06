import React, { useEffect } from "react";
import { Breadcrumb, Panel } from "rsuite";
import Products from "./Products";
import useProductStore from "@/store/useProductStore";
import ProductEdit from "./ProductEdit";

const Page = () => {
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const productsLoaded = useProductStore(state => state.isLoaded);

  useEffect(() => {
    if (!productsLoaded) fetchProducts();
  }, [productsLoaded, fetchProducts]);

  return (
    <Panel
      header={
        <>
          <h3 className="title">Products</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Products</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <Products />
      <ProductEdit />
    </Panel>
  );
};

export default Page;
