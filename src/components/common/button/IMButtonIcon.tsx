import React from "react";
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import classNames from "classnames";

interface ButtonIconProps {
  bsIcon: string;
  bsVariant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  form?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const IMButtonIcon = (props: ButtonIconProps) => {
  const { bsIcon, bsVariant, disabled, className, form, type, onClick } = props;

  const btnClass = classNames("px-3", className);

  return (
    <Button
      className={btnClass}
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
