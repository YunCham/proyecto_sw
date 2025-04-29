"use client";

import { Room } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiClock, FiStar, FiUsers } from "react-icons/fi";
import { deleteRoom, updateRoomTitle } from "~/app/actions/rooms";
import { motion } from "framer-motion";
import ConfirmationModal from "./ConfirmationModal";

export default function RoomsView({
  ownedRooms,
  roomInvites,
}: {
  ownedRooms: Room[];
  roomInvites: Room[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState("owned");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const startEditing = (id: string, currentTitle: string) => {
    setEditingId(id);
    setTitle(currentTitle);
  };

  const saveTitle = async (id: string) => {
    await updateRoomTitle(title, id);
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      saveTitle(id);
    }
  };

  const confirmDelete = async () => {
    if (roomToDelete) {
      await deleteRoom(roomToDelete);
      setShowConfirmationModal(false);
      setRoomToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setRoomToDelete(id);
    setShowConfirmationModal(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative">
      <div className="mb-10 flex justify-center">
        <div className="relative flex bg-[#23272F] rounded-full overflow-hidden">
          <button
            onClick={() => setActiveTab("owned")}
            className={`px-6 py-3 text-sm font-medium transition-colors relative z-10 ${
              activeTab === "owned"
                ? "text-[#23272F]"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Mis proyectos ({ownedRooms.length})
          </button>
          <button
            onClick={() => setActiveTab("shared")}
            className={`px-6 py-3 text-sm font-medium transition-colors relative z-10 ${
              activeTab === "shared"
                ? "text-[#23272F]"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Compartidos conmigo ({roomInvites.length})
          </button>
          <div 
            className={`absolute h-full w-1/2 bg-[#61DAFB] rounded-full transition-all duration-300 z-0 ${
              activeTab === "shared" ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>

      {activeTab === "owned" && (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ownedRooms.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center py-8 rounded-full bg-[#23272F] bg-opacity-50">No tienes proyectos creados aún</p>
          ) : (
            ownedRooms.map((room) => (
              <motion.div
                key={room.id}
                variants={item}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#23272F] rounded-t-[140px] shadow-lg"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-[#61DAFB] rounded-t-full"></div>
                <div className="relative p-6 pt-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {editingId === room.id ? (
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          onBlur={() => saveTitle(room.id)}
                          onKeyDown={(e) => handleKeyDown(e, room.id)}
                          className="w-full rounded-full border border-[#343A46] bg-[#1A1D23] px-4 py-2 text-sm text-white focus:border-[#61DAFB] focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <Link
                          href={`/dashboard/${room.id}`}
                          className="block font-medium text-white hover:text-[#61DAFB] transition-colors"
                        >
                          {room.title || "Sin título"}
                        </Link>
                      )}
                      <div className="mt-2 flex items-center text-xs text-gray-400">
                        <FiClock className="mr-1 h-3 w-3" />
                        <span>
                          {new Date(room.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditing(room.id, room.title || "")}
                        className="rounded-full p-2 text-gray-400 hover:bg-[#343A46] hover:text-[#61DAFB]"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(room.id)}
                        className="rounded-full p-2 text-gray-400 hover:bg-[#3A2A2A] hover:text-red-400"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-[#23272F] bg-[#343A46] flex items-center justify-center text-[10px] text-[#61DAFB] font-bold"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <button className="text-xs text-[#61DAFB] hover:text-[#4FC3E8] flex items-center bg-[#23272F] bg-opacity-70 px-3 py-1.5 rounded-full">
                      <FiStar className="mr-1 h-3 w-3" />
                      Favorito
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {activeTab === "shared" && (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {roomInvites.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center py-8 rounded-full bg-[#23272F] bg-opacity-50">No tienes proyectos compartidos contigo</p>
          ) : (
            roomInvites.map((room) => (
              <motion.div
                key={room.id}
                variants={item}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#23272F] rounded-t-[140px] shadow-lg"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-[#5856D6] rounded-t-full"></div>
                <div className="relative p-6 pt-8">
                  <Link
                    href={`/dashboard/${room.id}`}
                    className="block font-medium text-white hover:text-[#61DAFB] transition-colors"
                  >
                    {room.title || "Sin título"}
                  </Link>
                  <div className="mt-2 flex items-center text-xs text-gray-400">
                    <FiClock className="mr-1 h-3 w-3" />
                    <span>
                      {new Date(room.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-[#23272F] bg-[#343A46] flex items-center justify-center text-[10px] text-[#5856D6] font-bold"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#343A46] bg-opacity-70 text-[#5856D6] flex items-center">
                      <FiUsers className="mr-1 h-3 w-3" />
                      Compartido
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmDelete}
        message="¿Estás seguro de que quieres eliminar este proyecto?"
      />
    </div>
  );
}