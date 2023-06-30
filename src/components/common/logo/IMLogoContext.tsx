import React from 'react'
import config from '../../../config';
import { Fragment } from 'react';

type Props = {
  densed?: boolean,
}

const defaultProps: Props = {
  densed: false,
}

function IMLogoContext(props: Props) {
  const { densed } = props;

  return (
    <Fragment>
      {!densed ? (
        <img
          src='https://via.placeholder.com/60/023246/023246.jpg'
          width='42'
          height='42'
          className='d-inline-block me-2'
          style={{ borderRadius: '50%' }}
          alt='Idea Map logo' />
      ) : null}
      <span
        className={`font-logo-${densed ? 'densed' : 'main'}`}
        style={densed ? { lineHeight: '1.2' } : undefined} >
        {config.PRODUCT_NAME}
      </span>
    </Fragment>
  );
}

IMLogoContext.defaultProps = defaultProps;

export default IMLogoContext;