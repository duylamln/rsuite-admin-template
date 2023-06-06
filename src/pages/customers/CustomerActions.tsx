import React, { useState } from "react";
import { CellProps, IconButton, Stack, Table } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import useCustomerStore from "@/store/useCustomerStore";
import createConfirmation from "@/utils/confirmationDialog";
import { Customer } from "@/entities/Entity";
const { Cell } = Table;

export default function CustomerActions({
  rowData,
  ...props
}: CellProps<Customer>) {
  const deleteCustomer = useCustomerStore(state => state.deleteCustomer);
  const setSelectedCustomer = useCustomerStore(
    state => state.setSelectedCustomer,
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const ok = await createConfirmation(
        `Are you sure you want to delete this customer name [${rowData?.name}]?`,
      );
      if (ok) {
        deleteCustomer(rowData?.id as string);
      }
    } catch (error) {}

    setIsDeleting(false);
  };

  const handleEdit = async () => {
    setSelectedCustomer(rowData as Customer);
  };

  return (
    <>
      <Cell {...props}>
        <Stack spacing={5} justifyContent="center">
          <IconButton
            size="xs"
            appearance="primary"
            color="blue"
            icon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit
          </IconButton>
          <IconButton
            size="xs"
            appearance="primary"
            color="red"
            icon={<TrashIcon />}
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete
          </IconButton>
        </Stack>
      </Cell>
    </>
  );
}
