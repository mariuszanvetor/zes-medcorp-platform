"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { outreachTemplates } from "@/data/outreach-templates";
import {
  linkedinPostIdeas,
  type LinkedinPostCategory,
  type LinkedinPostIdea,
} from "@/data/linkedin-posts";

const quickLinks = [
  { label: "Proposal Builder", href: "/proposal-builder" },
  { label: "Project Intake", href: "/project-intake" },
  { label: "Calculatoare", href: "/calculatoare" },
  { label: "Glosar", href: "/glosar" },
  { label: "Comparatii", href: "/comparatii" },
  { label: "Planificare", href: "/planificare" },
];

const categoryOrder: LinkedinPostCategory[] = [
  "educational",
  "technical-insight",
  "planning-mistake",
  "comparison",
  "calculator-led",
  "proposal-builder",
  "project-intake",
  "glossary",
  "trend",
  "service",
];

const categoryMeta: Record<
  LinkedinPostCategory,
  { label: string; audience: string; outreach: string; badge: "blue" | "neutral" }
> = {
  educational: {
    label: "Educational",
    audience: "clinic owners, architects, technical leads",
    outreach: "Share the resource first, then ask whether the project context is relevant.",
    badge: "blue",
  },
  "technical-insight": {
    label: "Technical insight",
    audience: "project managers, technical consultants",
    outreach: "Lead with the technical distinction and offer the most relevant guide.",
    badge: "blue",
  },
  "planning-mistake": {
    label: "Planning mistake",
    audience: "owners, operators, consultants",
    outreach: "Use the post to open a practical discussion about risk and rework.",
    badge: "neutral",
  },
  comparison: {
    label: "Comparison",
    audience: "buyers, procurement, decision makers",
    outreach: "Link the comparison to a decision that still needs validation.",
    badge: "blue",
  },
  "calculator-led": {
    label: "Calculator-led",
    audience: "buyers with budget or timeline questions",
    outreach: "Send the calculator only when there is a real project type to match.",
    badge: "blue",
  },
  "proposal-builder": {
    label: "Proposal Builder",
    audience: "projects moving toward technical discussion",
    outreach: "Use when there is enough context to benefit from a structured proposal.",
    badge: "blue",
  },
  "project-intake": {
    label: "Project Intake",
    audience: "early-stage projects",
    outreach: "Use when the prospect needs structure before a technical call.",
    badge: "neutral",
  },
  glossary: {
    label: "Glossary",
    audience: "technical teams, architects, learners",
    outreach: "Use to remove confusion before pushing a tool or consultation.",
    badge: "neutral",
  },
  trend: {
    label: "Trend",
    audience: "industry observers, technical teams",
    outreach: "Keep it grounded and tie the trend back to a real operational implication.",
    badge: "neutral",
  },
  service: {
    label: "Service",
    audience: "operations, clinic admins, maintenance leads",
    outreach: "Focus on uptime, troubleshooting, or preventive planning.",
    badge: "blue",
  },
};

const checklistItems = [
  "Publish one LinkedIn post",
  "Send 5-10 relevant connection requests",
  "Send 3-5 warm messages",
  "Promote one calculator",
  "Promote one comparison or glossary page",
  "Check Search Console",
  "Check Google Sheet leads",
  "Check Resend events",
  "Check admin lead flow",
];

export function ContentOpsHub() {
  const [selectedCategory, setSelectedCategory] =
    useState<LinkedinPostCategory | "all">("all");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const todayIdea = useMemo(() => {
    const dayNumber = Math.floor(Date.now() / 86_400_000);
    return linkedinPostIdeas[dayNumber % linkedinPostIdeas.length];
  }, []);

  const allGroups = useMemo(() => {
    const groups = categoryOrder.map((category) => ({
      category,
      ideas: linkedinPostIdeas.filter((idea) => idea.category === category),
    }));

    return groups;
  }, []);

  const groupedIdeas = useMemo(() => {
    return allGroups.filter((group) =>
      selectedCategory === "all" ? true : group.category === selectedCategory,
    );
  }, [allGroups, selectedCategory]);

  const summaryCards = useMemo(() => {
    const counts = linkedinPostIdeas.reduce<Record<string, number>>((acc, idea) => {
      acc[idea.category] = (acc[idea.category] ?? 0) + 1;
      return acc;
    }, {});

    const topCategoryKey =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "educational";

    return [
      { label: "Ideas totale", value: String(linkedinPostIdeas.length) },
      { label: "Categorii active", value: String(allGroups.length) },
      { label: "Postul zilei", value: todayIdea.title },
      { label: "Focus outreach", value: categoryMeta[todayIdea.category].label },
      { label: "Top category", value: categoryMeta[topCategoryKey as LinkedinPostCategory].label },
    ];
  }, [allGroups.length, todayIdea.category]);

  async function copyDraft(idea: LinkedinPostIdea) {
    const draft = buildDraft(idea);
    try {
      await navigator.clipboard.writeText(draft);
      setCopiedSlug(idea.slug);
      window.setTimeout(() => setCopiedSlug(null), 1500);
    } catch {
      // Keep the flow silent; the user can still open the post text manually.
    }
  }

  return (
    <div className="grid gap-8">
      <Card className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]" padding="lg">
        <div className="flex flex-wrap gap-2">
          <Badge variant="blue">Content ops</Badge>
          <Badge variant="neutral">internal only</Badge>
          <Badge variant="neutral">manual publishing</Badge>
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
          Content operations hub
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Use this panel to pick today&apos;s LinkedIn post, scan the 30-day content
          mix, keep outreach human, and move each post toward a useful next step.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((item) => (
            <div className="rounded-2xl border border-blue-100 bg-white p-4" key={item.label}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-950">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="border-blue-100 bg-white" padding="lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Today&apos;s suggestion
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {todayIdea.title}
              </h3>
            </div>
            <Badge variant={categoryMeta[todayIdea.category].badge}>
              {categoryMeta[todayIdea.category].label}
            </Badge>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">{todayIdea.hook}</p>

          <div className="mt-6 grid gap-2">
            <MetaLine label="Audience" value={todayIdea.audience} />
            <MetaLine label="Intent" value={todayIdea.intent} />
            <MetaLine label="CTA" value={todayIdea.cta} />
            <MetaLine label="Recommended URL" value={todayIdea.linkTarget} mono />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {todayIdea.hashtags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fbff] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              Visual concept
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{todayIdea.visualConcept}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              <span className="font-semibold text-slate-900">Outreach focus:</span>{" "}
              {categoryMeta[todayIdea.category].outreach}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => copyDraft(todayIdea)} variant="primary">
              {copiedSlug === todayIdea.slug ? "Copied" : "Copy post draft"}
            </Button>
            <Button href={todayIdea.linkTarget} variant="secondary">
              Open recommended URL
            </Button>
          </div>

          <div className="mt-8 grid gap-3">
            {todayIdea.keyPoints.map((point) => (
              <div
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-600"
                key={point}
              >
                {point}
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-blue-100 bg-white" padding="lg">
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  30-day content calendar summary
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  Keep the calendar mixed and practical
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">30 days</Badge>
                <Badge variant="neutral">manual</Badge>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-600">
              Use the docs calendar for day-by-day publishing, and this panel to check
              category balance, link targets, and outreach direction before posting.
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="blue">Educational</Badge>
              <Badge variant="blue">Technical insight</Badge>
              <Badge variant="neutral">Calculator-led</Badge>
              <Badge variant="neutral">Comparison</Badge>
              <Badge variant="neutral">Service</Badge>
              <Badge variant="neutral">Glossary</Badge>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {groupedIdeas.map((group) => (
              <div
                className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4"
                key={group.category}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {categoryMeta[group.category].label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {categoryMeta[group.category].audience}
                    </p>
                  </div>
                  <Badge variant={categoryMeta[group.category].badge}>
                    {group.ideas.length}
                  </Badge>
                </div>
                <div className="mt-3 grid gap-2">
                  {group.ideas.slice(0, 3).map((idea) => (
                    <Link
                      className="text-sm font-medium text-[#0057b8] transition hover:text-blue-950"
                      href={idea.linkTarget}
                      key={idea.slug}
                    >
                      {idea.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Post ideas by category
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Browse the full LinkedIn idea set
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Filter by category, then copy the draft or open the recommended URL.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <CategoryChip
              active={selectedCategory === "all"}
              label="All"
              onClick={() => setSelectedCategory("all")}
            />
            {categoryOrder.map((category) => (
              <CategoryChip
                active={selectedCategory === category}
                label={categoryMeta[category].label}
                key={category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {groupedIdeas.map((group) => (
            <div className="grid gap-4" key={group.category}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-semibold text-slate-950">
                    {categoryMeta[group.category].label}
                  </h4>
                  <p className="text-sm text-slate-500">{categoryMeta[group.category].audience}</p>
                </div>
                <Badge variant={categoryMeta[group.category].badge}>{group.ideas.length}</Badge>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {group.ideas.map((idea) => (
                  <div
                    className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-5"
                    key={idea.slug}
                  >
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={categoryMeta[idea.category].badge}>
                        {categoryMeta[idea.category].label}
                      </Badge>
                      <Badge variant="neutral">{idea.intent}</Badge>
                    </div>
                    <h5 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                      {idea.title}
                    </h5>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{idea.hook}</p>

                    <div className="mt-4 grid gap-2 text-sm">
                      <MetaLine label="Audience" value={idea.audience} />
                      <MetaLine label="CTA" value={idea.cta} />
                      <MetaLine label="Link target" value={idea.linkTarget} mono />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {idea.hashtags.map((tag) => (
                        <Badge key={tag} variant="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                        Key points
                      </p>
                      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                        {idea.keyPoints.map((point) => (
                          <li className="flex gap-2" key={point}>
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                        Visual concept
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{idea.visualConcept}</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <Button onClick={() => copyDraft(idea)} variant="secondary">
                        {copiedSlug === idea.slug ? "Copied" : "Copy draft"}
                      </Button>
                      <Button href={idea.linkTarget} variant="primary">
                        Open URL
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-blue-100 bg-white" padding="lg">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Daily outreach focus
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                Keep outreach tied to a real project signal
              </h3>
            </div>
            <Badge variant="blue">{categoryMeta[todayIdea.category].label}</Badge>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            {categoryMeta[todayIdea.category].outreach}
          </p>

          <div className="mt-6 grid gap-3">
            <OpsCard title="Proposal Builder">
              Use when the discussion has enough context to turn into a structured,
              preliminary proposal.
            </OpsCard>
            <OpsCard title="Project Intake">
              Use when the prospect needs to organize the project before a technical call.
            </OpsCard>
            <OpsCard title="Calculator-led outreach">
              Use calculators to anchor the conversation in planning assumptions, not guesses.
            </OpsCard>
          </div>
        </Card>

        <Card className="border-blue-100 bg-white" padding="lg">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Outreach templates
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                Ready-to-use messages for manual outreach
              </h3>
            </div>
            <p className="text-sm leading-7 text-slate-600">
              Short, professional, and easy to adapt.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {outreachTemplates.map((template) => (
              <div
                className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-5"
                key={template.slug}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">{template.title}</Badge>
                  <Badge variant="neutral">{template.audience}</Badge>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{template.purpose}</p>
                <p className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
                  {template.body}
                </p>
                {template.followUp ? (
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    <span className="font-semibold text-slate-900">Follow-up:</span>{" "}
                    {template.followUp}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Daily ops checklist
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Keep the routine repeatable
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Small, manual habits keep the content system useful without turning it into spam.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="blue">Manual</Badge>
            <Badge variant="neutral">No automation</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {checklistItems.map((item) => (
            <label
              className="flex cursor-default items-start gap-3 rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 text-sm leading-7 text-slate-700"
              key={item}
            >
              <input
                aria-label={item}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0057b8] focus:ring-[#0057b8]"
                type="checkbox"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}

function buildDraft(idea: LinkedinPostIdea) {
  return [
    idea.title,
    "",
    idea.hook,
    "",
    ...idea.keyPoints.map((point) => `- ${point}`),
    "",
    idea.cta,
    idea.linkTarget,
    "",
    idea.hashtags.join(" "),
  ].join("\n");
}

function MetaLine({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      <span className={mono ? "font-mono text-xs text-slate-700" : "text-sm text-slate-700"}>
        {value}
      </span>
    </div>
  );
}

function OpsCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-5">
      <h4 className="text-base font-semibold text-slate-950">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-slate-600">{children}</p>
    </div>
  );
}

function CategoryChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={[
        "rounded-full border px-4 py-2 text-sm font-semibold transition",
        active
          ? "border-[#0057b8] bg-[#0057b8] text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-slate-950",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
