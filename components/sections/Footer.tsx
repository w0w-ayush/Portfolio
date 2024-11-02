import React from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";
import Logo from "@/app/assets/Logo2.png";
import Link from "next/link";

const sections = {
  home: { title: "Home", href: "#home" },
  about: { title: "About", href: "#about" },
  skills: { title: "Skills", href: "#skills" },
  projects: { title: "Projects", href: "#projects" },
  coding: { title: "Coding", href: "#coding" },
  github: { title: "Github", href: "#github" },
  contact: { title: "Contact", href: "#contact" },
};

const Footer = () => {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/85 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={250}
                height={36}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Transforming ideas into elegant digital solutions through creative
              development and innovative design.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white font-medium mb-4">Navigation</h3>
              <ul className="space-y-2">
                {Object.entries(sections)
                  .slice(0, 4)
                  .map(([id, section]) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Links</h3>
              <ul className="space-y-2">
                {Object.entries(sections)
                  .slice(4)
                  .map(([id, section]) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-medium mb-4">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/w0wayush"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-kumar-pandey/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/ayushw0w"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} All rights reserved. Built with passion and
              precision.
            </p>
            {/* <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
