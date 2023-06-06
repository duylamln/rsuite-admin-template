import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Modal } from "rsuite";
import RemindIcon from "@rsuite/icons/legacy/Remind";

interface Props {
  message: string;
  resolver: (ok: boolean) => void;
  show: boolean;
}
function ConfirmationDialog({ message, resolver, show }: Props) {
  const [open, setOpen] = useState<boolean>(show);
  const handleCancel = () => {
    resolver(false);
    setOpen(false);
  };
  const handleOk = () => {
    resolver(true);
    setOpen(false);
  };

  return (
    <Modal
      backdrop="static"
      role="alertdialog"
      open={open}
      onClose={handleCancel}
      size="xs"
    >
      <Modal.Body>
        <RemindIcon style={{ color: "#ffb300", fontSize: 20 }} />
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
}

export default async function confirmation(message: string): Promise<boolean> {
  const targetId = "confirmation-dialog";
  let divTarget = document.getElementById(targetId);

  if (!divTarget) {
    divTarget = document.createElement("div");
    divTarget.id = targetId;
    document.body.appendChild(divTarget);
  }

  const root = createRoot(divTarget);
  let resolver = (ok: boolean) => {
    console.log(ok);
  };
  const promise = new Promise<boolean>(resolve => {
    resolver = resolve;
  });

  root &&
    root.render(
      <ConfirmationDialog
        message={message}
        resolver={resolver}
        show={true}
      ></ConfirmationDialog>,
    );
  const ok = await promise;
  const target = document.getElementById(targetId);
  if (target) root.unmount(target);
  return ok;
}
