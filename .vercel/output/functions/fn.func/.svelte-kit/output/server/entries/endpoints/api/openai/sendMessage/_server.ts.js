import { OpenAI } from "openai";
import { O as OPENAI_APIKEY } from "../../../../../chunks/private.js";
import { j as json } from "../../../../../chunks/index.js";
const openai = new OpenAI({ apiKey: OPENAI_APIKEY });
async function POST({ request }) {
  const { threadId, message, assistant } = await request.json();
  await openai.beta.threads.messages.create(
    threadId,
    { role: "user", content: message }
  );
  const run = await openai.beta.threads.runs.create(
    threadId,
    { assistant_id: assistant }
  );
  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
  while (runStatus.status !== "completed") {
    if (runStatus.status === "expired" || runStatus.status === "error") {
      break;
    }
    await new Promise((r) => setTimeout(r, 200));
    runStatus = await openai.beta.threads.runs.retrieve(
      threadId,
      run.id
    );
  }
  return json({
    status: 200,
    body: threadId
  });
}
export {
  POST
};
