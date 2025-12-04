import { NextRequest, NextResponse } from "next/server";
import { runForeman } from "@/lib/foreman/orchestrator";

async function verifyGitHubSignature(req: NextRequest, rawBody: string) {
  // TODO: Add HMAC verification later
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const delivery = req.headers.get("x-github-delivery");
    const event = req.headers.get("x-github-event") || "unknown";

    const raw = await req.text();
    await verifyGitHubSignature(req, raw);

    const payload = JSON.parse(raw);

    const interesting = ["issues", "issue_comment", "pull_request"];
    if (!interesting.includes(event)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const orgId =
      process.env.MATURION_ORG_ID ||
      payload.installation?.account?.id?.toString() ||
      "unknown-org";

    const actions = await runForeman({
      organisationId: orgId,
      trigger: "github_webhook",
      event: { delivery, event, payload },
    });

    console.log("[Foreman Actions]", actions);

    return NextResponse.json({ ok: true, actions });
  } catch (error) {
    console.error("[Webhook Error]", error);
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "OK" });
}
