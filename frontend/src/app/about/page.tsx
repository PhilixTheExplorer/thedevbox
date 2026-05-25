import type { Metadata } from "next";
import { SupportLinks } from "@/components/support-link";
import { OSS_LINKS, SITE_NAME, SITE_URL } from "@/config/site";

const title = "About thedevbox";
const description =
  "Learn about thedevbox and why these developer utilities are ad-free, account-free, tracking-free, and privacy-first.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default function AboutPage() {
  return (
    <div className="py-page-y px-page-x overflow-auto h-full">
      <div className="max-w-readable">
        <div className="text-2xs text-muted tracking-widest mb-2.5">
          {"// about"}
        </div>
        <h1 className="text-2xl font-bold mb-7 mt-0">
          what is <span className="text-accent">[</span>thedevbox
          <span className="text-accent">]</span>?
        </h1>
        <hr className="border-border mb-7" />
        <section className="flex flex-col gap-4 leading-loose text-muted2">
          <p>
            thedevbox is the official home of{" "}
            <span className="text-text">[thedevbox]</span>, a collection of
            tools built by developers who got tired of sites that require login
            to format json, questionable online converters, and heavyweight apps
            for tiny everyday tasks.
          </p>
          <p>
            official site:{" "}
            <a
              href={SITE_URL}
              className="text-accent no-underline hover:underline"
            >
              {SITE_URL.replace("https://", "")}
            </a>
          </p>
          <p>
            every tool runs{" "}
            <span className="text-text">entirely in your browser</span>. your
            data never leaves your machine. we don't know what you paste here
            and we don't care.
          </p>
          <blockquote className="border-l-4 border-accent pl-4 text-text my-2">
            we believe developer tools should be fast, offline-capable, honest,
            and free. not "free" as in we track everything you do. actually
            free.
          </blockquote>
          <p>
            if a tool needs a server (like ipynb → pdf), we'll tell you clearly.
            everything else is designed to stay client-side.
          </p>
          <p>
            we're open source. if you find a bug, have an idea, or want to
            contribute a tool,{" "}
            <a
              href={OSS_LINKS.issues}
              target="_blank"
              rel="noreferrer"
              className="text-accent cursor-pointer border-none bg-transparent font-inherit p-0 no-underline hover:underline"
            >
              open an issue ↗
            </a>
          </p>

          <SupportLinks className="flex flex-wrap gap-2 pt-1.5" />
        </section>
        <section className="mt-10 mb-10">
          <h2 className="text-2xs text-accent tracking-widest uppercase mb-3.5 mt-0">
            tech stack
          </h2>
          <div className="border border-border rounded-sm overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                {[
                  ["runtime", "browser. just the browser."],
                  ["framework", "next.js (app router) + react"],
                  ["styling", "tailwind css v4"],
                  ["test & lint", "vitest + biome"],
                  ["tool scaffold", "pnpm create:tool"],
                  ["fonts", "JetBrains Mono"],
                  ["tracking", "none"],
                  ["cookies", "none"],
                  ["license", "MIT"],
                ].map(([k, v]) => (
                  <tr
                    key={k}
                    className="border-b border-border last:border-none"
                  >
                    <td className="px-3 py-2 text-muted text-ui-xs align-middle w-32">
                      {k}
                    </td>
                    <td className="px-3 py-2 text-xs break-all align-middle font-mono">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
