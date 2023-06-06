import React, { useState } from "react";
import { CellProps, IconButton, Stack, Table } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import useProductStore from "@/store/useProductStore";
import createConfirmation from "@/utils/confirmationDialog";
import { Product } from "@/entities/Entity";

const { Cell } = Table;

export default function CustomerActions({
  rowData,
  ...props
}: CellProps<Product>) {
  const deleteProduct = useProductStore(state => state.deleteProduct);
  const setSelectedProduct = useProductStore(state => state.setSelectedProduct);

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const ok = await createConfirmation(
        `Are you sure you want to delete this product name [${rowData?.name}]?`,
      );
      if (ok) {
        deleteProduct(rowData?.id as string);
      }
    } catch (error) {}

    setIsDeleting(false);
  };

  const handleEdit = async () => {
    setSelectedProduct(rowData as Product);
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
