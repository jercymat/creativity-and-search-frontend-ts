import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import config from '../../../config';
import { IMLogoNavbar } from '../logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IMAccountBadge } from '../../account';
import { LinkContainer } from 'react-router-bootstrap';
import { IMButtonNormal } from '../button';

export const IMNavBar = () => {
  const { isLoggedIn, userName } = useSelector((state: RootState) => state.auth);

  return (
    <Navbar style={{ padding: '1.5rem 0 1.5rem 0', zIndex: '5' }}>
      <Container style={{ height: '48px' }} fluid>
        <div className='d-flex'>
          {location.pathname !== '/' && <IMLogoNavbar densed={location.pathname === '/search'} />}
        </div>
        <div className='d-flex align-items-center h-100'>
          <LinkContainer to='/test' className={config.ENABLE_TEST_PAGE ? undefined : 'd-none'}>
            <IMButtonNormal bsVariant='light'>Test</IMButtonNormal>
          </LinkContainer>
          {isLoggedIn
            ? <IMAccountBadge
              userName={userName}
              userImage={`${process.env.PUBLIC_URL}/image/person_placeholder.png`} />
            : <LinkContainer to='/login'>
                <IMButtonNormal>Login</IMButtonNormal>
              </LinkContainer>}
        </div>
      </Container>
    </Navbar>
  )
}