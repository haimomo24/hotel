import React from 'react'
import HomePage from './component/homepage/HomePage'
import Video from './component/homepage/Video'
import ImageSlider from './component/homepage/SlideImages'
import Other from './component/homepage/Other'
import ShowPage from './component/homepage/ShowPage'

const page = () => {
  return (
    <div className='bg-[#410009]'>

      <HomePage/>
 
      <ImageSlider/>
      <ShowPage/>
      <Other/>
    </div>
  )
}

export default page