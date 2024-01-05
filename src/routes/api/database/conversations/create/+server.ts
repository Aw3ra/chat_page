import { OpenAI } from 'openai';
import { OPENAI_APIKEY } from '$env/static/private'
import { json } from "@sveltejs/kit";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const openai = new OpenAI({apiKey: OPENAI_APIKEY});

export async function POST({ request }) {
    const {content, user} = await request.json()
    const thread = await openai.beta.threads.create()
    await openai.beta.threads.messages.create(
        thread.id,
        { role: "user", content: content },
    );
    await prisma.conversation.create({
        data: {
            threadId: thread.id,
            userId: user.email,
        },
    })
    prisma.$disconnect()
    // Return the thread ID
    return json({
        status: 200,
        body: thread.id,
    })
}