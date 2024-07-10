import React from "react";
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";

interface ButtonLeftIconProps {
  bsIcon: string;
  bsVariant: ButtonVariant;
  disabled?: boolean;
  className?: string;
  form?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const defaultProps: ButtonLeftIconProps = {
  bsIcon: "chevron-left",
  bsVariant: "primary",
  className: "px-3",
};

export const IMButtonLeftIcon = (props: ButtonLeftIconProps) => {
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
      <i className={`fw-bold bi bi-${bsIcon}`}></i>
      <span className="ms-2">{children}</span>
    </Button>
  );
};

IMButtonLeftIcon.defaultProps = defaultProps;
