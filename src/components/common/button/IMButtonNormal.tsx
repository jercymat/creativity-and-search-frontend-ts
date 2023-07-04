import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { ButtonVariant } from 'react-bootstrap/esm/types'

interface ButtonNormalProps {
  bsVariant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  form?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const defaultProps: ButtonNormalProps = {
  bsVariant: 'primary',
  loading: false,
  className: 'px-3',
}

export const IMButtonNormal = (props: ButtonNormalProps) => {
  const { bsVariant, loading, disabled, className, form, type, onClick, children } = props;

  return (
    <Button
      className={className}
      variant={bsVariant}
      onClick={onClick}
      disabled={disabled}
      form={form}
      type={type}
    >
      {
        loading
          ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          : children
      }
    </Button>
  )
}

IMButtonNormal.defaultProps = defaultProps;