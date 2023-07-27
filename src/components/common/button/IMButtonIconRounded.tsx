import classNames from "classnames";
import React from "react";
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";

interface ButtonIconRoundedProps {
  bsIcon: string;
  bsVariant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  form?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const IMButtonIconRounded = (props: ButtonIconRoundedProps) => {
  const { bsIcon, bsVariant, disabled, className, form, type, onClick } = props;

  const btnClass = classNames("rounded-circle", "px-0", className);

  return (
    <Button
      className={btnClass}
      style={{ height: "36px", width: "36px" }}
      variant={bsVariant}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
    >
      <i className={`fw-bold bi bi-${bsIcon}`}></i>
    </Button>
  );
};
