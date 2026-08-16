/**
 * Obsidian Field Notes content registry.
 * Edit portfolio facts, links, project records, and labels here; layout code stays in Home.tsx.
 */
export const portfolioData = {
  brand: {
    name: "JAINAM",
    identity: "Student Builder · AI Explorer · Product Thinker",
    positioning:
      "I build intelligent products that turn real-world problems into useful experiences.",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Lab", href: "#lab" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Independent field notes · India",
    headline: "Building ideas into intelligent products.",
    support:
      "I'm Jainam — a student builder and AI explorer focused on creating useful digital products, experimenting with emerging technologies, and solving real-world problems through software.",
    process: ["Idea", "Build", "Test", "Iterate", "Launch"],
    primaryCta: "Explore selected work",
    secondaryCta: "Read the notes",
    art: "/manus-storage/jainam-signal-hero_543adf6e.jpg",
  },
  about: {
    title: "A working record, not a finished story.",
    body:
      "Student builder and AI explorer with a strong interest in artificial intelligence, software development, automation, UI/UX, and digital product development. Passionate about transforming ideas into practical digital products and exploring emerging technologies, AI-assisted development, automation, and product design. Not building for its own sake — building, testing, and shipping.",
    interests: [
      "Artificial Intelligence",
      "Software Development",
      "Automation",
      "UI/UX",
      "Product Design",
      "Robotics",
      "EdTech",
      "Entrepreneurship",
      "Emerging Technologies",
    ],
  },
  status: {
    eyebrow: "Current coordinates",
    title: "Student / Builder / AI Explorer",
    items: [
      {
        label: "Education",
        value:
          "Sneha Lata Rane College — Std. 11, Science (PCM). Previously Bengali Education Society High School, Dadar (SSC, Maharashtra Board — 86%).",
      },
      { label: "Stream", value: "Science (PCM); preparing for JEE alongside building" },
      { label: "Location", value: "India" },
      {
        label: "Current focus",
        value: "Preparing for JEE while building AI-powered products in parallel.",
      },
    ],
  },
  projects: [
    {
      index: "01",
      title: "FocusPath",
      categories: "AI · EdTech · Product Design · Web Development",
      role: "Founder & Builder",
      summary:
        "An AI-powered platform designed to act as a digital mentor for students — helping them understand their strengths, explore career opportunities, improve productivity, and make better decisions.",
      status: "In active product design and planning — implementation stack not yet finalized.",
      media: "/manus-storage/jainam-signal-focuspath_a2dda31b.jpg",
      contributions: [
        "Defined the product vision and core user experience.",
        "Designed strengths-and-weaknesses discovery, career exploration, and guidance concepts.",
        "Planned productivity, goals, tasks, and study-tracking features.",
        "Worked on personalized onboarding and student experiences.",
        "Explored authentication, data-management concepts, supporting web experiences, and product analytics.",
      ],
      caseStudy: {
        Problem:
          "Students need support to understand their strengths, explore career opportunities, improve productivity, and make better decisions.",
        Insight:
          "A digital mentor can bring strengths discovery, career exploration, and guidance concepts into one student-focused experience.",
        Solution:
          "FocusPath is being designed as an AI-powered platform that supports these areas of student decision-making and productivity.",
        Product:
          "Concepts include personalized onboarding, strengths-and-weaknesses discovery, career exploration, guidance, goals, tasks, and study tracking.",
        Technology: "Implementation stack not yet finalized.",
        Challenges: "[To be documented]",
        Outcome: "In active product design and planning.",
        Learnings: "[To be documented]",
      },
    },
    {
      index: "02",
      title: "LaunchFlow",
      categories: "AI · Automation · Developer Tools · Software Development",
      role: "AI Developer Automation Concept",
      summary:
        "An AI-powered developer assistant concept designed to automate repetitive tasks after software development: source-code analysis, technology-stack detection, project organization, documentation generation, GitHub preparation, configuration generation, commit messages, and deployment workflows.",
      status: "Concept stage — technical architecture not yet finalized.",
      media: "/manus-storage/launchflow-artifact_b71eb3f6.jpg",
      contributions: [],
      caseStudy: {
        Problem:
          "Software projects often involve repetitive post-development preparation across analysis, organization, documentation, GitHub preparation, configuration, commits, and deployment workflows.",
        Insight:
          "An AI-powered assistant could gather these follow-up workflows into a more organized developer experience.",
        Solution:
          "LaunchFlow is an AI developer automation concept for source-code analysis, technology-stack detection, project organization, documentation generation, GitHub preparation, configuration generation, commit messages, and deployment workflows.",
        Product: "AI developer assistant concept.",
        Technology: "Technical architecture not yet finalized.",
        Challenges: "[To be documented]",
        Outcome: "Concept stage.",
        Learnings: "[To be documented]",
      },
    },
    {
      index: "03",
      title: "Digital Business Bill Book",
      categories: "Business · Automation · Digital Transformation · UI/UX",
      role: "Product Concept & Builder",
      summary:
        "A digital billing and customer-management solution concept designed to modernize a traditional family-business workflow: customer management, digital billing, bill generation, organized records.",
      status:
        "Concept stage — designed around a real family business's actual workflow, technology not yet finalized.",
      media: "/manus-storage/billbook-artifact_6fac11df.jpg",
      contributions: [],
      caseStudy: {
        Problem:
          "A traditional family-business workflow needs a more organized approach to customer management, billing, bill generation, and records.",
        Insight:
          "Digital transformation can begin with the actual workflow already used by the family business.",
        Solution:
          "A digital billing and customer-management solution concept designed around that real workflow.",
        Product: "Customer management, digital billing, bill generation, and organized records.",
        Technology: "Technology not yet finalized.",
        Challenges: "[To be documented]",
        Outcome: "Concept stage.",
        Learnings: "[To be documented]",
      },
    },
    {
      index: "04",
      title: "Curiox",
      categories: "AI · Coding · Innovation · Entrepreneurship",
      role: "Founder / Builder",
      summary:
        "A student-focused community concept for ambitious students, coders, technology enthusiasts, and future founders: community building, networking, personal branding, future-focused learning.",
      status: "Concept stage.",
      media: "/manus-storage/jainam-signal-project-grid_681cb0f5.jpg",
      contributions: [],
      caseStudy: {
        Problem:
          "Ambitious students, coders, technology enthusiasts, and future founders need spaces for community building, networking, personal branding, and future-focused learning.",
        Insight:
          "A student-focused community concept can bring these opportunities into one place.",
        Solution: "Curiox is a concept for a student-focused community.",
        Product:
          "Community building, networking, personal branding, and future-focused learning.",
        Technology: "[To be documented]",
        Challenges: "[To be documented]",
        Outcome: "Concept stage.",
        Learnings: "[To be documented]",
      },
    },
  ],
  skills: [
    {
      title: "AI & Automation",
      items: [
        "AI product ideation",
        "Prompt engineering",
        "AI-assisted development",
        "Automation concepts",
        "AI tool utilization",
      ],
    },
    {
      title: "Development",
      items: [
        "HTML & CSS",
        "JavaScript",
        "React (learning)",
        "GitHub",
        "Web application development",
        "Application prototyping",
      ],
    },
    {
      title: "Product",
      items: [
        "Product ideation",
        "Problem solving",
        "Feature planning",
        "User-centric design",
        "Digital product development",
        "Startup/product thinking",
      ],
    },
    {
      title: "Design",
      items: [
        "UI/UX design",
        "Figma",
        "Canva",
        "Interface design",
        "Product experience planning",
      ],
    },
    {
      title: "Builder Mindset",
      items: [
        "Experimentation",
        "Rapid prototyping",
        "Iteration",
        "Independent learning",
      ],
    },
  ],
  process: [
    { number: "01", title: "Observe", detail: "Find a real problem." },
    { number: "02", title: "Think", detail: "Understand the user and the opportunity." },
    { number: "03", title: "Build", detail: "Turn the idea into a working product." },
    { number: "04", title: "Iterate", detail: "Test, improve, keep learning." },
  ],
  strengths: [
    {
      title: "Problem Solving",
      statement: "I enjoy turning practical problems into systems that can actually be used.",
      evidence: "Digital Business Bill Book",
    },
    {
      title: "Product Thinking",
      statement: "I define product vision and core user experience around the people a product is meant to help.",
      evidence: "FocusPath",
    },
    {
      title: "Workflow Design",
      statement: "I explore how repetitive product and development tasks can be organized more thoughtfully.",
      evidence: "LaunchFlow",
    },
  ],
  experience: {
    label: "2026 — Present",
    title: "Independent Product Builder",
    description:
      "Working on AI-powered products, software experiments, automation systems, and digital experiences.",
  },
  achievements: {
    title: "Achievements & Milestones",
    detail: "Coming Soon",
  },
  exploring: [
    "Artificial Intelligence",
    "AI Agents",
    "Automation",
    "Product Development",
    "Advanced Software Development",
    "Human + AI Interaction",
  ],
  philosophy: {
    quote: "Build. Learn. Iterate.",
    body:
      "Every project is an experiment. Every experiment teaches something. The goal isn't to build more — it's to build better.",
  },
  journey: ["Student", "Curious Learner", "Developer", "Product Builder", "AI Explorer"],
  lab: {
    title: "JAINAM / LAB",
    body:
      "An active index of the areas I am currently exploring. Select a module to open its working note.",
    note: "No public notes have been added yet.",
    modules: [
      "Artificial Intelligence",
      "AI Agents",
      "Automation",
      "Product Development",
      "Advanced Software Development",
      "Human + AI Interaction",
    ],
  },
  resume: {
    title: "The concise record.",
    body: "A concise PDF record of my background, selected work, and areas of interest.",
    url: "/manus-storage/jainam-jain-resume_e5213426.pdf",
    fileLabel: "Jainam Jain — Resume (PDF)",
  },
  contact: {
    title: "A good question is a good place to start.",
    body:
      "For a thoughtful conversation about products, AI, or a real-world problem worth exploring, get in touch.",
    email: "jainjainam0530@gmail.com",
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jainam-jain-83b0b341a" },
      { label: "GitHub", href: "https://github.com/jainjainam0530-sketch" },
      { label: "Instagram", href: "https://instagram.com/ursjainam" },
    ],
    languages: "English, Hindi, Gujarati",
  },
} as const;
