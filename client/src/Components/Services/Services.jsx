import React from 'react'
import './Services.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import Services_Data from '../../assets/services_data'
import arrow_icon from '../../assets/arrow_icon.svg'
import client4 from '../../assets/client4.jpg'
import client5 from '../../assets/client5.jpg'
import client6 from '../../assets/client6.jpg'



const Services = () => {
  return (
    <>
    <div id='services' className="services">
      <div className="services-title">
        <h3>Why Choose Us</h3>
        <h1>Our Services</h1>
        <img src={theme_pattern} alt="" />
        <p>Flight reservations that are fast, easy & verifiable</p>
      </div>
      <div className="services-container">
        {Services_Data.map((service,index)=>{
          return <div key={index}className="services-format">
            <h3>{service.s_no}</h3>
            <h2>{service.s_name}</h2>
            <p>{service.s_desc}</p>
            <div className="services-readmore">
              <p>Read More</p>
              <img src={arrow_icon} alt="" />
            </div>
          </div>
        })}
   </div>
   </div>

   <div className="more-reviews-section">
      <div className="more-reviews-header">
        <h2>What People Are Saying</h2>
        <p>
          Our customers love sharing their travel experiences. See what they have to say about Tripdummyticket™.
        </p>
      </div>

      <div className="more-testimonials">
        <div className="testimonial-card">
          <div className="card-content">
            <div className="avatar">
              <img src={client4} alt="Client 4" />
            </div>
            <div className="review-text">
              <p>
                "I couldn't believe how simple and fast it was to book my flight with Tripdummyticket™. The support team was very helpful when I needed to make changes last minute."
              </p>
              <h4>Emily R.</h4>
              <div className="stars">★★★★★</div>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="card-content">
            <div className="avatar">
              <img src={client5} alt="Client 5" />
            </div>
            <div className="review-text">
              <p>
                "Such a hassle-free experience! Everything went smoothly, and I was able to get my flight tickets within minutes. Highly recommend this service!"
              </p>
              <h4>John D.</h4>
              <div className="stars">★★★★☆</div>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="card-content">
            <div className="avatar">
              <img src={client6} alt="Client 6" />
            </div>
            <div className="review-text">
              <p>
                "Tripdummyticket™ saved me when I had to change my flight at the last minute. Fast and reliable service with great customer support."
              </p>
              <h4>Michael T.</h4>
              <div className="stars">★★★★☆</div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Services