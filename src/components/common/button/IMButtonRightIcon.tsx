import React from "react";
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";

interface ButtonRightIconProps {
  bsIcon: string;
  bsVariant: ButtonVariant;
  disabled?: boolean;
  className?: string;
  form?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const defaultProps: ButtonRightIconProps = {
  bsIcon: "chevron-right",
  bsVariant: "primary",
  className: "px-3",
};

export const IMButtonRightIcon = (props: ButtonRightIconProps) => {
  const {
    bsIcon,
    bsVariant,
    disabled,
    className,
    form,
    type,
    onClick,
    children,
  } = props;

  return (
    <Button
      className={className}
      variant={bsVariant}
      onClick={onClick}
      disabled={disabled}
      form={form}
      type={type}
    >
      <span className="me-2">{children}</span>
      <i className={`fw-bold bi bi-${bsIcon}`}></i>
    </Button>
  );
};

IMButtonRightIcon.defaultProps = defaultProps;
