"use client"

import Image from "next/image"
import {ArrowLeft, ArrowRight, Star, MessageCircleHeart, Handshake, FolderLock, Bot, BrainCog, Heart, Stethoscope, Syringe } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"


export default function AboutPage() {
  return (
    <>

      {/* Header */}
      < Header />
      <div className="min-h-screen flex flex-col bg-white">
        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto py-16 px-5 lg:px-16 ">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  DoctorXpert is a health-tech platform built to make medical understanding easier, faster, and smarter for
                  everyone.
                </h1>

                <div className="space-y-4 text-primary text-base md:text-lg leading-relaxed">
                  <p>
                    We help users, doctors, and clinics save time by using powerful AI tools that explain reports, guide
                    diets, and manage health interactions — all in a simple, user-friendly interface.
                  </p>

                  <p>
                    Whether you{"'"}re a patient trying to understand your test report, a doctor managing multiple cases, or a
                    clinic digitizing health records — DoctorXpert is your reliable assistant in the healthcare journey.
                  </p>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="h-full lg:flex flex-1 bg-gradient-to-br from-primary to-secondary items-center justify-center relative overflow-hidden rounded-xl">
                <div className="relative">
                  <Image
                    src="/images/about.jpg"
                    alt="AI Doctor"
                    width={520}
                    height={600}
                    className="object-cover rounded-xl shadow-xl"
                    priority
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* OUR VESION */}
        <div className="container mx-auto py-16 px-5 lg:px-16 bg-[url('/images/aboutbackground.jpg')] bg-cover bg-center ">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-left text-primary mb-4">
            Our Vision
          </h2>
          <h1 className="text-base md:text-lg lg:text-4xl font-bold text-left text-primary mx-auto">
            We a  re on a mission to reshape digital healthcare in Pakistan and beyond, using AI that truly helps. Our goals are:
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <div className="flex  gap-3">
              <BrainCog className="w-20 h-12 text-primary mb-2" />
              <div className="flex flex-col ">
                <h3 className="text-xl font-semibold text-primary">Simplify Healthcare</h3>
                <p className="text-base text-primary">Make medical information easy to understand for everyone.</p>
              </div>
            </div>
            <div className="flex  gap-3">
              <Heart className="w-20 h-12 text-primary mb-2" />
              <div className="flex flex-col ">
                <h3 className="text-xl font-semibold text-primary">Empower Patients</h3>
                <p className="text-base text-primary">Help patients take control of their health with AI-driven insights.</p>
              </div>
            </div>
            <div className="flex  gap-3">
              <Stethoscope className="w-20 h-12 text-primary mb-2" />
              <div className="flex flex-col ">
                <h3 className="text-xl font-semibold text-primary">Support Doctors</h3>
                <p className="text-base text-primary">Provide tools that assist doctors in delivering better care.</p>
              </div>
            </div>
            <div className="flex  gap-3">
              <Syringe className="w-20 h-12 text-primary mb-2" />
              <div className="flex flex-col ">
                <h3 className="text-xl font-semibold text-primary">Innovate Healthcare</h3>
                <p className="text-base text-primary">Use cutting-edge AI to transform how healthcare is delivered.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why DoctorXpert ?*/}
        <div className="flex-1 container mx-auto py-16 px-5 lg:px-16 flex gap-8">
          {/* left Side */}
          <div className="max-w-[680px]">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-left text-primary mb-4">
              Why DoctorXpert?
            </h2>
            <p className="text-base md:text-lg lg:text-3xl font-bold text-left text-primary mb-4">
              DoctorXpert is your Health companion. Delivering Smarter Healthcare, Faster Results, Trusted Insights. We Offering:
            </p>
            <div className="flex flex-col space-y-4 text-primary text-base md:text-lg leading-relaxed">
              <div className="flex items-start gap-4">
                <Bot className="w-20 h-12 text-primary mb-2" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
                  <p>Get accurate explanations of medical reports and test results in simple language.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Handshake className="w-20 h-12 text-primary mb-2" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">User-friendly interface</h3>
                  <p>No tech knowledge needed. Just upload, read, and understand.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="w-20 h-12 text-primary mb-2" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">Trusted by Experts</h3>
                  <p>Developed with healthcare professionals to ensure accuracy and reliability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Syringe className="w-20 h-12 text-primary mb-2" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">Comprehensive Health Management</h3>
                  <p>From diet plans to medication reminders, manage your health in one place.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircleHeart className="w-20 h-12 text-primary mb-2" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">24/7 Support</h3>
                  <p>Our AI assistant is always available to answer your health queries.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FolderLock className="w-20 h-12 text-primary mb-2" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">Secure and Private</h3>
                  <p>Your health data is protected with top-notch security measures.</p>
                </div>
              </div>
            </div>
            <Button className="mt-8 bg-secondary text-primary px-6 py-3 rounded-lg hover:bg-secondary transition-colors">Learn More</Button>
          </div>
          {/* Right Side */}
          <div className="hidden md:flex items-center justify-center">
            <Image src="/images/health.jpg"
             alt="imag"
             width={900} 
            height={600} 
            className=" rounded-md h-full" />

          </div>
        </div>

        {/* Customer Reviews */}
        <div className="container mx-auto py-16 px-5 lg:px-16  overflow-hidden">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-left text-primary mb-4">
            Customer Reviews
          </h2>
          <p className=" text-primary text-base lg:text-lg">Our clients love the results we deliver !</p>
          <div className="  flex flex-col gap-5 md:flex-row mt-8 w-full md:w-[120%]">
            <div className="bg-secondary p-6 rounded-lg shadow-md max-w-sm min-w-72">
            <div className="flex mb-2">
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
            </div>
              <p className="text-base md:text-lg text-primary mb-2">
                DoctorXpert has transformed how I understand my health. The AI explanations are clear and easy to follow.
              </p>
              <p className="text-sm text-gray-500">- Sarah K.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md max-w-sm min-w-72">
            <div className="flex mb-2">
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
            </div>
              <p className="text-base md:text-lg text-primary mb-2">
                DoctorXpert has transformed how I understand my health. The AI explanations are clear and easy to follow.
              </p>
              <p className="text-sm text-gray-500">- Sarah K.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md max-w-sm min-w-72">
            <div className="flex mb-2">
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
            </div>
              <p className="text-base md:text-lg text-primary mb-2">
                DoctorXpert has transformed how I understand my health. The AI explanations are clear and easy to follow.
              </p>
              <p className="text-sm text-gray-500">- Sarah K.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md max-w-sm min-w-72">
            <div className="flex mb-2">
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
              <Star className="text-primary"/>
            </div>
              <p className="text-base md:text-lg text-primary mb-2">
                DoctorXpert has transformed how I understand my health. The AI explanations are clear and easy to follow.
              </p>
              <p className="text-sm text-gray-500">- Sarah K.</p>
            </div>                    
          </div>
          <div className="mt-7 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <div className="flex gap-4">
              <div className="rounded-full w-9 h-9 border-2 flex justify-center items-center border-primary">
                <ArrowLeft className=" text-primary "/>
              </div>
              <div className="rounded-full w-9 h-9 border-2 flex justify-center items-center border-primary">
                <ArrowRight className=" text-primary" />
              </div>
            </div>
          </div>
        </div>


      </div>
      {/* Footer */}
      <Footer />
    </>
  )
}