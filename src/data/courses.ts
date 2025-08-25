// src/data/courses.ts
export interface Course {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Learn full-stack development from scratch.",
    longDescription:
      "Cover HTML, CSS, JavaScript, React, Node.js and databases. Build and deploy full-stack apps.",
    image: "https://images.unsplash.com/photo-1523475496153-3d6cc450f17d",
  },
  {
    id: 2,
    title: "Data Science with Python",
    description: "Master data analysis and visualization with Python.",
    longDescription:
      "Use NumPy, pandas, Matplotlib and scikit-learn to explore data, build models and communicate insights.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    description: "Build intelligent systems and predictive models.",
    longDescription:
      "Supervised/unsupervised learning, model evaluation, and intro to deep learning concepts.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    id: 4,
    title: "Cloud Computing Fundamentals",
    description: "Understand cloud architecture and services.",
    longDescription:
      "Learn core IaaS/PaaS concepts, networking, scalability, and hands-on with common cloud services.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  },
  {
    id: 5,
    title: "UI/UX Design",
    description: "Design beautiful and user-friendly interfaces.",
    longDescription:
      "Research, wireframing, UI patterns, prototyping, and accessibility best practices.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  },
  {
    id: 6,
    title: "Cybersecurity Basics",
    description: "Learn how to secure systems and protect data.",
    longDescription:
      "Threat modeling, security controls, encryption basics, and secure development practices.",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d7",
  },
  {
    id: 7,
    title: "Mobile App Development",
    description: "Build iOS and Android apps using modern frameworks.",
    longDescription:
      "App architecture, state management, APIs, and publishing workflows.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 8,
    title: "Blockchain Essentials",
    description: "Understand blockchain technology and smart contracts.",
    longDescription:
      "Consensus, wallets, smart contracts basics, and real-world use cases.",
    image: "https://images.unsplash.com/photo-1620113118498-94d776ddf1df",
  },
  {
    id: 9,
    title: "Digital Marketing Mastery",
    description: "Boost brand awareness and drive sales with online marketing.",
    longDescription:
      "SEO, SEM, social media strategy, email marketing, and analytics.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
  },
  {
    id: 10,
    title: "DevOps & CI/CD",
    description: "Automate deployments and improve development workflows.",
    longDescription:
      "Pipelines, IaC basics, monitoring, and containerization principles.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  },
  {
    id: 11,
    title: "Game Development with Unity",
    description: "Create engaging games using Unity and C#.",
    longDescription:
      "Scenes, physics, scripting, UI, and publishing fundamentals.",
    image: "https://images.unsplash.com/photo-1612197527762-8cfb55b8a2d7",
  },
  {
    id: 12,
    title: "Big Data Analytics",
    description: "Process and analyze massive datasets with modern tools.",
    longDescription:
      "Data pipelines, distributed processing concepts, and visualization.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  },
  {
    id: 13,
    title: "Internet of Things (IoT)",
    description: "Connect devices and build IoT applications.",
    longDescription:
      "Sensors, protocols, cloud integration, and security considerations.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: 14,
    title: "Ethical Hacking & Pen Testing",
    description: "Hands-on skills to test and secure systems.",
    longDescription:
      "Reconnaissance, exploitation basics, reporting, and best practices.",
    image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
  },
  {
    id: 15,
    title: "AR/VR Development",
    description: "Build immersive experiences with AR and VR tech.",
    longDescription:
      "3D concepts, interaction design, and performance optimization.",
    image: "https://images.unsplash.com/photo-1605647540924-852290f4ef88",
  },
  {
    id: 16,
    title: "SQL & Database Management",
    description: "Design, query, and manage relational databases.",
    longDescription:
      "Schema design, indexing, transactions, and optimization basics.",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
  },
  {
    id: 17,
    title: "Business Analytics with Excel",
    description: "Use Excel to derive insights and support decisions.",
    longDescription:
      "Functions, pivot tables, charts, and simple forecasting tools.",
    image: "https://images.unsplash.com/photo-1581090700227-4c4d1a03d0c6",
  },
  {
    id: 18,
    title: "Software Testing & QA",
    description: "Learn manual and automated testing for QA.",
    longDescription:
      "Test planning, automation intro, and CI integration strategies.",
    image: "https://images.unsplash.com/photo-1581092335405-284eab7aa9f3",
  },
];

export const getCourseById = (id: number) =>
  courses.find((c) => c.id === id);
