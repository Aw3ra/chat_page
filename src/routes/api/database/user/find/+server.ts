import { PrismaClient } from '@prisma/client'
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

const prisma = new PrismaClient()

// POST /api/user
export async function POST({ request }: RequestEvent) {
    const { name } = await request.json()
    const user = await prisma.user.findUnique({
        where: {
            email: name,
        },
        include: {
                accounts: true,
                sessions: true,
                conversations: true,
        },
    })
    return json({
        status: 200,
        body: user,
    })
}

