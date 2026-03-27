"use client";

import { motion, useInView, useAnimation, type Transition } from "framer-motion";
import { useRef, useEffect } from "react";

const BIRD_PATH =
  "M283.318 0C284.462 1.00504 284.915 1.84629 285.403 3.27777C286.117 5.1598 287.006 6.75516 288.1 8.44444C289.515 10.6692 290.61 12.8776 291.63 15.3055C295.033 23.2742 299.876 30.4634 305.112 37.3333C305.37 37.6725 305.627 38.0118 305.893 38.3613C308.876 42.2756 311.943 46.1031 315.147 49.8385C316.402 51.3112 317.61 52.815 318.811 54.3316C319.554 55.2605 320.303 56.1817 321.059 57.0989C332.578 71.0802 342.216 84.3374 346.116 102.191C346.203 102.587 346.289 102.984 346.379 103.392C346.814 105.396 347.244 107.401 347.661 109.408C349.167 116.565 351.367 122.964 354.591 129.555C355.781 132.055 356.56 134.114 356.705 136.889C356.141 136.825 355.576 136.76 354.994 136.694C345.862 135.693 337.105 135.73 328.166 138.04C319.021 140.397 310.549 138.527 301.751 135.867C291.354 132.778 280.783 131.442 269.975 131.111C269.642 131.101 269.309 131.09 268.966 131.08C252.266 130.637 236.121 134.536 220.583 140.394C220.082 140.58 219.582 140.766 219.066 140.958C218.401 141.211 218.401 141.211 217.721 141.469C216.603 141.778 216.603 141.778 215.269 141.333C219.07 139.357 222.934 137.635 226.916 136.055C227.204 135.941 227.492 135.826 227.788 135.708C247.819 127.762 267.266 124.602 288.697 127.359C292.109 127.796 295.495 128.188 298.941 128.222C299.256 128.23 299.571 128.238 299.896 128.246C302.242 128.219 304.079 127.512 306.002 126.222C306.751 125.417 306.751 125.417 307.086 124.5C307.214 124.217 307.341 123.934 307.473 123.642C313.14 105.662 303.394 82.0021 296.043 65.8298C289.271 50.8596 285.03 35.0041 283.318 18.6667C283.254 18.0498 283.254 18.0498 283.187 17.4204C282.846 13.8062 282.807 10.2118 282.818 6.58333C282.816 5.99045 282.815 5.39756 282.813 4.80468C282.814 3.97066 282.814 3.97066 282.814 3.11979C282.815 2.61609 282.815 2.11239 282.816 1.59342C282.874 0.444444 282.874 0.444444 283.318 0Z";

interface GannetBirdAnimationProps {
  size?: number;
  className?: string;
}

export default function GannetBirdAnimation({
  size = 140,
  className = "",
}: GannetBirdAnimationProps) {
  const ref = useRef(null);
  // once: false para detectar tanto entrada como salida del viewport
  const isInView = useInView(ref, { once: false, margin: "0px" });
  const controls = useAnimation();
  const hasDrawn = useRef(false);

  useEffect(() => {
    // La animación de dibujo (stroke draw + fill reveal) solo se ejecuta una vez
    if (isInView && !hasDrawn.current) {
      controls.start("visible");
      hasDrawn.current = true;
    }
  }, [isInView, controls]);

  // Float: animación infinita cuando está en vista, reposo cuando no
  const floatAnimate = isInView
    ? { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }
    : { y: 0, rotate: 0 };

  const floatTransition: Transition = isInView
    ? { duration: 4, repeat: Infinity, ease: "easeInOut", delay: hasDrawn.current ? 0 : 1.8 }
    : { duration: 0.6, ease: "easeOut" };

  // Pulse glow: mismo comportamiento
  const pulseAnimate = isInView
    ? { opacity: [0, 0.35, 0.15, 0.35, 0.15] }
    : { opacity: 0 };

  const pulseTransition: Transition = isInView
    ? { duration: 3, repeat: Infinity, ease: "easeInOut", delay: hasDrawn.current ? 0 : 1.8 }
    : { duration: 0.3 };

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: size, height: size * (145 / 150) }}
    >
      {/* Float wrapper — se detiene cuando sale del viewport */}
      <motion.div
        style={{ width: "100%", height: "100%" }}
        animate={floatAnimate}
        transition={floatTransition}
      >
        <svg
          viewBox="210 0 150 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            {/* Soft green glow */}
            <filter
              id="gannet-glow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense glow for pulse layer */}
            <filter
              id="gannet-glow-intense"
              x="-80%"
              y="-80%"
              width="260%"
              height="260%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="14"
                result="blur"
              />
            </filter>
          </defs>

          {/* 1. Pulse glow behind — se detiene cuando sale del viewport */}
          <motion.path
            d={BIRD_PATH}
            fill="#00EE8E"
            filter="url(#gannet-glow-intense)"
            initial={{ opacity: 0 }}
            animate={pulseAnimate}
            transition={pulseTransition}
          />

          {/* 2. Stroke draw — traces the outline on enter */}
          <motion.path
            d={BIRD_PATH}
            fill="transparent"
            stroke="#00EE8E"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={controls}
            variants={{
              visible: {
                pathLength: 1,
                transition: {
                  duration: 1.4,
                  ease: [0.4, 0, 0.2, 1],
                },
              },
            }}
          />

          {/* 3. Fill reveal — fades in as stroke finishes */}
          <motion.path
            d={BIRD_PATH}
            fill="#00EE8E"
            filter="url(#gannet-glow)"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  delay: 1.1,
                  duration: 0.55,
                  ease: "easeOut",
                },
              },
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
