export type Project = {
  title: string;
  desc: string;
  tags: string[];
  type: string;
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

export const profile = {
  fullName: "Renz Carljansen Sarucam",
  firstName: "Renz",
  role: "Junior R&D Engineer · DevOps Engineer",
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
    role: "Junior Research And Development Engineer",
    period: "April 2026 - Present",
    description: "Currently working as a Junior R&D Engineer, responsible for designing and deploying multi-project server infrastructure using Docker and Docker Compose. Manages CI/CD pipelines via GitHub Actions self-hosted runners, administers Linux servers with multi-environment (testing/production) setups, and maintains shared database architecture across multiple internal applications.",
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
    tools: ["Figma", "Canva"],
  },
  {
    company: "Jairosoft Inc.",
    location: "Davao City, Philippines",
    role: "UI/UX Designer (Internship)",
    period: "02/2025 - 05/2025",
    description: "Designed intuitive, responsive user interfaces using UI/UX best practices, leveraging Next.js and Tailwind CSS to deliver clean, accessible, and user-centered experiences across all devices.",
    tools: ["Next.js", "Tailwind CSS", "Figma", "Canva", "Nest JS", "Azure DevOps"],
  },
  {
    company: "JARN Interactive",
    location: "Davao City",
    role: "UI/UX Designer",
    period: "02/2025 - 05/2025",
    description: "JARN Interactive is a digital solutions agency specializing in crafting engaging web experiences through innovative design and modern development technologies.",
    tools: ["Figma", "Canva", "Google Icons"],
  },
  {
    company: "Trackguard Mobile",
    location: "Davao City",
    role: "Assistant Programmer",
    period: "09/2024 - 01/2025",
    description: "Designed and developed a responsive mobile application for Track Guard, prioritizing intuitive navigation and real-time tracking capabilities.",
    tools: ["React Native", "JavaScript", "Firebase"],
  },
  {
    company: "Track Guard Website",
    location: "Davao City",
    role: "Head Programmer / Web Developer",
    period: "09/2024 - 01/2025",
    description: "Developed and maintained a responsive website for Track Guard, focusing on user-friendly navigation and real-time tracking functionality.",
    tools: ["ReactJs", "HTML/CSS", "Javascript", "Firebase"],
  },
  {
    company: "Clotify Ecomm",
    location: "Davao City",
    role: "Front End & Back End Developer",
    period: "12/2023 - 03/2024",
    description: "Managed and optimized the Clotify e-commerce platform, ensuring a seamless shopping experience. Developed and executed digital marketing strategies to drive online traffic and boost sales.",
    tools: ["Python", "Django", "HTML", "CSS", "JavaScript"],
  },
  {
    company: "Task Management System",
    location: "Davao City",
    role: "Front End Web Developer",
    period: "05/2023 - 08/2023",
    description: "Designed, implemented, and maintained a task management system to streamline workflow and enhance productivity.",
    tools: ["PHP", "Javascript", "MySql", "CSS"],
  },
  {
    company: "Good Taste Design",
    location: "Davao City",
    role: "UI/UX Designer",
    period: "02/2023 - 05/2023",
    description: "Conducted user research, wireframing, and prototyping to create visually appealing and functional designs.",
    tools: ["Figma", "Canva"],
  },
];

export const projects: Project[] = [
  {
    title: "TrackGuard Admin Panel",
    desc: "Smart and secure control center for tracking, managing, and safeguarding your data all in one powerful dashboard.",
    tags: ["Admin Panel", "Dashboard", "Security"],
    type: "Web App",
    status: "Completed",
    link: "https://github.com/TrackGuard/Trackguard-WebAdmin",
    place: "Holy Cross of Davao College",
  },
  {
    title: "TrackGuard Mobile App",
    desc: "Real-time tracking and smart protection right in your pocket. Stay connected, stay secure, anytime, anywhere.",
    tags: ["Mobile App", "Tracking", "Security"],
    type: "Mobile",
    status: "Completed",
    link: "https://github.com/TrackGuard/trackguard-mobile",
    place: "Holy Cross of Davao College",
  },
  {
    title: "TrueNest Seekers Website Design",
    desc: "A sleek real estate platform helping seekers find their perfect nest with ease, style, and smart location tools.",
    tags: ["UI/UX", "Real Estate", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
    place: "Jairosoft Inc.",
  },
  {
    title: "TrueNest Seekers Mobile Design",
    desc: "A seamless real estate experience at your fingertips explore, discover, and secure your dream home with ease and elegance.",
    tags: ["Mobile UI", "Real Estate", "App Design"],
    type: "Mobile",
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
    place: "Jairosoft Inc.",
  },
  {
    title: "Clotify Ecomm",
    desc: "Style meets simplicity your personalized fashion destination with seamless shopping at your fingertips.",
    tags: ["E-Commerce", "Fashion", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://github.com/RenzSarucam/Clothify-Ecomm",
    place: "Personal Project",
  },
  {
    title: "Good Taste",
    desc: "Curated elegance in every bite. Savor the finest flavors and elevate your dining experience.",
    tags: ["Restaurant", "Mobile UI", "Food App"],
    type: "Mobile",
    status: "Completed",
    link: "https://www.figma.com/design/IPXOqKQOcXlH7s8wb1xK24/Good-Taste?node-id=0-1&t=dYubPY7NNZECtJVD-1",
    place: "Personal Project",
  },
  {
    title: "Facebook Clone",
    desc: "A sleek social experience connect, share, and engage with friends and communities, just like the original.",
    tags: ["Social App", "UI Clone", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/Els0kit8BXfniyEsmdE48Y/HCIACtivity1?node-id=0-1&t=jXQKsUDKxx88GlDi-1",
    place: "Personal Project",
  },
  {
    title: "JIT (Jairo Institute of Technology) Design",
    desc: "A creative division of JIT focused on innovative, user-centered design solutions that blend technology and aesthetics.",
    tags: ["Education", "UI/UX", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/aMb9FTGYo8G0MlHldnoxxa/MVP-%7C-JIT?node-id=352-2321&t=7TiJ5HnhQp1ffiPJ-1",
    place: "Jairosoft Inc.",
  },
  {
    title: "Jairosoft ELMS Designer",
    desc: "A smart e-learning platform with tools for course management, student tracking, and interactive learning simple and effective.",
    tags: ["E-Learning", "Dashboard", "UI Design"],
    type: "Figma",
    status: "Completed",
    link: "",
    place: "Jairosoft Inc.",
  },
  {
    title: "Inventory Count Management System (ICMS)",
    desc: "A web-based inventory system. Dockerized, deployed via SSH, and automated with GitHub Actions self-hosted runners for testing and production environments.",
    tags: ["Docker", "GitHub Actions", "Laravel", "React", "Socket.IO", "Redis", "Nginx", "Linux", "CI/CD", "Inventory"],
    type: "Docker",
    status: "Completed",
    link: "",
    place: "DSG Son's Group Inc.",
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
