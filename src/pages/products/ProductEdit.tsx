import TextField from "@/components/Form/TextField";
import Textarea from "@/components/Textarea";
import { Product } from "@/entities/Entity";
import useProductStore from "@/store/useProductStore";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Drawer,
  Button,
  Form,
  Stack,
  Schema,
  FormInstance,
  Message,
} from "rsuite";

const modelSchema = Schema.Model<Product>({
  id: Schema.Types.StringType(),
  name: Schema.Types.StringType().isRequired("Product name is required"),
  description: Schema.Types.StringType(),
  brand: Schema.Types.StringType(),
  category: Schema.Types.StringType(),
  price: Schema.Types.NumberType(),
  rating: Schema.Types.NumberType(),
  stock: Schema.Types.NumberType(),
  thumbnail: Schema.Types.StringType(),
  images: Schema.Types.ArrayType(),
});

export default function ProductEdit() {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const formRef = useRef() as React.Ref<FormInstance>;
  const selectedProduct = useProductStore(state => state.selectedProduct);
  const setSelectedProduct = useProductStore(state => state.setSelectedProduct);

  const [formData, setFormData] = useState<Product | Record<string, any>>();
  const [formDefaultValue, setFormDefaultValue] = useState<
    Product | Record<string, any>
  >();

  const [error, setError] = useState<string>("");
  const createOrUpdateProduct = useProductStore(
    state => state.createOrUpdateProduct,
  );

  const handleSubmit = async (
    isValid: boolean,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSaving(true);

    try {
      await createOrUpdateProduct(formData as Product);
      setOpen(false);
    } catch (error) {
      setError((error as Error).message);
    }
    setIsSaving(false);
  };

  const onClose = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  useEffect(() => {
    if (selectedProduct) {
      setOpen(true);
      setFormDefaultValue({ ...selectedProduct });
    } else {
      setOpen(false);
    }
  }, [selectedProduct]);

  return (
    <Drawer backdrop="static" size="sm" placement="right" open={open}>
      <Drawer.Header>
        <Drawer.Title>
          {selectedProduct?.id
            ? `Edit product [${selectedProduct?.id}]`
            : "Add a new product"}
        </Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <Form
          fluid
          model={modelSchema}
          onSubmit={handleSubmit}
          ref={formRef}
          formDefaultValue={formDefaultValue}
          onChange={setFormData}
        >
          <TextField name="name" label="Product name"></TextField>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ marginBottom: "24px" }}
          >
            <TextField name="category" label="Category"></TextField>
            <TextField name="brand" label="Brand"></TextField>
          </Stack>

          <TextField
            name="description"
            label="Description"
            accepter={Textarea}
            rows={3}
          ></TextField>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ marginBottom: "24px" }}
          >
            <TextField name="price" label="Price"></TextField>
            <TextField name="stock" label="Stock"></TextField>
          </Stack>
          <TextField
            name="thumbnail"
            label="Thumbnal"
            subLabel="This is a link starts with: 'http://'"
          ></TextField>
          <Form.Group>
            {error && <Message type="error">{error}</Message>}
          </Form.Group>
          <Stack spacing={5}>
            <Button appearance="primary" type="submit" loading={isSaving}>
              Save
            </Button>
            <Button onClick={onClose} appearance="subtle">
              Cancel
            </Button>
          </Stack>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
}
