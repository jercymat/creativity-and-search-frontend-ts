import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react'
import { Button } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/esm/types'

interface ButtonIconRoundedProps {
  bsVariant?: ButtonVariant,
  fsIcon: IconProp,
  disabled?: boolean,
  className?: string,
  form?: string,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export const IMButtonIconRounded = (props: ButtonIconRoundedProps) => {
  const { bsVariant, fsIcon, disabled, className, form, type, onClick } = props;

  const btnClass = classNames('rounded-circle', className);

  return (
    <Button
      className={btnClass}
      style={{ height: '36px', width: '36px' }}
      variant={bsVariant}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
    ><FontAwesomeIcon icon={fsIcon} /></Button>
  )
}