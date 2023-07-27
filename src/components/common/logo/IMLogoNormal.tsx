import React from "react";
import IMLogoContext from "./IMLogoContext";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

interface Props {
  densed?: boolean;
}

const defaultProps: Props = {
  densed: false,
};

export function IMLogoNormal(props: Props) {
  const { densed } = props;

  return (
    <Link to="/" className={`d-flex align-items-center ${styles.link}`}>
      <IMLogoContext densed={densed} />
    </Link>
  );
}

IMLogoNormal.defaultProps = defaultProps;
