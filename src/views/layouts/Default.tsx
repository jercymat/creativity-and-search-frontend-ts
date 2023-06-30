import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { IMNavBar } from '../../components/common/navigation';
import { LandingPage } from '../pages';

export const DefaultLayout: React.FC = () => {

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
          {/* <Route path='/search' element={isLoggedin ? <SERPPage /> : <Navigate replace to='/login' />} />
          <Route path='/map' element={isLoggedin ? <IdeaMapperPage /> : <Navigate replace to='/login' />} /> */}
        </Routes>
      </div>
    </>
  )
};