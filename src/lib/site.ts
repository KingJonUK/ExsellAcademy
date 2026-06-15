import type { NavLink } from "@/lib/types";

export const siteConfig = {
  name: "ExSell Academy",
  shortName: "ExSell",
  tagline: "The career launchpad for future sales professionals.",
  supportingLine:
    "Certified online sales training, funded learning pathways, and real employer opportunities.",
  description:
    "ExSell Academy helps school leavers and emerging professionals build real sales skills, earn CPD certification, and access career opportunities with employers looking for trained sales talent.",
  url: "https://exsellacademy.com",
  email: "hello@exsellacademy.com",
  phone: "+44 20 3286 4471",
  // Digits only, used for the wa.me deep link. Placeholder until a real line exists.
  whatsapp: "442032864471",
  social: {
    linkedin: "https://www.linkedin.com/company/exsell-academy",
    instagram: "https://www.instagram.com/exsellacademy",
    tiktok: "https://www.tiktok.com/@exsellacademy",
    youtube: "https://www.youtube.com/@exsellacademy",
  },
} as const;

/** Primary header navigation. */
export const mainNav: NavLink[] = [
  { label: "Courses", href: "/courses" },
  { label: "Funded Training", href: "/funded-training" },
  { label: "Employers", href: "/employers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "About", href: "/about" },
];

/** Grouped footer navigation. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Learn",
    links: [
      { label: "All Courses", href: "/courses" },
      { label: "Funded Training", href: "/funded-training" },
      { label: "Apply Now", href: "/apply" },
      { label: "Learner Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Partner",
    links: [
      { label: "Employers", href: "/employers" },
      { label: "Sponsors", href: "/sponsors" },
      { label: "Success Stories", href: "/about#stories" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Verify a Certificate", href: "/verify/EXS-2026-000184" },
      { label: "Login", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
];

export const whatsappLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  "Hi ExSell Academy, I'd like to know more about your training.",
)}`;
