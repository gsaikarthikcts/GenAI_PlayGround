import React from 'react'
import "./Footer.css";
import { Link } from 'react-router-dom';

export default function Footer () {
  return (
    <>
    <div className='footer-container'>
      <p className='footer-description1'>Please reach out to <Link to="mailto:vishweshwarrao.bijarapu@cognizant.com">vishweshwarrao.bijarapu</Link>(vish) for feedback/comments.</p>
    </div>
    <div className='footer-container'>
      <p className='footer-description'>© 2024 Cognizant, all rights reserved</p>
    </div>
    </>
  )
}

