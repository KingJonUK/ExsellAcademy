import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

const lastUpdated = "15 June 2026";

export default function PrivacyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-display text-navy">Privacy Policy</h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Last updated: {lastUpdated}
        </p>

        {/* Template notice */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-800">
          <strong className="font-semibold">Template notice.</strong> This
          policy is a good-faith placeholder provided for development and review.
          It is not legal advice and must be reviewed and approved by qualified
          legal counsel before ExSell Academy relies on it in production.
        </div>

        <div className="mt-10 space-y-10 text-slate-600">
          <section className="space-y-3">
            <p className="leading-relaxed">
              ExSell Academy (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) is committed to protecting your privacy. This
              policy explains what personal data we collect when you use{" "}
              {siteConfig.url}, our courses and our services, how we use it, the
              lawful bases we rely on, and the rights you have under the UK
              General Data Protection Regulation (UK GDPR) and the Data
              Protection Act 2018.
            </p>
            <p className="leading-relaxed">
              We act as a data controller in respect of the personal data
              described below. For matters relating to learning, certification
              and recruitment, we may also share data with employers and
              sponsors as described in this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              1. Information we collect
            </h2>
            <ul className="ml-5 list-disc space-y-2 leading-relaxed marker:text-brand-500">
              <li>
                <strong className="font-semibold text-navy">
                  Account &amp; identity data
                </strong>{" "}
                — your name, email address, password (stored hashed) and the
                role you join as (learner, employer or sponsor).
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Application data
                </strong>{" "}
                — information you provide when applying for a funded place, such
                as your age, location, education and employment status, career
                goals and any support needs you choose to share.
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Learning data
                </strong>{" "}
                — your course progress, assessment results and certificates
                earned.
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Communications
                </strong>{" "}
                — messages you send us by form, email, phone or WhatsApp.
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Technical &amp; usage data
                </strong>{" "}
                — IP address, device and browser information, and analytics about
                how you use the site, collected through cookies and similar
                technologies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              2. How and why we use your data
            </h2>
            <p className="leading-relaxed">
              We use your personal data to provide and improve our services,
              specifically to:
            </p>
            <ul className="ml-5 list-disc space-y-2 leading-relaxed marker:text-brand-500">
              <li>create and manage your account and deliver your courses;</li>
              <li>
                assess and process applications for funded training places;
              </li>
              <li>
                issue and verify CPD certificates and share certified outcomes
                with employers and sponsors where you have asked us to or
                consented;
              </li>
              <li>
                respond to your enquiries and provide learner and partner
                support;
              </li>
              <li>
                send you service and, where you have opted in, marketing
                communications; and
              </li>
              <li>
                maintain the security of our platform and meet our legal and
                regulatory obligations.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">3. Lawful bases</h2>
            <p className="leading-relaxed">
              We only process personal data where we have a lawful basis to do
              so under Article 6 UK GDPR. Depending on the activity, we rely on:
            </p>
            <ul className="ml-5 list-disc space-y-2 leading-relaxed marker:text-brand-500">
              <li>
                <strong className="font-semibold text-navy">Contract</strong> —
                to deliver the courses and services you sign up for.
              </li>
              <li>
                <strong className="font-semibold text-navy">Consent</strong> —
                for optional marketing, and for sharing your details with
                employers or sponsors. You can withdraw consent at any time.
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Legitimate interests
                </strong>{" "}
                — to improve and secure our services and understand how they are
                used, balanced against your rights.
              </li>
              <li>
                <strong className="font-semibold text-navy">
                  Legal obligation
                </strong>{" "}
                — where we are required to retain or disclose data by law.
              </li>
            </ul>
            <p className="leading-relaxed">
              Where you share special category information (for example,
              safeguarding or support needs), we process it only with your
              explicit consent and to provide appropriate support.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">
              4. Sharing your data
            </h2>
            <p className="leading-relaxed">
              We do not sell your personal data. We share it only with:
              service providers who help us run the platform (such as hosting,
              email and analytics providers) under appropriate contracts;
              employers and sponsors where you have consented as part of our
              recruitment and funding services; and authorities where we are
              legally required to do so. Any transfers outside the UK are
              protected by appropriate safeguards such as UK adequacy
              regulations or standard contractual clauses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">5. Data retention</h2>
            <p className="leading-relaxed">
              We keep personal data only for as long as necessary for the
              purposes set out above. Account and learning records are generally
              retained for the duration of your relationship with us and for a
              reasonable period afterwards; certificate records may be kept
              longer to support verification. Unsuccessful application data is
              retained for a limited period and then deleted or anonymised.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">6. Your rights</h2>
            <p className="leading-relaxed">
              Under UK GDPR you have the right to access your data, to have
              inaccurate data corrected, to request erasure, to restrict or
              object to processing, to data portability, and to withdraw consent
              where processing is based on consent. To exercise any of these
              rights, contact us using the details below. You also have the
              right to lodge a complaint with the Information Commissioner&rsquo;s
              Office (ICO) at ico.org.uk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">7. Cookies</h2>
            <p className="leading-relaxed">
              We use essential cookies to operate the site and, with your
              consent, analytics cookies to understand how it is used. You can
              control non-essential cookies through your browser settings or any
              cookie controls we provide.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy">8. Contact us</h2>
            <p className="leading-relaxed">
              If you have any questions about this policy or how we handle your
              data, please contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                {siteConfig.email}
              </a>
              .
            </p>
            <p className="leading-relaxed">
              See also our{" "}
              <Link
                href="/terms"
                className="font-semibold text-brand-700 hover:text-brand-800"
              >
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
