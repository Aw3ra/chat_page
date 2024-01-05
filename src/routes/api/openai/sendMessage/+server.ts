import { OpenAI } from 'openai';
import { OPENAI_APIKEY } from '$env/static/private'
import { json } from "@sveltejs/kit";

const openai = new OpenAI({apiKey: OPENAI_APIKEY});

export async function POST({ request }) {
    const {threadId, message} = await request.json()
    await openai.beta.threads.messages.create(
        threadId,
        { role: "user", content: message },
    );
    const run = await openai.beta.threads.runs.create(
        threadId,
        { assistant_id: "asst_kkgrrq41mRQUaq7Yre5JYrSW" }
      );
    let runStatus = await openai.beta.threads.runs.retrieve( threadId, run.id);

    while(runStatus.status !== "completed") {
        // If runStatus.status is expoire or error, then we should stop the loop
        if(runStatus.status === "expired" || runStatus.status === "error") {
            break;
        }
        await new Promise(r => setTimeout(r, 200));
        runStatus = await openai.beta.threads.runs.retrieve(
            threadId,
            run.id
        );
    }
    // Return the thread ID
    return json({
        status: 200,
        body: "Success",
    })
}