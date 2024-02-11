import { OpenAI } from 'openai';
import { postRequest } from '$lib/utility';
import { json } from "@sveltejs/kit";
import type { userDetails } from '$lib/types';
const {
    OPENAI_APIKEY
} = process.env;

const openai = new OpenAI({apiKey: OPENAI_APIKEY});

export async function POST({ request }) {
    const thread = await openai.beta.threads.create()
    return json({
        status: 200,
        body: thread.id,
    })
}