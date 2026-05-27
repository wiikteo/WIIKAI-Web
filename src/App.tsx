import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";
import AnimatedDribbles from "./components/AnimatedDribbles";

const PILLARS = [
  { id: "01", label: "Finance", desc: "Strategic modeling & unit economics guidance" },
  { id: "02", label: "Market research", desc: "TAM modeling & competitive landscape validation" },
  { id: "03", label: "Data room", desc: "Due diligence structured preparedness" },
  { id: "04", label: "Fundraising", desc: "Pitch architecture & venture connection roadmap" }
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("karl@wiik.ai");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div id="app_container" className="relative w-screen h-screen overflow-hidden bg-[#FAFAFA] text-[#1A1A1A] font-sans flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none">
      
      {/* CREATIVE BACKGROUND LAYERING (Clean Minimalism Style) */}
      <div id="ambient_background" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Creative Background Elements outlined in the theme guidelines */}
        <motion.div 
          animate={{
            scale: [1, 1.03, 0.98, 1],
            rotate: [0, 3, -2, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] border border-[#E5E5E5] rounded-full opacity-40" 
        />
        <motion.div 
          animate={{
            scale: [1, 0.97, 1.02, 1],
            rotate: [0, -4, 2, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-20%] left-[-5%] w-[800px] h-[800px] border border-[#E5E5E5] rounded-full opacity-30" 
        />

        {/* Subtle background overlay to add extra premium texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAEAEA_1px,transparent_1px),linear-gradient(to_bottom,#EAEAEA_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.12]" />
      </div>

      {/* PRIMARY STRUCTURE - SPLIT VIEW WITHIN SCREEN BOUNDS */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch justify-between">
        
        {/* LEFT COLUMN: INTERACTIVE CORE / CONTENT PANEL */}
        <div className="flex-1 flex flex-col justify-between max-w-xl py-1 lg:py-2">
          
          {/* HEADER SECTION: MODERN LOGO */}
          <header id="brand_header" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-between w-full"
            >
              {/* Sleek, precise typographic identity */}
              <div className="flex items-center cursor-default select-none group">
                <span className="text-2xl font-black tracking-[-0.04em] text-[#111111]">WIIK</span>
                <span className="text-2xl font-light text-neutral-300 mx-1">/</span>
                <span className="text-2xl font-medium tracking-[-0.02em] text-[#777777] group-hover:text-black transition-colors duration-500">AI</span>
                <span className="w-1.5 h-1.5 bg-[#111111] ml-1 rounded-sm opacity-90" />
              </div>
            </motion.div>
          </header>

          {/* MIDDLE SECTION: HERO HEADER & PILLARS */}
          <main className="my-auto py-8 lg:py-4 flex flex-col gap-8 md:gap-10 justify-center">
            
            {/* AMBITIOUS STARTUP HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4.5xl lg:text-5xl font-light tracking-tight text-[#111111] leading-[1.1] max-w-lg">
                Consulting for <span className="italic font-serif opacity-70">ambitious</span> startups and technical founders
              </h2>
              <div className="w-16 h-[1px] bg-[#E5E5E5]" />
            </motion.div>

            {/* SERVICE PILLARS (Minimalist - No Numbering) */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-3 max-w-md"
              aria-label="Core service domains"
            >
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#999999] font-semibold mb-1">
                Advisory Pillars
              </div>
              <div className="divide-y divide-[#E5E5E5]/70 border-t border-b border-[#E5E5E5]/70">
                {PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    id={`pillar_${pillar.id}`}
                    onMouseEnter={() => setHoveredPillar(pillar.id)}
                    onMouseLeave={() => setHoveredPillar(null)}
                    className="group py-3 transition-colors duration-300 cursor-default flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-300 group-hover:text-black transition-colors font-light text-xs">
                        —
                      </span>
                      <span className="text-sm font-medium text-neutral-700 group-hover:text-black transition-colors">
                        {pillar.label}
                      </span>
                    </div>
                    
                    {/* Minimalist interactive description panel */}
                    <div className="text-right">
                      <AnimatePresence mode="wait">
                        {hoveredPillar === pillar.id ? (
                          <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="font-mono text-[10px] text-[#777777]"
                          >
                            {pillar.desc}
                          </motion.span>
                        ) : (
                          <span className="font-mono text-[11px] text-[#E5E5E5] group-hover:text-neutral-400 transition-colors">
                            ✦
                          </span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            
          </main>

          {/* BOTTOM SECTION: SUPER MINIMALIST CONTACT SENTENCE */}
          <footer id="contact_footer" className="flex flex-col gap-4">
            <div className="h-[1px] w-full bg-[#E5E5E5]"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
            >
              <div className="max-w-md">
                <p className="text-sm md:text-[15px] text-neutral-700 font-light leading-relaxed">
                  Contact{" "}
                  <span className="relative inline-block group font-normal text-[#1A1A1A]">
                    <a href="mailto:karl@wiik.ai" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
                      karl@wiik.ai
                    </a>
                  </span>{" "}
                  for information or inquiries
                </p>

                {/* Micro Action shortcuts for ease of use */}
                <div className="flex items-center gap-4 mt-3 text-[11px] font-mono text-[#777777]">
                  <a
                    href="mailto:karl@wiik.ai?subject=Inquiry%20to%20WIIK/AI"
                    className="flex items-center gap-1 hover:text-black transition-colors"
                  >
                    <Mail size={11} className="text-neutral-400" />
                    Email
                    <ArrowUpRight size={10} className="text-neutral-400" />
                  </a>
                  <span>|</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <span className="text-emerald-600 font-medium font-sans">Copied address</span>
                    ) : (
                      <>
                        <Copy size={11} className="text-neutral-400" />
                        Copy text
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-[#999999] font-mono select-none">
                ©2026 WIIK AI
              </div>
            </motion.div>
          </footer>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE ANIMATED DRIBBLES VISUAL CONTAINER */}
        <div id="hero_visual_container" className="flex-1 flex items-stretch lg:h-full relative py-4 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-[320px] sm:h-[400px] lg:h-[85%] self-center"
          >
            <AnimatedDribbles />
          </motion.div>
        </div>

      </div>

    </div>
  );
}
