import { approveLeads, generateDrafts, getOutreachModel, updateOutreachStatus } from "./core.mjs";

const [, , command = "review", ...args] = process.argv;
const flag = (name, fallback = "") => {
  const inline = args.find((arg) => arg.startsWith(`--${name}=`));
  if (inline) return inline.slice(name.length + 3);
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
};

const list = (value) => value.split(",").map((entry) => entry.trim()).filter(Boolean);

if (command === "review") {
  const approved = flag("approve") ? await approveLeads(list(flag("approve"))) : [];
  const model = await getOutreachModel();
  console.log(
    JSON.stringify(
      {
        ok: true,
        mode: "manual-review",
        approved: approved.map((record) => record.leadId),
        reviewQueue: model.reviewQueue.slice(0, Number(flag("limit", "30"))).map((record) => ({
          leadId: record.leadId,
          companyName: record.companyName,
          category: record.category,
          city: record.city,
          prioritySegment: record.prioritySegment,
          serviceFit: record.serviceFit,
          likelyNeed: record.likelyNeed,
          estimatedContractValue: record.estimatedContractValue,
          nextBestAction: record.nextBestAction,
        })),
        totalPendingReview: model.reviewQueue.length,
        automaticSending: false,
      },
      null,
      2,
    ),
  );
} else if (command === "draft") {
  const result = await generateDrafts(Number(flag("limit", "20")) || 20, { force: args.includes("--force") });
  console.log(
    JSON.stringify(
      {
        ok: true,
        generatedDrafts: result.generated.length,
        draftIds: result.generated.map((draft) => draft.draftId),
        humanApprovalRequired: true,
        automaticSending: false,
      },
      null,
      2,
    ),
  );
} else if (command === "followups") {
  const model = await getOutreachModel();
  console.log(JSON.stringify({ ok: true, automaticSending: false, followUps: model.followUps }, null, 2));
} else if (command === "status") {
  const leadId = flag("lead-id");
  const status = flag("status");
  if (!leadId || !status) throw new Error("status requires --lead-id and --status");
  console.log(JSON.stringify({ ok: true, record: await updateOutreachStatus(leadId, status, flag("notes")) }, null, 2));
} else {
  throw new Error(`Unknown outreach command: ${command}`);
}

