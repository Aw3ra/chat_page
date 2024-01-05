import { GITHUB_ID } from '$env/static/private';
import { PrismaClient } from '@prisma/client'
import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

const prisma = new PrismaClient()

// POST /api/user
export async function POST({ request }: RequestEvent) {
    const { username, password } = await request.json()
    
    const newUser = await prisma.user.create({
        data: {
            Username: username,
            Password: password,
        },
    })
    
    return json({
        status: 200,
        body: newUser,
    })
}

