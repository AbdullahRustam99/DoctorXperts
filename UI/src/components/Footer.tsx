import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-16 px-5 lg:px-16 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-baseline mb-8">
          {/* Logo Section */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="w-[180px] h-[80px]"
              height={180}
              width={180}
            />

          </div>

          {/* Helpful Resources */}
          <div>
            <h3 className="text-lime-500 font-semibold mb-4">Helpful Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Health Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Nutrition Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Wellness Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Fitness Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lime-500 font-semibold mb-4">Company Info</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary  hover:text-gray-800 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary  hover:text-gray-800 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-primary  hover:text-gray-800 transition-colors">
                  Press Room
                </a>
              </li>
              <li>
                <a href="#" className="text-primary  hover:text-gray-800 transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-lime-500 font-semibold mb-4">Stay Connected</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Social Media
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Community Forum
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="mb-8">
            <h3 className="text-lime-500 font-semibold mb-2">Subscribe</h3>
            <p className="text-primary mb-4 max-w-md">
              Join our newsletter to stay informed about our latest updates and offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition-colors font-medium">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary">
              <span>© 2024 Relume. All rights reserved.</span>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-800 transition-colors">
                Cookies Settings
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary hover:text-gray-800 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


