import React from "react";
import { Form } from "rsuite";

export default function TexField({ name, label, subLabel = "", ...rest }) {
  return (
    <Form.Group controlId={name}>
      <Form.ControlLabel>
        <span>{label}</span>
        <span style={{ float: "right" }}>{subLabel}</span>
      </Form.ControlLabel>
      <Form.Control name={name} {...rest} />
    </Form.Group>
  );
}
