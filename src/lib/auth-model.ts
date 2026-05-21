export const adminRoles = [
  "owner",
  "admin",
  "sales",
  "technical",
  "service",
  "viewer",
] as const;

export const adminPermissions = [
  "viewLeads",
  "updateLeadStatus",
  "addLeadNotes",
  "exportLeads",
  "viewAnalytics",
  "manageContent",
  "manageSettings",
] as const;

export type AdminRole = (typeof adminRoles)[number];
export type AdminPermission = (typeof adminPermissions)[number];

export type AdminRoleDefinition = {
  role: AdminRole;
  label: string;
  description: string;
  permissions: AdminPermission[];
};

export const adminRoleDefinitions: Record<AdminRole, AdminRoleDefinition> = {
  owner: {
    role: "owner",
    label: "Owner",
    description: "Full platform ownership, settings, content and lead access.",
    permissions: [...adminPermissions],
  },
  admin: {
    role: "admin",
    label: "Admin",
    description: "Operational admin access without ownership transfer.",
    permissions: [
      "viewLeads",
      "updateLeadStatus",
      "addLeadNotes",
      "exportLeads",
      "viewAnalytics",
      "manageContent",
    ],
  },
  sales: {
    role: "sales",
    label: "Sales",
    description: "Lead qualification, notes and commercial follow-up.",
    permissions: ["viewLeads", "updateLeadStatus", "addLeadNotes", "exportLeads"],
  },
  technical: {
    role: "technical",
    label: "Technical",
    description: "Technical review of projects, missing information and risks.",
    permissions: ["viewLeads", "updateLeadStatus", "addLeadNotes"],
  },
  service: {
    role: "service",
    label: "Service",
    description: "Service diagnostics, equipment support and operational risk leads.",
    permissions: ["viewLeads", "updateLeadStatus", "addLeadNotes"],
  },
  viewer: {
    role: "viewer",
    label: "Viewer",
    description: "Read-only internal visibility for reporting and review.",
    permissions: ["viewLeads", "viewAnalytics"],
  },
};

export function getDefaultPermissionsForRole(
  role: AdminRole,
): AdminPermission[] {
  return adminRoleDefinitions[role].permissions;
}

export function canRole(role: AdminRole, permission: AdminPermission) {
  return getDefaultPermissionsForRole(role).includes(permission);
}
