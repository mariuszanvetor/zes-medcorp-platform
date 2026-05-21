const endpoint = process.env.LEAD_API_URL || "http://127.0.0.1:3000/api/leads";

const payload = {
  sourceTool: "integration-smoke-test",
  sourcePage: "/api/leads",
  inquiryType: "Test integrare lead",
  projectType: "Test tehnic",
  name: "Test User",
  email: "test@example.com",
  phone: "+40 700 000 000",
  company: "Test Company",
  urgency: "Exploratoriu",
  message: "Payload de test fara date reale.",
  generatedSummary: "Test local pentru verificarea API-ului de leaduri.",
  generatedBudgetRange: "Orientativ",
  generatedRiskLevel: "Redus",
  generatedComplexity: "Basic",
  timestamp: new Date().toISOString(),
};

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const body = await response.json();

console.log(
  JSON.stringify(
    {
      status: response.status,
      success: body.success,
      integrationMode: body.integrationMode,
      storageMode: body.storageMode,
      emailMode: body.emailMode,
      sheetsMode: body.sheetsMode,
      score: body.score,
      priority: body.priority,
    },
    null,
    2,
  ),
);

if (!response.ok || !body.success) {
  process.exitCode = 1;
}

