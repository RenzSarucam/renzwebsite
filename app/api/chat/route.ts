import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import {
  certificates,
  contactEmail,
  education,
  profile,
  projects,
  skillGroups,
} from "@/app/_lib/portfolio-data";

type ChatMessage = { role: "user" | "assistant"; content: string };

type FlatSkill = {
  key: string;
  aliases: string[];
  label: string;
  level: number;
  category: string;
};

const RATE_LIMIT_COOLDOWN_MS = 60_000;

const flatSkills: FlatSkill[] = [
  {
    key: "react-next",
    aliases: ["react", "next", "next.js", "react/next", "react next"],
    label: "React / Next.js",
    level: 85,
    category: "frontend",
  },
  {
    key: "html-css",
    aliases: ["html", "css", "html/css", "html css"],
    label: "HTML / CSS",
    level: 90,
    category: "frontend",
  },
  {
    key: "typescript",
    aliases: ["typescript", "ts"],
    label: "TypeScript",
    level: 75,
    category: "frontend",
  },
  {
    key: "tailwind-css",
    aliases: ["tailwind", "tailwind css"],
    label: "Tailwind CSS",
    level: 80,
    category: "frontend",
  },
  {
    key: "node-express",
    aliases: ["node", "node.js", "nodejs", "express"],
    label: "Node.js / Express",
    level: 80,
    category: "backend",
  },
  { key: "mysql", aliases: ["mysql"], label: "MySQL", level: 82, category: "backend" },
  {
    key: "rest-api-design",
    aliases: ["rest", "rest api", "rest api design", "api design"],
    label: "REST API Design",
    level: 85,
    category: "backend",
  },
  {
    key: "postgres-mongo",
    aliases: ["postgres", "postgresql", "mongo", "mongodb"],
    label: "PostgreSQL / MongoDB",
    level: 72,
    category: "backend",
  },
  {
    key: "linux-cli",
    aliases: ["linux", "linux cli"],
    label: "Linux CLI",
    level: 80,
    category: "tooling",
  },
  {
    key: "git-github",
    aliases: ["git", "github", "git/github"],
    label: "Git / GitHub",
    level: 88,
    category: "tooling",
  },
  { key: "vscode", aliases: ["vs code", "vscode"], label: "VS Code", level: 95, category: "tooling" },
  { key: "docker", aliases: ["docker"], label: "Docker", level: 92, category: "tooling" },
  { key: "ai", aliases: ["ai", "artificial intelligence"], label: "AI", level: 85, category: "tooling" },
];

const systemPrompt = `You are the portfolio assistant for ${profile.fullName}.

Rules:
- Use only the facts from this portfolio data.
- If the information is not present, say clearly that it is not available in the portfolio data.
- Do not infer private information such as birthday, exact age, relationships, phone number, or salary expectations.
- Keep responses concise, professional, and natural.
- Reply in the same language the user used.

Portfolio facts:
- Name: ${profile.fullName}
- Role: ${profile.role}
- Location: ${profile.location}
- Email: ${contactEmail}
- Degree: ${profile.degree}
- School: ${profile.college}
- Graduation year: ${profile.graduationYear}
- Senior high: ${profile.seniorHighSchool}, ${profile.seniorHighTrack}, ${profile.seniorHighStatus}
- Skills: ${flatSkills.map((skill) => `${skill.label} (${skill.level}%)`).join(", ")}
- Project count: ${projects.length}
- Certificate count: ${certificates.length}

If the user asks about a skill, project, certificate, education, or contact detail that exists here, answer directly and explain briefly.
If the user asks about something missing, say it is not available in the portfolio data.`;

let geminiCooldownUntil = 0;

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function looksFilipino(value: string) {
  return /\b(ano|ilan|ilang|kailan|sino|saan|paano|pwede|maaari|trabaho|edad|taon|birthday|kaarawan|contact|email|hire|project|skill)\b/i.test(
    value,
  );
}

function textResponse(text: string) {
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function isGeminiCoolingDown() {
  return geminiCooldownUntil > Date.now();
}

function markGeminiCoolingDown() {
  geminiCooldownUntil = Date.now() + RATE_LIMIT_COOLDOWN_MS;
}

function findSkill(question: string) {
  const normalized = normalizeText(question);
  return flatSkills.find((skill) =>
    skill.aliases.some((alias) => normalized.includes(alias)),
  );
}

function findProject(question: string) {
  const normalized = normalizeText(question);
  return (
    projects.find((project) => normalized.includes(project.title.toLowerCase())) ??
    projects.find((project) =>
      project.tags.some((tag) => normalized.includes(tag.toLowerCase())),
    ) ??
    null
  );
}

function findCertificate(question: string) {
  const normalized = normalizeText(question);
  return (
    certificates.find((certificate) =>
      normalized.includes(certificate.title.toLowerCase()),
    ) ??
    certificates.find((certificate) =>
      normalized.includes(certificate.issuer.toLowerCase()),
    ) ??
    null
  );
}

function unavailableReply(filipino: boolean, topic: string) {
  return filipino
    ? `Walang available na ${topic} sa portfolio data ni Renz, kaya hindi ako dapat mag-assume.`
    : `The ${topic} is not available in Renz's portfolio data, so I should not assume it.`;
}

function skillCategoryLabel(category: string, filipino: boolean) {
  if (category === "frontend") return filipino ? "frontend" : "frontend";
  if (category === "backend") return filipino ? "backend" : "backend";
  return filipino ? "R&D at tooling" : "R&D and tooling";
}

function localReply(question: string) {
  const normalized = normalizeText(question);
  const filipino = looksFilipino(question);
  const skill = findSkill(question);
  const project = findProject(question);
  const certificate = findCertificate(question);

  if (/(birthday|birth day|date of birth|kaarawan|kapanganakan)/.test(normalized)) {
    return unavailableReply(filipino, filipino ? "birthday" : "birthday");
  }

  if (/(age|edad|ilang taon|how old)/.test(normalized)) {
    return unavailableReply(filipino, filipino ? "edad" : "age");
  }

  if (/(contact|email|hire|get in touch|reach)/.test(normalized)) {
    return filipino
      ? `Pwede mong i-contact si Renz sa ${contactEmail}. Iyan ang best direct contact niya para sa hiring at project inquiries.`
      : `You can contact Renz at ${contactEmail}. That is his best direct contact for hiring and project inquiries.`;
  }

  if (/(who is renz|sino si renz|name|pangalan)/.test(normalized)) {
    return filipino
      ? `${profile.fullName} is a ${profile.role} from ${profile.location}.`
      : `${profile.fullName} is a ${profile.role} from ${profile.location}.`;
  }

  if (/(where|location|based|saan)/.test(normalized)) {
    return filipino
      ? `Based sa portfolio data niya, si Renz ay nasa ${profile.location}.`
      : `Based on his portfolio data, Renz is based in ${profile.location}.`;
  }

  if (/(education|school|college|degree|graduate|graduat|background|course)/.test(normalized)) {
    const seniorHigh = education[1];
    return filipino
      ? `Nagtapos si Renz ng ${profile.degree} sa ${profile.college} noong ${profile.graduationYear}. Nag-senior high rin siya sa ${seniorHigh.school} sa ${profile.seniorHighTrack} at ${profile.seniorHighStatus.toLowerCase()}.`
      : `Renz graduated with a ${profile.degree} from ${profile.college} in ${profile.graduationYear}. He also completed senior high at ${seniorHigh.school} in the ${profile.seniorHighTrack}, graduating with honors.`;
  }

  if (
    skill &&
    /(may alam ba|marunong ba|does he know|does renz know|experience|familiar|can he use|gumagamit ba)/.test(
      normalized,
    )
  ) {
    return filipino
      ? `Oo, may documented experience si Renz sa ${skill.label}. Nasa ${skill.level}% ito sa portfolio niya at bahagi ito ng kaniyang ${skillCategoryLabel(skill.category, true)} stack.`
      : `Yes, Renz has documented experience with ${skill.label}. It is listed at ${skill.level}% in his portfolio and is part of his ${skillCategoryLabel(skill.category, false)} stack.`;
  }

  if (skill) {
    return filipino
      ? `Ang ${skill.label} ay isa sa documented skills ni Renz, with a ${skill.level}% level sa portfolio niya. Kasama ito sa kaniyang ${skillCategoryLabel(skill.category, true)} experience.`
      : `${skill.label} is one of Renz's documented skills, with a ${skill.level}% level in his portfolio. It is part of his ${skillCategoryLabel(skill.category, false)} experience.`;
  }

  if (project) {
    const hasLink = Boolean(project.link);
    return filipino
      ? `${project.title} ay isa sa documented projects ni Renz. Isa itong ${project.type.toLowerCase()} project na ${project.desc}${hasLink ? ` Link: ${project.link}` : ""}`
      : `${project.title} is one of Renz's documented projects. It is a ${project.type.toLowerCase()} project focused on ${project.desc}${hasLink ? ` Link: ${project.link}` : ""}`;
  }

  if (/(project|portfolio|built|sample work|sample|work)/.test(normalized)) {
    const featured = projects.slice(0, 3).map((item) => item.title).join(", ");
    return filipino
      ? `May ${projects.length}+ documented projects si Renz. Ilan sa mga ito ay ${featured}. Kung gusto mo, pwede kang magtanong tungkol sa isang specific project.`
      : `Renz has ${projects.length}+ documented projects. Some examples are ${featured}. If you want, you can ask about a specific project.`;
  }

  if (certificate) {
    return filipino
      ? `${certificate.title} ay kabilang sa documented certificates ni Renz. In-issue ito ng ${certificate.issuer} noong ${certificate.year}.`
      : `${certificate.title} is one of Renz's documented certificates. It was issued by ${certificate.issuer} in ${certificate.year}.`;
  }

  if (/(certificate|certification|course|training|credential)/.test(normalized)) {
    return filipino
      ? `May ${certificates.length}+ documented certificates si Renz covering web development, JavaScript, React, UI/UX, PHP/MySQL, ethical hacking, at IT troubleshooting.`
      : `Renz has ${certificates.length}+ documented certificates covering web development, JavaScript, React, UI/UX, PHP/MySQL, ethical hacking, and IT troubleshooting.`;
  }

  if (/(skills?|stack|tech|technology|frontend|backend|docker|react|tailwind|mysql|git|linux|ai)/.test(normalized)) {
    const summary = skillGroups
      .map((group) => `${group.category}: ${group.skills.map((item) => item.name).join(", ")}`)
      .join(" | ");

    return filipino
      ? `Ang documented skill set ni Renz ay: ${summary}.`
      : `Renz's documented skill set is: ${summary}.`;
  }

  return filipino
    ? "Hindi ko nakita ang eksaktong sagot sa portfolio data ni Renz. Mas okay kung magtanong ka tungkol sa kaniyang skills, projects, certificates, education, location, o contact details."
    : "I couldn't find an exact answer in Renz's portfolio data. It's better to ask about his skills, projects, certificates, education, location, or contact details.";
}

function shouldUseLocalReply(question: string) {
  const normalized = normalizeText(question);
  return /(birthday|birth day|date of birth|kaarawan|kapanganakan|age|edad|ilang taon|how old|contact|email|hire|get in touch|reach|who is renz|sino si renz|name|pangalan|where|location|based|saan|education|school|college|degree|graduate|graduat|background|course|may alam ba|marunong ba|does he know|experience|familiar|can he use|gumagamit ba|project|portfolio|built|sample work|sample|work|certificate|certification|course|training|credential|skills?|stack|tech|technology|frontend|backend|docker|react|tailwind|mysql|git|linux|ai)/.test(
    normalized,
  );
}

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages?: ChatMessage[] };
  const safeMessages = Array.isArray(messages) ? messages : [];
  const lastMessage = safeMessages.at(-1)?.content?.trim();

  if (!lastMessage) {
    return textResponse("Please send a message first.");
  }

  if (shouldUseLocalReply(lastMessage) || !process.env.GEMINI_API_KEY || isGeminiCoolingDown()) {
    return textResponse(localReply(lastMessage));
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    });

    const history = safeMessages
      .slice(0, -1)
      .filter((message, index) => !(index === 0 && message.role === "assistant"))
      .map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage);
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (error) {
          const message = String(error);
          if (
            message.includes("quota") ||
            message.includes("429") ||
            message.includes("RESOURCE_EXHAUSTED")
          ) {
            markGeminiCoolingDown();
          }
          controller.enqueue(encoder.encode(localReply(lastMessage)));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    const message = String(error);
    if (
      message.includes("quota") ||
      message.includes("429") ||
      message.includes("RESOURCE_EXHAUSTED")
    ) {
      markGeminiCoolingDown();
    }

    if (
      message.includes("API_KEY") ||
      message.includes("401") ||
      message.includes("403") ||
      message.includes("404") ||
      message.includes("not found") ||
      message.includes("quota") ||
      message.includes("429") ||
      message.includes("RESOURCE_EXHAUSTED")
    ) {
      return textResponse(localReply(lastMessage));
    }

    console.error("Chat API error:", error);
    return textResponse(localReply(lastMessage));
  }
}
