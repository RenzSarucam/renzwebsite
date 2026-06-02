export type Project = {
  title: string;
  desc: string;
  tags: string[];
  type: string;
  status: string;
  link: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  color: string;
  image: string;
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
  role: "Junior R&D Engineer",
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

export const projects: Project[] = [
  {
    title: "TrackGuard Admin Panel",
    desc: "Smart and secure control center for tracking, managing, and safeguarding your data all in one powerful dashboard.",
    tags: ["Admin Panel", "Dashboard", "Security"],
    type: "Web App",
    status: "Completed",
    link: "https://github.com/TrackGuard/Trackguard-WebAdmin",
  },
  {
    title: "TrackGuard Mobile App",
    desc: "Real-time tracking and smart protection right in your pocket. Stay connected, stay secure, anytime, anywhere.",
    tags: ["Mobile App", "Tracking", "Security"],
    type: "Mobile",
    status: "Completed",
    link: "https://github.com/TrackGuard/trackguard-mobile",
  },
  {
    title: "TrueNest Seekers Website Design",
    desc: "A sleek real estate platform helping seekers find their perfect nest with ease, style, and smart location tools.",
    tags: ["UI/UX", "Real Estate", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
  },
  {
    title: "TrueNest Seekers Mobile Design",
    desc: "A seamless real estate experience at your fingertips explore, discover, and secure your dream home with ease and elegance.",
    tags: ["Mobile UI", "Real Estate", "App Design"],
    type: "Mobile",
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
  },
  {
    title: "Clotify Ecomm",
    desc: "Style meets simplicity your personalized fashion destination with seamless shopping at your fingertips.",
    tags: ["E-Commerce", "Fashion", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://github.com/RenzSarucam/Clothify-Ecomm",
  },
  {
    title: "Good Taste",
    desc: "Curated elegance in every bite. Savor the finest flavors and elevate your dining experience.",
    tags: ["Restaurant", "Mobile UI", "Food App"],
    type: "Mobile",
    status: "Completed",
    link: "https://www.figma.com/design/IPXOqKQOcXlH7s8wb1xK24/Good-Taste?node-id=0-1&t=dYubPY7NNZECtJVD-1",
  },
  {
    title: "Facebook Clone",
    desc: "A sleek social experience connect, share, and engage with friends and communities, just like the original.",
    tags: ["Social App", "UI Clone", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/Els0kit8BXfniyEsmdE48Y/HCIACtivity1?node-id=0-1&t=jXQKsUDKxx88GlDi-1",
  },
  {
    title: "JIT (Jairo Institute of Technology) Design",
    desc: "A creative division of JIT focused on innovative, user-centered design solutions that blend technology and aesthetics.",
    tags: ["Education", "UI/UX", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/aMb9FTGYo8G0MlHldnoxxa/MVP-%7C-JIT?node-id=352-2321&t=7TiJ5HnhQp1ffiPJ-1",
  },
  {
    title: "Jairosoft ELMS Designer",
    desc: "A smart e-learning platform with tools for course management, student tracking, and interactive learning simple and effective.",
    tags: ["E-Learning", "Dashboard", "UI Design"],
    type: "Figma",
    status: "Completed",
    link: "",
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
