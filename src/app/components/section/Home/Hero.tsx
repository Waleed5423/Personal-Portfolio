"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DarkVeil from "../../comp/Darkveil";
import Image from "next/image";
import Discord from "../../../../../public/Discord.png";
import Fiverr from "../../../../../public/Fiverr.png";
import GitHub from "../../../../../public/Github.png";
import LinkedIn from "../../../../../public/LinkedIn.png";
import Freelancer from "../../../../../public/Freelancer.png";
import Upwork from "../../../../../public/Upwork.png";

const Hero = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setLoaded(true);
    // Format current date as "31 AUG, 25"
    const date = new Date();
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear().toString().slice(-2);
    setCurrentDate(`${day} ${month}, ${year}`);
  }, []);

  // Smooth scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Apply spring physics to scroll progress for extra smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001,
  });

  // Background animations (zooms in)
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  // Content animations (fades out, scales down, moves up)
  const contentOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.7], [1, 0.8]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, -100]);

  // Parallax effects for paragraph and date
  const paraY = useTransform(smoothProgress, [0, 1], [0, 50]);
  const dateY = useTransform(smoothProgress, [0, 1], [0, 50]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Background with zoom effect - fixed position to stay pinned */}
        <motion.div
          className="fixed inset-0 w-full h-full"
          style={{
            scale: backgroundScale,
          }}
        >
          <DarkVeil />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
        </motion.div>

        {/* Glowing Ball in Bottom Right */}
        <motion.div
          className="absolute -bottom-30 -right-40 w-120 h-120 rounded-full z-0"
          initial={{ opacity: 0, scale: 0 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(147,51,234,0.4) 30%, transparent 70%)",
            boxShadow: "0 0 60px 20px rgba(99, 102, 241, 0.5)",
            filter: "blur(50px)",
          }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(79,70,229,0.4) 50%, transparent 70%)",
            }}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-40 -left-50 w-70 h-70 rounded-full z-0"
          initial={{ opacity: 0, scale: 0 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(147,51,234,0.4) 30%, transparent 70%)",
            boxShadow: "0 0 60px 20px rgba(99, 102, 241, 0.5)",
            filter: "blur(50px)",
          }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(79,70,229,0.4) 50%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className=" h-full relative flex flex-col px-4 sm:px-6 my-10 md:px-8 z-10"
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            y: contentY,
          }}
        >
          <motion.div className="w-full text-center relative overflow-hidden mb-6">
            <h1
              className="text-5xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[8rem] 
             font-bold text-white/80 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] 
             mb-4 leading-none"
            >
              {"WALEED ZULFIQAR".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={loaded ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>

            {/* Covering div that slides up to reveal text */}
            <motion.div
              initial={{ y: 0 }}
              animate={loaded ? { y: "-100%" } : {}}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 bg-transparent z-10"
            />
          </motion.div>

          {/* Translucent Mirror Box */}
          <div className="absolute top-1/2 left-3/5 transform -translate-x-1/2 -translate-y-1/2 p-6 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl">
            <div className="w-full h-full flex justify-center items-center">
              <div className="grid grid-cols-3 gap-4 w-full">
                {/* GitHub */}
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex items-center justify-center w-24 h-24 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
                >
                  <Image src={GitHub} alt="GitHub" width={55} height={55} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-24 h-24 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
                >
                  <Image src={LinkedIn} alt="LinkedIn" width={55} height={55} />
                </a>

                {/* Upwork */}
                <a
                  href="https://www.upwork.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Upwork"
                  className="flex items-center justify-center w-24 h-24 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
                >
                  <Image src={Upwork} alt="Upwork" width={55} height={55} />
                </a>

                {/* Fiverr */}
                <a
                  href="https://www.fiverr.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Fiverr"
                  className="flex items-center justify-center w-24 h-24 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
                >
                  <Image src={Fiverr} alt="Fiverr" width={55} height={55} />
                </a>

                {/* Discord */}
                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                  className="flex items-center justify-center w-24 h-24 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
                >
                  <Image src={Discord} alt="Discord" width={55} height={55} />
                </a>

                {/* Portfolio */}
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Portfolio"
                  className="flex items-center justify-center w-24 h-24 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
                >
                  <Image
                    src={Freelancer}
                    alt="Portfolio"
                    width={55}
                    height={55}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-10 z-10 max-w-lg text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{ y: paraY }}
        >
          <p className="sm:text-xl md:text-3xl  leading-relaxed">
            Full-stack developer with expertise in modern web technologies.
            Passionate about creating intuitive user experiences and scalable
            solutions. Currently exploring AI integration in web applications.
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-10 z-10 text-white  text-right"
          initial={{ opacity: 0, x: 50 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ y: dateY }}
        >
          <div className="text-lg md:text-5xl font-semibold">{currentDate}</div>
          <div className="text-sm md:text-base flex items-center justify-end mt-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            AVAILABLE FOR WORK
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
