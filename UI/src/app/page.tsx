import Navbar from '@/components/Header'
import Hero from '@/components/Hero'
import React from 'react'
import Footer from '@/components/Footer'
import Health from '@/components/health'
import GetInTouch from '@/components/gettouch'
import PricingPlans from '@/components/pricing'




const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      < Health/>
      <PricingPlans/>
      <GetInTouch/>
      <Footer/>
    </div>
  )
}

export default Home
