import { OpenAI } from "openai";
import { O as OPENAI_APIKEY } from "../../../../../../chunks/private.js";
import { j as json } from "../../../../../../chunks/index.js";
const openai = new OpenAI({ apiKey: OPENAI_APIKEY });
async function POST({ request }) {
  const thread = await openai.beta.threads.create();
  return json({
    status: 200,
    body: thread.id
  });
}
export {
  POST
};
