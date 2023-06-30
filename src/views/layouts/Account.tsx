import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMAlertToast } from '../../components/common/popup';
import styles from './Account.module.scss';
import { IMLogoNormal } from '../../components/common/logo';
import { IMAccountLoginForm } from '../../components/account';
import { globalActions } from '../../store/reducers/global';

export const AccountLayout = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const errorToast = useSelector((state: RootState) => state.global.errorToast);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center"
        style={{
          paddingTop: '7.5rem'
        }}>
        <IMLogoNormal />
        <h1
          className='font-weight-bold mt-3'
          style={{ marginBottom: '5rem' }}>Login to start your journey.</h1>
        <IMAccountLoginForm />
      </div>
      <svg
        style={{
          position: 'absolute',
          left: '0',
          top: '388px',
          zIndex: '-1'
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1438 134">
        <path
          d="M1438 1442H0V31.001S438.105 0 719 .001c280.896 0 719 31 719 31V1442z"
          fill={styles['color-secondary']} />
      </svg>
      <div className={styles.curveAfter} />
      <IMAlertToast
        show={errorToast.show}
        bsVariant='danger'
        timeout={2000}
        message={errorToast.message}
        onClose={() => dispatch(globalActions.closeErrorToast())} />
    </>
  )
};