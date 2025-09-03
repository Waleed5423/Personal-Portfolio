"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Code2, Mail, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Navigation items with Lucide icons
  const navItems = [
    { name: "Home", icon: Home, href: "#home" },
    { name: "About", icon: User, href: "#about" },
    { name: "Projects", icon: Briefcase, href: "#projects" },
    { name: "Skills", icon: Code2, href: "#skills" },
    { name: "Contact", icon: Mail, href: "#contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavbarClick = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  return (
    <>
      {/* Mobile Navbar (Top) - For small screens (sm) */}
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex lg:hidden items-center justify-end p-4"
        style={{
          backgroundColor: isNavbarActive
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
          backdropFilter: isNavbarActive ? "blur(10px)" : "none",
        }}
        onClick={handleNavbarClick}
      >
        {/* Hamburger Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-transparent transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 pt-20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center space-y-8 p-4"
              >
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full max-w-xs"
                    >
                      <a
                        href={item.href}
                        className="flex items-center justify-center space-x-3 text-lg font-medium text-white bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent size={20} />
                        <span>{item.name}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Tablet Horizontal Navbar (Bottom) - For medium screens (md) */}
      <motion.nav
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex lg:hidden items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg space-x-2"
      >
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.a
              key={index}
              href={item.href}
              className="relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer group"
              whileHover="hover"
              initial="initial"
            >
              {/* Animated background */}
              <motion.div className="absolute inset-0 bg-gray-400 group-hover:bg-gray-600 rounded-full opacity-70" />

              {/* Animated icon */}
              <motion.div className="relative z-10">
                <IconComponent size={20} className="text-white" />
              </motion.div>

              {/* Tooltip for tablet */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -40 }}
                className="absolute top-0 -translate-y-full bg-black/80 text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
              >
                {item.name}
              </motion.span>
            </motion.a>
          );
        })}
      </motion.nav>

      {/* Desktop Vertical Navbar (Right Side) - For large screens and above (lg, xl) */}
      <motion.nav
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-6 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
      >
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.a
              key={index}
              href={item.href}
              className="relative  lg:w-8 lg:h-8 xl:w-12 xl:h-12 flex items-center justify-center rounded-full cursor-pointer group"
              whileHover="hover"
              initial="initial"
            >
              {/* Animated background */}
              <motion.div className="absolute inset-0 bg-gray-400 group-hover:bg-gray-600 rounded-full opacity-70" />

              {/* Animated icon */}
              <motion.div className="relative z-10">
                <IconComponent size={24} className="text-white" />
              </motion.div>

              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: -45 }}
                className="absolute left-0 -translate-x-full bg-black/80 text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
              >
                {item.name}
              </motion.span>
            </motion.a>
          );
        })}
      </motion.nav>
    </>
  );
};

export default Navbar;
