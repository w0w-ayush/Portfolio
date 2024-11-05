"use client";

import { Card } from "@/components/ui/card";
import { Laptop, Trophy, Palette, Globe2, Code2, Brain } from "lucide-react";
import { motion } from "framer-motion";

export function AboutMe() {
  const cards = [
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Full Stack Developer",
      description: "MERN Stack | Next.js | Postman",
      className: "bg-blue-500/10 hover:bg-blue-500/20",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Coder",
      description: "LeetCode | GeeksforGeeks",
      className: "bg-yellow-500/10 hover:bg-yellow-500/20",
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Problem Solver",
      description: "DSA | Problem Solving | System Design",
      className: "bg-green-500/10 hover:bg-green-500/20",
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      title: "Open Source",
      description: "GitHub | Contributing | Learning",
      className: "bg-indigo-500/10 hover:bg-indigo-500/20",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Always Learning",
      description: "New Tech | Best Practices | Innovation",
      className: "bg-red-500/10 hover:bg-red-500/20",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Tailwind | Shadcn | Responsive",
      className: "bg-pink-500/10 hover:bg-pink-500/20",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28" id="about">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6">
          <Card className="p-6 sm:p-8 bg-card col-span-1 lg:col-span-2 h-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Full Stack Developer & Competitive Coder
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm sm:text-base">
                Hello! I'm a passionate full stack developer with a love for
                both front-end and back-end technologies. My journey in the
                world of coding has been fueled by curiosity and a constant
                desire to learn and improve. With expertise in the MERN stack
                (MongoDB, Express.js, React, Node.js) and modern frameworks like
                Next.js, I strive to create efficient and user-friendly
                applications. I'm also an active open source contributor,
                believing in the power of collaborative development and giving
                back to the community.
              </p>
              <p className="text-sm sm:text-base">
                When I'm not building web applications, you can find me solving
                algorithmic problems on various competitive coding platforms.
                This not only sharpens my problem-solving skills but also helps
                me write more efficient code in my day-to-day work. I've solved
                600+ DSA problems across platforms like LeetCode and
                GeeksforGeeks, constantly pushing myself to improve my
                algorithmic thinking. I'm always learning, exploring new
                technologies, best practices, and innovative solutions to
                continuously improve myself and the work I deliver.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4 sm:gap-4 h-full">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <Card
                  className={`h-full p-4 sm:p-6 flex flex-col items-center justify-center text-center transition-colors duration-300 ${card.className}`}
                >
                  <div className="mb-2 sm:mb-3 text-primary">{card.icon}</div>
                  <h4 className="font-medium text-sm sm:text-base mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
