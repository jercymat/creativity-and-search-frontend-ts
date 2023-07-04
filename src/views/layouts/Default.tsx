import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { IMNavBar } from '../../components/common/navigation';
import { LandingPage, SERPPage } from '../pages';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

export const DefaultLayout: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <IMNavBar />
      <div
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 96px)',
        }}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/search' element={isLoggedIn ? <SERPPage /> : <Navigate replace to='/login' />} />
          {/* <Route path='/map' element={isLoggedin ? <IdeaMapperPage /> : <Navigate replace to='/login' />} /> */}
        </Routes>
      </div>
    </>
  )
};