"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    description: "",
    message: "",
    acceptTerms: false,
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const countries = ["Pakistan","Australia", "United States", "United Kingdom", "Canada", "Germany", "France", "Japan", "Other"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleCountrySelect = (country: string) => {
    setFormData((prev) => ({ ...prev, country }))
    setIsDropdownOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1 py-16 px-5 lg:px-16 text-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
            <div className="space-y-6">
              <div>
                <p className="text-sm  mb-2">Tagline</p>
                <h1 className="text-4xl font-bold mb-4">Contact us</h1>
                <p className=" leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 " />
                  <span className="">email@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 " />
                  <span className="">+1 (555) 000-0000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 " />
                  <span className="">123 Sample St, Sydney NSW 2000 AU</span>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium  mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium  mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium  mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium  mb-2">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Country Dropdown */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium  mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-3 py-2 border border-primary rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                    >
                      <span className={formData.country ? "text-gray-900" : "text-gray-500"}>
                        {formData.country || "Select one..."}
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-primary rounded-md shadow-lg">
                        {countries.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Which best describes you */}
                <div>
                  <label className="block text-sm font-medium  mb-3">Which best describes you?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["First choice", "Second choice", "Third choice", "Fourth choice", "Fifth choice", "Other"].map(
                      (option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="description"
                            value={option}
                            checked={formData.description === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-green-600 border-primary focus:ring-green-500"
                          />
                          <span className="text-sm ">{option}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium  mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-secondary border-primary rounded focus:ring-secondary"
                  />
                  <label htmlFor="acceptTerms" className="text-sm ">
                    I accept the <span className="text-blue-600 underline">Terms & Condition</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
