import React from 'react'
import bannerImage from '../static/images/homeBanner-removebg.png'
import MenuLinks from './MenuLinks'

const HomepageBanner = () => {
  return (
    <div className='container homepageBannerWrapper position-relative py-5 mt-5'>
        <div className="col-12 ">
            <MenuLinks />
            <img className='w-100 bannerImage' src={bannerImage} alt="" />
        </div>
    </div>
  )
}

export default HomepageBanner