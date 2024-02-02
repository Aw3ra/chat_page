import jwt from "jsonwebtoken";

import { json } from "@sveltejs/kit"

import { JWT_SECRET } from "$env/static/private";

export async function GET() {
    const token = jwt.sign({
        data: "token"
    }, JWT_SECRET, { expiresIn: "30s" });

    return json({
        data : token,
    });
}