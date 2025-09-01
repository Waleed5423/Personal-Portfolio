"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DarkVeil from "../../comp/Darkveil";
import Image from "next/image";

// Social icons
import Discord from "../../../../../public/Discord.png";
import Fiverr from "../../../../../public/Fiverr.png";
import GitHub from "../../../../../public/Github.png";
import LinkedIn from "../../../../../public/LinkedIn.png";
import Freelancer from "../../../../../public/Freelancer.png";
import Upwork from "../../../../../public/Upwork.png";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/", icon: GitHub, alt: "GitHub" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: LinkedIn,
    alt: "LinkedIn",
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/",
    icon: Upwork,
    alt: "Upwork",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/",
    icon: Fiverr,
    alt: "Fiverr",
  },
  {
    name: "Discord",
    url: "https://discord.com/",
    icon: Discord,
    alt: "Discord",
  },
  { name: "Portfolio", url: "/", icon: Freelancer, alt: "Portfolio" },
];

/* ---------------------- DESKTOP VERSION ---------------------- */
const HeroDesktop = ({
  loaded,
  currentDate,
}: {
  loaded: boolean;
  currentDate: string;
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001,
  });

  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.7], [1, 0.8]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const paraY = useTransform(smoothProgress, [0, 1], [0, 50]);
  const dateY = useTransform(smoothProgress, [0, 1], [0, 50]);

  return (
    <div
      ref={containerRef}
      className="hidden sm:block relative w-full h-screen overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="fixed inset-0 w-full h-full"
        style={{ scale: backgroundScale }}
      >
        {/* <DarkVeil /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
      </motion.div>

      {/* Glowing balls */}
      <motion.div
        className="absolute -bottom-20 -right-32 w-80 h-80 rounded-full z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(147,51,234,0.4) 30%, transparent 70%)",
          boxShadow: "0 0 60px 20px rgba(99, 102, 241, 0.5)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        className="absolute bottom-32 -left-32 w-56 h-56 rounded-full z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(147,51,234,0.4) 30%, transparent 70%)",
          boxShadow: "0 0 60px 20px rgba(99, 102, 241, 0.5)",
          filter: "blur(50px)",
        }}
      />

      {/* Content */}
      <motion.div
        className="h-full relative flex flex-col px-6 md:px-8 z-10"
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
      >
        {/* Title */}
        <motion.div className="w-full text-center my-6">
          <h1 className="text-5xl md:text-6xl lg:text-[7rem] font-bold text-white/80 leading-none">
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
        </motion.div>

        {/* Social Box */}
        <motion.div
          className="absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 
            p-6 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={loaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        >
          <div className="grid grid-cols-3 gap-4 w-full h-full place-items-center">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="flex items-center justify-center w-20 h-20 rounded-md 
                bg-white/10 border border-white/20 hover:scale-110 transition-transform"
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={loaded ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + index * 0.1,
                  ease: "backOut",
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                  transition: { duration: 0.2 },
                }}
              >
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={48}
                  height={48}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Paragraph */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-10 z-10 max-w-lg text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={loaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.0 }}
        style={{ y: paraY }}
      >
        <p className="text-lg md:text-2xl leading-relaxed">
          Full-stack developer with expertise in modern web technologies.
          Passionate about creating intuitive user experiences and scalable
          solutions. Currently exploring AI integration in web applications.
        </p>
      </motion.div>

      {/* Date */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-10 z-10 text-white text-right"
        initial={{ opacity: 0, x: 50 }}
        animate={loaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ y: dateY }}
      >
        <div className="text-xl md:text-4xl font-semibold">{currentDate}</div>
        <div className="text-sm md:text-base flex items-center justify-end mt-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
          AVAILABLE FOR WORK
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------------- MOBILE VERSION ---------------------- */
const HeroMobile = ({
  loaded,
  currentDate,
}: {
  loaded: boolean;
  currentDate: string;
}) => {
  return (
    <div className="sm:hidden w-full min-h-[100dvh] bg-gray-900 flex flex-col justify-center items-start  relative overflow-hidden">
      {/* Background */}
      <DarkVeil />
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        className="absolute -bottom-20 -right-32 w-80 h-80 rounded-full z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(147,51,234,0.4) 30%, transparent 70%)",
          boxShadow: "0 0 60px 20px rgba(99, 102, 241, 0.5)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        className="absolute bottom-32 -left-32 w-56 h-56 rounded-full z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(147,51,234,0.4) 30%, transparent 70%)",
          boxShadow: "0 0 60px 20px rgba(99, 102, 241, 0.5)",
          filter: "blur(50px)",
        }}
      />
      <div className="space-y-8 relative w-full flex flex-col justify-center items-center text-center px-2">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full text-center z-10"
        >
          <h1 className="text-7xl sm:text-6xl font-semibold text-white">
            WALEED ZULFIQAR
          </h1>
        </motion.div>

        {/* Social Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto w-max z-10"
        >
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-20 h-20 rounded-md 
                bg-gray-700 border border-gray-600 hover:bg-gray-600 transition-colors"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={loaded ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                    ease: "backOut",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    width={40}
                    height={40}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full z-10 px-6"
        >
          <p className="text-gray-300 text-lg leading-relaxed text-left">
            Full-stack developer with expertise in modern web technologies.
            Passionate about creating intuitive user experiences and scalable
            solutions. Currently exploring AI integration in web applications.
          </p>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full z-10 px-6"
        >
          <div className="text-left">
            <div className="text-2xl font-semibold text-white">
              {currentDate}
            </div>
            <div className="text-base text-gray-400 flex items-center mt-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              AVAILABLE FOR WORK
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ---------------------- MAIN HERO ---------------------- */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setLoaded(true);
    const date = new Date();
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear().toString().slice(-2);
    setCurrentDate(`${day} ${month}, ${year}`);
  }, []);

  return (
    <>
      <HeroDesktop loaded={loaded} currentDate={currentDate} />
      <HeroMobile loaded={loaded} currentDate={currentDate} />
    </>
  );
};

export default Hero;
