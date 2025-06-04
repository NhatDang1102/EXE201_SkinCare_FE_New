import BGImage from '../../components/BGImage/BGImage'
import ContactUs from '../../components/ContactUs/ContactUs'
import './AboutPage.css'

import { useEffect } from 'react'

export default function AboutPage() {
  useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  return (
    <div className='aboutUs'>
      <BGImage />
      <div className='aboutUscontent'>
        <div className='aboutUscontent-left'>
          <h1>About Our Skincare Platform</h1>
          <div>
            About Our Skincare Platform
            <span>Welcome to Team202, your go-to destination for personalized skincare solutions. 
              Our platform is designed to empower users with knowledge, expert AI-driven skincare advice, and a thriving community where people share real experiences and product reviews.
            </span>
          </div>
          <div>
          Our Mission
            <span>We strive to revolutionize the skincare industry by providing a trustworthy space where users can find the best products for their skin type, backed by real reviews and cutting-edge AI technology.</span>
          </div>
          <div>
          What We Offer
            <span>
              <ul>
                <li>AI-Powered Skincare Consultation: Get personalized recommendations based on your skin concerns.</li>
                <li>Community Insights: Read and share authentic reviews, tips, and experiences.</li>
                <li>Verified Product Listings: Discover carefully curated skincare products tailored to different needs.</li>
                <li>Educational Content: Learn about skincare ingredients, routines, and industry trends.</li>
              </ul>
            </span>
          </div>
          <div>
          Why Choose Us?
            <span>
              <ul>
                <li>Science-Based Recommendations: Our AI analyzes skin conditions to suggest the best products.</li>
                <li>User-Driven Community: Real people, real experiences, and honest feedback.</li>
                <li>Sustainability Focus: We highlight eco-friendly and cruelty-free skincare choices.</li>
              </ul>
                Join us in redefining skincare through technology, transparency, and community-driven insights. Explore, connect, and take charge of your skincare journey with Team202.
            </span>
          </div>
        </div>
        <div className='aboutUscontent-right'>
          <ContactUs />
        </div>
      </div>
    </div>
  )
}
