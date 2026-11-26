import React from "react"
import { motion } from "framer-motion"
import { Home, Activity, User, Brain } from "lucide-react"

import { AloisTab } from "./types"

interface AloisBottomNavProps {
  activeTab: AloisTab

  onSelectTab: (tab: AloisTab) => void

  fontFamily?: string
}

/**
 * Alois Tab Bar Light — Primary columns (Home, Progress, Games, Profile) with floating active blue pill.
 */

export default function AloisBottomNav({
  activeTab,

  onSelectTab,

  fontFamily = "'Outfit', sans-serif",
}: AloisBottomNavProps) {
  const tabs: {
    id: AloisTab

    label: string

    icon: React.ReactNode
  }[] = [
    {
      id: "home",

      label: "Home",

      icon: <Home className="w-5 h-5" />,
    },

    {
      id: "progress",

      label: "Progress",

      icon: <Activity className="w-5 h-5" />,
    },

    {
      id: "games",

      label: "Games",

      icon: <Brain className="w-5 h-5" />,
    },

    {
      id: "profile",

      label: "Profile",

      icon: <User className="w-5 h-5" />,
    },
  ]

  return (
    <nav
      aria-label="Alois Navigation"
      className="sticky bottom-0 left-0 right-0 z-30 h-[76px] bg-white border-t border-black/[0.06] rounded-t-[28px] px-3 flex items-center justify-center shadow-[0_-8px_24px_rgba(0,0,0,0.04)] select-none"
    >
      <div className="w-full max-w-md mx-auto flex items-center justify-between h-full">
        {tabs.map((tab) => {
          // Map sub-tabs like 'medications', 'appointments', 'doctorInfo' or 'dailyCare' to 'home'
          const isActive =
            activeTab === tab.id ||
            (tab.id === "home" &&
              (activeTab === "dailyCare" ||
                activeTab === "dailyCheckIn" ||
                activeTab === "medications" ||
                activeTab === "appointments" ||
                activeTab === "doctorInfo"))

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className="flex-1 min-h-[48px] flex flex-col items-center justify-center relative h-full focus:outline-hidden transition-all duration-200 cursor-pointer"
            >
              {isActive ? (
                <div className="flex flex-col items-center -mt-2">
                  {/* Active Raised Charcoal Pill with Framer Motion Spring Layout Slide */}
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="w-12 h-[34px] rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    >
                      {tab.icon}
                    </motion.div>
                  </motion.div>
                  {/* Active Label: 11px Bold #1A1A1A */}
                  <span
                    style={{ fontFamily }}
                    className="text-[11px] font-bold text-[#1A1A1A] mt-1 tracking-tight"
                  >
                    {tab.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-[#857F78] hover:text-[#1A1A1A] transition-colors duration-150 py-1">
                  <div className="p-1">{tab.icon}</div>
                  <span
                    style={{ fontFamily }}
                    className="text-[11px] font-medium text-[#857F78] leading-none"
                  >
                    {tab.label}
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
