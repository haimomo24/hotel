import React from 'react'
import HomePage from './component/homepage/HomePage'
import Video from './component/homepage/Video'

import Other from './component/homepage/Other'
import ShowPage from './component/homepage/ShowPage'
import NewPage from './component/homepage/NewPage'
import ContactPage from './contact/page'
import MapPage from './component/homepage/MapPage'
import ImageSlider from './component/homepage/SlideImages'

const page = () => {
  return (
    <div className='bg-[#410009]'>

      <HomePage/>
      <ImageSlider/>
      
      <ShowPage/>
      <Other/>
      <NewPage/>
     <MapPage/>
    </div>
  )
}

export default page