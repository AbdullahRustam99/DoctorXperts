"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"


export default function LoginPage() {
  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale:1 ,opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}

        className=" py-10 px-5 lg:px-32 text-primary overflow-y-hidden">

        {/* Left Side - Login Form */}
        <div className="flex justify-evenly shadow-2xl rounded-2xl">
          <div className="">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={180} height={60} />
            </Link>
            <div className="mx-2 lg:mx-20 flex-1 flex flex-col max-w-md space-y-8 ">

              <div className=" space-y-2">
                <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">Welcome back</h1>
                <p className="text-gray-600">Login to access your account</p>
              </div>

              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-sm text-teal-600 hover:underline font-medium">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember for 30 days</Label>
                  </div>
                </div>

                <Button className="w-full bg-secondary hover:bg-teal-700 text-white py-3 rounded-lg font-semibold text-base transition-all duration-200">
                  Sign In
                </Button>
              </form>

              <div className="flex justify-center">
                <span className=" text-sm text-gray-500">Or continue with</span>
              </div>

              <div className="lg:flex gap-5">
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-100 py-2.5 text-base flex items-center gap-3 justify-center mb-2"
                >
                  <FcGoogle size={22} />
                  <span className="font-medium">Sign in with Google</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-100 py-2.5 text-base flex items-center gap-3 justify-center"
                >
                  <FaFacebookF size={20} className="text-blue-600" />
                  <span className="font-medium">Sign in with Facebook</span>
                </Button>
              </div>

              <div className="pb-2 text-center">
                <p className="text-sm text-gray-600">
                  Don{"'"}t have an account?{" "}
                  <Link href="/signup" className="text-secondary hover:underline font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>

            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden overflow-hidden lg:block">
            <Image
              src="/images/hro.jpg"
              alt="AI Doctor"
              width={400}
              height={400}
              className=" w-full h-full rounded-tl-[60px] rounded-r-lg shadow-xl "
              priority
            />
          </div>

        </div>
      </motion.div >

    </>
  )
}
