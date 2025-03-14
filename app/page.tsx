"use client";

import { Hero } from "@/components/sections/Hero";
import { AboutMe } from "@/components/sections/AboutMe";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { CodingStats } from "@/components/sections/CodingStats";
import { GitHubStats } from "@/components/sections/GitHubStats";
import Navbar from "@/components/sections/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <AboutMe />
      <Skills />
      <Projects />
      <CodingStats />
      <GitHubStats />
      <Contact />
      <Footer />
    </main>
  );
}
