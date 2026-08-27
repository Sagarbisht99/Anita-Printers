import "server-only";
import { Resend } from "resend";

export type EnquiryEmailPayload = {
  name: string;
  email: string;
  phone: string;
  category?: string | null;
  quantity?: number | null;
  notes?: string | null;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendEnquiryAdminEmail(payload: EnquiryEmailPayload) {
  const resend = getResendClient();
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Anita Printers <onboarding@resend.dev>";

  if (!resend || !adminEmail) {
    console.warn(
      "[resend] Skipped email — set RESEND_API_KEY and ADMIN_EMAIL in .env",
    );
    return { sent: false as const, reason: "missing_config" as const };
  }

  const subject = `New quote enquiry — ${payload.name}`;
  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "—"}`,
    `Category: ${payload.category || "—"}`,
    `Quantity: ${payload.quantity ?? "—"}`,
    `Notes: ${payload.notes || "—"}`,
  ];

  const { error } = await resend.emails.send({
    from,
    to: [adminEmail],
    subject,
    replyTo: payload.email || undefined,
    text: lines.join("\n"),
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#15202b">
        <h2 style="color:#0f3d66;margin:0 0 12px">New quote enquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:520px">
          ${lines
            .map((line) => {
              const [label, ...rest] = line.split(": ");
              return `<tr>
                <td style="padding:8px 10px;border:1px solid #e2e7ee;font-weight:600;width:120px">${label}</td>
                <td style="padding:8px 10px;border:1px solid #e2e7ee">${rest.join(": ") || "—"}</td>
              </tr>`;
            })
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
