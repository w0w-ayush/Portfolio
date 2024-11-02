"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  X,
  Brain,
  Code2,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";

const ResumeViewer = ({ driveUrl, onClose }: any) => {
  const getEmbedUrl = (url: string) => {
    const fileId = url.match(/\/d\/(.*?)(\/|$)/)?.[1] || url;
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Resume</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            src={getEmbedUrl(driveUrl)}
            className="w-full h-full rounded border-0"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  const [showResume, setShowResume] = useState(false);

  const resumeUrl =
    "https://drive.google.com/file/d/1GmpA0eo8ZFUgHitfpEiUWutBXcV92Ctn/view?usp=sharing";

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ayush-kumar-pandey/",
      label: "LinkedIn",
      component: Linkedin,
    },
    {
      icon: Github,
      href: "https://github.com/w0wayush",
      label: "GitHub",
      component: Github,
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/ayushw0w",
      label: "Twitter",
      component: FaXTwitter,
    },
    {
      icon: SiLeetcode,
      href: "https://leetcode.com/u/ayupandey82/",
      label: "Leetcode",
      component: SiLeetcode,
    },
    {
      icon: SiGeeksforgeeks,
      href: "https://www.geeksforgeeks.org/user/ayushw0w/",
      label: "GeeksforGeeks",
      component: SiGeeksforgeeks,
    },
    {
      icon: Mail,
      href: "mailto:ayushw0w2002@gmail.com",
      label: "Email",
      component: Mail,
    },
  ];

  return (
    <>
      <section
        className="min-h-[90vh] flex items-center justify-center"
        id="home"
      >
        <div className="container max-w-[2000px] px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Full Stack Developer &{" "}
              <span className="gradient-text">Competitive Coder</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Crafting elegant solutions with code and conquering algorithmic
              challenges
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="group"
                onClick={() => setShowResume(true)}
              >
                View Resume
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={scrollToContact}
              >
                Talk to Me
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              {socialLinks.map((social) => {
                const IconComponent = social.component;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {showResume && (
        <ResumeViewer
          driveUrl={resumeUrl}
          onClose={() => setShowResume(false)}
        />
      )}
    </>
  );
}

export default Hero;
