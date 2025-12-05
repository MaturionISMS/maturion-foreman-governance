import { NextRequest, NextResponse } from "next/server";
import { runForeman, detectPilotBuildCommand } from "@/lib/foreman/orchestrator";

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

    // Check for pilot build command
    const pilotBuildInfo = detectPilotBuildCommand({ event, payload })
    
    if (pilotBuildInfo.isPilotBuild) {
      console.log('[Webhook] Pilot build command detected:', pilotBuildInfo)
      
      // Trigger pilot build via run-build endpoint
      try {
        const baseUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000'
        
        const buildResponse = await fetch(`${baseUrl}/api/foreman/run-build`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            organisationId: orgId,
            triggerSource: 'issue_command',
            triggerContext: {
              pilotWave: true,
              waveNumber: pilotBuildInfo.waveNumber,
              feature: pilotBuildInfo.feature || 'foreman-status-dashboard',
              issueNumber: payload.issue?.number,
              commentId: payload.comment?.id
            },
            autonomousBuildEnabled: true,
            createPR: true,
            owner: payload.repository?.owner?.login,
            repo: payload.repository?.name,
            branch: `foreman/pilot-wave-${pilotBuildInfo.waveNumber || 1}`,
            baseBranch: 'main',
            pilotWave: true,
            waveNumber: pilotBuildInfo.waveNumber,
            feature: 'foreman-status-dashboard'
          })
        })
        
        const buildResult = await buildResponse.json()
        
        console.log('[Webhook] Pilot build triggered:', buildResult)
        
        return NextResponse.json({ 
          ok: true, 
          pilotBuildTriggered: true,
          buildResult 
        })
        
      } catch (buildError) {
        console.error('[Webhook] Failed to trigger pilot build:', buildError)
        return NextResponse.json({
          ok: false,
          error: 'Failed to trigger pilot build',
          details: buildError instanceof Error ? buildError.message : 'Unknown error'
        }, { status: 500 })
      }
    }

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
