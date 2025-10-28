"use client";
import React from "react";
import Image from "next/image";
import {motion} from "framer-motion"

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden  ">
       {/* Image Section */}
      <motion.div 
      initial={{x:-1800}}
      animate={{x:0}}
      transition={{ease:"linear", duration:0.5  }}
      translate="yes"
      className="md:w-1/2  md:mb-0 flex justify-center pt-11 ">
        <Image
          src="/images/hro.jpg"
          alt="Hero"
          width={500}
          height={400}
          className="  object-cover"
        />
      </motion.div>
      {/* Text Section */}
      <motion.div 
      initial={{y:800, opacity:0}}
      animate={{y:0, opacity:1 , }}
      transition={{ease:"linear", duration:0.5}}
      className="md:w-1/2 text-center md:text-left space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight ">
          DOCTORXPERT </h1>
          <h2 className="text-primary text-4xl font-bold">
              Your&apos;s Personal  <br /> Health/Care Assistant
             </h2>
          
        
        <p className="text-gray-600 text-lg">
         Transform your health with our innovative solutions,Our <br />
         health solutions are design to empower you take control <br />
         of your well-being. Experience personalized care that adapts to <br />
         your unique liifestyle and needs
        </p>
        <button className="mt-4 px-6 py-3 bg-secondary text-white rounded-full hover:bg-primary transition duration-300">
          Learn More
        </button>
      </motion.div>

   
    </section>
  );
};

export default Hero;
