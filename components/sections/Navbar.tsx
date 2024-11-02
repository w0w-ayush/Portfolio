import React, { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/Logo2.png";
import { motion } from "framer-motion";

interface Section {
  title: string;
  href: string;
}

interface Sections {
  [key: string]: Section;
}

const sections: Sections = {
  home: { title: "Home", href: "#home" },
  about: { title: "About", href: "#about" },
  skills: { title: "Skills", href: "#skills" },
  projects: { title: "Projects", href: "#projects" },
  coding: { title: "Coding", href: "#coding" },
  github: { title: "Github", href: "#github" },
  contact: { title: "Contact", href: "#contact" },
};

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      setIsScrolling(true);

      // Set new timeout
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Create observer with higher accuracy
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isScrolling) return;

      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => {
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          return Math.abs(aRect.top) - Math.abs(bRect.top);
        });

      if (visibleSections.length > 0) {
        const targetSection = visibleSections[0].target.id;
        setActiveSection(targetSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-10% 0px -10% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    // Observe all sections
    Object.keys(sections).forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isScrolling]);

  const scrollToSection = useCallback((sectionId: string): void => {
    setIsScrolling(true);
    const element = document.getElementById(sectionId);

    if (element) {
      const navHeight = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active section after scroll with a slight delay
      setTimeout(() => {
        setActiveSection(sectionId);
        setIsScrolling(false);
      }, 800);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg group-hover:blur"></div>
            <Link
              href="/"
              className="relative text-xl md:text-2xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 py-2 px-4 font-cursive"
            >
              <Image
                src={Logo}
                alt="My Logo"
                width={350}
                height={48}
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {Object.entries(sections).map(([id, section]) => (
              <div key={id} className="relative">
                <button
                  onClick={() => scrollToSection(id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300
                    ${
                      activeSection === id
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                >
                  {section.title}
                </button>
                {activeSection === id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                      mass: 1.2,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative group p-2 rounded-lg text-white transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur"></span>
            <span className="relative">
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`mt-2 rounded-lg absolute right-0 w-44 flex flex-col items-center overflow-hidden transition-all duration-300
                ${scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/95"}`}
            >
              {Object.entries(sections).map(([id, section]) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 w-full text-center
                    ${
                      activeSection === id
                        ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <span className="relative">
                    {section.title}
                    {activeSection === id && (
                      <motion.span
                        layoutId="activeMobileSection"
                        className="absolute inset-y-0 left-0 w-1 rounded-r"
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
