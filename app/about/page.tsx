import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionHeading } from "@/components/section-heading";
import { loadAboutContent } from "@/lib/content";

export const metadata = {
  title: "About | Causality Group @ MBZUAI",
  description:
    "Learn about the Causality Group at MBZUAI, led by Professors Kun Zhang. Focus areas, collaborations, and contact details.",
};

export default async function AboutPage() {
  const about = await loadAboutContent();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="About"
        title="Causality Group @ MBZUAI"
        description="Led by Professors Kun Zhang. Update /content/about.md to change this page without editing code."
      />
      <div className="card-surface rounded-2xl p-6 md:p-8">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {about || "Add group details in /content/about.md to populate this page."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
