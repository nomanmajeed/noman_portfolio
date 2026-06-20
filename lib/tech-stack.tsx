import type { IconType } from "react-icons";
import { FaAws, FaDocker, FaPython, FaReact } from "react-icons/fa";
import {
  SiCelery,
  SiClickhouse,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiGithubactions,
  SiGit,
  SiGooglecloud,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiLangchain,
  SiMysql,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPydantic,
  SiRedis,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type TechStackItem = {
  id: string;
  name: string;
  Icon: IconType;
  /** Brand hex, or `currentColor` for theme-aware icons (Django, Next.js). */
  color: string;
};

/**
 * Single source of truth for stack icons — add entries here to update About & Tech sections.
 * Curated from CV + work history (experiences.json, profile.json).
 */
export const techStack: TechStackItem[] = [
  // Backend
  { id: "python", name: "Python", Icon: FaPython, color: "#3776AB" },
  { id: "fastapi", name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { id: "django", name: "Django", Icon: SiDjango, color: "currentColor" },
  { id: "flask", name: "Flask", Icon: SiFlask, color: "currentColor" },
  { id: "celery", name: "Celery", Icon: SiCelery, color: "#37814A" },
  { id: "pydantic", name: "Pydantic", Icon: SiPydantic, color: "#E92063" },

  // Frontend
  { id: "javascript", name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { id: "typescript", name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { id: "react", name: "React", Icon: FaReact, color: "#61DAFB" },
  { id: "nextjs", name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { id: "tailwind", name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },

  // Data stores
  { id: "postgresql", name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { id: "redis", name: "Redis", Icon: SiRedis, color: "#DC382D" },
  { id: "clickhouse", name: "ClickHouse", Icon: SiClickhouse, color: "#FFCC01" },
  { id: "mysql", name: "MySQL", Icon: SiMysql, color: "#4479A1" },

  // AI / LLM
  { id: "openai", name: "OpenAI", Icon: SiOpenai, color: "currentColor" },
  { id: "langchain", name: "LangChain", Icon: SiLangchain, color: "#47D392" },
  { id: "graphql", name: "GraphQL", Icon: SiGraphql, color: "#E10098" },

  // Cloud & DevOps
  { id: "docker", name: "Docker", Icon: FaDocker, color: "#2496ED" },
  { id: "kubernetes", name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { id: "aws", name: "AWS", Icon: FaAws, color: "#FF9900" },
  { id: "gcp", name: "GCP", Icon: SiGooglecloud, color: "#4285F4" },
  { id: "github-actions", name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },

  // Platforms & tools
  { id: "stripe", name: "Stripe", Icon: SiStripe, color: "#635BFF" },
  { id: "supabase", name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { id: "git", name: "Git", Icon: SiGit, color: "#F05032" },
];

export function isCurrentColorIcon(color: string) {
  return color === "currentColor";
}
