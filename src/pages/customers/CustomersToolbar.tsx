import React from "react";
import { Button, Input, InputGroup, Stack } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { createEmptyCustomer } from "@/services/customerService";
import useCustomerStore from "@/store/useCustomerStore";

// const ratingList = Array.from({ length: 5 }).map((_, index) => {
//   return {
//     value: index + 1,
//     label: Array.from({ length: index + 1 })
//       .map(() => "⭐️")
//       .join(""),
//   };
// });

export default function CustomersToolbar() {
  //const [rating, setRating] = useState<number | null>(null);
  const setSelectedCustomer = useCustomerStore(
    state => state.setSelectedCustomer,
  );
  const setKeyword = useCustomerStore(state => state.setKeyword);
  const handleAddCustomer = () => {
    setSelectedCustomer(createEmptyCustomer());
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
        <Button appearance="primary" onClick={handleAddCustomer}>
          Add Customer
        </Button>

        <Stack spacing={6}>
          {/* <SelectPicker
            label="Rating"
            data={ratingList}
            searchable={false}
            value={rating}
            onChange={setRating}
          /> */}
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
