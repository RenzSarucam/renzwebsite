import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import {
  certificates,
  contactEmail,
  profile,
  projects,
  skillGroups,
  workExperiences,
} from "@/app/_lib/portfolio-data";

type ChatMessage = { role: "user" | "assistant"; content: string };

const RATE_LIMIT_COOLDOWN_MS = 60_000;
let geminiCooldownUntil = 0;

// ── Flat skills with aliases ──────────────────────────────────────────────────
const flatSkills = [
  { key: "react-next",     aliases: ["react", "next", "next.js", "nextjs", "react/next", "react next"], label: "React / Next.js",       level: 85, category: "frontend" },
  { key: "html-css",       aliases: ["html", "css", "html/css", "html css"],                             label: "HTML / CSS",             level: 90, category: "frontend" },
  { key: "typescript",     aliases: ["typescript", "ts"],                                                label: "TypeScript",             level: 75, category: "frontend" },
  { key: "tailwind",       aliases: ["tailwind", "tailwind css"],                                        label: "Tailwind CSS",           level: 80, category: "frontend" },
  { key: "node-express",   aliases: ["node", "node.js", "nodejs", "express"],                           label: "Node.js / Express",      level: 80, category: "backend"  },
  { key: "mysql",          aliases: ["mysql"],                                                           label: "MySQL",                  level: 82, category: "backend"  },
  { key: "rest-api",       aliases: ["rest", "rest api", "api design"],                                 label: "REST API Design",        level: 85, category: "backend"  },
  { key: "postgres-mongo", aliases: ["postgres", "postgresql", "mongo", "mongodb"],                     label: "PostgreSQL / MongoDB",   level: 72, category: "backend"  },
  { key: "python",         aliases: ["python"],                                                          label: "Python",                 level: 75, category: "backend"  },
  { key: "php",            aliases: ["php"],                                                             label: "PHP",                    level: 75, category: "backend"  },
  { key: "django",         aliases: ["django"],                                                          label: "Django",                 level: 72, category: "backend"  },
  { key: "firebase",       aliases: ["firebase"],                                                        label: "Firebase",               level: 78, category: "backend"  },
  { key: "linux-cli",      aliases: ["linux", "linux cli", "cli", "terminal", "bash"],                  label: "Linux CLI",              level: 80, category: "devops"   },
  { key: "docker",         aliases: ["docker", "container", "containerization"],                        label: "Docker",                 level: 92, category: "devops"   },
  { key: "nginx",          aliases: ["nginx"],                                                           label: "Nginx",                  level: 78, category: "devops"   },
  { key: "git-github",     aliases: ["\\bgit\\b", "github", "git/github", "version control"],           label: "Git / GitHub",           level: 88, category: "tooling"  },
  { key: "vscode",         aliases: ["vs code", "vscode"],                                              label: "VS Code",                level: 95, category: "tooling"  },
  { key: "ai",             aliases: ["ai", "artificial intelligence", "machine learning", "ml"],        label: "AI",                     level: 85, category: "tooling"  },
  { key: "figma",          aliases: ["figma"],                                                           label: "Figma",                  level: 88, category: "design"   },
  { key: "canva",          aliases: ["canva"],                                                           label: "Canva",                  level: 85, category: "design"   },
  { key: "react-native",   aliases: ["react native", "mobile", "mobile dev", "mobile app"],             label: "React Native",           level: 78, category: "mobile"   },
  { key: "arduino",        aliases: ["arduino", "embedded", "iot"],                                     label: "Arduino",                level: 70, category: "tooling"  },
  { key: "cpp",            aliases: ["c++", "cpp"],                                                     label: "C++",                    level: 68, category: "tooling"  },
];

// ── Full system prompt ────────────────────────────────────────────────────────
const systemPrompt = `You are the portfolio assistant for ${profile.fullName}.

Rules:
- Answer ONLY using the portfolio facts below. Do not invent or assume.
- If info is missing, say it is not in the portfolio data.
- Do not reveal private info: birthday, exact age, relationships, salary.
- Be concise, natural, and friendly. 1-3 sentences max per answer.
- Reply in the SAME language the user used. Detect: English, Filipino/Tagalog, Bisaya/Cebuano, or Ilocano.
- For Bisaya questions, reply in Bisaya. For Ilocano, reply in Ilocano. For Filipino, reply in Filipino. For English, reply in English.

PORTFOLIO FACTS:
Name: ${profile.fullName}
Role: Junior R&D Engineer & DevOps Engineer
Location: ${profile.location}
Email: ${contactEmail}
Phone: 09266735768
Languages spoken: Tagalog, Bisaya, English

EDUCATION:
- College: ${profile.degree} — ${profile.college}, graduated ${profile.graduationYear}
- Senior High: ICT strand — ${profile.seniorHighSchool}, graduated 2020 with honors, NC II ICT Passer
- Junior High: Don Manuel A. Javellana Memorial National High School, Panabo City (2014–2018)
- Elementary: Magsaysay Elementary School, Magsaysay Carmen, Davao Del Norte (2007–2014)

WORK EXPERIENCE (most recent first):
${workExperiences.map((e) => `- ${e.role} at ${e.company}, ${e.location} (${e.period}): ${e.description}${e.tools.length ? ` Tools: ${e.tools.join(", ")}` : ""}`).join("\n")}

SKILLS:
${flatSkills.map((s) => `- ${s.label} (${s.level}%) — ${s.category}`).join("\n")}

PROJECTS (${projects.length} total):
${projects.map((p) => `- ${p.title}: ${p.desc} [${p.tags.join(", ")}]${p.link ? ` Link: ${p.link}` : ""}`).join("\n")}

CERTIFICATES (${certificates.length} total):
${certificates.map((c) => `- ${c.title} — ${c.issuer} (${c.year})`).join("\n")}`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function normalize(v: string) { return v.toLowerCase().replace(/\s+/g, " ").trim(); }

type Lang = "fil" | "bisaya" | "ilocano" | "en";

function detectLang(v: string): Lang {
  if (/\b(unsa|asa|kanus|kinsa|ngano|unsay|iyang|niya|siya|ba|mga|dili|oo|bitaw|mao|diay|lagi|unya|walay|wala|ingon|kanato|namo|ninyo|nila|inyong|kamo|nato|siya|sila|nako|ako|ikaw|kita|atong|among|ilang|inyong|usa|duha|tulo)\b/i.test(v))
    return "bisaya";
  if (/\b(ania|dagiti|ti|ket|wenno|ngem|tapno|nga|iti|ken|mabalin|kasano|sino|ania|mano|sadinno|kaano|apay|agbalin|napaay|dagitoy|daytoy|dayta|dayta|diay)\b/i.test(v))
    return "ilocano";
  if (/\b(ano|ilan|ilang|kailan|sino|saan|paano|pwede|maaari|trabaho|edad|taon|birthday|kaarawan|nagtrabaho|marunong|alam|gusto|ikaw|siya|niya|nya|ba|po|yung|yun|ang|ng|sa|at|para|dito|doon|bakit|magkano|alin)\b/i.test(v))
    return "fil";
  return "en";
}

function reply(lang: Lang, fil: string, bisaya: string, ilocano: string, en: string) {
  if (lang === "bisaya")  return bisaya;
  if (lang === "ilocano") return ilocano;
  if (lang === "fil")     return fil;
  return en;
}

function textResponse(text: string) { return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
function isGeminiCoolingDown() { return geminiCooldownUntil > Date.now(); }
function markGeminiCoolingDown() { geminiCooldownUntil = Date.now() + RATE_LIMIT_COOLDOWN_MS; }

function findSkill(q: string) {
  const n = normalize(q);
  return flatSkills.find((s) => s.aliases.some((a) => {
    if (a.startsWith("\\b")) return new RegExp(a, "i").test(n);
    return n.includes(a);
  })) ?? null;
}

function findProject(q: string) {
  const n = normalize(q);
  return projects.find((p) => n.includes(p.title.toLowerCase()))
    ?? projects.find((p) => p.tags.some((t) => n.includes(t.toLowerCase())))
    ?? null;
}

function findCertificate(q: string) {
  const n = normalize(q);
  return certificates.find((c) => n.includes(c.title.toLowerCase()))
    ?? certificates.find((c) => n.includes(c.issuer.toLowerCase()))
    ?? null;
}

function findWorkExp(q: string) {
  const n = normalize(q);
  return workExperiences.find((e) => n.includes(e.company.toLowerCase()) || n.includes(e.role.toLowerCase())) ?? null;
}

// ── Local reply engine ────────────────────────────────────────────────────────
function localReply(question: string): string {
  const n = normalize(question);
  const lang = detectLang(question);
  const fil = lang !== "en"; // treat bisaya/ilocano/filipino as non-english for base replies

  const r = (en: string, tl: string, bis: string, ilo: string) => reply(lang, tl, bis, ilo, en);

  // Private / unavailable
  if (/(birthday|birth day|date of birth|kaarawan|kapanganakan)/.test(n))
    return fil ? "Hindi available ang birthday ni Renz sa portfolio data." : "Renz's birthday is not available in his portfolio data.";

  if (/\b(age|edad|ilang taon|how old)\b/.test(n))
    return fil ? "Hindi available ang exact age ni Renz sa portfolio data." : "Renz's exact age is not available in his portfolio data.";

  if (/(salary|sahod|rate|magkano|bayad|compensation)/.test(n))
    return fil ? "Hindi available ang salary information ni Renz sa portfolio data." : "Salary information is not available in Renz's portfolio data.";

  // Greetings
  if (/^(hi|hello|hey|kumusta|kamusta|good morning|good afternoon|good evening|musta|helo|yo|sup)/.test(n))
    return fil
      ? "Kumusta! Ako ang portfolio assistant ni Renz. Pwede kang magtanong tungkol sa kaniyang skills, projects, work experience, education, o contact details."
      : "Hello! I'm Renz's portfolio assistant. Feel free to ask about his skills, projects, work experience, education, or contact details.";

  // Who is Renz / intro
  if (/(who is renz|sino si renz|tell me about renz|introduce|about renz|ano ang trabaho|what does renz do|what is renz|anong ginagawa|anong work|anong role|ano siya)/.test(n))
    return fil
      ? `Si ${profile.fullName} ay isang Junior R&D Engineer at DevOps Engineer mula sa ${profile.location}. May background siya sa frontend at backend development, UI/UX design, at DevOps tools tulad ng Docker, Linux, at Nginx. Nagtapos siya ng BSIT sa Holy Cross of Davao College noong 2025.`
      : `${profile.fullName} is a Junior R&D Engineer and DevOps Engineer from ${profile.location}. He has a background in frontend and backend development, UI/UX design, and DevOps tools like Docker, Linux, and Nginx. He graduated with a BSIT from Holy Cross of Davao College in 2025.`;

  // Strongest / best skills — BEFORE location check (para hindi mahahatch ang "saan mas magaling")
  if (/(strongest|best skill|best at|top skill|what is he best|what is renz best|pinakamahusay|mas magaling|pinaka.magaling|pinaka magaling|what is he good at|ano ang magaling|magaling siya sa|saan magaling|saan mas|specializ|ano ang pinaka|anong pinaka)/.test(n))
    return fil
      ? "Ang pinakamalakas na skills ni Renz ay VS Code (95%), Docker (92%), HTML/CSS (90%), Git/GitHub (88%), at Figma (88%). Strong siya sa frontend development at DevOps tools."
      : "Renz's strongest skills are VS Code (95%), Docker (92%), HTML/CSS (90%), Git/GitHub (88%), and Figma (88%). He excels in frontend development and DevOps tools.";

  // Recent / current work
  if (/(recent work|current work|latest work|current job|present job|ngayon.*work|kasalukuyan.*work|what.*current.*work|what is.*recent|ano.*trabaho niya ngayon|unsa.*trabaho karon|kasalukuyang trabaho)/.test(n)) {
    const current = workExperiences[0];
    return r(
      `Renz is currently working as ${current.role} at ${current.company} (${current.period}). ${current.description}`,
      `Kasalukuyan siyang nagtatrabaho bilang ${current.role} sa ${current.company} (${current.period}). ${current.description}`,
      `Karon siya nagtrabaho isip ${current.role} sa ${current.company} (${current.period}). ${current.description}`,
      `Ita, nagtratrabaho ni Renz iti ${current.role} iti ${current.company} (${current.period}). ${current.description}`,
    );
  }

  // Current role / position title
  if (/(ano.*role|mga role|what.*role|current role|current position|what is his role|anong role|anong position|what position|job title|titulo)/.test(n))
    return fil
      ? `Ang kasalukuyang role ni Renz ay Junior R&D Engineer at DevOps Engineer sa DSG Son's Group Inc. Dati siyang UI/UX Designer, Web Developer, at Assistant Programmer sa iba't ibang companies.`
      : `Renz's current roles are Junior R&D Engineer and DevOps Engineer at DSG Son's Group Inc. He has previously worked as a UI/UX Designer, Web Developer, and Assistant Programmer across various companies.`;

  // Contact / hire
  if (/(contact|email|hire|get in touch|reach|available|open to work|looking for|recruit|kumontact|makipag-ugnayan|ma-hire|pwedeng i-hire|pwede ba siyang)/.test(n))
    return fil
      ? `Pwede mong i-contact si Renz sa ${contactEmail}. Available siya para sa hiring at project inquiries.`
      : `You can reach Renz at ${contactEmail}. He is open to hiring and project inquiries.`;

  // Phone
  if (/(phone|number|numero|telepono|cell|mobile number|contact number)/.test(n))
    return fil
      ? "Ang contact number ni Renz ay 09266735768."
      : "Renz's contact number is 09266735768.";

  // Languages spoken
  if (/(language|wika|sinasalita|speak|fluent|dialect)/.test(n))
    return fil
      ? "Nagsasalita si Renz ng Tagalog, Bisaya, at English."
      : "Renz speaks Tagalog, Bisaya, and English.";

  // DevOps specific
  if (/(devops|deployment|deploy|server|infrastructure|ci.cd|pipeline|sysadmin|system admin)/.test(n))
    return fil
      ? "Oo, si Renz ay may documented DevOps experience. Familiar siya sa Docker (92%), Linux CLI (80%), Nginx (78%), at Git/GitHub (88%). Currently siya ay Junior R&D Engineer at DSG Son's Group Inc."
      : "Yes, Renz has documented DevOps experience. He is familiar with Docker (92%), Linux CLI (80%), Nginx (78%), and Git/GitHub (88%). He currently works as a Junior R&D Engineer at DSG Son's Group Inc.";

  // UI/UX Design
  if (/(ui.ux|ui\/ux|design|figma|designer|prototype|wireframe|canva|mag-design|marunong mag-design)/.test(n))
    return fil
      ? "Oo, may UI/UX design experience si Renz. Gumagamit siya ng Figma (88%) at Canva (85%). Nagtrabaho siya bilang UI/UX Designer sa Feinform (Germany), Jairosoft Inc., at JARN Interactive."
      : "Yes, Renz has UI/UX design experience. He uses Figma (88%) and Canva (85%). He worked as a UI/UX Designer at Feinform (Germany), Jairosoft Inc., and JARN Interactive.";

  // Mobile development
  if (/(mobile app|react native|android|ios|mobile development|mobile dev|mobile application)/.test(n))
    return fil
      ? "Oo, may mobile development experience si Renz gamit ang React Native (78%). Nagtrabaho siya sa Trackguard Mobile bilang Assistant Programmer kung saan nag-develop siya ng responsive mobile app."
      : "Yes, Renz has mobile development experience using React Native (78%). He worked at Trackguard Mobile as an Assistant Programmer where he developed a responsive mobile app.";

  // Fresh graduate / entry level
  if (/(fresh graduate|fresh grad|bagong graduate|entry level|junior|baguhan)/.test(n))
    return fil
      ? "Oo, fresh graduate si Renz — nagtapos siya ng BSIT noong 2025 sa Holy Cross of Davao College. Kahit fresh grad, may solid na work experience na siya mula sa iba't ibang companies."
      : "Yes, Renz is a fresh graduate — he finished his BSIT in 2025 at Holy Cross of Davao College. Despite being a fresh grad, he already has solid work experience from various companies.";

  // Education — elementary
  if (/(elementary|grade school|primary|paaralang|nag-elementary|nag elementary)/.test(n))
    return fil
      ? "Nag-elementary si Renz sa Magsaysay Elementary School sa Magsaysay Carmen, Davao Del Norte (2007–2014)."
      : "Renz attended Magsaysay Elementary School in Magsaysay Carmen, Davao Del Norte (2007–2014).";

  // Education — junior high
  if (/(junior high|jhs|secondary school|nag-junior|nag junior)/.test(n))
    return fil
      ? "Nag-junior high si Renz sa Don Manuel A. Javellana Memorial National High School sa Panabo City (2014–2018). ICT Club Member siya noon."
      : "Renz attended Don Manuel A. Javellana Memorial National High School in Panabo City (2014–2018). He was an ICT Club Member.";

  // Education — senior high
  if (/(senior high|shs|senior high school|assumption|nc ii|ncii)/.test(n))
    return fil
      ? "Nag-senior high si Renz sa Assumption College of Davao (ICT strand), graduated 2020 with honors at NC II ICT Passer."
      : "Renz completed senior high at Assumption College of Davao (ICT strand), graduated 2020 with honors and is an NC II ICT Passer.";

  // Education — college / general
  if (/(education|school|college|degree|graduate|graduat|bsit|information technology|holy cross|nag-aral|nag aral|pinag-aralan|nag-college|nag college)/.test(n))
    return fil
      ? "Nagtapos si Renz ng Bachelor of Science in Information Technology sa Holy Cross of Davao College noong 2025. Nag-senior high siya sa Assumption College of Davao (ICT strand, with honors)."
      : "Renz graduated with a Bachelor of Science in Information Technology from Holy Cross of Davao College in 2025. He completed senior high at Assumption College of Davao (ICT strand, with honors).";

  // Location — AFTER skill/education checks
  if (/(where|location|based|taga saan|taga-saan|nakatira|lugar|taga|nasa saan|saan siya nakatira|saan nakatira|saan siya|saan ba siya)/.test(n))
    return fil
      ? `Si Renz ay nakatira sa ${profile.location}.`
      : `Renz is based in ${profile.location}.`;

  // 2nd best project
  if (/(2nd best|second best|2nd project|ika-2|pangalawa.*project|second.*project)/.test(n))
    return r(
      "Renz's 2nd most notable project is the TrueNest Seekers Website & Mobile Design — a sleek real estate platform with smart location tools, showcasing his UI/UX design skills using Figma.",
      "Ang ika-2 na pinaka-notable na project ni Renz ay ang TrueNest Seekers Website & Mobile Design — isang real estate platform na nagpapakita ng kaniyang UI/UX design skills gamit ang Figma.",
      "Ang ika-2 nga pinakamaayo nga project ni Renz mao ang TrueNest Seekers — usa ka real estate platform nga nagpakita sa iyang UI/UX design skills pinaagi sa Figma.",
      "Ti maikatlo a napateg nga project ni Renz ket ti TrueNest Seekers — isu ti real estate platform a mangipakita ti UI/UX design skills na babaen ti Figma.",
    );

  // Best project
  if (/(best project|favorite project|pinakamagandang project|pinaka.*project|what.*best.*project|unsa.*best|unsa.*project.*best|ania.*naimbag.*project)/.test(n))
    return r(
      "Renz's most notable projects are TrackGuard Admin Panel (web dashboard with real-time tracking) and TrackGuard Mobile App (React Native). Both showcase his full-stack and mobile development skills.",
      "Ang pinaka-notable na projects ni Renz ay ang TrackGuard Admin Panel (web dashboard with real-time tracking) at TrackGuard Mobile App (React Native). Ipinakikita nito ang kaniyang full-stack at mobile development skills.",
      "Ang pinakamaayo nga projects ni Renz mao ang TrackGuard Admin Panel ug TrackGuard Mobile App. Nagpakita kini sa iyang full-stack ug mobile development skills.",
      "Ti napateg nga projects ni Renz ket ti TrackGuard Admin Panel ken ti TrackGuard Mobile App. Ipakita dagitoy ti full-stack ken mobile development skills na.",
    );

  // Specific project — BEFORE work experience (para hindi mahahatch ang "TrackGuard" sa work exp)
  const project = findProject(question);
  if (project)
    return fil
      ? `Ang ${project.title} ay isa sa projects ni Renz — isang ${project.type.toLowerCase()} project. ${project.desc}${project.link ? ` Link: ${project.link}` : ""}`
      : `${project.title} is one of Renz's projects — a ${project.type.toLowerCase()} project. ${project.desc}${project.link ? ` Link: ${project.link}` : ""}`;

  // Projects general
  if (/(project|portfolio|built|gawa|ginawa|sample work|github|anong projects|ilang projects|ilan projects|mga projects)/.test(n)) {
    const list = projects.map((p) => `• ${p.title} — ${p.type}`).join("\n");
    return fil
      ? `May ${projects.length} documented projects si Renz:\n${list}`
      : `Renz has ${projects.length} documented projects:\n${list}`;
  }

  // Specific company work experience
  const workExp = findWorkExp(question);
  if (workExp)
    return fil
      ? `Nagtrabaho si Renz sa ${workExp.company} bilang ${workExp.role} (${workExp.period}). ${workExp.description}${workExp.tools.length ? ` Tools: ${workExp.tools.join(", ")}.` : ""}`
      : `Renz worked at ${workExp.company} as ${workExp.role} (${workExp.period}). ${workExp.description}${workExp.tools.length ? ` Tools: ${workExp.tools.join(", ")}.` : ""}`;

  // Work experience general
  if (/(work experience|experience|nagtrabaho|trabaho|company|employer|internship|intern|nag-intern|dsg|feinform|jairosoft|jarn|trackguard|clotify|task management|good taste|ilang company|ilan company|ilang trabaho|\bwork\b|position|mga work|ano.*work|ano.*position|roles?|job|naging|nag-work|nagwork|saan.*nagtrabaho|anong.*trabaho)/.test(n)) {
    const list = workExperiences.map((e) => `• ${e.role} @ ${e.company} (${e.period})`).join("\n");
    return fil
      ? `May ${workExperiences.length} documented work experience si Renz:\n${list}`
      : `Renz has ${workExperiences.length} documented work experiences:\n${list}`;
  }

  // Skill — specific with knowledge check
  const skill = findSkill(question);
  if (skill && /(alam|marunong|knows|familiar|can he|does he|experience with|gumagamit|magaling|good at|marunong ba|alam ba|kaya ba)/.test(n))
    return fil
      ? `Oo, may experience si Renz sa ${skill.label} — ${skill.level}% level sa portfolio niya. Bahagi ito ng kaniyang ${skill.category} stack.`
      : `Yes, Renz has experience with ${skill.label} — rated at ${skill.level}% in his portfolio. It's part of his ${skill.category} stack.`;

  if (skill)
    return fil
      ? `Ang ${skill.label} ay isa sa documented skills ni Renz (${skill.level}%). Kasama ito sa kaniyang ${skill.category} expertise.`
      : `${skill.label} is one of Renz's documented skills at ${skill.level}%. It falls under his ${skill.category} expertise.`;

  // Skills general
  if (/(skill|tech stack|technology|stack|ano ang alam|tools|programming|anong skills|ano ang skills|lahat ng skills|listahan|list of skills)/.test(n)) {
    const list = skillGroups.map((g) => `• ${g.category}: ${g.skills.map((s) => s.name).join(", ")}`).join("\n");
    return fil
      ? `Ang tech stack ni Renz:\n${list}`
      : `Renz's tech stack:\n${list}`;
  }

  // Specific certificate
  const cert = findCertificate(question);
  if (cert)
    return fil
      ? `Ang "${cert.title}" ay isa sa certificates ni Renz. In-issue ito ng ${cert.issuer} noong ${cert.year}.`
      : `"${cert.title}" is one of Renz's certificates, issued by ${cert.issuer} in ${cert.year}.`;

  // Certificates general
  if (/(certificate|certification|credential|training|udemy|course|anong certif|may certif|ilang certif)/.test(n)) {
    const list = certificates.map((c) => `• ${c.title} — ${c.issuer} (${c.year})`).join("\n");
    return fil
      ? `May ${certificates.length} certificates si Renz:\n${list}`
      : `Renz has ${certificates.length} certificates:\n${list}`;
  }

  // Fallback
  return fil
    ? "Hindi ko mahanap ang eksaktong sagot sa portfolio data ni Renz. Pwede kang magtanong tungkol sa kaniyang skills, projects, work experience, education, certificates, o contact details."
    : "I couldn't find an exact answer in Renz's portfolio data. You can ask about his skills, projects, work experience, education, certificates, or contact details.";
}

// ── Route gate ────────────────────────────────────────────────────────────────
const LOCAL_PATTERNS = /(hi|hello|hey|kumusta|kamusta|musta|helo|yo|sup|birthday|kaarawan|age|edad|ilang taon|how old|salary|sahod|rate|magkano|bayad|contact|email|hire|reach|available|open to work|recruit|kumontact|makipag-ugnayan|where|location|based|saan|taga|nakatira|lugar|phone|numero|cell|language|wika|sinasalita|speak|fluent|dialect|strongest|best skill|best at|top skill|pinakamahusay|mas magaling|pinaka.magaling|pinaka magaling|magaling siya|saan magaling|saan mas|specializ|ano ang pinaka|anong pinaka|devops|deploy|server|infrastructure|pipeline|sysadmin|ui.ux|ui\/ux|figma|canva|design|prototype|wireframe|mobile app|react native|android|ios|fresh grad|fresh graduate|bagong graduate|entry level|baguhan|elementary|grade school|primary|junior high|jhs|secondary|senior high|shs|assumption|ncii|nc ii|education|school|college|degree|graduate|bsit|information technology|holy cross|nag-aral|nag aral|pinag-aralan|recent work|current work|latest work|current job|present job|kasalukuyan.*work|kasalukuyang trabaho|work experience|experience|nagtrabaho|trabaho|company|employer|internship|nag-intern|dsg|feinform|jairosoft|jarn|trackguard|clotify|task management|good taste|\bwork\b|position|mga work|nag-work|nagwork|job|roles|ano.*role|mga role|job title|titulo|current role|current position|skill|tech stack|technology|stack|tools|programming|anong skills|ano ang skills|project|portfolio|built|gawa|ginawa|github|mga projects|ilang projects|certificate|certification|credential|training|udemy|who is renz|sino si renz|tell me about|introduce|about renz|what does renz|ano siya|anong ginagawa|sino|name|pangalan)/i;

function shouldUseLocalReply(q: string) {
  return LOCAL_PATTERNS.test(normalize(q));
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages?: ChatMessage[] };
  const safeMessages = Array.isArray(messages) ? messages : [];
  const lastMessage = safeMessages.at(-1)?.content?.trim();

  if (!lastMessage) return textResponse("Please send a message first.");

  if (shouldUseLocalReply(lastMessage) || !process.env.GEMINI_API_KEY || isGeminiCoolingDown()) {
    return textResponse(localReply(lastMessage));
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", systemInstruction: systemPrompt });

    const history = safeMessages
      .slice(0, -1)
      .filter((m, i) => !(i === 0 && m.role === "assistant"))
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage);
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          const msg = String(err);
          if (msg.includes("quota") || msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) markGeminiCoolingDown();
          controller.enqueue(encoder.encode(localReply(lastMessage)));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (err) {
    const msg = String(err);
    if (msg.includes("quota") || msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) markGeminiCoolingDown();
    return textResponse(localReply(lastMessage));
  }
}
