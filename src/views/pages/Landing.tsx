import React from 'react'
import { IMLogoLarge } from '../../components/common/logo'
import { IMSearchBox } from '../../components/search'

export const LandingPage = () => {

  return (
    <div style={{
      width: '100%',
      position: 'absolute',
      top: '18%'
    }}>
      <IMLogoLarge className='text-center mb-4' />
      <IMSearchBox
        className='w-50 mx-auto mb-3'
        placeholder='Your creativity starts here.' />
      <p className="text-center"><small>Typescript Dev Version v0.0.0</small></p>
    </div>
  )
}