import React from 'react'
import './Hero.css'
import profile_img from '../../assets/profile_img.jpg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {
  return (
    <div id='home' className='hero'>
      <img src={profile_img} alt=""/>
        <h1><span>Let's Go Now</span><br/>Get a Verified flight reservation</h1>
        <p>Get a verified flight reservation within 60 seconds.The fast ,easy and stress free way to get a verified flight reservation.</p>
        <div className="hero-action">
          <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with Us</AnchorLink></div>
          <button className="hero-resume">Book Now</button>
        </div>
    </div>
  )
}

export default Hero