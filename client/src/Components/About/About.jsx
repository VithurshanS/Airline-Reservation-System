import React from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/about_profile.jpg'

const About = () => {
  return (
    <div id='about' className="about">
      <div className="about-title">
      <h1>About Us</h1>
        <img src={theme_pattern} alt=""/>
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={profile_img} alt=""/>
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>We Are The Best For Your Flight Reservation</p>
            <p>At our airline, we specialize in providing fast, secure, and convenient plane reservation services. Whether you're planning a business trip, holiday, or academic endeavor, we simplify the process by securing your flight reservation without the need to purchase tickets upfront. This allows you to plan your travel itinerary with flexibility and without financial commitment until your visa is approved.</p>
          </div>
          <div className="about-skills">
            <div className="about-skill"><p># Instant, secure flight booking</p><hr style={{width:'100%'}}/></div>
            <div className="about-skill"><p># Reliable booking service.</p><hr style={{width:'100%'}}/></div>
            <div className="about-skill"><p># Effortless travel planning.</p><hr style={{width:'100%'}}/></div>
            <div className="about-skill"><p># Customer-focused satisfaction.</p><hr style={{width:'100%'}}/></div>
            <div className="about-skill"><p># Dependable booking service.</p><hr style={{width:'100%'}}/></div>
            <div className="about-skill"><p># Affordable flight reservations.</p><hr style={{width:'100%'}}/></div>
          </div>
        </div>
      </div>
      <div className="about-achievements">
        <div className="about-achievement">
          <h1>10+</h1>
          <p>YEARS OF EXPERIENCE</p>
        </div>
        <hr/>
        <div className="about-achievement">
          <h1>90+</h1>
          <p>PROJECTS COMPLETED</p>
        </div>
        <hr/>
        <div className="about-achievement">
          <h1>15+</h1>
          <p>HAPPY CLIENTS</p>
        </div>
      </div>
    </div>
  )
}

export default About