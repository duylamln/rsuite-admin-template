import React from "react";
import { Button, Input, InputGroup, Stack } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

import useProductStore from "@/store/useProductStore";
import { createEmptyProduct } from "@/services/productService";

export default function ProductsToolbar() {
  const setSelectedProduct = useProductStore(state => state.setSelectedProduct);
  const setKeyword = useProductStore(state => state.setKeyword);
  const handleAdd = () => {
    setSelectedProduct(createEmptyProduct());
  };

  const handleKeywordChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if ((e.target as HTMLInputElement).value) {
        setKeyword((e.target as HTMLInputElement).value);
      }
    }
  };

  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Button appearance="primary" onClick={handleAdd}>
          Add Product
        </Button>
        <Stack spacing={6}>
          <InputGroup inside>
            <Input placeholder="Search" onKeyDown={handleKeywordChange} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>
    </>
  );
}
