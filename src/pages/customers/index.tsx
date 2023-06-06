import React, { useEffect } from "react";
import { Breadcrumb, Panel } from "rsuite";
import Customers from "./Customers";
import useCustomerStore from "@/store/useCustomerStore";
import CustomerEdit from "./CustomerEdit";

const Page = () => {
  const fetchCustomers = useCustomerStore(state => state.fetchCustomers);
  const customersLoaded = useCustomerStore(state => state.isLoaded);

  useEffect(() => {
    if (!customersLoaded) fetchCustomers();
  }, [customersLoaded, fetchCustomers]);

  return (
    <Panel
      header={
        <>
          <h3 className="title">Customers</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Customers</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <Customers />
      <CustomerEdit />
    </Panel>
  );
};

export default Page;
