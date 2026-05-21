"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
  articleCategories,
  articles,
  type Article,
  type ArticleCategory,
} from "@/data/articles";
import type { AuthorityCluster } from "@/lib/content-engine";
import { getArticleSemanticProfile } from "@/lib/internal-linking";

const allCategory = "Toate";
type FilterCategory = ArticleCategory | typeof allCategory;
const filterCategories: readonly FilterCategory[] = [
  allCategory,
  ...articleCategories,
];
const allCluster = "Toate traseele";
type FilterCluster = AuthorityCluster | typeof allCluster;
const clusterLabels: Record<AuthorityCluster, string> = {
  "clinic-planning": "Clinici",
  "radiology-planning": "Radiologie",
  "rmn-rf": "RMN / RF",
  "ct-radiation": "CT / RX",
  "cncan-dsp": "DSP / CNCAN",
  "equipment-imaging": "Aparatura",
  "ivd-lab": "IVD",
  "service-uptime": "Service",
  modernization: "Modernizare",
  budgeting: "Costuri",
};
const clusterFilters: readonly FilterCluster[] = [
  allCluster,
  "clinic-planning",
  "radiology-planning",
  "rmn-rf",
  "ct-radiation",
  "cncan-dsp",
  "equipment-imaging",
  "ivd-lab",
  "service-uptime",
  "modernization",
  "budgeting",
];

export function KnowledgeHubArticles() {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>(allCategory);
  const [activeCluster, setActiveCluster] =
    useState<FilterCluster>(allCluster);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === allCategory || article.category === activeCategory;
      const matchesCluster =
        activeCluster === allCluster ||
        getArticleSemanticProfile(article).authorityClusters.includes(activeCluster);

      return matchesCategory && matchesCluster;
    });
  }, [activeCategory, activeCluster]);

  return (
    <div className="grid gap-12" id="ghiduri-tehnice">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
            Filtrare pe domenii tehnice
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
            Ghiduri grupate pe infrastructură, tehnologie și operare.
          </h2>
        </div>
        <p className="max-w-sm text-base leading-8 text-slate-600">
          Fiecare resursă este construită ca punct de pornire pentru decizii
          tehnice, nu ca articol generic.
        </p>
      </div>

      <div
        aria-label="Filtre Knowledge Hub"
        className="flex flex-wrap gap-2"
        role="list"
      >
        {filterCategories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                isActive
                  ? "border-[#0057b8] bg-[#0057b8] text-white shadow-[0_14px_30px_rgba(0,87,184,0.18)]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]",
              )}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_18px_60px_rgba(0,87,184,0.05)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Trasee semantice
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Filtreaza dupa etapa, echipament si intentie. Rezultat curent:{" "}
              <strong className="text-slate-950">{filteredArticles.length}</strong>{" "}
              articole.
            </p>
          </div>
          <button
            className="text-left text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:text-right"
            onClick={() => {
              setActiveCategory(allCategory);
              setActiveCluster(allCluster);
            }}
            type="button"
          >
            Reseteaza filtrele
          </button>
        </div>
        <div
          aria-label="Trasee semantice Knowledge Hub"
          className="mt-5 flex flex-wrap gap-2"
          role="list"
        >
          {clusterFilters.map((cluster) => {
            const isActive = activeCluster === cluster;
            const label =
              cluster === allCluster ? allCluster : clusterLabels[cluster];

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  isActive
                    ? "border-[#0057b8] bg-[#0057b8] text-white shadow-[0_14px_30px_rgba(0,87,184,0.18)]"
                    : "border-slate-200 bg-[#f8fbff] text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]",
                )}
                key={cluster}
                onClick={() => setActiveCluster(cluster)}
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" id="articole">
        {filteredArticles.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card
      as="article"
      className="flex min-h-[27rem] flex-col border-blue-100 bg-white"
      interactive
      padding="lg"
    >
      <div className="flex items-center justify-between gap-4">
        <Badge variant="blue">{article.category}</Badge>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          {article.readingTime}
        </span>
      </div>

      <h3 className="mt-7 text-2xl font-semibold leading-tight text-slate-950">
        {article.title}
      </h3>
      <p className="mt-4 text-base leading-8 text-slate-600">
        {article.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {article.tags.slice(0, 4).map((tag) => (
          <span
            className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <Link
          className="inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href={`/knowledge-hub/${article.slug}`}
        >
          Citește ghidul
        </Link>
      </div>
    </Card>
  );
}
