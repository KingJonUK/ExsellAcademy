import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { footerNav, siteConfig } from "@/lib/site";
import { Logo } from "@/components/logo";
import { socialIcons } from "@/components/social-icons";

const socialLinks = [
  { key: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn" },
  { key: "instagram", href: siteConfig.social.instagram, label: "Instagram" },
  { key: "tiktok", href: siteConfig.social.tiktok, label: "TikTok" },
  { key: "youtube", href: siteConfig.social.youtube, label: "YouTube" },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {siteConfig.supportingLine}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = socialIcons[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-lg bg-white/5 text-slate-300 transition-colors hover:bg-accent-500 hover:text-navy"
                  >
                    <SocialIcon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="size-4" /> {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="size-4" /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
