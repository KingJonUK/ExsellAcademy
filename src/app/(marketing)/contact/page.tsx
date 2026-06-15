import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  MessagesSquare,
  GraduationCap,
  Building2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { ContactForm } from "@/components/forms/contact-form";
import { socialIcons } from "@/components/social-icons";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ExSell Academy. Whether you want to learn, hire trained sales talent or fund the next generation — we'd love to hear from you.",
};

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MessagesSquare,
    label: "WhatsApp",
    value: "Message us directly",
    href: whatsappLink,
    external: true,
  },
];

const paths = [
  {
    icon: GraduationCap,
    title: "Learners",
    description: "Start your funded sales training.",
    href: "/apply",
  },
  {
    icon: Building2,
    title: "Employers",
    description: "Hire sales-ready, certified talent.",
    href: "/employers",
  },
  {
    icon: HeartHandshake,
    title: "Sponsors",
    description: "Fund a learner and track impact.",
    href: "/sponsors",
  },
];

const socials: { key: keyof typeof socialIcons; label: string; href: string }[] =
  [
    { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
    { key: "instagram", label: "Instagram", href: siteConfig.social.instagram },
    { key: "tiktok", label: "TikTok", href: siteConfig.social.tiktok },
    { key: "youtube", label: "YouTube", href: siteConfig.social.youtube },
  ];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-aurora">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-page py-20 lg:py-28">
          <div className="max-w-2xl">
            <span
              className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft backdrop-blur"
              style={{ animationDelay: "40ms" }}
            >
              <Sparkles className="size-4 text-violet-500" />
              Contact
            </span>
            <h1
              className="mt-6 animate-fade-up text-hero text-navy"
              style={{ animationDelay: "120ms" }}
            >
              Let&apos;s talk
            </h1>
            <p
              className="mt-5 animate-fade-up text-lg leading-relaxed text-slate-600"
              style={{ animationDelay: "240ms" }}
            >
              Questions about courses, hiring or sponsorship? Send us a message
              or reach out directly — whichever suits you. We aim to reply
              within a couple of working days.
            </p>
          </div>
        </div>
      </section>

      {/* Details + form */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            {/* LEFT — contact details */}
            <div className="space-y-6">
              <GlassCard className="p-7">
                <h2 className="text-lg font-bold text-navy">Get in touch</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Prefer to reach us another way? Use any of the channels below.
                </p>
                <ul className="mt-6 space-y-3">
                  {channels.map((channel) => (
                    <li key={channel.label}>
                      <Link
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-400 hover:bg-slate-50"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                          <channel.icon className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {channel.label}
                          </span>
                          <span className="block truncate font-semibold text-navy">
                            {channel.value}
                          </span>
                        </span>
                        <ArrowRight className="ml-auto size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Social row */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Follow us
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {socials.map((social) => {
                      const SocialIcon = socialIcons[social.key];
                      return (
                        <Link
                          key={social.key}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600"
                        >
                          <SocialIcon className="size-5" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>

              {/* Choose your path */}
              <GlassCard className="p-7">
                <h2 className="text-lg font-bold text-navy">Choose your path</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Know what you&apos;re after? Jump straight to the right place.
                </p>
                <ul className="mt-6 space-y-3">
                  {paths.map((path) => (
                    <li key={path.title}>
                      <Link
                        href={path.href}
                        className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-400 hover:bg-slate-50"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-100 text-accent-700">
                          <path.icon className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-navy">
                            {path.title}
                          </span>
                          <span className="block text-sm text-slate-600">
                            {path.description}
                          </span>
                        </span>
                        <ArrowRight className="ml-auto size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* RIGHT — form */}
            <GlassCard className="p-7 shadow-elevated sm:p-8">
              <h2 className="text-xl font-bold text-navy">Send us a message</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Fill in the form and the right person on our team will get back
                to you.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
