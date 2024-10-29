import React from 'react'
import './MyWork.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mywork_data from '../../assets/mywork_data'
import arrow_icon from '../../assets/arrow_icon.svg'
import  { useState } from 'react';



const MyWork = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Why use Trip Dummy Ticket?',
      answer: 'Trip Dummy Ticket provides a valid ticket for visa applications, ensuring that your application is successful.'
    },
    {
      question: 'What is a PNR number?',
      answer: 'A PNR (Passenger Name Record) is a unique code that is generated when a flight ticket is booked. It contains your booking details.'
    },
    {
      question: 'How can I check the PNR number?',
      answer: 'You can check your PNR number on the ticket confirmation sent to your email or through the airline’s website.'
    },
    {
      question: 'Does your service work for any nationality?',
      answer: 'Yes, Trip Dummy Ticket provides tickets for all nationalities.'
    },
    {
      question: 'How long does it take to receive my reservation?',
      answer: 'You will receive your reservation within 24 hours after placing an order.'
    },
    {
      question: 'What about support?',
      answer: 'Our support team is available 24/7 via email or chat to assist you with any inquiries.'
    }
  ];
  return (
    // 
    // <div id='work'className='mywork'>
    //   <div className="mywork-title">
    //     <h1>Reviews</h1>
    //     <img src={theme_pattern} alt="" />
    //     <h1>What’s Our Client’s Words</h1>
    //     <p>Trusted by thousands of travelers since 2019. Tripdummyticket™ helps them to enjoy their adventures with less stress & more freedom.</p>
    //     <button >Book Now</button>
    //   </div>
    //   <div className="mywork-container">
    //     {mywork_data.map((work,index)=>{
    //       return <img key={index} src={work.w_img} alt=""/>
    //     })}
    //   </div>
    //   <div className="mywork-showmore">
    //     <p>Show More</p>
    //     <img src={arrow_icon} alt="" />
    //   </div>
    // </div>
    <div id='work'className='mywork'>
      <div className="mywork-title">
    <div className="faq-container">
    <h1>FAQs</h1>
      <h2>Frequently Asked Questions</h2>
      </div>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className={activeIndex === index ? 'arrow up' : 'arrow down'}></span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default MyWork