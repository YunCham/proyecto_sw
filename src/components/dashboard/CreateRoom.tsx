"use client";

import { useState } from "react";
import { SlPencil } from "react-icons/sl";
import {  createRoom } from "~/app/actions/rooms";
import { motion } from "framer-motion";

export default function CreateRoom() {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => createRoom()}
      className="relative cursor-pointer select-none overflow-hidden shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#61DAFB] to-[#5856D6] rounded-t-[140px]"></div>
      <div className="relative flex items-center justify-between p-6 pt-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-3 shadow-md">
            <SlPencil className="h-6 w-6 text-[#23272F]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-white text-lg">Nuevo diseño</p>
            <p className="text-white text-opacity-80">Crea un proyecto desde cero</p>
          </div>
        </div>
        
        <motion.div 
          animate={{ x: hover ? [0, 5, 0] : 0 }}
          transition={{ repeat: hover ? Infinity : 0, duration: 1 }}
          className="bg-white bg-opacity-20 rounded-full p-3 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}