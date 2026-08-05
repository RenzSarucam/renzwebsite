export type Project = {
  title: string;
  desc: string;
  tags: string[];
  type: string | string[];
  status: string;
  link: string;
  place?: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  color: string;
  image: string;
};

export type WorkExperience = {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  projects?: string;
  autoProjectsFromPlace?: string;
  tools: string[];
};

export type Education = {
  level: string;
  degree: string;
  school: string;
  period: string;
  status: string;
  highlights: string[];
};

export type Skill = {
  name: string;
  level: number;
};

export type SkillGroup = {
  category: string;
  icon: string;
  skills: Skill[];
};

export const contactEmail = "renzcarljansen@gmail.com";

export const techStack = [
  { name: "JavaScript", color: "#f7df1e" },
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#1d9e75" },
  { name: "HTML/CSS", color: "#e34c26" },
  { name: "Next.js", color: "#e8f4ff" },
  { name: "Docker", color: "#2496ed" },
  { name: "Git/GitHub", color: "#f05032" },
  { name: "Linux CLI", color: "#5dcaa5" },
  { name: "MySQL", color: "#00758f" },
  { name: "Nginx", color: "#009639" },
  { name: "CI/CD Automation", color: "#378add" },
  { name: "Redis", color: "#dc382d" },
  { name: "Socket.IO", color: "#e8f4ff" },
  { name: "Figma", color: "#f24e1e" },
  { name: "React Native", color: "#61dafb" },
  { name: "Firebase", color: "#ffca28" },
];

export const profile = {
  fullName: "Renz Carljansen Sarucam",
  firstName: "Renz",
  role: "Full Stack Developer · R&D Engineer · DevOps Engineer",
  location: "Davao City, Philippines",
  college: "Holy Cross of Davao College",
  degree: "Bachelor of Science in Information Technology",
  graduationYear: "2025",
  seniorHighSchool: "Assumption College of Davao",
  seniorHighTrack: "ICT strand",
  seniorHighStatus: "Graduated with Honors",
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    icon: "Frontend",
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "HTML / CSS", level: 90 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: "Backend",
    skills: [
      { name: "Node.js / Express", level: 80 },
      { name: "MySQL", level: 82 },
      { name: "REST API Design", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 72 },
    ],
  },
  {
    category: "R&D Engineer",
    icon: "R&D",
    skills: [
      { name: "Linux CLI", level: 80 },
      { name: "Git / GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Docker", level: 92 },
      { name: "AI", level: 85 },
    ],
  },
];

export const workExperiences: WorkExperience[] = [
  {
    company: "DSG Son's Group Inc.",
    location: "Philippines",
    role: "Research And Development Engineer",
    period: "April 2026 - Present",
    description: "Working as an R&D Engineer responsible for designing and deploying multi-project server infrastructure using Docker and Docker Compose. Manages CI/CD pipelines via GitHub Actions self-hosted runners, administers Linux servers with multi-environment (testing/production) setups, maintains shared database architecture, and develops full stack internal web applications across multiple business units.",
    autoProjectsFromPlace: "DSG Son's Group Inc.",
    tools: ["Linux CLI", "Docker", "Git / GitHub", "VS Code", "AI", "Node.js", "Next.js", "Nginx", "Laravel", "React", "MySQL", "CI/CD", "GitHub Actions"],
  },
  {
    company: "DSG Son's Group Inc.",
    location: "Philippines",
    role: "Encoder",
    period: "August 2025 - April 2026",
    description: "Handled data encoding and processing tasks, ensuring accuracy and efficiency in data management operations.",
    tools: [],
  },
  {
    company: "Feinform",
    location: "Germany",
    role: "UI Designer",
    period: "03/2025 - 06/2025",
    description: "Developed wireframes, interactive prototypes, and high-fidelity visuals to support smooth and cohesive user experiences across web and mobile platforms.",
    projects: "Feinform Website Design",
    tools: ["Figma", "Canva"],
  },
  {
    company: "Jairosoft Inc.",
    location: "Davao City, Philippines",
    role: "UI/UX Designer (Internship)",
    period: "02/2025 - 05/2025",
    description: "Designed intuitive, responsive user interfaces using UI/UX best practices, leveraging Next.js and Tailwind CSS to deliver clean, accessible, and user-centered experiences across all devices.",
    projects: "TrueNest Seekers Website Design, TrueNest Seekers Mobile Design, JIT (Jairo Institute of Technology) Design, Jairosoft ELMS Designer",
    tools: ["Next.js", "Tailwind CSS", "Figma", "Canva", "Nest JS", "Azure DevOps"],
  },
  {
    company: "JARN Interactive",
    location: "Davao City",
    role: "UI/UX Designer",
    period: "02/2025 - 05/2025",
    description: "JARN Interactive is a digital solutions agency specializing in crafting engaging web experiences through innovative design and modern development technologies.",
    projects: "Good Taste Restaurant App Design",
    tools: ["Figma", "Canva", "Google Icons"],
  },
  {
    company: "Trackguard Mobile",
    location: "Davao City",
    role: "Assistant Programmer",
    period: "09/2024 - 01/2025",
    description: "Designed and developed a responsive mobile application for Track Guard, prioritizing intuitive navigation and real-time tracking capabilities.",
    projects: "TrackGuard Mobile App",
    tools: ["React Native", "JavaScript", "Firebase"],
  },
  {
    company: "Track Guard Website",
    location: "Davao City",
    role: "Head Programmer / Web Developer",
    period: "09/2024 - 01/2025",
    description: "Developed and maintained a responsive website for Track Guard, focusing on user-friendly navigation and real-time tracking functionality.",
    projects: "TrackGuard Admin Panel",
    tools: ["ReactJs", "HTML/CSS", "Javascript", "Firebase"],
  },
  {
    company: "Clotify Ecomm",
    location: "Davao City",
    role: "Front End & Back End Developer",
    period: "12/2023 - 03/2024",
    description: "Managed and optimized the Clotify e-commerce platform, ensuring a seamless shopping experience. Developed and executed digital marketing strategies to drive online traffic and boost sales.",
    projects: "Clotify Ecomm",
    tools: ["Python", "Django", "HTML", "CSS", "JavaScript"],
  },
  {
    company: "Task Management System",
    location: "Davao City",
    role: "Front End Web Developer",
    period: "05/2023 - 08/2023",
    description: "Designed, implemented, and maintained a task management system to streamline workflow and enhance productivity.",
    projects: "Task Management System",
    tools: ["PHP", "Javascript", "MySql", "CSS"],
  },
  {
    company: "Good Taste Design",
    location: "Davao City",
    role: "UI/UX Designer",
    period: "02/2023 - 05/2023",
    description: "Conducted user research, wireframing, and prototyping to create visually appealing and functional designs.",
    projects: "Good Taste Restaurant App Design",
    tools: ["Figma", "Canva"],
  },
];

export const projects: Project[] = [
  {
    title: "GTMS (Gaisano Task Management System)",
    desc: "An internal task management system for Gaisano Malls with three roles (Super Admin, Admin, User) and a full task lifecycle: Pending → Accepted → In Progress → Waiting Approval → Completed. Features drag-and-drop Kanban and Calendar views, two-tier auth with department-admin approval, @mention comments with emoji reactions, file uploads for completion proof, notification toggles, announcements, Excel/PDF reports, a performance leaderboard, and a system-wide audit trail. Built with React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and Laravel 12 + Sanctum.",
    tags: ["React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Laravel 12", "Sanctum", "MySQL", "TanStack Query", "Vite", "Kanban", "ApexCharts"],
    type: "Full Stack",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "GEMS (G-Export Management System)",
    desc: "A full-stack export management and reporting system built for Gaisano Malls under DSG Son's Group Inc. GEMS automates the entire report lifecycle — from extracting data via ODBC connections to legacy and external databases, compiling customizable report templates, generating exports in Excel and PDF formats, and securely delivering them to remote servers via SFTP. The system features a scheduler powered by Laravel's task scheduler with cron expressions, full execution and transfer logging, and a dynamic template naming convention engine. Built with Laravel 11, React 18, Inertia.js, and Tailwind CSS on the frontend, with MySQL/PostgreSQL as the primary database and ODBC drivers for external data integration.",
    tags: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "MySQL", "ODBC", "SFTP", "Scheduler", "Excel/PDF", "Vite"],
    type: "Full Stack",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "WPI (Web-based Price Inquiry)",
    desc: "A web-based version of the existing price inquiry system developed by the ICT Department, making it accessible directly on the browser without requiring any software installation on terminals. The new version supports customizable background colors, logos, and advertisements, while maintaining security through terminal whitelisting — only allowed terminals can access the application. The system fetches data directly from the server, resulting in a more efficient and responsive experience compared to its predecessor. Deployed on allocated servers with remote developer access from the ICT department.",
    tags: ["Web App", "Laravel", "PHP", "Linux", "Security", "Customization"],
    type: "Docker Deploy",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "E-JO (Electronic Job Order)",
    desc: "A comprehensive web-based Electronic Job Order system developed for the ICT Department to streamline job order management, automate the approval process, and eliminate manual forms. This system is a modernized upgrade of an existing application, redesigned to be more user-friendly and efficient. Deployed using Docker with a focus on performance monitoring and stability — proactive measures were implemented to prevent system lag and ensure smooth operations for end-users.",
    tags: ["Docker", "Laravel", "React", "Nginx", "Linux", "Monitoring", "CI/CD"],
    type: "Docker Deploy",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "WEB-IDC (Web Inventory Data Capture)",
    desc: "A comprehensive web-based Inventory Data Capture system designed to serve as a reliable, user-friendly solution for recording and managing inventory data in real-time. WEB-IDC helps reduce errors in the data validation process and enhances overall business operations through an intuitive interface and easy integration capabilities. Deployed using Docker Containerization with remote developer access from the ICT department.",
    tags: ["Docker", "Laravel", "React", "Nginx", "Linux", "Inventory", "Real-time"],
    type: "Docker Deploy",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "Davao Tours (Book-Tour)",
    desc: "A full-stack vehicle rental and tour booking web application designed for Davao City. Customers can browse vehicles and tour packages, register, book vehicles, and manage their profiles and booking history. An admin panel handles fleet management, booking and driver management, tour package management, and customer accounts. Built with Next.js App Router, TypeScript, Prisma ORM with MariaDB, JWT authentication (separate flows for admin and customer), and Tailwind CSS — with a clean green-themed interface inspired by modern booking platforms.",
    tags: ["Next.js", "TypeScript", "Prisma", "MariaDB", "JWT", "Tailwind CSS", "Booking", "Admin Panel"],
    type: "Full Stack",
    status: "Completed",
    link: "https://github.com/RenzSarucam/davao-tours",
    place: "Davao City",
  },
  {
    title: "ScheduleLink",
    desc: "A comprehensive web-based asset management platform built for Gaisano Malls under DSG Son's Group Inc. ScheduLink streamlines the management of shared organizational assets — including conference rooms and company vehicles — through an intuitive interface that handles recurring reservations and automated approval workflows. It eliminates double-booking and manual errors, ensuring optimized asset availability across the organization. The system features role-based access control, department filtering, real-time booking summaries, and a full calendar view. Like ICMS and ROP, it was fully Dockerized with separate testing and production environments, deployed to a Linux server via SSH, and automated through GitHub Actions self-hosted runners.",
    tags: ["Docker", "GitHub Actions", "Laravel", "React", "Socket.IO", "Redis", "Nginx", "Linux", "CI/CD", "Scheduling"],
    type: "Docker Deploy",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "ReOrderPro (ROP)",
    desc: "A web-based merchandise reorder management system built for Gaisano Malls to simplify and automate the replenishment workflow. ROP integrates with legacy systems and provides barcode-based item inquiry, batch reorder processing, role-based workflows, approval management, and real-time request tracking. The system centralizes the entire reorder process — from item validation to approval routing — reducing manual effort and improving accuracy across departments. Like ICMS, it was fully Dockerized with separate testing and production environments, deployed via SSH, and automated through GitHub Actions self-hosted runners.",
    tags: ["Docker", "GitHub Actions", "Laravel", "React", "Socket.IO", "Redis", "Nginx", "Linux", "CI/CD", "Barcode"],
    type: "Docker Deploy",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "Inventory Count Management System (ICMS)",
    desc: "A full-blown web-based Inventory Count Management System (Version 2.0) built for DSG Son's Group Inc. to streamline and optimize inventory tracking and stock level management across all Business Units. ICMS v2.0 expands from its original pre-listing module into a complete management system — introducing full inventory count batch lifecycle management, Business Unit autonomy (each branch configures its own workflows and rules), an expanded Overrider module with full audit trail, MMS bidirectional integration via ODBC, and comprehensive reports and analytics. End-users access the system in two ways: via web browser on PC without any installation, and via APK on mobile scanner devices where the same web interface is rendered through a WebView shell. Fully Dockerized with separate testing and production environments, deployed via SSH, and automated through GitHub Actions self-hosted runners.",
    tags: ["Docker", "GitHub Actions", "Laravel", "React", "Socket.IO", "Redis", "Nginx", "Linux", "CI/CD", "ODBC", "Inventory", "WebView"],
    type: "Docker Deploy",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
  },
  {
    title: "TrueNest Seekers Website Design",
    desc: "A Figma-designed website for TrueNest Seekers, a real estate platform aimed at making property discovery simple and enjoyable. The design focuses on clear property listings, smart location filtering, and an approachable visual style that builds trust with users. Every screen was crafted with user flow in mind — from browsing listings to contacting agents — ensuring a smooth and confident property-seeking experience.",
    tags: ["UI/UX", "Real Estate", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
    place: "Jairosoft Inc.",
  },
  {
    title: "TrueNest Seekers Mobile Design",
    desc: "The mobile counterpart to the TrueNest Seekers web design, built entirely in Figma with a mobile-first approach. The interface prioritizes thumb-friendly navigation, quick property previews, and a clean card-based layout for browsing listings on smaller screens. Location-based search and saved favorites were key features designed into the app flow to enhance the overall property discovery experience.",
    tags: ["Mobile UI", "Real Estate", "App Design"],
    type: ["Mobile", "Figma"],
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
    place: "Jairosoft Inc.",
  },
  {
    title: "JIT (Jairo Institute of Technology) Design",
    desc: "A full website MVP design for JIT (Jairo Institute of Technology), created during my internship at Jairosoft Inc. The design covers the institution's landing page, course catalog, and enrollment sections — built with a modern, tech-forward aesthetic. The goal was to make the platform feel credible and professional while being approachable for students exploring their educational options.",
    tags: ["Education", "UI/UX", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/aMb9FTGYo8G0MlHldnoxxa/MVP-%7C-JIT?node-id=352-2321&t=7TiJ5HnhQp1ffiPJ-1",
    place: "Jairosoft Inc.",
  },
  {
    title: "Jairosoft ELMS Designer",
    desc: "A Figma design for Jairosoft's internal E-Learning Management System (ELMS). The platform was designed to support instructors and students with course creation tools, progress tracking dashboards, and a clean content viewer. The design prioritized clarity and ease of navigation, ensuring that both technical and non-technical users could interact with the platform without friction.",
    tags: ["E-Learning", "Dashboard", "UI Design"],
    type: "Figma",
    status: "Completed",
    link: "",
    place: "Jairosoft Inc.",
  },
  {
    title: "TrackGuard Admin Panel",
    desc: "A full-featured web-based admin panel built for the TrackGuard system. It serves as the central control hub for managing users, monitoring real-time tracking data, and overseeing security events. The dashboard provides administrators with a clean, intuitive interface to view live device locations, manage access controls, and generate reports — all designed to keep sensitive data organized and protected.",
    tags: ["Admin Panel", "Dashboard", "Security"],
    type: "Website",
    status: "Completed",
    link: "https://github.com/TrackGuard/Trackguard-WebAdmin",
    place: "Holy Cross of Davao College",
  },
  {
    title: "TrackGuard Mobile App",
    desc: "A cross-platform mobile application built for the TrackGuard ecosystem. It allows users to monitor live device locations, receive instant security alerts, and manage their tracking settings on the go. Designed with a focus on performance and reliability, the app ensures users stay connected and informed at all times — whether they're at home or on the move.",
    tags: ["Mobile App", "Tracking", "Security"],
    type: "Mobile",
    status: "Completed",
    link: "https://github.com/TrackGuard/trackguard-mobile",
    place: "Holy Cross of Davao College",
  },
  {
    title: "Clotify Ecomm",
    desc: "A personal e-commerce project built to practice full-stack web development. Clotify is an online clothing store with product browsing, a shopping cart, and a checkout flow. The project was an opportunity to explore backend integration, database management, and building a polished storefront UI from scratch — combining clean design with functional shopping features.",
    tags: ["E-Commerce", "Fashion", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://github.com/RenzSarucam/Clothify-Ecomm",
    place: "Personal Project",
  },
  {
    title: "Good Taste",
    desc: "A mobile UI design project for a restaurant app called Good Taste. The design captures a premium dining atmosphere through rich typography, warm color palettes, and elegant food photography layouts. Key screens include menu browsing, dish detail views, and reservation booking — all crafted to feel upscale yet approachable, making the dining experience feel inviting before the customer even walks through the door.",
    tags: ["Restaurant", "Mobile UI", "Food App"],
    type: ["Mobile", "Figma"],
    status: "Completed",
    link: "https://www.figma.com/design/IPXOqKQOcXlH7s8wb1xK24/Good-Taste?node-id=0-1&t=dYubPY7NNZECtJVD-1",
    place: "Personal Project",
  },
  {
    title: "Facebook Clone",
    desc: "A high-fidelity Figma recreation of the Facebook web interface, designed as a UI/UX study project. The goal was to closely replicate the layout, component structure, and visual hierarchy of the original platform — including the news feed, sidebar, and navigation elements. This project sharpened skills in component design, spacing systems, and building consistent design patterns at scale.",
    tags: ["Social App", "UI Clone", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/Els0kit8BXfniyEsmdE48Y/HCIACtivity1?node-id=0-1&t=jXQKsUDKxx88GlDi-1",
    place: "Personal Project",
  },
];

export const education: Education[] = [
  {
    level: "College",
    degree: "Bachelor of Science in Information Technology",
    school: "Holy Cross of Davao College",
    period: "2021 - 2025",
    status: "Graduated",
    highlights: [],
  },
  {
    level: "Senior High School",
    degree: "ICT - Information and Communication Technology",
    school: "Assumption College of Davao",
    period: "2018 - 2020",
    status: "Graduated with Honors",
    highlights: ["Graduated with Honors"],
  },
  {
    level: "Junior High School",
    degree: "Junior High School",
    school: "Don Manuel A. Javellana Memorial National High School",
    period: "2014 - 2018",
    status: "Completed",
    highlights: ["Badminton Player", "ICT Club Member"],
  },
  {
    level: "Elementary",
    degree: "Elementary",
    school: "Magsaysay Elementary School",
    period: "2007 - 2014",
    status: "Completed",
    highlights: ["Volleyball Player", "DLC Club Member"],
  },
];

export const certificates: Certificate[] = [
  {
    title: "CSS, Bootstrap, JavaScript, Web Development Course",
    issuer: "Udemy - Proper Dot Institute",
    year: "2025",
    color: "#378add",
    image: "/images/certificates/udemy-css-bootstrap-js.jpg",
  },
  {
    title: "JavaScript 20 Projects In 20 Days HTML, CSS & JavaScript",
    issuer: "Udemy - Vijay Kumar",
    year: "2025",
    color: "#5dcaa5",
    image: "/images/certificates/udemy-js-20-projects.jpg",
  },
  {
    title: "Java And C++ And PHP Crash Course All in One For Beginners",
    issuer: "Udemy - Crunch Coding",
    year: "2025",
    color: "#7f77dd",
    image: "/images/certificates/udemy-java-cpp-php.jpg",
  },
  {
    title: "UIUX with Figma and Adobe XD",
    issuer: "Udemy - Marcus Menti, Zechariah Tech",
    year: "2025",
    color: "#ef9f27",
    image: "/images/certificates/udemy-uiux-figma-xd.jpg",
  },
  {
    title: "Mobile App Design in Figma: From Concept to Prototype",
    issuer: "Udemy - Anton Voroniuk",
    year: "2025",
    color: "#378add",
    image: "/images/certificates/udemy-figma-mobile.jpg",
  },
  {
    title: "Hands On React JS From Beginner to Expert",
    issuer: "Udemy - Learnify IT",
    year: "2025",
    color: "#5dcaa5",
    image: "/images/certificates/udemy-react-js.jpg",
  },
  {
    title: "Learn PHP and MySQL for Web Application and Web Development",
    issuer: "Udemy - Marcus Menti, Zechariah Tech",
    year: "2025",
    color: "#7f77dd",
    image: "/images/certificates/udemy-php-mysql.jpg",
  },
  {
    title: "Ethical Hacking: Hacker Methodology",
    issuer: "Udemy - Peter A",
    year: "2025",
    color: "#ef9f27",
    image: "/images/certificates/udemy-ethical-hacking.jpg",
  },
  {
    title: "Advanced IT Troubleshooting for Helpdesk Support Technicians",
    issuer: "Udemy - John Courtenay",
    year: "2025",
    color: "#378add",
    image: "/images/certificates/udemy-it-troubleshooting.jpg",
  },
  {
    title: "JavaScript Tutorial: Learn JavaScript Just in 1 Hour",
    issuer: "Learnoverse",
    year: "2024",
    color: "#5dcaa5",
    image: "/images/certificates/learnoverse-js.jpg",
  },
  {
    title: "Build with AI Davao 2024 - Certificate of Participation",
    issuer: "Google Developer Groups Davao",
    year: "2024",
    color: "#4285f4",
    image: "/images/certificates/gdg-build-with-ai.jpg",
  },
  {
    title: "Champion - Mobile Legends: Bang Bang Tournament (IT Day 2021)",
    issuer: "Holy Cross of Davao College - ITS",
    year: "2021",
    color: "#ef9f27",
    image: "/images/certificates/hcdc-mlbb-champion.jpg",
  },
];
