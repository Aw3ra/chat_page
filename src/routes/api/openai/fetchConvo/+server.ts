import { OpenAI } from 'openai';
import { OPENAI_APIKEY } from '$env/static/private'
import { json } from "@sveltejs/kit";

const openai = new OpenAI({apiKey: OPENAI_APIKEY});

export async function POST({ request }) {
    const {threadId} = await request.json()
    const thread = await openai.beta.threads.messages.list(threadId);
    // Return the thread ID
    return json({
        status: 200,
        body: thread.data,
    })
}