"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function HealthChatButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center"
    >
      <Link href="/tools/ai_assistant">
        <motion.button
          whileHover={{ scale: 1.15, rotate: 8 }}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full 
                     bg-gradient-to-r from-secondary to-green-500 text-white shadow-lg 
                     hover:shadow-2xl transition-all duration-300"
        >
          {/* soft glowing ring */}
          <span className="absolute inset-0 rounded-full  opacity-50 blur-xl animate-pulse"></span>

          {/* glassy overlay */}
          <span className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20"></span>

          {/* icon */}
          <MessageCircle size={28} className="relative z-10" />
        </motion.button>
      </Link>

      <p className="text-sm text-secondary  mt-2 font-medium">Start Chat</p>
    </motion.div>
  );
}


