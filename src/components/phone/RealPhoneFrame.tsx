import React from "react"

interface RealPhoneFrameProps {
  children: React.ReactNode
  isExpanded: boolean
  onToggleExpand?: () => void
  lang?: string
}

/**
 * Realistic Flagship Smartphone Frame & Responsive Tablet Container.
 * Features:
 * - Visible side hardware: Action switch, Volume Up, Volume Down (left), Power button (right)
 * - Metallic titanium rail with dual-stage edge specular highlights & brushed gradient
 * - Thin black bezel with matched outer (54px) & inner (42px) corner radii
 * - Dynamic Island with speaker slit, multi-element camera lens glint, and FaceID sensor
 * - Subtle diagonal glass reflection sheen (contrast preserving, pointer-events: none)
 * - Spacious wide phone layout (485px) preventing narrow congestion
 * - Full tablet expanded view (up to 1152px wide) with smooth reflow
 * - Native edge-to-edge full screen on actual mobile viewports (<500px)
 */
export default function RealPhoneFrame({
  children,
  isExpanded,
  lang = "en",
}: RealPhoneFrameProps) {
  return (
    <div className="w-full flex items-center justify-center transition-all duration-300 ease-out select-none px-2 sm:px-4">
      {/* ─── Device Positioning Wrapper (Explicit width constraint prevents flex collapse) ─── */}
      <div
        className={`relative flex items-center justify-center transition-all duration-300 ease-out ${
          isExpanded ? "w-full max-w-5xl lg:max-w-6xl" : "w-full max-w-[485px]"
        }`}
      >
        {/* ─── Decorative Left Hardware Buttons (Attached to phone wrapper) ─── */}
        {!isExpanded && (
          <div
            aria-hidden="true"
            className="hidden sm:block absolute -left-[4px] top-0 bottom-0 w-[4px] pointer-events-none z-0"
          >
            {/* Action / Mute Switch */}
            <div
              className="absolute top-[108px] right-0 w-[4px] h-[32px] rounded-l-xs bg-gradient-to-r from-[#4A453F] via-[#2D2A26] to-[#1E1C19] border-l border-t border-b border-[#6E675F]/50 shadow-[-2px_2px_4px_rgba(0,0,0,0.6)]"
              style={{
                boxShadow:
                  "-2px 0 3px rgba(0,0,0,0.4), inset 1px 1px 1px rgba(255,255,255,0.25)",
              }}
            />

            {/* Volume Up Button */}
            <div
              className="absolute top-[158px] right-0 w-[4px] h-[52px] rounded-l-xs bg-gradient-to-r from-[#4A453F] via-[#2D2A26] to-[#1E1C19] border-l border-t border-b border-[#6E675F]/50"
              style={{
                boxShadow:
                  "-2px 0 3px rgba(0,0,0,0.4), inset 1px 1px 1px rgba(255,255,255,0.25)",
              }}
            />

            {/* Volume Down Button */}
            <div
              className="absolute top-[222px] right-0 w-[4px] h-[52px] rounded-l-xs bg-gradient-to-r from-[#4A453F] via-[#2D2A26] to-[#1E1C19] border-l border-t border-b border-[#6E675F]/50"
              style={{
                boxShadow:
                  "-2px 0 3px rgba(0,0,0,0.4), inset 1px 1px 1px rgba(255,255,255,0.25)",
              }}
            />
          </div>
        )}

        {/* ─── Decorative Right Hardware Button (Power Button) ─── */}
        {!isExpanded && (
          <div
            aria-hidden="true"
            className="hidden sm:block absolute -right-[4px] top-0 bottom-0 w-[4px] pointer-events-none z-0"
          >
            {/* Power Button (Taller: 80px) */}
            <div
              className="absolute top-[175px] left-0 w-[4px] h-[80px] rounded-r-xs bg-gradient-to-l from-[#4A453F] via-[#2D2A26] to-[#1E1C19] border-r border-t border-b border-[#6E675F]/50"
              style={{
                boxShadow:
                  "2px 0 3px rgba(0,0,0,0.4), inset -1px 1px 1px rgba(255,255,255,0.25)",
              }}
            />
          </div>
        )}

        {/* ─── Outer Phone / Tablet Shell ─── */}
        <div
          className={`nv-app-shell relative flex flex-col w-full bg-[#141210] transition-all duration-300 ease-out z-10 ${
            isExpanded
              ? "h-[85vh] max-h-[880px] rounded-[32px] sm:border-[8px] border-[#2A2724] shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(245,206,87,0.06)]"
              : "h-[870px] max-h-[calc(100vh-6.75rem)] rounded-none sm:rounded-[54px] border-0 sm:border-[10px] border-[#23201D] shadow-[0_25px_80px_rgba(0,0,0,0.75),0_10px_30px_rgba(0,0,0,0.5),0_0_60px_rgba(245,206,87,0.06)]"
          }`}
          style={{
            // Titanium Outer Specular Highlight Rim
            outline: isExpanded
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(255,255,255,0.14)",
            outlineOffset: isExpanded ? "-1px" : "-2px",
          }}
        >
          {/* ─── Fine Top Speaker Slit (Hardware Detail) ─── */}
          {!isExpanded && (
            <div
              aria-hidden="true"
              className="hidden sm:block absolute top-[2px] left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full bg-[#181614] border border-white/[0.06] z-50 pointer-events-none"
            />
          )}

          {/* ─── Tablet Front-Facing Camera Dot (Expanded Mode) ─── */}
          {isExpanded && (
            <div
              aria-hidden="true"
              className="hidden sm:flex absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black border border-white/20 items-center justify-center z-50 pointer-events-none"
            >
              <div className="w-1 h-1 rounded-full bg-[#24426A]/80" />
            </div>
          )}

          {/* ─── Dynamic Island (Phone Mode only) ─── */}
          {!isExpanded && (
            <div
              aria-hidden="true"
              className="hidden sm:flex absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-28 h-7.5 rounded-full bg-[#0D0C0B] border border-white/10 items-center justify-between px-3 pointer-events-none shadow-md"
            >
              {/* Camera Lens with Multi-layer Optical Anti-Reflective Coating */}
              <div className="w-3 h-3 rounded-full bg-[#050505] ring-1 ring-white/15 flex items-center justify-center relative overflow-hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#1E3A8A] via-[#3B82F6]/60 to-[#9333EA]/40" />
                <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/40" />
              </div>

              {/* TrueDepth / FaceID Sensor Glint */}
              <div className="w-2 h-2 rounded-full bg-[#181716] ring-1 ring-white/5 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#F5CE57]/30" />
              </div>
            </div>
          )}

          {/* ─── Screen Glass Reflection Overlay (Very subtle, preserves full contrast) ─── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-[inherit]"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 32%, transparent 58%)",
            }}
          />

          {/* ─── Inner Display Viewport with CSS Container Query Context & Scroll Containment ─── */}
          <div
            id="phone-screen-viewport"
            lang={lang}
            data-lenis-prevent="true"
            style={{
              containerType: "inline-size",
              containerName: "app-screen",
              overscrollBehavior: "contain",
            }}
            className={`w-full flex-1 flex flex-col h-full min-h-0 overflow-hidden bg-white text-[#1A1A1A] relative z-20 ${
              isExpanded ? "rounded-[24px]" : "rounded-none sm:rounded-[43px]"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
