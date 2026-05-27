import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface BlobConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  paths: string[];
}

const BLOBS: BlobConfig[] = [
  {
    id: 1,
    x: 23,
    y: 20,
    size: 200,
    color: "linear-gradient(135deg, #F5F3EF 0%, #E7E4DC 100%)",
    speed: 8,
    paths: [
      "M 90,10 C 130,20 170,50 160,90 C 150,130 130,170 90,160 C 50,150 20,110 30,70 C 40,30 50,0 90,10 Z",
      "M 95,15 C 140,10 165,60 155,100 C 145,140 120,165 80,155 C 40,145 25,105 35,65 C 45,25 50,20 95,15 Z",
      "M 85,8 C 125,25 150,45 165,85 C 180,125 140,150 100,160 C 60,170 30,135 25,95 C 20,55 45,-10 85,8 Z"
    ]
  },
  {
    id: 2,
    x: 58,
    y: 50,
    size: 220,
    color: "linear-gradient(135deg, #ECE9E2 0%, #DCD8CD 100%)",
    speed: 12,
    paths: [
      "M 100,5 C 150,15 180,60 170,110 C 160,160 110,180 60,170 C 10,160 5,110 15,60 C 25,10 50,-5 100,5 Z",
      "M 90,15 C 130,25 175,45 180,95 C 185,145 135,165 85,175 C 35,185 15,135 25,85 C 35,35 50,5 90,15 Z",
      "M 105,8 C 145,-5 165,50 160,100 C 155,150 125,175 75,165 C 25,155 15,115 20,65 C 25,15 65,20 105,8 Z"
    ]
  },
  {
    id: 3,
    x: 35,
    y: 32,
    size: 170,
    color: "linear-gradient(135deg, #F0ECE4 0%, #E3DDD3 100%)",
    speed: 10,
    paths: [
      "M 75,10 C 115,10 135,45 140,85 C 145,125 115,135 75,130 C 35,125 15,95 20,55 C 25,15 35,10 75,10 Z",
      "M 80,15 C 110,5 145,35 135,75 C 125,115 105,140 65,135 C 25,130 20,90 30,50 C 40,10 50,25 80,15 Z",
      "M 70,8 C 115,25 125,55 130,95 C 135,135 110,125 70,120 C 30,115 10,85 15,45 C 20,5 25,-10 70,8 Z"
    ]
  }
];

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function AnimatedDribbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [interactiveMod, setInteractiveMod] = useState<"float" | "attract">("float");

  // Spring physics for smooth pointer interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 180, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      // Map to centralized -50 to 50 delta
      mouseX.set((relativeX / rect.width - 0.5) * 55);
      mouseY.set((relativeY / rect.height - 0.5) * 55);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("pointermove", handlePointerMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("pointermove", handlePointerMove);
      }
    };
  }, [mouseX, mouseY]);

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y
    };

    setRipples((prev) => [...prev, newRipple]);

    // Cleanup after animation finishes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1200);
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className="w-full h-full relative overflow-hidden bg-[#FAF9F6] border border-neutral-200/45 rounded-2xl flex flex-col justify-between p-6 select-none cursor-crosshair group shadow-[inset_0_2px_4px_rgba(30,30,28,0.01)]"
    >
      {/* Decorative Blueprint Coordinate Graphics & Watermark Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E6E0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      
      {/* Outer subtle framing borders */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-[#A6A299] tracking-widest uppercase flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-pulse" />
        Fig 2. Organic Synthesis
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#A6A299] pointer-events-none">
        03.352 // FLOW_ACTIVE
      </div>

      {/* Blob Layout Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[85%] relative">
          
          {BLOBS.map((blob, idx) => {
            // Apply slight physical response offsets based on the spring mouse values
            const scaleFactor = idx === 0 ? 1 : idx === 1 ? -1.2 : 0.8;
            
            return (
              <motion.div
                key={blob.id}
                style={{
                  position: "absolute",
                  left: `${blob.x}%`,
                  top: `${blob.y}%`,
                  width: blob.size,
                  height: blob.size,
                  translateX: interactiveMod === "attract" ? smoothMouseX : idx % 2 === 0 ? smoothMouseX : undefined,
                  translateY: interactiveMod === "attract" ? smoothMouseY : idx % 2 !== 0 ? smoothMouseY : undefined,
                  transformOrigin: "center center",
                }}
                className="pointer-events-auto"
              >
                <div className="relative w-full h-full">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full drop-shadow-[0_8px_24px_rgba(30,30,28,0.03)]"
                  >
                    <defs>
                      <linearGradient id={`grad_${blob.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={blob.id === 1 ? "#EFECE5" : blob.id === 2 ? "#E0DCD3" : "#F5F3EE"} />
                        <stop offset="100%" stopColor={blob.id === 1 ? "#DCDAD2" : blob.id === 2 ? "#CFC9BD" : "#EBE7DE"} />
                      </linearGradient>
                    </defs>
                    <motion.path
                      animate={{
                        d: blob.paths,
                        scale: [1, 1.05, 0.96, 1],
                        rotate: [0, 12 * Math.sign(scaleFactor), -12 * Math.sign(scaleFactor), 0],
                      }}
                      transition={{
                        duration: blob.speed,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                      fill={`url(#grad_${blob.id})`}
                      className="opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* Ripple Vector Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Dynamic expanding minimalist concentric rings */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 140, height: 140, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="border border-[#777777]/30 rounded-full"
            />
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.4 }}
              animate={{ width: 80, height: 80, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="border border-[#999999]/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>

      {/* Floating Panel Customization Controller */}
      <div className="z-30 mt-auto flex items-center justify-between w-full backdrop-blur-[4px] bg-white/40 border border-[#E5E5E5]/40 py-2 px-3.5 rounded-xl">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono font-medium tracking-wide">Flow Dynamics</span>
          <span className="text-[9px] text-[#777777] font-mono leading-none">Click workspace to ripple shapes</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setInteractiveMod((prev) => (prev === "float" ? "attract" : "float"));
            }}
            className="text-[9px] font-mono px-2 py-1 rounded transition-all tracking-wider bg-stone-200/50 hover:bg-stone-200/80 text-neutral-700 cursor-pointer"
          >
            {interactiveMod === "attract" ? "MAGNETIC" : "FLOATING"}
          </button>
        </div>
      </div>

    </div>
  );
}
