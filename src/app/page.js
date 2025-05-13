import React from 'react'
import HomePage from './component/homepage/HomePage'
import Video from './component/homepage/Video'
import ImageSlider from './component/homepage/SlideImages'
import Other from './component/homepage/Other'

const page = () => {
  return (
    <div>

      <HomePage/>
      <Video/>
      <ImageSlider/>
      <Other/>
    </div>
  )
}

export default page