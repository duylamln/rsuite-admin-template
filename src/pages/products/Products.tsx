import React from "react";
import { Table, DOMHelper, Pagination } from "rsuite";
import ProductsToolbar from "./ProductsToolbar";
import useProductStore from "@/store/useProductStore";
import ProductActions from "./ProductActions";

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

export default function Products() {
  const pagedProducts = useProductStore(state => state.pagedProducts);
  const isLoading = useProductStore(state => state.isLoading);
  const goToPage = useProductStore(state => state.goToPage);
  return (
    <>
      <ProductsToolbar></ProductsToolbar>
      <Table
        height={Math.max(getHeight(window) - 300, 400)}
        data={pagedProducts.items}
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
          <HeaderCell>Description</HeaderCell>
          <Cell dataKey="description" />
        </Column>
        <Column width={300}>
          <HeaderCell>Price</HeaderCell>
          <Cell dataKey="price" />
        </Column>
        <Column width={300}>
          <HeaderCell>Stock</HeaderCell>
          <Cell dataKey="stock" />
        </Column>
        <Column width={200}>
          <HeaderCell align="center">Actions</HeaderCell>
          <ProductActions dataKey="id"></ProductActions>
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
          total={pagedProducts.total}
          //limitOptions={[10, 30, 50]}
          limit={pagedProducts.pageSize}
          activePage={pagedProducts.page}
          onChangePage={goToPage}
          //onChangeLimit={handleChangeLimit}
        />
      </div>
    </>
  );
}
