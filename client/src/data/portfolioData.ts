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
    ownerLabel: "Portfolio of",
    ownerName: "Jainam Jain",
    ownerTitle: "Software Developer",
    liveLabel: "Live focus",
    headline: "Building ideas into intelligent products.",
    support:
      "I’m Jainam Jain, a student builder and AI explorer in India focused on useful digital products, emerging technologies, and real-world problems approached through software.",
    aboutMeLabel: "About me",
    aboutMe:
      "I turn early observations into focused product directions, then learn through planning, building, and iteration.",
    expertiseLabel: "Expertise",
    expertise: ["AI & intelligent products", "Software development", "Automation & product thinking"],
    process: ["Idea", "Build", "Test", "Iterate", "Launch"],
    primaryCta: "Explore selected work",
    secondaryCta: "Read the notes",
    art: "/manus-storage/jainam-signal-hero_543adf6e.jpg",
  },
  loadingHints: [
    { threshold: 24, label: "Perspective", message: "Start with the problem, not the feature." },
    { threshold: 48, label: "Clarity", message: "Useful products fit a real workflow." },
    { threshold: 74, label: "Iteration", message: "Build a small version, learn, then refine." },
    { threshold: 100, label: "Direction", message: "Ideas become products through deliberate steps." },
  ],
  about: {
    title: "A student builder with a product-first lens.",
    lead:
      "I am learning by turning observations into product directions — then planning, testing, and improving the experience behind them.",
    body:
      "My interests sit at the intersection of artificial intelligence, software development, automation, UI/UX, and digital product development. I am especially drawn to the early work of shaping an idea: understanding the user, clarifying the opportunity, and mapping a useful experience before it is built.",
    profileFacts: [
      { label: "Current role", value: "Student / Builder / AI Explorer" },
      { label: "Education", value: "Std. 11, Science (PCM) · Sneha Lata Rane College" },
      { label: "Current focus", value: "JEE preparation and AI-powered products" },
      { label: "Working method", value: "Build. Learn. Iterate." },
    ],
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
      focusLabel: "Focus / Student guidance, productivity, and decision-making",
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
      focusLabel: "Focus / Post-development developer workflows",
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
      focusLabel: "Focus / A real family-business billing workflow",
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
      focusLabel: "Focus / Student community and future-focused learning",
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
    modules: [
      "Artificial Intelligence",
      "AI Agents",
      "Automation",
      "Product Development",
      "Advanced Software Development",
      "Human + AI Interaction",
    ],
    notes: [
      {
        stage: "Exploration draft",
        question: "How can an AI tool be genuinely useful while making its uncertainty easy to understand?",
        summary: "I am interested in assistants that help people move from a vague question to a clearer next action. The design challenge is not only producing an answer; it is showing what the system knows, what it is inferring, and where a person should make the final decision.",
        next: "Map a simple decision-support flow with explicit confidence and review points.",
      },
      {
        stage: "Exploration draft",
        question: "What should an agent handle automatically, and where should a person remain in control?",
        summary: "Agentic systems are most interesting when they reduce repetitive effort without making a workflow opaque. I am exploring task boundaries, tool permissions, and approval moments that keep an assistant useful without making it overconfident.",
        next: "Sketch a task agent that proposes actions, requests approval, and records a clear activity trail.",
      },
      {
        stage: "Exploration draft",
        question: "Which small repetitive tasks are worth automating first?",
        summary: "Good automation starts with a workflow that is frequent, predictable, and frustrating enough to deserve attention. I am looking at how triggers, simple rules, and clear exceptions can make a process faster without creating a system that is difficult to trust or maintain.",
        next: "Document one everyday workflow as a trigger, action, exception, and review loop.",
      },
      {
        stage: "Exploration draft",
        question: "How can an early product idea become specific enough to test?",
        summary: "Before building, I want to understand the person, the moment, and the smallest useful outcome. This note focuses on turning an observation into a focused problem statement, a simple user flow, and one testable assumption instead of starting with a long feature list.",
        next: "Create a one-page concept brief for a real workflow and define its smallest useful version.",
      },
      {
        stage: "Exploration draft",
        question: "What makes a technical system easier to extend after its first version?",
        summary: "I am studying how good structure can make future changes less risky. Clear responsibilities, predictable data flow, readable components, and practical documentation matter because they let a system grow without becoming confusing to the people building it.",
        next: "Break down a small feature into interface, state, data, and test responsibilities before implementation.",
      },
      {
        stage: "Exploration draft",
        question: "How should people understand, guide, and challenge AI in a product experience?",
        summary: "Human–AI interaction should make a person feel more capable, not less involved. I am exploring how interface language, clear controls, feedback, and reversible actions can help people understand what an AI system is doing and decide when to rely on it.",
        next: "Prototype an AI-assisted screen with a visible rationale, editable output, and a simple undo path.",
      },
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
