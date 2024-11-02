"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Monitor, Server, Brain, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Skills() {
  const [activeSet, setActiveSet] = useState(0);

  const skillSets = [
    {
      title: "Front-end Development",
      icon: <Monitor className="w-6 h-6" />,
      description: "Creating responsive and intuitive user interfaces",
      skills: [
        { name: "HTML5/CSS3", level: 90, color: "bg-blue-500" },
        { name: "JavaScript", level: 85, color: "bg-yellow-500" },
        { name: "React", level: 88, color: "bg-cyan-500" },
        { name: "TypeScript", level: 80, color: "bg-blue-600" },
        { name: "Next.js", level: 85, color: "bg-pink-800" },
      ],
    },
    {
      title: "Back-end Development",
      icon: <Server className="w-6 h-6" />,
      description: "Building robust and scalable server-side applications",
      skills: [
        { name: "Node.js", level: 85, color: "bg-green-500" },
        { name: "Express.js", level: 87, color: "bg-gray-600" },
        { name: "Postman", level: 95, color: "bg-yellow-400" },
        { name: "MongoDB", level: 85, color: "bg-green-600" },
        { name: "SQL", level: 82, color: "bg-orange-500" },
        { name: "tRPC", level: 75, color: "bg-blue-500" },
      ],
    },
    {
      title: "Competitive Coding",
      icon: <Brain className="w-6 h-6" />,
      description: "Solving complex algorithmic challenges efficiently",
      skills: [
        {
          name: "Data Structures and Algorithms",
          level: 85,
          color: "bg-indigo-500",
        },
        { name: "C++ / Java", level: 88, color: "bg-purple-500" },
        { name: "Problem Solving", level: 70, color: "bg-pink-500" },
        { name: "Time Complexity", level: 85, color: "bg-violet-500" },
        { name: "Space Optimization", level: 82, color: "bg-fuchsia-500" },
      ],
    },
  ];

  return (
    <section className="py-20 bg-secondary/50" id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">My Skills</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Constantly evolving and mastering new technologies to create
            exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,300px),1fr] gap-8 max-w-screen-xl mx-auto ">
          {/* Skill Set Navigation */}
          <div className="space-y-4">
            {skillSets.map((set, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={set.title}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover:scale-102 border border-slate-800 ${
                    activeSet === index
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setActiveSet(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {set.icon}
                      <div>
                        <h3 className="font-semibold">{set.title}</h3>
                        <p className="text-sm opacity-80">{set.description}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        activeSet === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Skills Detail */}
          <motion.div
            key={activeSet}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Card className="p-6 lg:p-8 border border-slate-800">
              <div className="grid grid-cols-1 gap-8">
                {skillSets[activeSet].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
