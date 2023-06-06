import React from "react";
import { Table, DOMHelper, Pagination } from "rsuite";
import CustomersToolbar from "./CustomersToolbar";
import useCustomerStore from "@/store/useCustomerStore";
import CustomerActions from "./CustomerActions";

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const Customers = () => {
  const pagedCustomers = useCustomerStore(state => state.pagedCustomers);
  const isLoading = useCustomerStore(state => state.isLoading);
  const goToPage = useCustomerStore(state => state.goToPage);
  return (
    <>
      <CustomersToolbar></CustomersToolbar>
      <Table
        height={Math.max(getHeight(window) - 300, 400)}
        data={pagedCustomers.items}
        loading={isLoading}
      >
        <Column width={150} fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column minWidth={160} flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={300} flexGrow={2}>
          <HeaderCell>Address</HeaderCell>
          <Cell dataKey="address" />
        </Column>
        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column width={200}>
          <HeaderCell align="center">Actions</HeaderCell>
          <CustomerActions dataKey="id"></CustomerActions>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "pager", "skip"]}
          total={pagedCustomers.total}
          //limitOptions={[10, 30, 50]}
          limit={pagedCustomers.pageSize}
          activePage={pagedCustomers.page}
          onChangePage={goToPage}
          //onChangeLimit={handleChangeLimit}
        />
      </div>
    </>
  );
};

export default Customers;
