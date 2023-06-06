import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Form,
  Button,
  Panel,
  Stack,
  Divider,
  Message,
  Schema,
  FormInstance,
} from "rsuite";
import { useNavigate } from "react-router-dom";
import Brand from "@/components/Brand";
import useUserStore from "@/store/useUserStore";
import TextField from "@/components/Form/TextField";

const SingIn = () => {
  const [error, setError] = useState<string>("");
  const login = useUserStore(state => state.login);
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const getCurrentUser = useUserStore(state => state.getCurrentUser);
  const formRef = useRef() as React.Ref<FormInstance>;
  const model = Schema.Model({
    username: Schema.Types.StringType().isRequired("Username is required"),
    password: Schema.Types.StringType().isRequired("Password is required"),
  });
  const [formData, setFormData] = useState<Record<string, any>>({
    username: "",
    password: "",
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleLogin = async (
    isValid: boolean,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      setIsLogging(true);
      await login(formData.username, formData.password);
      setIsLogging(false);
    } catch (e) {
      setError((e as Error).message);
      setIsLogging(false);
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: "100vh",
      }}
    >
      <Brand style={{ marginBottom: 10 }} />

      <Panel bordered style={{ width: 400 }} header={<h3>Sign In</h3>}>
        <Form
          fluid
          onSubmit={handleLogin}
          model={model}
          ref={formRef}
          onChange={setFormData}
        >
          <TextField name="username" label="User Name"></TextField>
          <TextField name="password" label="Password"></TextField>
          <Form.Group>
            {error && <Message type="error">{error}</Message>}
          </Form.Group>
          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" type="submit" loading={isLogging}>
                Sign in
              </Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default SingIn;
