"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import StudyNotion from "@/app/assets/studynotion.png";
import MagicFit from "@/app/assets/magicfit.png";
import Glitch from "@/app/assets/glitch.png";

export function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

  const projects = [
    {
      title: "StudyNotion Edtech Platform",
      image: StudyNotion,
      description: [
        "Developed a comprehensive edtech platform, featuring a robust backend for seamless user interactions, course participation, video uploads, content management, and full CRUD operations using RESTful API principles.",
        "Implemented user authentication and authorization features using JSON Web Tokens (JWT), ensuring secure access to personalized content and protecting sensitive user data.",
        "Streamlined automated deployment, utilized version control systems, and integrated a Razor Pay payment integration for seamless payment",
      ],
      tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "Express",
        "Tailwind CSS",
        "Node.js",
        "MongoDB",
        "Redux",
        "React",
        "Git",
      ],
      github: "https://github.com/w0wayush/StudyNotion-Main",
      demo: "https://edtech-studynotion.netlify.app/",
    },
    {
      title: "MyMagic Fit",
      image: MagicFit,
      description: [
        "Developed on demand for a company, MyMagic Fit was built using React.js with Redux for robust state management and Tailwind CSS for a modern, responsive design, resulting in a 25% improvement in user satisfaction.",
        "Worked as the backend developer, utilizing Node.js and MongoDB to create a platform that simplifies finding the perfect fit by comparing new clothes with existing ones.",
        "Enhanced development efficiency by 20% through efficient state management and Git version control.",
      ],
      tech: [
        "HTML",
        "Tailwind CSS",
        "Bootstrap",
        "Express",
        "Git",
        "Material UI",
        "ShadCN UI",
        "MongoDB",
        "Node.js",
        "React",
        "Zod",
        "Redux",
      ],
      github: "https://github.com/w0wayush/MyMagic-Fit",
      demo: "https://mymagic-fit.netlify.app/",
    },
    {
      title: "Glitchh - Chat Platform",
      image: Glitch,
      description: [
        "Chat Functionality: Allows real-time chat between users, providing seamless communication.",
        "Inbuilt To-Do List: Integrated to-do list feature to help users keep track of tasks and manage their time effectively.",
        "Responsive Design: Ensures a better user experience across various devices and screen sizes.",
        "State Management: Utilizes Redux for efficient and centralized state management, improving application performance and maintainability.",
      ],
      tech: [
        "Firebase",
        "Firestore",
        "TypeScript",
        "JavaScript",
        "Material UI",
        "Redux",
        "Tailwind CSS",
        "React",
      ],
      github: "https://github.com/w0wayush/Glitchat-App",
      demo: "https://glitch-chat-app.netlify.app/",
    },

    /*     {
      title: "w0wUnity - Social Media",
      description: [
        "This social media platform allows users to create both public and private posts. Built using the MERN stack and TypeScript, it offers a dynamic and responsive user experience across different screen sizes.",
        "The app showcases robust state management using Recoil and ensures comprehensive input validation using Zod, preventing any invalid data entries.",
        "It includes functionality for liking, unliking, and commenting on posts.",
        "The website provides an intuitive and responsive user experience for managing tasks efficiently, with a full RESTful API backend built using Node.js and TypeScript.",
      ],
      tech: [
        "HTML",
        "Tailwind CSS",
        "TypeScript",
        "Bootstrap",
        "Express",
        "Git",
        "Material UI",
        "MongoDB",
        "Node.js",
        "React",
        "Zod",
        "Recoil",
      ],
      github: "https://github.com/w0wayush/w0wUnity-Social-Media",
      demo: "https://w0w-unity.netlify.app/",
    },
    {
      title: "Fullstack Todo App",
      description: [
        "This app showcases robust state management and comprehensive input validation using Zod. By leveraging Zod, the app ensures that all inputs are validated, preventing any invalid data entries.",
        "The dynamic website provides an intuitive and responsive user experience for managing tasks efficiently.",
        "Exposed POST, GET, PATCH and DELETE HTTP methods using Express",
        "A CRUD application exposed using a RESTful API made with Node.js",
      ],
      tech: [
        "HTML",
        "CSS",
        "TypeScript",
        "Material UI",
        "Zod",
        "Recoil",
        "Express",
        "Node.js",
        "MongoDB",
        "Redux",
      ],
      github: "https://github.com/w0wayush/TS-Todo-App",
      demo: "https://glitch-todo-app.netlify.app",
    }, */
  ];

  return (
    <section className="py-20" id="projects">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-4">My Projects</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          A showcase of my technical expertise in full-stack development,
          featuring projects built with modern technologies
        </p>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => {
            const isExpanded = expandedIndex === index;
            const joinedDescription = project.description.join(" ");
            const truncatedDescription = joinedDescription.slice(0, 100);
            const showExpandButton = joinedDescription.length > 100;

            return (
              <Card
                key={project.title}
                className={`p-8 bg-card hover:shadow-lg transition-all duration-300 ${
                  isExpanded ? "scale-105" : ""
                }`}
              >
                <div className="flex flex-col gap-8">
                  {/* Project Image */}
                  <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="object-cover object-top hover:object-bottom transition-all duration-3000 ease-in-out"
                      fill
                      quality={95}
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl font-bold text-primary/20">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <h3 className="text-2xl font-semibold">
                          {project.title}
                        </h3>
                      </div>

                      <div className="space-y-3 mb-6">
                        {isExpanded ? (
                          project.description.map((point, i) => (
                            <p key={i} className="text-muted-foreground">
                              • {point}
                            </p>
                          ))
                        ) : (
                          <p className="text-muted-foreground">
                            {truncatedDescription}
                            {showExpandButton && "..."}
                          </p>
                        )}

                        {showExpandButton && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedIndex(isExpanded ? null : index)
                            }
                            className="mt-2 hover:bg-transparent hover:text-primary"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 mr-1" />
                            ) : (
                              <ChevronDown className="w-4 h-4 mr-1" />
                            )}
                            {isExpanded ? "Show Less" : "Read More"}
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="lg:w-1/3 flex flex-col justify-between">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1 hover:bg-primary hover:text-primary-foreground"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-5 h-5 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1 hover:bg-primary hover:text-primary-foreground"
                          asChild
                        >
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
