import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import styles from "./LoginForm.module.scss";
import { IMButtonNormal } from "../common/button";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/auth";

export const IMAccountLoginForm = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    const form = event.currentTarget;

    // prevent default form submit effect
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() == false) return;

    const fd = new FormData(form);

    dispatch(
      authActions.login({
        name: fd.get("login-id")?.toString() ?? "",
        password: fd.get("login-pwd")?.toString() ?? "",
      })
    );
  };

  return (
    <div className={styles.wrap}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className={styles.fgroup} controlId="login-id">
          <Form.Control
            type="text"
            name="login-id"
            placeholder="Account ID"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your account ID.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className={styles.fgroup} controlId="login-pwd">
          <Form.Control
            type="password"
            name="login-pwd"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
        <IMButtonNormal
          bsVariant="primary"
          type="submit"
          className="w-100 mt-4"
          loading={loading}
          disabled={loading}
        >
          Login
        </IMButtonNormal>
      </Form>
    </div>
  );
};
