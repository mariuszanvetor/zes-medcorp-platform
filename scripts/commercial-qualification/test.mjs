import assert from "node:assert/strict";
import {
  buildQualificationModel,
  qualifyLead,
} from "./core.mjs";
import { CLASSIFICATIONS } from "./config.mjs";

const base = {
  country: "Romania",
  county: "Bucuresti",
  sourceUrls: ["https://example.test/contact"],
  sourceType: "official-website",
  confidenceScore: 90,
  dateVerified: "2026-06-02",
};

const clients = [
  {
    ...base,
    leadId: "ct-1",
    companyName: "Clinica Imagistica CT RMN",
    category: "centre-ct-rmn",
    city: "Bucuresti",
    website: "https://ct-rmn.example.test",
    publicEmail: "office@ct-rmn.example.test",
    publicPhone: "+40 700 000 001",
    notes: "Centru imagistica CT RMN cu profil public.",
  },
  {
    ...base,
    leadId: "rx-1",
    companyName: "Centru Radiologie RX",
    category: "centre-radiologie-rx",
    city: "Pitesti",
    website: "https://rx.example.test",
    publicEmail: "office@rx.example.test",
    publicPhone: "+40 700 000 002",
    notes: "Centru radiologie RX.",
  },
  {
    ...base,
    leadId: "dist-1",
    companyName: "Distribuitor Medical",
    category: "distribuitori-aparatura",
    city: "Bucuresti",
    website: "https://distributor.example.test",
    publicEmail: "office@distributor.example.test",
    publicPhone: "+40 700 000 003",
    notes: "Import si distributie aparatura medicala.",
  },
  {
    ...base,
    leadId: "service-1",
    companyName: "Service Medical",
    category: "service-aparatura",
    city: "Bucuresti",
    website: "https://service.example.test",
    publicEmail: "office@service.example.test",
    publicPhone: "+40 700 000 004",
    notes: "Service aparatura medicala.",
  },
  {
    ...base,
    leadId: "duplicate-rx",
    companyName: "Centru Radiologie RX Sucursala",
    category: "centre-radiologie-rx",
    city: "Pitesti",
    website: "https://rx.example.test",
    publicEmail: "office@rx.example.test",
    publicPhone: "+40 700 000 002",
    notes: "Aceeasi companie, domeniu duplicat.",
  },
];

const distributor = qualifyLead(clients[2], []);
assert.equal(distributor.classification, CLASSIFICATIONS.distributor);
assert.equal(distributor.excluded, true);

const service = qualifyLead(clients[3], []);
assert.equal(service.classification, CLASSIFICATIONS.serviceProvider);
assert.equal(service.excluded, true);

const dnc = qualifyLead(clients[1], [{ domain: "rx.example.test" }]);
assert.equal(dnc.classification, CLASSIFICATIONS.doNotContact);

const model = buildQualificationModel({ leads: clients, dncEntries: [], outreachState: {} });
assert.equal(model.summary.totalLeadsAnalyzed, 5);
assert.equal(model.summary.excludedDistributors, 1);
assert.equal(model.summary.serviceProvidersSeparated, 1);
assert.equal(model.qualifiedProspects.length, 2, "Duplicate domain must not create a second outreach record.");
assert.equal(model.top25[0].companyName, "Clinica Imagistica CT RMN");
assert.ok(model.top25[0].opportunityScore > model.top25[1].opportunityScore);
assert.ok(model.top25[0].personalizedEmailBody.includes("office@zescorp.ro"));
assert.ok(model.top25[0].personalizedEmailBody.includes("nu doriti"));

console.log(
  JSON.stringify(
    {
      ok: true,
      analyzed: model.summary.totalLeadsAnalyzed,
      qualifiedUniqueDomains: model.qualifiedProspects.length,
      topProspect: model.top25[0].companyName,
      automaticSending: false,
    },
    null,
    2,
  ),
);
