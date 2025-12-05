import OpenAI from "openai";
import { loadForemanBehaviourFiles } from "@/lib/github/loadFiles";
import { compileForemanContext } from "./behaviours";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "placeholder",
});

/**
 * Check if an event contains a pilot build command
 */
export function detectPilotBuildCommand(event: any): {
  isPilotBuild: boolean
  waveNumber?: number
  feature?: string
} {
  // Check issue comments for pilot build commands
  if (event.event === 'issue_comment' && event.payload?.comment?.body) {
    const body = event.payload.comment.body.toLowerCase()
    
    // Pattern: "@foreman execute pilot build wave X" or "foreman, execute pilot build wave 1"
    const pilotMatch = body.match(/@?foreman[,\s]+execute\s+pilot\s+build\s+wave\s+(\d+)/i)
    
    if (pilotMatch) {
      return {
        isPilotBuild: true,
        waveNumber: parseInt(pilotMatch[1], 10)
      }
    }
  }
  
  // Check issue body for pilot build commands
  if (event.event === 'issues' && event.payload?.issue?.body) {
    const body = event.payload.issue.body.toLowerCase()
    
    const pilotMatch = body.match(/@?foreman[,\s]+execute\s+pilot\s+build\s+wave\s+(\d+)/i)
    
    if (pilotMatch) {
      return {
        isPilotBuild: true,
        waveNumber: parseInt(pilotMatch[1], 10)
      }
    }
  }
  
  return { isPilotBuild: false }
}

export async function runForeman(input: any) {
  const files = await loadForemanBehaviourFiles();
  const systemPrompt = compileForemanContext(
    files,
    input.organisationId
  );

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content:
        "Trigger event:\n" +
        JSON.stringify(input.event, null, 2) +
        "\nReturn a JSON list of Foreman actions.",
    },
  ];

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "foreman_actions",
        schema: {
          type: "array",
          items: { type: "object", required: ["type"] },
        },
      },
    },
  });

  const json = res.choices[0]?.message?.content;
  if (!json) {
    throw new Error("No response content from OpenAI");
  }
  return JSON.parse(json);
}
