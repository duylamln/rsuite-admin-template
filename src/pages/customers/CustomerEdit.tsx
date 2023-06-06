import TextField from "@/components/Form/TextField";
import Textarea from "@/components/Textarea";
import { Customer } from "@/entities/Entity";
import useCustomerStore from "@/store/useCustomerStore";
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

const modelSchema = Schema.Model<Customer>({
  id: Schema.Types.StringType(),
  name: Schema.Types.StringType().isRequired("Customer name is required"),
  email: Schema.Types.StringType().isEmail(),
  address: Schema.Types.StringType(),
  mobile: Schema.Types.StringType(),
  note: Schema.Types.StringType(),
  avatar: Schema.Types.StringType(),
});

const CustomerEdit = () => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const formRef = useRef() as React.Ref<FormInstance>;
  const selectedCustomer = useCustomerStore(state => state.selectedCustomer);
  const setSelectedCustomer = useCustomerStore(
    state => state.setSelectedCustomer,
  );

  const [formData, setFormData] = useState<Customer | Record<string, any>>();
  const [formDefaultValue, setFormDefaultValue] = useState<
    Customer | Record<string, any>
  >();

  const [error, setError] = useState<string>("");
  const createOrUpdateCustomer = useCustomerStore(
    state => state.createOrUpdateCustomer,
  );

  const handleSubmit = async (
    isValid: boolean,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSaving(true);

    try {
      await createOrUpdateCustomer(formData as Customer);
      setOpen(false);
    } catch (error) {
      setError((error as Error).message);
    }
    setIsSaving(false);
  };

  const onClose = () => {
    setSelectedCustomer(null);
    setOpen(false);
  };

  useEffect(() => {
    if (selectedCustomer) {
      setOpen(true);
      setFormDefaultValue({ ...selectedCustomer });
    } else {
      setOpen(false);
    }
  }, [selectedCustomer]);

  return (
    <Drawer backdrop="static" size="sm" placement="right" open={open}>
      <Drawer.Header>
        <Drawer.Title>
          {selectedCustomer?.id
            ? `Edit customer [${selectedCustomer?.id}]`
            : "Add a new customer"}
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
          <TextField name="name" label="Customer name"></TextField>
          <TextField
            name="avatar"
            label="Avatar"
            subLabel="This is a link starts with: 'http://'"
          ></TextField>
          <TextField name="mobile" label="Mobile"></TextField>
          <TextField name="email" label="Email"></TextField>
          <TextField
            name="address"
            label="Address"
            accepter={Textarea}
            rows={3}
          ></TextField>
          <TextField
            name="note"
            label="Note"
            accepter={Textarea}
            rows={3}
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
};

export default CustomerEdit;
