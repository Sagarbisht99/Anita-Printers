import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/app/lib/env/server";
import { escapeHtml } from "@/app/lib/security/sanitize";

export type EnquiryEmailPayload = {
  name: string;
  email: string;
  phone: string;
  category?: string | null;
  quantity?: number | null;
  notes?: string | null;
};

function getResendClient() {
  if (!serverEnv.resendApiKey) return null;
  return new Resend(serverEnv.resendApiKey);
}

export async function sendEnquiryAdminEmail(payload: EnquiryEmailPayload) {
  const resend = getResendClient();
  const adminEmail = serverEnv.adminEmail;
  const from =
    serverEnv.resendFromEmail || "Anita Printers <onboarding@resend.dev>";

  if (!resend || !adminEmail) {
    console.warn(
      "[resend] Skipped email — set RESEND_API_KEY and ADMIN_EMAIL in .env",
    );
    return { sent: false as const, reason: "missing_config" as const };
  }

  const subject = `New quote enquiry — ${payload.name}`;
  const rows = [
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Email", payload.email || "—"],
    ["Category", payload.category || "—"],
    ["Quantity", payload.quantity?.toString() ?? "—"],
    ["Notes", payload.notes || "—"],
  ] as const;

  const { error } = await resend.emails.send({
    from,
    to: [adminEmail],
    subject,
    replyTo: payload.email || undefined,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#15202b">
        <h2 style="color:#0f3d66;margin:0 0 12px">New quote enquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:520px">
          ${rows
            .map(
              ([label, value]) => `<tr>
                <td style="padding:8px 10px;border:1px solid #e2e7ee;font-weight:600;width:120px">${escapeHtml(label)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e7ee">${escapeHtml(String(value))}</td>
              </tr>`,
            )
            .join("")}
        </table>
      </div>
    `,
  });

  if (error) {
    console.error("[resend] Failed to send enquiry email:", error);
    return { sent: false as const, reason: "send_failed" as const };
  }

  return { sent: true as const };
}
