import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms of use that govern your access to ExSell Academy — covering eligibility, accounts, funded places and payments, intellectual property, liability and governing law.",
  alternates: {
    canonical: "/terms",
  },
};

const lastUpdated = "15 June 2026";

export default function TermsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-display text-navy">Terms of Service</h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Last updated: {lastUpdated}
        </p>

        {/* Template notice */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-800">
          <strong className="font-semibold">Template notice.</strong> These
          terms are a good-faith placeholder provided for development and review.
          They are not legal advice and must be reviewed and approved by
          qualified legal counsel before ExSell Academy relies on them in
          production.
        </div>

        <div className="mt-10 space-y-10 text-slate-600">
          <section className="space-y-3">
            <p className="leading-relaxed">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
              and use of the ExSell Academy website at {siteConfig.url}, our
              courses, certifications and related services (together, the
              &ldquo;Services&rdquo;). By creating an account or using the
              Services you agree to these Terms. If you do not agree, please do
              not use the Services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">1. Who we are</h2>
            <p className="leading-relaxed">
              The Services are operated by ExSell Academy. You can reach us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                {siteConfig.email}
              </a>
              . References to &ldquo;we&rdquo;, &ldquo;us&rdquo; and
              &ldquo;our&rdquo; are to ExSell Academy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">2. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 16 years old to create an account and use the
              Services. By using the Services you confirm that the information
              you provide is accurate and that you are legally able to enter into
              these Terms. Some funded places and programmes may have additional
              eligibility criteria, which we will make clear at the point of
              application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              3. Accounts &amp; acceptable use
            </h2>
            <p className="leading-relaxed">
              You are responsible for keeping your account credentials secure and
              for all activity under your account. You agree to use the Services
              lawfully and not to: misuse, disrupt or attempt to gain
              unauthorised access to the platform; share or resell course content
              except as permitted; or impersonate others or submit false
              information. We may suspend or close accounts that breach these
              Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              4. Courses, certification &amp; outcomes
            </h2>
            <p className="leading-relaxed">
              We aim to deliver high-quality, CPD-aligned training, but we do not
              guarantee any particular learning outcome, certification result,
              interview or employment. Certificates confirm completion and
              assessment of the relevant course only. Recruitment and sponsorship
              connections are offered on a best-efforts basis and do not amount to
              a promise of a job or funding.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              5. Funded places &amp; payments
            </h2>
            <p className="leading-relaxed">
              Some courses are free, some are paid, and some are offered as
              funded places supported by sponsors. Prices for paid courses are
              shown before purchase and are in pounds sterling unless stated
              otherwise. Funded places are subject to availability and any
              conditions set out at application. Where you have a statutory right
              to cancel a paid purchase, we will honour it in line with
              applicable consumer law; details of any refund terms will be
              provided at the point of sale.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              6. Intellectual property
            </h2>
            <p className="leading-relaxed">
              All content within the Services — including course materials,
              videos, text, graphics, logos and the ExSell Academy name — is
              owned by us or our licensors and is protected by intellectual
              property laws. We grant you a limited, non-transferable,
              non-exclusive licence to access and use the content for your own
              personal learning. You may not copy, distribute, publish or create
              derivative works without our prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              7. Your content
            </h2>
            <p className="leading-relaxed">
              You retain ownership of any content you submit (for example,
              assessment answers or messages). By submitting it, you grant us a
              licence to use it as necessary to provide the Services, including
              assessing your work and issuing certificates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              8. Disclaimers &amp; liability
            </h2>
            <p className="leading-relaxed">
              The Services are provided &ldquo;as is&rdquo;. To the fullest extent
              permitted by law, we exclude all implied warranties. Nothing in
              these Terms limits liability for death or personal injury caused by
              negligence, for fraud, or for any liability that cannot be excluded
              under applicable law. Subject to that, we are not liable for
              indirect or consequential losses, or for loss of profit, business or
              opportunity. Our total liability arising from the Services is limited
              to the amount you paid us, if any, in the twelve months before the
              event giving rise to the claim.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">9. Privacy</h2>
            <p className="leading-relaxed">
              Our handling of your personal data is described in our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                Privacy Policy
              </Link>
              , which forms part of these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              10. Changes to these Terms
            </h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. Where changes are
              material we will take reasonable steps to let you know. Your
              continued use of the Services after changes take effect constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              11. Governing law
            </h2>
            <p className="leading-relaxed">
              These Terms and any dispute arising out of them are governed by the
              laws of England and Wales, and the courts of England and Wales have
              exclusive jurisdiction, save that you may also have rights to bring
              proceedings in your country of residence where required by
              applicable consumer law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">12. Contact us</h2>
            <p className="leading-relaxed">
              Questions about these Terms? Email us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
