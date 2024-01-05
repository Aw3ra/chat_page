import { PrismaClient } from '@prisma/client'
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

const prisma = new PrismaClient()

// POST /api/user
export async function POST({ request }: RequestEvent) {
    const { name } = await request.json()
    console.log(name)
    const conversations = await prisma.conversation.findMany(
        {where: {
            userId: name,
        },
    }
    )
    return json({
        status: 200,
        body: conversations,
    })
}

