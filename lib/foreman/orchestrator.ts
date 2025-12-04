import OpenAI from "openai";
import { loadForemanBehaviourFiles } from "@/lib/github/loadFiles";
import { compileForemanContext } from "./behaviours";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function runForeman(input: any) {
  const files = await loadForemanBehaviourFiles();
  const systemPrompt = compileForemanContext(
    files,
    input.organisationId
  );

  const messages = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content:
        "Trigger event:\n" +
        JSON.stringify(input.event, null, 2) +
        "\nReturn a JSON list of Foreman actions.",
    },
  ];

  const res = await openai.responses.create({
    model: "gpt-4.1",
    input: messages,
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

  const json = res.output[0].content[0].text;
  return JSON.parse(json);
}
