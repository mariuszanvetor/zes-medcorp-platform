import type { ProposalDocument } from "@/lib/proposal-document";

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 46;
const contentWidth = pageWidth - margin * 2;
const blue = "#0057B8";
const deepBlue = "#003B7A";
const slate = "#334155";
const muted = "#64748B";
const lightBlue = "#EAF4FF";
const border = "#D8E7F7";

type PdfFont = "F1" | "F2";

type PdfPage = {
  commands: string[];
};

type PdfTextOptions = {
  size?: number;
  font?: PdfFont;
  color?: string;
  lineHeight?: number;
  maxWidth?: number;
};

type PdfBlockOptions = {
  fill?: string;
  stroke?: string;
  padding?: number;
};

type PdfMetadata = {
  title: string;
  author: string;
  subject: string;
  keywords: string[];
  creator: string;
  producer: string;
  creationDate: string;
};

export function downloadProposalPdf(document: ProposalDocument) {
  const blob = createProposalPdfBlob(document);
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");

  anchor.href = url;
  anchor.download = getProposalPdfFilename(document);
  anchor.rel = "noopener";
  window.document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

export function openProposalPdfForPrint(document: ProposalDocument) {
  const blob = createProposalPdfBlob(document);
  const url = URL.createObjectURL(blob);
  const opened = window.open(url, "_blank", "noopener,noreferrer");

  window.setTimeout(() => URL.revokeObjectURL(url), opened ? 30000 : 1200);

  return Boolean(opened);
}

export function getProposalPdfFilename(document: ProposalDocument) {
  const projectType = normalizeFilenamePart(document.summary.projectType);
  const title = normalizeFilenamePart(document.title);

  if (projectType.includes("rmn") || title.includes("rmn")) {
    return "zes-propunere-rmn.pdf";
  }

  if (projectType.includes("ct") || title.includes("ct")) {
    return "zes-propunere-ct.pdf";
  }

  if (projectType.includes("modernizare") || title.includes("modernizare")) {
    return "zes-propunere-modernizare.pdf";
  }

  if (projectType.includes("ivd") || title.includes("laborator")) {
    return "zes-propunere-laborator-ivd.pdf";
  }

  if (projectType.includes("service")) {
    return "zes-propunere-service.pdf";
  }

  return `zes-propunere-${projectType || title || "proiect-medical"}.pdf`;
}

export function createProposalPdfBlob(document: ProposalDocument) {
  const writer = new ProposalPdfWriter(document);
  return new Blob([writer.render()], { type: "application/pdf" });
}

class ProposalPdfWriter {
  private pages: PdfPage[] = [];
  private y = pageHeight - margin;

  constructor(private readonly document: ProposalDocument) {
    this.addPage();
    this.build();
  }

  render() {
    this.addFooters();
    return createPdf(this.pages, this.metadata());
  }

  private build() {
    this.cover();
    this.summary();
    this.servicesAndStages();
    this.technicalModules();
    this.budgetAndTimeline();
    this.risksAndValidation();
    this.nextStepsAndDisclaimer();
  }

  private cover() {
    this.rect(margin, pageHeight - 156, contentWidth, 110, {
      fill: lightBlue,
      stroke: border,
    });
    this.text("ZES MEDCORP", margin + 22, pageHeight - 78, {
      color: blue,
      font: "F2",
      size: 18,
    });
    this.text(this.document.company.legalName, margin + 22, pageHeight - 98, {
      color: deepBlue,
      font: "F2",
      size: 9.5,
    });
    this.text(this.document.subtitle, margin + 22, pageHeight - 116, {
      color: deepBlue,
      font: "F2",
      size: 10,
    });
    this.text(
      `${this.document.company.email} | ${this.document.company.phone} | ${this.document.company.address.full}`,
      margin + 22,
      pageHeight - 134,
      { color: muted, size: 8 },
    );
    this.text(
      `ID: ${this.document.proposalId} | ${this.document.versionLabel}`,
      margin + 22,
      pageHeight - 147,
      { color: muted, size: 8 },
    );

    this.y = pageHeight - 188;
    this.paragraph(this.document.title, {
      color: "#0F172A",
      font: "F2",
      lineHeight: 26,
      size: 22,
    });
    this.y -= 8;
    this.paragraph(this.document.summary.executiveSummary, {
      color: slate,
      lineHeight: 15,
      size: 10.5,
    });
    this.y -= 12;

    this.keyValues([
      ["ID propunere", this.document.proposalId],
      ["Versiune", this.document.versionLabel],
      ["Tip document", this.document.documentType],
      ["Tip proiect", this.document.summary.projectType],
      ["Complexitate", this.document.summary.complexity],
      ["Scor", `${this.document.summary.score}/100`],
      [
        "Incredere",
        `${this.document.summary.confidence.level} (${this.document.summary.confidence.score}/100)`,
      ],
      ["Buget orientativ", this.document.budgetEstimate.totalRange],
      ["Durata estimata", this.document.timeline.estimatedDuration],
    ]);

    this.y -= 16;
    this.callout(
      "Nota de utilizare",
      "Documentul este o propunere tehnica preliminara generata pe baza informatiilor introduse. Validarea finala depinde de amplasament, echipamente, documentatie, autorizari si cerintele finale ale proiectului.",
    );
  }

  private summary() {
    this.section("Interpretare proiect");
    this.paragraph(this.document.assembly.summary);
    this.list(this.document.assumptions.slice(0, 6));

    if (this.document.proposalIntelligence) {
      this.section("Intelligence propunere");
      this.callout(
        `Readiness ${this.document.proposalIntelligence.proposalReadinessScore}/100`,
        this.document.proposalIntelligence.projectIntelligenceSummary,
      );
      this.keyValues([
        ["Complexitate", String(this.document.proposalIntelligence.complexityAnalysis.level)],
        ["Urmator pas", this.document.proposalIntelligence.nextBestAction],
      ]);
      this.section("Pregatire discutie tehnica");
      this.list(this.document.proposalIntelligence.discussionPrep.slice(0, 6));
    }

    this.section("Ipoteze folosite");
    this.list(this.document.assumptions);
  }

  private servicesAndStages() {
    this.section("Servicii recomandate");
    this.list(this.document.recommendedServices);

    this.section("Etape tehnice propuse");
    this.document.phases.forEach((phase, index) => {
      this.paragraph(`${index + 1}. ${phase.title}`, {
        color: "#0F172A",
        font: "F2",
        size: 10.5,
      });

      const details = [phase.duration, phase.dependency].filter(Boolean).join(" | ");
      if (details) {
        this.paragraph(details, { color: muted, size: 9.5 });
      }
    });
  }

  private technicalModules() {
    this.section("Recomandari tehnice modulare");
    this.document.assembly.blocks.forEach((block) => {
      this.ensureSpace(88);
      this.paragraph(`${block.title} (${block.priority})`, {
        color: blue,
        font: "F2",
        size: 11,
      });
      this.paragraph(block.summary, { size: 9.5 });
      this.list(block.bullets.slice(0, 4), { compact: true });
      this.y -= 4;
    });

    this.section("Recomandari de secventiere");
    this.list(this.document.assembly.sequencingRecommendations);
  }

  private budgetAndTimeline() {
    this.section("Buget orientativ");
    this.callout("Interval total", this.document.budgetEstimate.totalRange);
    this.table("Buget pe faze", this.document.budgetEstimate.phaseBreakdown);
    this.table("Buget pe servicii", this.document.budgetEstimate.serviceBreakdown);

    this.section("Timeline estimativ");
    this.callout("Durata estimata", this.document.timeline.estimatedDuration);
    this.document.timeline.phases.forEach((phase) => {
      this.paragraph(phase.title, { color: "#0F172A", font: "F2", size: 10 });
      this.paragraph([phase.duration, phase.dependency].filter(Boolean).join(" | "), {
        color: muted,
        size: 9,
      });
    });

    if (this.document.timeline.criticalDependencies.length) {
      this.section("Dependinte critice");
      this.list(this.document.timeline.criticalDependencies);
    }
  }

  private risksAndValidation() {
    this.section("Registru de risc");
    this.document.risks.forEach((risk) => {
      this.ensureSpace(86);
      this.paragraph(`${risk.category} - ${risk.severity}`, {
        color: risk.severity === "Critical" ? "#BE123C" : blue,
        font: "F2",
        size: 10.5,
      });
      this.paragraph(risk.explanation, { size: 9.5 });
      this.paragraph(`Mitigare: ${risk.mitigation}`, {
        color: slate,
        font: "F2",
        size: 9.5,
      });
      this.y -= 4;
    });

    this.section("Informatii lipsa pentru validare");
    this.list(this.document.missingInformation);

    this.section("Note de validare");
    this.list([
      ...this.document.assembly.validationNeeds,
      ...(this.document.proposalIntelligence?.validationNeeds ?? []),
    ]);
  }

  private nextStepsAndDisclaimer() {
    this.section("Urmatorii pasi");
    this.paragraph(this.document.nextStep, {
      color: "#0F172A",
      font: "F2",
      size: 12,
    });
    this.list(this.document.nextSteps);

    this.section("Resurse si servicii conectate");
    this.list(
      this.document.assembly.relatedLinks
        .slice(0, 8)
        .map((link) => `${link.label} - ${link.reason}`),
    );

    this.section("Disclaimer profesional");
    this.callout(
      "Propunere preliminara",
      `${this.document.disclaimer} Documentul nu reprezinta aprobare finala de proiectare, aviz legal, autorizare, oferta comerciala finala sau garantie de implementare. Cerintele finale depind de conditiile amplasamentului, specificatiile echipamentelor, documentatia disponibila si validarea tehnica ZES.`,
    );
  }

  private metadata(): PdfMetadata {
    return {
      title: this.document.title,
      author: this.document.company.legalName,
      subject: `${this.document.documentType} - ${this.document.summary.projectType}`,
      keywords: [
        "ZES MEDCORP",
        this.document.proposalId,
        this.document.versionLabel,
        this.document.summary.projectType,
        "propunere preliminara",
      ],
      creator: "ZES MEDCORP Proposal Builder",
      producer: "ZES MEDCORP browser PDF generator",
      creationDate: this.document.generatedTimestamp,
    };
  }

  private section(title: string) {
    this.ensureSpace(48);
    this.y -= 10;
    this.text(title.toUpperCase(), margin, this.y, {
      color: blue,
      font: "F2",
      size: 10,
    });
    this.line(margin, this.y - 7, margin + contentWidth, this.y - 7, border);
    this.y -= 24;
  }

  private keyValues(rows: Array<[string, string]>) {
    const columnWidth = contentWidth / 2 - 8;
    const rowHeight = 46;

    rows.forEach(([label, value], index) => {
      const column = index % 2;
      if (column === 0) {
        this.ensureSpace(rowHeight + 8);
      }

      const x = margin + column * (columnWidth + 16);
      const y = this.y - rowHeight;
      this.rect(x, y, columnWidth, rowHeight, { fill: "#FFFFFF", stroke: border });
      this.text(label.toUpperCase(), x + 10, y + rowHeight - 16, {
        color: muted,
        font: "F2",
        size: 7.5,
      });
      this.text(value, x + 10, y + 14, {
        color: "#0F172A",
        font: "F2",
        maxWidth: columnWidth - 20,
        size: 9,
      });

      if (column === 1 || index === rows.length - 1) {
        this.y -= rowHeight + 8;
      }
    });
  }

  private table(title: string, rows: Array<{ label: string; value: string; note?: string }>) {
    this.ensureSpace(58);
    this.paragraph(title, { color: "#0F172A", font: "F2", size: 11 });
    rows.forEach((row) => {
      this.ensureSpace(44);
      const startY = this.y;
      this.text(row.label, margin, startY, {
        color: slate,
        font: "F2",
        maxWidth: contentWidth * 0.58,
        size: 9.2,
      });
      this.text(row.value, margin + contentWidth * 0.64, startY, {
        color: blue,
        font: "F2",
        maxWidth: contentWidth * 0.34,
        size: 9.2,
      });
      this.y -= 14;
      if (row.note) {
        this.paragraph(row.note, {
          color: muted,
          maxWidth: contentWidth * 0.9,
          size: 8.5,
        });
      }
      this.line(margin, this.y - 3, margin + contentWidth, this.y - 3, "#E2E8F0");
      this.y -= 12;
    });
  }

  private callout(title: string, body: string) {
    this.ensureSpace(86);
    const height = estimateHeight(body, contentWidth - 28, 9.5) + 38;
    this.ensureSpace(height);
    const y = this.y - height;
    this.rect(margin, y, contentWidth, height, { fill: lightBlue, stroke: border });
    this.text(title.toUpperCase(), margin + 14, y + height - 18, {
      color: blue,
      font: "F2",
      size: 8,
    });
    this.y = y + height - 34;
    this.paragraph(body, {
      color: slate,
      maxWidth: contentWidth - 28,
      size: 9.5,
      x: margin + 14,
    });
    this.y = y - 14;
  }

  private list(items: string[], options: { compact?: boolean } = {}) {
    items.filter(Boolean).forEach((item) => {
      this.ensureSpace(options.compact ? 18 : 24);
      const lines = wrapText(item, contentWidth - 18, options.compact ? 8.6 : 9.5);
      lines.forEach((line, index) => {
        this.text(index === 0 ? `- ${line}` : `  ${line}`, margin, this.y, {
          color: slate,
          size: options.compact ? 8.6 : 9.5,
        });
        this.y -= options.compact ? 12 : 14;
      });
      if (!options.compact) {
        this.y -= 2;
      }
    });
  }

  private paragraph(text: string, options: PdfTextOptions & { x?: number } = {}) {
    const x = options.x ?? margin;
    const maxWidth = options.maxWidth ?? contentWidth;
    const size = options.size ?? 9.5;
    const lineHeight = options.lineHeight ?? size + 4;
    const lines = wrapText(text, maxWidth, size, options.font);

    this.ensureSpace(lines.length * lineHeight + 2);
    lines.forEach((line) => {
      this.text(line, x, this.y, {
        color: options.color ?? slate,
        font: options.font,
        size,
      });
      this.y -= lineHeight;
    });
    this.y -= 4;
  }

  private text(text: string, x: number, y: number, options: PdfTextOptions = {}) {
    const page = this.currentPage();
    const font = options.font ?? "F1";
    const size = options.size ?? 10;
    const color = rgb(options.color ?? slate);
    const safeText = escapePdfString(normalizePdfText(text));

    page.commands.push(`${color} rg BT /${font} ${size} Tf 1 0 0 1 ${round(x)} ${round(y)} Tm (${safeText}) Tj ET`);
  }

  private rect(x: number, y: number, width: number, height: number, options: PdfBlockOptions) {
    const page = this.currentPage();
    const commands = ["q"];

    if (options.fill) {
      commands.push(`${rgb(options.fill)} rg`);
    }
    if (options.stroke) {
      commands.push(`${rgb(options.stroke)} RG 1 w`);
    }
    commands.push(`${round(x)} ${round(y)} ${round(width)} ${round(height)} re`);
    commands.push(options.fill && options.stroke ? "B" : options.fill ? "f" : "S");
    commands.push("Q");
    page.commands.push(commands.join(" "));
  }

  private line(x1: number, y1: number, x2: number, y2: number, color: string) {
    this.currentPage().commands.push(
      `q ${rgb(color)} RG 0.7 w ${round(x1)} ${round(y1)} m ${round(x2)} ${round(y2)} l S Q`,
    );
  }

  private ensureSpace(height: number) {
    if (this.y - height < margin + 34) {
      this.addPage();
    }
  }

  private addPage() {
    this.pages.push({ commands: [] });
    this.y = pageHeight - margin;
  }

  private currentPage() {
    return this.pages[this.pages.length - 1];
  }

  private addFooters() {
    const total = this.pages.length;
    this.pages.forEach((page, index) => {
      page.commands.push(
        `q ${rgb("#CBD5E1")} RG 0.7 w ${margin} 34 m ${margin + contentWidth} 34 l S Q`,
      );
      page.commands.push(
        `${rgb(muted)} rg BT /F1 8 Tf 1 0 0 1 ${margin} 22 Tm (${escapePdfString(
          normalizePdfText(
            `${this.document.company.legalName} | ${this.document.company.email} | ${this.document.company.phone}`,
          ),
        )}) Tj ET`,
      );
      page.commands.push(
        `${rgb(muted)} rg BT /F1 8 Tf 1 0 0 1 ${margin} 12 Tm (${escapePdfString(
          normalizePdfText(
            `${this.document.proposalId} | ${this.document.versionLabel} | Pagina ${index + 1} / ${total}`,
          ),
        )}) Tj ET`,
      );
    });
  }
}

function createPdf(pages: PdfPage[], metadata?: PdfMetadata) {
  const pageObjectNumbers = pages.map((_, index) => 3 + index * 2);
  const fontRegularObjectNumber = 3 + pages.length * 2;
  const fontBoldObjectNumber = fontRegularObjectNumber + 1;
  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pageObjectNumbers
      .map((objectNumber) => `${objectNumber} 0 R`)
      .join(" ")}] /Count ${pages.length} >>`,
  ];

  pages.forEach((page, index) => {
    const pageObjectNumber = pageObjectNumbers[index];
    const contentObjectNumber = pageObjectNumber + 1;
    const content = `${page.commands.join("\n")}\n`;

    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularObjectNumber} 0 R /F2 ${fontBoldObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`,
      `<< /Length ${byteLength(content)} >>\nstream\n${content}endstream`,
    );
  });

  objects.push(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );
  const infoObjectNumber = metadata ? objects.length + 1 : undefined;

  if (metadata) {
    objects.push(createInfoObject(metadata));
  }

  const header = "%PDF-1.4\n";
  const offsets: number[] = [];
  let body = "";
  let offset = byteLength(header);

  objects.forEach((object, index) => {
    const objectBody = `${index + 1} 0 obj\n${object}\nendobj\n`;
    offsets.push(offset);
    body += objectBody;
    offset += byteLength(objectBody);
  });

  const xrefOffset = offset;
  const xref = [
    `xref\n0 ${objects.length + 1}`,
    "0000000000 65535 f ",
    ...offsets.map((item) => `${String(item).padStart(10, "0")} 00000 n `),
  ].join("\n");
  const trailer = `\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R${
    infoObjectNumber ? ` /Info ${infoObjectNumber} 0 R` : ""
  } >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return `${header}${body}${xref}${trailer}`;
}

function createInfoObject(metadata: PdfMetadata) {
  return [
    "<<",
    `/Title (${escapePdfString(normalizePdfText(metadata.title))})`,
    `/Author (${escapePdfString(normalizePdfText(metadata.author))})`,
    `/Subject (${escapePdfString(normalizePdfText(metadata.subject))})`,
    `/Keywords (${escapePdfString(normalizePdfText(metadata.keywords.join(", ")))})`,
    `/Creator (${escapePdfString(normalizePdfText(metadata.creator))})`,
    `/Producer (${escapePdfString(normalizePdfText(metadata.producer))})`,
    `/CreationDate (${toPdfDate(metadata.creationDate)})`,
    ">>",
  ].join("\n");
}

function estimateHeight(text: string, width: number, size: number) {
  return wrapText(text, width, size).length * (size + 4);
}

function wrapText(text: string, maxWidth: number, size: number, font: PdfFont = "F1") {
  const normalized = normalizePdfText(text);
  const words = normalized.split(/\s+/).filter(Boolean);
  const maxChars = Math.max(
    16,
    Math.floor(maxWidth / (size * (font === "F2" ? 0.56 : 0.52))),
  );
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars) {
      line = candidate;
      return;
    }

    if (line) {
      lines.push(line);
    }

    if (word.length > maxChars) {
      lines.push(word.slice(0, maxChars - 1));
      line = word.slice(maxChars - 1);
    } else {
      line = word;
    }
  });

  if (line) {
    lines.push(line);
  }

  return lines.length ? lines : [""];
}

function normalizeFilenamePart(value: string) {
  return normalizePdfText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function normalizePdfText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[șȘ]/g, "s")
    .replace(/[țȚ]/g, "t")
    .replace(/[ăĂ]/g, "a")
    .replace(/[âÂ]/g, "a")
    .replace(/[îÎ]/g, "i")
    .replace(/[–—]/g, "-")
    .replace(/[„”]/g, '"')
    .replace(/[’]/g, "'")
    .replace(/[•]/g, "-")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdfString(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function toPdfDate(timestamp: string) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "D:00000000000000Z";
  }

  return `D:${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(
    2,
    "0",
  )}${String(date.getUTCDate()).padStart(2, "0")}${String(
    date.getUTCHours(),
  ).padStart(2, "0")}${String(date.getUTCMinutes()).padStart(2, "0")}${String(
    date.getUTCSeconds(),
  ).padStart(2, "0")}Z`;
}

function rgb(hex: string) {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  return `${round(r)} ${round(g)} ${round(b)}`;
}

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

function byteLength(value: string) {
  return new TextEncoder().encode(value).length;
}
