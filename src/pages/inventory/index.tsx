import React from "react";
import { Breadcrumb, Panel } from "rsuite";

export default function Page() {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Inventory</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Inventory</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    ></Panel>
  );
}
