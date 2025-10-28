"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface HealthWellnessHeroProps {
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export default function HealthWellnessHero({
  title = "Your Partner in Health and Wellness",
  description = "At our company, we are dedicated to enhancing your health journey. Through innovative solutions and personalized support, we empower you to achieve your wellness goals.",
  primaryButtonText = "Learn More",
  secondaryButtonText = "Sign Up",
  onPrimaryClick,
  onSecondaryClick,
}: HealthWellnessHeroProps) {
  return (
    <section className="bg-[#0d2442] text-white min-h-screen overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-20 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Left side - Title */}
          <motion.div
            initial={{ y: -410 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <h1 className="text-[#9ef01a] text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">{title}</h1>
          </motion.div>

          {/* Right side - Description and Buttons */}
          <motion.div
            initial={{ y: 400 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="space-y-8">
            <p className="text-[#9ef01a] text-lg md:text-xl leading-relaxed">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#9ef01a] hover:bg-[#8ed015] text-black font-semibold px-8 py-3 text-base rounded-sm w-fit"
                onClick={onPrimaryClick}
              >
                {primaryButtonText}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-[#9ef01a] hover:text-[#8ed015] hover:bg-transparent font-semibold px-0 py-3 text-base group w-fit justify-start"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
