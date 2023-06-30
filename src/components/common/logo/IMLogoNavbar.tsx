import React from 'react'
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import IMLogoContext from './IMLogoContext';
import styles from './Logo.module.scss';

type Props = {
  densed?: boolean,
}

const defaultProps: Props = {
  densed: false,
}

export function IMLogoNavbar(props: Props) {
  const { densed } = props;

  return (
    <LinkContainer to='/'>
      <Navbar.Brand
        className={`visible d-flex align-items-center py-0 ${styles.link}`}>
        <IMLogoContext densed={densed} />
      </Navbar.Brand>
    </LinkContainer>
  );
}

IMLogoNavbar.defaultProps = defaultProps;