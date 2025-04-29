"use server";

import { auth } from "~/server/auth";
import { signout } from "../actions/auth";
import { db } from "~/server/db";
import UserMenu from "~/components/dashboard/UserMenu";
import CreateRoom from "~/components/dashboard/CreateRoom";
import RoomsView from "~/components/dashboard/RoomsView";
import { FiClock, FiUsers, FiLock, FiGrid, FiStar, FiHome, FiSettings, FiHelpCircle } from "react-icons/fi";

export default async function Page() {
  const session = await auth();

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session?.user.id,
    },
    include: {
      ownedRooms: true,
      roomInvites: {
        include: {
          room: true,
        },
      },
    },
  });

  return (
    <div className="flex h-screen bg-[#F0F2F5]">
      {/* Barra lateral compacta */}
      <div className="w-20 h-screen bg-[#23272F] flex flex-col items-center py-6 space-y-8">
        <div className="w-10 h-10 rounded-full bg-[#61DAFB] flex items-center justify-center">
          <span className="text-[#23272F] font-bold text-xl">F</span>
        </div>
        
        <div className="flex flex-col space-y-6">
          <button className="w-12 h-12 rounded-xl bg-[#343A46] text-white flex items-center justify-center hover:bg-[#61DAFB] hover:text-[#23272F] transition-all">
            <FiHome className="h-5 w-5" />
          </button>
          <button className="w-12 h-12 rounded-xl bg-[#343A46] text-white flex items-center justify-center hover:bg-[#61DAFB] hover:text-[#23272F] transition-all">
            <FiClock className="h-5 w-5" />
          </button>
          <button className="w-12 h-12 rounded-xl bg-[#343A46] text-white flex items-center justify-center hover:bg-[#61DAFB] hover:text-[#23272F] transition-all">
            <FiUsers className="h-5 w-5" />
          </button>
          <button className="w-12 h-12 rounded-xl bg-[#343A46] text-white flex items-center justify-center hover:bg-[#61DAFB] hover:text-[#23272F] transition-all">
            <FiLock className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-auto flex flex-col space-y-6">
          <button className="w-12 h-12 rounded-xl bg-[#343A46] text-white flex items-center justify-center hover:bg-[#61DAFB] hover:text-[#23272F] transition-all">
            <FiSettings className="h-5 w-5" />
          </button>
          <button className="w-12 h-12 rounded-xl bg-[#343A46] text-white flex items-center justify-center hover:bg-[#61DAFB] hover:text-[#23272F] transition-all">
            <FiHelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Panel de navegación secundario */}
      <div className="w-64 h-screen bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#23272F]">parcial sw1</h2>
          <p className="text-sm text-gray-500">Espacio de trabajo</p>
        </div>
        
        <div className="mb-6">
          <UserMenu email={user.email} />
        </div>
        
        <div className="space-y-1 mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Proyectos</h3>
          <button className="flex items-center w-full p-2 rounded-lg bg-[#F0F2F5] text-[#23272F] hover:bg-[#E4E6E9] transition-all">
            <span className="font-medium">Todos los proyectos</span>
          </button>
          <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-[#F0F2F5] transition-all">
            <span className="font-medium">Recientes</span>
          </button>
          <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-[#F0F2F5] transition-all">
            <span className="font-medium">Compartidos conmigo</span>
          </button>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Equipos</h3>
          <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-[#F0F2F5] transition-all">
            <span className="font-medium">Equipo de diseño</span>
          </button>
          <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-[#F0F2F5] transition-all">
            <span className="font-medium">Equipo de desarrollo</span>
          </button>
          <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-[#F0F2F5] transition-all">
            <span className="font-medium">Marketing</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-[#23272F]">
              Proyectos
            </h1>
            <div className="flex space-x-1">
              <button className="px-3 py-1 rounded-md bg-[#F0F2F5] text-[#23272F] text-sm font-medium hover:bg-[#E4E6E9]">
                Todos
              </button>
              <button className="px-3 py-1 rounded-md text-gray-500 text-sm font-medium hover:bg-[#F0F2F5]">
                Recientes
              </button>
              <button className="px-3 py-1 rounded-md text-gray-500 text-sm font-medium hover:bg-[#F0F2F5]">
                Compartidos
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar proyectos..." 
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#61DAFB] focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-[#61DAFB] text-[#23272F] hover:bg-[#4FC3E8] transition-colors text-sm font-medium">
              Invitar equipo
            </button>
          </div>
        </div>

        {/* Área de contenido */}
        <div className="flex-1 overflow-auto p-6 bg-[#F0F2F5]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <CreateRoom />
            </div>
            
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#23272F]">Proyectos recientes</h2>
              <button className="text-sm text-[#61DAFB] hover:underline">Ver todos</button>
            </div>
            
            <RoomsView
              ownedRooms={user.ownedRooms}
              roomInvites={user.roomInvites.map((x) => x.room)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}