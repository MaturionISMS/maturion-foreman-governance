import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    GITHUB_MCP_TOKEN: process.env.GITHUB_MCP_TOKEN ? "LOADED" : "MISSING",
    FOREMAN_AUTONOMY_ENABLED: process.env.FOREMAN_AUTONOMY_ENABLED,
    NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG: process.env.NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG
  });
}
