"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
import { RiArrowDropDownLine, RiMenuFill } from "react-icons/ri";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 1, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "linear" }}
      className="bg-white shadow-md">
      <motion.div
      initial={{opacity:0}}
      animate= {{opacity:1}}
      transition={{duration:0.4 , delay:0.8, ease: "linear"}}
        className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Image
            src="/images/logo.png"
            alt="Logo"
            className="w-[180px] h-[80px]"
            height={180}
            width={180}
          />

        </div>
        <div className="flex items-center justify-between w-full md:w-auto px-4 py-2 gap-14">

          {/* Nav Links */}
          <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
            <li className="hover:text-secondary cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-secondary cursor-pointer">
              <Link href="/about">About Us</Link>
            </li>
            <li className="hover:text-secondary cursor-pointer">
              <Link href="/contact">Contact Us</Link>
            </li>

            <li className="relative group">
              <span className="cursor-pointer hover:text-secondary flex items-center">Tools
                <RiArrowDropDownLine className="font-bold text-xl" />
              </span>

              <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <ul>
                  <li className="hover:bg-gray-100 rounded">
                    <Link href="/tools/Report-Analysis" className="block w-full px-4 py-2">Report Analyzer</Link>
                  </li>
                  <li className="hover:bg-gray-100 rounded">
                    <Link href="/tools/ai_assistant" className="block w-full px-4 py-2">AI Health Chatbot</Link>
                  </li>
                  <li className="hover:bg-gray-100 rounded">
                    <Link href="/bmi" className="block w-full px-4 py-2">BMI Calculator</Link>
                  </li>
                </ul>
              </div>
            </li>

          </ul>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <button className="border text-black px-4 py-2 rounded hover:bg-gray-100">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary mr-6">
                Signup
              </button>
            </Link>
          </div>

        </div>
        {/* {MOBILE NAVIGATION} */}
        <Sheet >
          <SheetTrigger className=" md:hidden pr-5">
            <RiMenuFill className="w-7 h-7" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center gap-3 ">
              <Link href="/login">
                <button className="border text-black px-4 py-2 rounded hover:bg-gray-100">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary mr-6">
                  Signup
                </button>
              </Link>
            </div>
            <ul className="pt-4 flex flex-col gap-5 text-gray-800 font-medium">
              <li className="hover:text-secondary cursor-pointer">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link href="/about">About Us</Link>
              </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link href="/contact">Contact Us</Link>
              </li>

              <li className="relative group">
                <span className="cursor-pointer hover:text-secondary flex items-center">Tools
                  <RiArrowDropDownLine className="font-bold text-xl" />
                </span>

                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                  <ul>
                    <li className="hover:bg-gray-100 rounded">
                      <Link href="/tools/Report-Analysis" className="block w-full px-4 py-2">Report Analyzer</Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded">
                      <Link href="/tools/health-chatbot" className="block w-full px-4 py-2">AI Health Chatbot</Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded">
                      <Link href="/bmi" className="block w-full px-4 py-2">BMI Calculator</Link>
                    </li>
                  </ul>
                </div>
              </li>

            </ul>
          </SheetContent>
        </Sheet>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
