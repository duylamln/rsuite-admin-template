import React, { useState } from "react";
import { Button, Modal } from "rsuite";
import RemindIcon from "@rsuite/icons/legacy/Remind";

export default function useConfirmation(message: string) {
  const [resolver, setResolver] = useState<((result: boolean) => void) | null>(
    null,
  );

  const [open, setOpen] = React.useState(false);
  const handleOk = () => {
    resolver && resolver(true);
    setResolver(null);
  };
  const handleCancel = () => {
    resolver && resolver(false);
    setResolver(null);
  };

  const showModal = new Promise(resolve => {
    setOpen(true);
    setResolver(resolve);
  });

  const ConfirmationDialog = () => (
    <Modal
      backdrop="static"
      role="alertdialog"
      open={open}
      onClose={handleCancel}
      size="xs"
    >
      <Modal.Body>
        <RemindIcon style={{ color: "#ffb300", fontSize: 24 }} />
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOk} appearance="primary">
          Ok
        </Button>
        <Button onClick={handleCancel} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return [ConfirmationDialog, showModal];
}
